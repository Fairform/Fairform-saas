import { NextApiRequest, NextApiResponse } from 'next'
import { supabaseAdmin } from '../../../lib/supabase-admin'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { auditSessionId, sessionToken } = req.query

    if (!auditSessionId || !sessionToken) {
      return res.status(400).json({ error: 'Missing auditSessionId or sessionToken' })
    }

    const { data: auditSession, error: sessionError } = await supabaseAdmin
      .from('audit_sessions')
      .select(`
        *,
        business_profiles (*)
      `)
      .eq('id', auditSessionId)
      .eq('session_token', sessionToken)
      .single()

    if (sessionError || !auditSession) {
      return res.status(404).json({ error: 'Audit session not found or invalid token' })
    }

    const { data: uploadedFiles, error: filesError } = await supabaseAdmin
      .from('audit_file_uploads')
      .select('*')
      .eq('audit_session_id', auditSessionId)

    if (filesError) {
      console.error('Error fetching uploaded files:', filesError)
    }

    res.status(200).json({
      success: true,
      auditSession: {
        id: auditSession.id,
        status: auditSession.status,
        complianceScore: auditSession.compliance_score,
        auditResults: auditSession.audit_results,
        recommendations: auditSession.recommendations,
        missingPolicies: auditSession.missing_policies,
        outdatedDocuments: auditSession.outdated_documents,
        completedChecks: auditSession.completed_checks,
        totalFiles: auditSession.total_files,
        processedFiles: auditSession.processed_files,
        createdAt: auditSession.created_at,
        completedAt: auditSession.completed_at
      },
      businessProfile: auditSession.business_profiles ? {
        businessName: auditSession.business_profiles.business_name,
        industry: auditSession.business_profiles.industry,
        city: auditSession.business_profiles.city,
        region: auditSession.business_profiles.region,
        orgSize: auditSession.business_profiles.org_size
      } : null,
      uploadedFiles: uploadedFiles || []
    })

  } catch (error) {
    console.error('Audit results error:', error)
    res.status(500).json({ 
      error: 'Internal server error: ' + (error as Error).message,
      success: false
    })
  }
}
