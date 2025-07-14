// pages/api/admin/templates.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { supabaseAdmin } from '@/lib/supabase-admin';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Check admin authorization
  const adminKey = req.headers['x-admin-key'];
  if (adminKey !== process.env.ADMIN_SECRET_KEY) {
    return res.status(403).json({ error: 'Unauthorized - Invalid admin key' });
  }

  try {
    switch (req.method) {
      case 'GET':
        // Get all templates or filter by industry
        const { industry, active_only } = req.query;
        
        let query = supabaseAdmin
          .from('template_versions')
          .select('*')
          .order('created_at', { ascending: false });

        if (industry) {
          query = query.eq('industry', industry);
        }

        if (active_only === 'true') {
          query = query.eq('is_active', true);
        }

        const { data: templates, error } = await query;

        if (error) throw error;

        res.status(200).json({
          success: true,
          templates: templates || [],
          total: templates?.length || 0
        });
        break;

      case 'DELETE':
        // Deactivate a template version
        const { templateId } = req.query;
        
        if (!templateId) {
          return res.status(400).json({ error: 'Template ID is required' });
        }

        const { error: deleteError } = await supabaseAdmin
          .from('template_versions')
          .update({ is_active: false })
          .eq('id', templateId);

        if (deleteError) throw deleteError;

        res.status(200).json({
          success: true,
          message: 'Template deactivated successfully'
        });
        break;

      case 'PUT':
        // Activate/deactivate template
        const { templateId: updateId } = req.query;
        const { is_active } = req.body;
        
        if (!updateId) {
          return res.status(400).json({ error: 'Template ID is required' });
        }

        const { error: updateError } = await supabaseAdmin
          .from('template_versions')
          .update({ is_active })
          .eq('id', updateId);

        if (updateError) throw updateError;

        res.status(200).json({
          success: true,
          message: `Template ${is_active ? 'activated' : 'deactivated'} successfully`
        });
        break;

      default:
        res.status(405).json({ error: 'Method not allowed' });
    }

  } catch (error) {
    console.error('Admin templates API error:', error);
    res.status(500).json({ 
      error: 'Internal server error: ' + (error as Error).message,
      success: false
    });
  }
}