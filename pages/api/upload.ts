import { NextApiRequest, NextApiResponse } from 'next'
import { supabaseAdmin, uploadFileToStorage } from '../../lib/supabase-admin'
import { supabase } from '../../lib/supabase'
import formidable from 'formidable'
import { readFileSync } from 'fs'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const authHeader = req.headers.authorization
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Missing or invalid authorization header' })
    }

    const token = authHeader.substring(7)
    
    const { data: { user }, error: authError } = await supabase.auth.getUser(token)
    if (authError || !user) {
      return res.status(401).json({ error: 'Invalid token or user not found' })
    }

    const form = formidable({
      maxFileSize: 10 * 1024 * 1024,
      filter: ({ mimetype }) => {
        return mimetype?.includes('application/vnd.openxmlformats-officedocument') || 
               mimetype?.includes('application/pdf') || 
               mimetype?.includes('application/vnd.ms-excel') || false
      }
    })

    const [fields, files] = await form.parse(req)
    
    const documentType = Array.isArray(fields.document_type) ? fields.document_type[0] : fields.document_type
    const industry = Array.isArray(fields.industry) ? fields.industry[0] : fields.industry

    const uploadedFile = Array.isArray(files.file) ? files.file[0] : files.file
    
    if (!uploadedFile) {
      return res.status(400).json({ error: 'No file uploaded' })
    }

    const fileBuffer = readFileSync(uploadedFile.filepath)
    
    const fileExtension = uploadedFile.originalFilename?.split('.').pop()?.toLowerCase()
    const mimeType = uploadedFile.mimetype || 'application/octet-stream'
    
    const filePath = `user_uploads/${user.id}/${Date.now()}_${uploadedFile.originalFilename}`
    
    const uploadResult = await uploadFileToStorage(
      'user_uploads',
      filePath,
      fileBuffer,
      mimeType
    )

    const { data: document, error: dbError } = await supabaseAdmin
      .from('user_documents')
      .insert({
        user_id: user.id,
        file_name: uploadedFile.originalFilename,
        file_path: uploadResult.path,
        document_type: documentType || 'uploaded_document',
        industry: industry || 'general',
        format: fileExtension,
        download_url: uploadResult.signedUrl,
        file_size: uploadedFile.size,
        status: 'uploaded',
        metadata: {
          originalName: uploadedFile.originalFilename,
          mimeType: mimeType,
          uploadedAt: new Date().toISOString()
        }
      })
      .select()
      .single()

    if (dbError) {
      console.error('Database error:', dbError)
      throw new Error(`Failed to save document: ${dbError.message}`)
    }

    await supabaseAdmin.from('document_logs').insert({
      document_id: document.id,
      user_id: user.id,
      action: 'upload',
      status: 'complete',
      message: `Document uploaded successfully: ${uploadedFile.originalFilename}`,
      metadata: {
        fileSize: uploadedFile.size,
        mimeType: mimeType
      }
    })

    res.status(200).json({
      success: true,
      document: document,
      filePath: uploadResult.path,
      message: 'Document uploaded successfully'
    })

  } catch (error) {
    console.error('Upload error:', error)
    res.status(500).json({ 
      error: 'Internal server error: ' + (error as Error).message,
      success: false
    })
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
}
