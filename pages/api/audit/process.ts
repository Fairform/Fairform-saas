import { NextApiRequest, NextApiResponse } from 'next'
import { supabaseAdmin } from '../../../lib/supabase-admin'
import { 
  getComplianceBenchmark, 
  analyzeUploadedFiles, 
  calculateComplianceScore, 
  generateIndustryRecommendations,
  saveAuditResults,
  type AuditFile,
  type BusinessProfile
} from '../../../lib/scoring-engine'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { auditSessionId, sessionToken } = req.body

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

    if (auditSession.status === 'completed') {
      return res.status(200).json({
        success: true,
        message: 'Audit already completed',
        auditSession: {
          id: auditSession.id,
          status: auditSession.status,
          complianceScore: auditSession.compliance_score,
          auditResults: auditSession.audit_results
        }
      })
    }

    await supabaseAdmin
      .from('audit_sessions')
      .update({ status: 'processing' })
      .eq('id', auditSessionId)

    const { data: uploadedFiles, error: filesError } = await supabaseAdmin
      .from('audit_file_uploads')
      .select('*')
      .eq('audit_session_id', auditSessionId)

    if (filesError || !uploadedFiles || uploadedFiles.length === 0) {
      throw new Error('No uploaded files found for audit session')
    }

    const businessProfile: BusinessProfile = {
      businessName: auditSession.business_profiles.business_name,
      industry: auditSession.business_profiles.industry,
      subIndustry: auditSession.business_profiles.sub_industry,
      city: auditSession.business_profiles.city,
      region: auditSession.business_profiles.region,
      orgSize: auditSession.business_profiles.org_size,
      abn: auditSession.business_profiles.abn
    }

    const benchmark = await getComplianceBenchmark(
      businessProfile.industry, 
      businessProfile.subIndustry
    )

    if (!benchmark) {
      throw new Error(`No compliance benchmark found for industry: ${businessProfile.industry}`)
    }

    const auditFiles: AuditFile[] = uploadedFiles.map(file => ({
      id: file.id,
      fileName: file.file_name,
      filePath: file.file_path,
      fileSize: file.file_size,
      mimeType: file.mime_type
    }))

    console.log(`Starting analysis of ${auditFiles.length} files for ${businessProfile.businessName}`)

    const analyzedFiles = await analyzeUploadedFiles(auditFiles, businessProfile)

    const auditResults = calculateComplianceScore(analyzedFiles, benchmark, businessProfile)

    const enhancedRecommendations = generateIndustryRecommendations(
      businessProfile.industry,
      auditResults,
      businessProfile
    )

    const finalAuditResults = {
      ...auditResults,
      recommendations: enhancedRecommendations
    }

    await saveAuditResults(auditSessionId, finalAuditResults, analyzedFiles)

    console.log(`Audit completed for session ${auditSessionId}: ${finalAuditResults.complianceScore}% compliance`)

    res.status(200).json({
      success: true,
      auditSession: {
        id: auditSession.id,
        status: 'completed',
        complianceScore: finalAuditResults.complianceScore,
        auditResults: finalAuditResults
      },
      message: 'Audit processing completed successfully'
    })

  } catch (error) {
    console.error('Audit processing error:', error)

    if (req.body.auditSessionId) {
      await supabaseAdmin
        .from('audit_sessions')
        .update({ 
          status: 'failed',
          metadata: { 
            error: error instanceof Error ? error.message : 'Processing failed',
            failedAt: new Date().toISOString()
          }
        })
        .eq('id', req.body.auditSessionId)
    }

    res.status(500).json({ 
      error: 'Internal server error: ' + (error as Error).message,
      success: false
    })
  }
}
