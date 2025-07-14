// pages/api/admin/dashboard.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { supabaseAdmin } from '@/lib/supabase-admin';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Check admin authorization
  const adminKey = req.headers['x-admin-key'];
  if (adminKey !== process.env.ADMIN_SECRET_KEY) {
    return res.status(403).json({ error: 'Unauthorized - Invalid admin key' });
  }

  try {
    // Get system statistics
    const [
      documentsResult,
      sessionsResult,
      agentLogsResult,
      templatesResult
    ] = await Promise.all([
      // Total documents generated
      supabaseAdmin
        .from('user_documents')
        .select('id, industry, format, created_at')
        .order('created_at', { ascending: false }),
      
      // Stripe sessions
      supabaseAdmin
        .from('stripe_sessions')
        .select('id, status, amount, product_type, created_at')
        .order('created_at', { ascending: false }),
      
      // Agent interactions
      supabaseAdmin
        .from('agent_logs')
        .select('id, agent_id, created_at')
        .order('created_at', { ascending: false }),
      
      // Template versions
      supabaseAdmin
        .from('template_versions')
        .select('id, industry, document_title, is_active, created_at')
        .eq('is_active', true)
    ]);

    if (documentsResult.error) throw documentsResult.error;
    if (sessionsResult.error) throw sessionsResult.error;
    if (agentLogsResult.error) throw agentLogsResult.error;
    if (templatesResult.error) throw templatesResult.error;

    const documents = documentsResult.data || [];
    const sessions = sessionsResult.data || [];
    const agentLogs = agentLogsResult.data || [];
    const templates = templatesResult.data || [];

    // Calculate statistics
    const totalDocuments = documents.length;
    const totalSessions = sessions.length;
    const totalAgentInteractions = agentLogs.length;
    const activeTemplates = templates.length;

    // Revenue calculation (completed sessions only)
    const completedSessions = sessions.filter(s => s.status === 'completed');
    const totalRevenue = completedSessions.reduce((sum, s) => sum + (s.amount || 0), 0);

    // Documents by industry
    const documentsByIndustry = documents.reduce((acc, doc) => {
      acc[doc.industry] = (acc[doc.industry] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    // Documents by format
    const documentsByFormat = documents.reduce((acc, doc) => {
      acc[doc.format] = (acc[doc.format] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    // Agent usage
    const agentUsage = agentLogs.reduce((acc, log) => {
      acc[log.agent_id] = (acc[log.agent_id] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    // Recent activity (last 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const recentDocuments = documents.filter(d => 
      new Date(d.created_at) > thirtyDaysAgo
    ).length;

    const recentSessions = sessions.filter(s => 
      new Date(s.created_at) > thirtyDaysAgo
    ).length;

    res.status(200).json({
      success: true,
      statistics: {
        totalDocuments,
        totalSessions,
        totalAgentInteractions,
        activeTemplates,
        totalRevenue: totalRevenue / 100, // Convert from cents to dollars
        recentDocuments,
        recentSessions
      },
      breakdown: {
        documentsByIndustry,
        documentsByFormat,
        agentUsage
      },
      recentActivity: {
        documents: documents.slice(0, 10), // Last 10 documents
        sessions: sessions.slice(0, 10)    // Last 10 sessions
      }
    });

  } catch (error) {
    console.error('Admin dashboard API error:', error);
    res.status(500).json({ 
      error: 'Internal server error: ' + (error as Error).message,
      success: false
    });
  }
}