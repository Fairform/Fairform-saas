// pages/api/admin/upload-template.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { supabaseAdmin, uploadFileToStorage } from '@/lib/supabase-admin';
import formidable from 'formidable';
import { readFileSync } from 'fs';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Check admin authorization
    const adminKey = req.headers['x-admin-key'];
    if (adminKey !== process.env.ADMIN_SECRET_KEY) {
      return res.status(403).json({ error: 'Unauthorized - Invalid admin key' });
    }

    // Parse form data
    const form = formidable({
      maxFileSize: 10 * 1024 * 1024, // 10MB
      filter: ({ mimetype }) => {
        return mimetype?.includes('application/vnd.openxmlformats-officedocument.wordprocessingml.document') || 
               mimetype?.includes('application/msword') || false;
      }
    });

    const [fields, files] = await form.parse(req);
    
    const industry = Array.isArray(fields.industry) ? fields.industry[0] : fields.industry;
    const documentTitle = Array.isArray(fields.documentTitle) ? fields.documentTitle[0] : fields.documentTitle;
    const uploadedBy = Array.isArray(fields.uploadedBy) ? fields.uploadedBy[0] : fields.uploadedBy;

    if (!industry || !documentTitle || !uploadedBy) {
      return res.status(400).json({ 
        error: 'Missing required fields: industry, documentTitle, uploadedBy' 
      });
    }

    const templateFile = Array.isArray(files.template) ? files.template[0] : files.template;
    
    if (!templateFile) {
      return res.status(400).json({ error: 'No template file uploaded' });
    }

    // Read file content
    const fileBuffer = readFileSync(templateFile.filepath);
    
    // Upload to storage
    const filePath = `templates/${industry}/${documentTitle.replace(/[^a-zA-Z0-9]/g, '_')}.docx`;
    
    const uploadResult = await uploadFileToStorage(
      'document-templates',
      filePath,
      fileBuffer,
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    );

    // Get current version number
    const { data: existingVersions } = await supabaseAdmin
      .from('template_versions')
      .select('version')
      .eq('industry', industry)
      .eq('document_title', documentTitle)
      .order('version', { ascending: false })
      .limit(1);

    const newVersion = existingVersions && existingVersions.length > 0 
      ? existingVersions[0].version + 1 
      : 1;

    // Deactivate old versions
    await supabaseAdmin
      .from('template_versions')
      .update({ is_active: false })
      .eq('industry', industry)
      .eq('document_title', documentTitle);

    // Save new template version
    const { data, error } = await supabaseAdmin
      .from('template_versions')
      .insert({
        industry,
        document_title: documentTitle,
        version: newVersion,
        file_path: uploadResult.path,
        uploaded_by: uploadedBy,
        is_active: true
      })
      .select()
      .single();

    if (error) {
      throw error;
    }

    res.status(200).json({
      success: true,
      template: data,
      message: `Template uploaded successfully as version ${newVersion}`
    });

  } catch (error) {
    console.error('Template upload error:', error);
    res.status(500).json({ 
      error: 'Internal server error: ' + (error as Error).message,
      success: false
    });
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
};