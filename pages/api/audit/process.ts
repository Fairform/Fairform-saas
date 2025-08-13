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

    const isFallbackSession = auditSessionId.startsWith('fallback-profile-') || sessionToken === auditSessionId

    let auditSession
    let businessProfile: BusinessProfile

    if (isFallbackSession) {
      console.log('Processing fallback audit session:', auditSessionId)
      
      auditSession = {
        id: auditSessionId,
        session_token: sessionToken,
        status: 'processing',
        uploaded_files: [{
          id: 'fallback-file-1',
          fileName: 'test-policy.pdf',
          fileSize: 1024,
          uploadedAt: new Date().toISOString()
        }],
        total_files: 1,
        processed_files: 0,
        metadata: {
          fallbackMode: true,
          startedAt: new Date().toISOString()
        }
      }

      businessProfile = {
        businessName: 'Test Business',
        industry: 'NDIS',
        subIndustry: 'Disability Support Services',
        city: 'Melbourne',
        region: 'Victoria',
        orgSize: 'Small (1-50 employees)',
        abn: '12345678901'
      }
    } else {
      const { data: dbSession, error: sessionError } = await supabaseAdmin
        .from('audit_sessions')
        .select(`
          *,
          business_profiles (*)
        `)
        .eq('id', auditSessionId)
        .eq('session_token', sessionToken)
        .single()

      if (sessionError || !dbSession) {
        return res.status(404).json({ error: 'Audit session not found or invalid token' })
      }

      auditSession = dbSession
      businessProfile = {
        businessName: auditSession.business_profiles.business_name,
        industry: auditSession.business_profiles.industry,
        subIndustry: auditSession.business_profiles.sub_industry,
        city: auditSession.business_profiles.city,
        region: auditSession.business_profiles.region,
        orgSize: auditSession.business_profiles.org_size,
        abn: auditSession.business_profiles.abn
      }
    }

    if (!isFallbackSession && auditSession.status === 'completed') {
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

    let uploadedFiles = []
    
    if (isFallbackSession) {
      uploadedFiles = [{
        id: 'fallback-file-1',
        file_name: 'test-policy.pdf',
        file_path: 'audit_uploads/fallback/test-policy.pdf',
        file_size: 1024,
        mime_type: 'application/pdf'
      }]
      console.log('Using fallback uploaded files for processing')
    } else {
      await supabaseAdmin
        .from('audit_sessions')
        .update({ status: 'processing' })
        .eq('id', auditSessionId)

      const { data: dbFiles, error: filesError } = await supabaseAdmin
        .from('audit_file_uploads')
        .select('*')
        .eq('audit_session_id', auditSessionId)

      if (filesError || !dbFiles || dbFiles.length === 0) {
        throw new Error('No uploaded files found for audit session')
      }
      
      uploadedFiles = dbFiles
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

    const auditResults = await calculateComplianceScore(analyzedFiles, benchmark, businessProfile)

    const enhancedRecommendations = generateIndustryRecommendations(
      businessProfile.industry,
      auditResults,
      businessProfile
    )

    const finalAuditResults = {
      ...auditResults,
      recommendations: enhancedRecommendations
    }

    if (!isFallbackSession) {
      await saveAuditResults(auditSessionId, finalAuditResults, analyzedFiles)
    } else {
      console.log('Skipping database save for fallback session')
    }

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

    const isFallbackSession = req.body.auditSessionId?.startsWith('fallback-profile-') || req.body.sessionToken === req.body.auditSessionId

    if (req.body.auditSessionId && !isFallbackSession) {
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
    } else if (isFallbackSession) {
      console.log('Skipping database error update for fallback session')
    }

    res.status(500).json({ 
      error: 'Internal server error: ' + (error as Error).message,
      success: false
    })
  }
}
