import { NextApiRequest, NextApiResponse } from 'next'
import { supabaseAdmin, uploadFileToStorage } from '../../../lib/supabase-admin'
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
    const form = formidable({
      maxFileSize: 50 * 1024 * 1024,
      filter: ({ mimetype }) => {
        return mimetype?.includes('application/vnd.openxmlformats-officedocument') || 
               mimetype?.includes('application/pdf') || 
               mimetype?.includes('application/zip') ||
               mimetype?.includes('application/vnd.ms-excel') || false
      }
    })

    const [fields, files] = await form.parse(req)
    
    const auditSessionId = Array.isArray(fields.auditSessionId) ? fields.auditSessionId[0] : fields.auditSessionId
    const sessionToken = Array.isArray(fields.sessionToken) ? fields.sessionToken[0] : fields.sessionToken

    if (!auditSessionId || !sessionToken) {
      return res.status(400).json({ error: 'Missing auditSessionId or sessionToken' })
    }

    const { data: auditSession, error: sessionError } = await supabaseAdmin
      .from('audit_sessions')
      .select('*')
      .eq('id', auditSessionId)
      .eq('session_token', sessionToken)
      .single()

    if (sessionError || !auditSession) {
      return res.status(404).json({ error: 'Audit session not found or invalid token' })
    }

    const uploadedFile = Array.isArray(files.file) ? files.file[0] : files.file
    
    if (!uploadedFile) {
      return res.status(400).json({ error: 'No file uploaded' })
    }

    const fileBuffer = readFileSync(uploadedFile.filepath)
    
    const fileExtension = uploadedFile.originalFilename?.split('.').pop()?.toLowerCase()
    const mimeType = uploadedFile.mimetype || 'application/octet-stream'
    
    const filePath = `audit_uploads/${auditSessionId}/${Date.now()}_${uploadedFile.originalFilename}`
    
    const uploadResult = await uploadFileToStorage(
      'user_uploads',
      filePath,
      fileBuffer,
      mimeType
    )

    const { data: auditFile, error: fileError } = await supabaseAdmin
      .from('audit_file_uploads')
      .insert({
        audit_session_id: auditSessionId,
        file_name: uploadedFile.originalFilename,
        file_path: uploadResult.path,
        file_size: uploadedFile.size,
        file_type: fileExtension,
        mime_type: mimeType,
        analysis_status: 'pending',
        metadata: {
          originalName: uploadedFile.originalFilename,
          uploadedAt: new Date().toISOString(),
          sessionToken
        }
      })
      .select()
      .single()

    if (fileError) {
      console.error('Database error:', fileError)
      throw new Error(`Failed to save file record: ${fileError.message}`)
    }

    const currentFiles = auditSession.uploaded_files || []
    const updatedFiles = [...currentFiles, {
      id: auditFile.id,
      fileName: uploadedFile.originalFilename,
      fileSize: uploadedFile.size,
      uploadedAt: new Date().toISOString()
    }]

    const { error: updateError } = await supabaseAdmin
      .from('audit_sessions')
      .update({
        uploaded_files: updatedFiles,
        total_files: updatedFiles.length,
        status: 'processing'
      })
      .eq('id', auditSessionId)

    if (updateError) {
      console.error('Error updating audit session:', updateError)
    }

    console.log(`File uploaded for audit session ${auditSessionId}: ${uploadedFile.originalFilename}`)

    res.status(200).json({
      success: true,
      file: {
        id: auditFile.id,
        fileName: uploadedFile.originalFilename,
        fileSize: uploadedFile.size,
        filePath: uploadResult.path
      },
      auditSession: {
        id: auditSessionId,
        totalFiles: updatedFiles.length,
        status: 'processing'
      },
      message: 'File uploaded successfully'
    })

  } catch (error) {
    console.error('Audit upload error:', error)
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
