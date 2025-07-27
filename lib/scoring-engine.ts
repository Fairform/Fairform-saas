import { supabaseAdmin } from './supabase-admin'
import { callPocketbookLLM } from './pocketbook'

export interface AuditFile {
  id: string
  fileName: string
  filePath: string
  fileSize: number
  mimeType: string
  analysisResults?: any
  documentTypeDetected?: string
  qualityScore?: number
}

export interface ComplianceBenchmark {
  id: string
  industry: string
  subIndustry?: string
  requiredPolicies: string[]
  scoringCriteria: {
    policy_presence_weight: number
    content_quality_weight: number
    compliance_alignment_weight: number
    document_currency_weight: number
    minimum_passing_score: number
  }
  metadata: any
}

export interface AuditResults {
  complianceScore: number
  missingPolicies: string[]
  outdatedDocuments: Array<{
    fileName: string
    issue: string
    recommendation: string
  }>
  completedChecks: string[]
  recommendations: string[]
  detailedAnalysis: {
    policyPresenceScore: number
    contentQualityScore: number
    complianceAlignmentScore: number
    documentCurrencyScore: number
  }
}

export interface BusinessProfile {
  businessName: string
  industry: string
  subIndustry?: string
  city: string
  region?: string
  orgSize?: string
  abn?: string
}

export async function getComplianceBenchmark(industry: string, subIndustry?: string): Promise<ComplianceBenchmark | null> {
  try {
    let query = supabaseAdmin
      .from('compliance_benchmarks')
      .select('*')
      .eq('industry', industry)
      .eq('is_active', true)
      .order('created_at', { ascending: false })

    if (subIndustry) {
      query = query.eq('sub_industry', subIndustry)
    }

    const { data, error } = await query.limit(1).single()

    if (error) {
      console.warn(`No compliance benchmark found for industry: ${industry}`, error)
      console.log('Using fallback compliance benchmark for industry:', industry)
      return getFallbackComplianceBenchmark(industry, subIndustry)
    }

    return {
      id: data.id,
      industry: data.industry,
      subIndustry: data.sub_industry,
      requiredPolicies: data.required_policies || [],
      scoringCriteria: data.scoring_criteria || {
        policy_presence_weight: 40,
        content_quality_weight: 30,
        compliance_alignment_weight: 20,
        document_currency_weight: 10,
        minimum_passing_score: 70
      },
      metadata: data.metadata || {}
    }
  } catch (error) {
    console.error('Error fetching compliance benchmark:', error)
    console.log('Database connectivity failed, using fallback compliance benchmark for industry:', industry)
    return getFallbackComplianceBenchmark(industry, subIndustry)
  }
}

function getFallbackComplianceBenchmark(industry: string, subIndustry?: string): ComplianceBenchmark {
  const fallbackBenchmarks: Record<string, ComplianceBenchmark> = {
    'NDIS': {
      id: 'fallback-ndis',
      industry: 'NDIS',
      subIndustry: subIndustry || 'Disability Support Services',
      requiredPolicies: [
        'NDIS Practice Standards Compliance',
        'Privacy Policy',
        'Work Health & Safety Policy',
        'Code of Conduct',
        'Incident Management Policy',
        'Complaints Management Policy',
        'Risk Management Policy',
        'Quality Management Policy'
      ],
      scoringCriteria: {
        policy_presence_weight: 40,
        content_quality_weight: 30,
        compliance_alignment_weight: 20,
        document_currency_weight: 10,
        minimum_passing_score: 75
      },
      metadata: { fallbackMode: true, industry: 'NDIS' }
    },
    'aged-care': {
      id: 'fallback-aged-care',
      industry: 'aged-care',
      subIndustry: subIndustry || 'Residential Aged Care',
      requiredPolicies: [
        'Aged Care Quality Standards Compliance',
        'Privacy Policy',
        'Work Health & Safety Policy',
        'Clinical Governance Policy',
        'Medication Management Policy',
        'Infection Control Policy',
        'Restraint Policy',
        'Complaints Management Policy'
      ],
      scoringCriteria: {
        policy_presence_weight: 45,
        content_quality_weight: 25,
        compliance_alignment_weight: 20,
        document_currency_weight: 10,
        minimum_passing_score: 80
      },
      metadata: { fallbackMode: true, industry: 'aged-care' }
    },
    'healthcare': {
      id: 'fallback-healthcare',
      industry: 'healthcare',
      subIndustry: subIndustry || 'General Healthcare',
      requiredPolicies: [
        'Clinical Governance Policy',
        'Privacy Policy',
        'Work Health & Safety Policy',
        'Infection Control Policy',
        'Patient Safety Policy',
        'Medical Records Policy',
        'Consent Policy',
        'Complaints Management Policy'
      ],
      scoringCriteria: {
        policy_presence_weight: 40,
        content_quality_weight: 30,
        compliance_alignment_weight: 20,
        document_currency_weight: 10,
        minimum_passing_score: 75
      },
      metadata: { fallbackMode: true, industry: 'healthcare' }
    },
    'construction': {
      id: 'fallback-construction',
      industry: 'construction',
      subIndustry: subIndustry || 'General Construction',
      requiredPolicies: [
        'Work Health & Safety Policy',
        'Environmental Management Policy',
        'Quality Management Policy',
        'Risk Management Policy',
        'Emergency Response Policy',
        'Training and Competency Policy',
        'Subcontractor Management Policy',
        'Incident Reporting Policy'
      ],
      scoringCriteria: {
        policy_presence_weight: 50,
        content_quality_weight: 25,
        compliance_alignment_weight: 15,
        document_currency_weight: 10,
        minimum_passing_score: 70
      },
      metadata: { fallbackMode: true, industry: 'construction' }
    },
    'childcare': {
      id: 'fallback-childcare',
      industry: 'childcare',
      subIndustry: subIndustry || 'Early Childhood Education',
      requiredPolicies: [
        'Child Protection Policy',
        'Privacy Policy',
        'Work Health & Safety Policy',
        'Behaviour Guidance Policy',
        'Nutrition and Food Safety Policy',
        'Sleep and Rest Policy',
        'Excursion Policy',
        'Emergency Management Policy'
      ],
      scoringCriteria: {
        policy_presence_weight: 45,
        content_quality_weight: 25,
        compliance_alignment_weight: 20,
        document_currency_weight: 10,
        minimum_passing_score: 80
      },
      metadata: { fallbackMode: true, industry: 'childcare' }
    }
  }

  const benchmark = fallbackBenchmarks[industry.toLowerCase()] || fallbackBenchmarks['NDIS']
  
  console.log(`Using fallback benchmark for ${industry}:`, benchmark.requiredPolicies.length, 'required policies')
  
  return benchmark
}

export async function analyzeUploadedFiles(files: AuditFile[], businessProfile: BusinessProfile): Promise<AuditFile[]> {
  const analyzedFiles: AuditFile[] = []

  for (const file of files) {
    try {
      console.log(`Analyzing file: ${file.fileName}`)

      const analysisPrompt = `Analyze this uploaded business document and provide a structured assessment:

File: ${file.fileName}
Business: ${businessProfile.businessName}
Industry: ${businessProfile.industry}
${businessProfile.subIndustry ? `Sub-industry: ${businessProfile.subIndustry}` : ''}

Please analyze and provide:

1. DOCUMENT TYPE DETECTION:
   - What type of policy/document is this?
   - Primary category (e.g., "Privacy Policy", "Work Health & Safety Policy", "Code of Conduct")

2. CONTENT QUALITY ASSESSMENT (Score 0-100):
   - Completeness of content
   - Professional structure and formatting
   - Clarity and readability
   - Specific industry relevance

3. COMPLIANCE ANALYSIS:
   - Australian regulatory compliance level
   - Industry-specific requirements coverage
   - Missing critical sections or clauses
   - Outdated language or references

4. CURRENCY CHECK:
   - Evidence of recent updates
   - References to current legislation
   - Modern terminology usage
   - Date indicators

5. SPECIFIC ISSUES IDENTIFIED:
   - List specific gaps or problems
   - Outdated references or terminology
   - Missing mandatory sections
   - Compliance risks

Provide response in this JSON format:
{
  "documentType": "detected document type",
  "qualityScore": 85,
  "complianceLevel": "high|medium|low",
  "currencyStatus": "current|outdated|unknown",
  "issues": ["issue 1", "issue 2"],
  "strengths": ["strength 1", "strength 2"],
  "recommendations": ["recommendation 1", "recommendation 2"]
}`

      const systemPrompt = `You are an expert Australian business compliance auditor specializing in ${businessProfile.industry} industry documentation. Analyze uploaded documents for compliance gaps, quality issues, and regulatory alignment. Provide detailed, actionable feedback that helps businesses understand their compliance readiness.`

      const response = await callPocketbookLLM(analysisPrompt, systemPrompt, 2000)
      
      let analysisResults: any = {}
      try {
        const jsonMatch = response.text.match(/\{[\s\S]*\}/)
        if (jsonMatch) {
          analysisResults = JSON.parse(jsonMatch[0])
        } else {
          analysisResults = {
            documentType: 'Unknown Document',
            qualityScore: 50,
            complianceLevel: 'medium',
            currencyStatus: 'unknown',
            issues: ['Unable to parse detailed analysis'],
            strengths: [],
            recommendations: ['Manual review recommended'],
            rawAnalysis: response.text
          }
        }
      } catch (parseError) {
        console.warn('Failed to parse LLM analysis as JSON:', parseError)
        analysisResults = {
          documentType: 'Unknown Document',
          qualityScore: 50,
          complianceLevel: 'medium',
          currencyStatus: 'unknown',
          issues: ['Analysis parsing failed'],
          strengths: [],
          recommendations: ['Manual review recommended'],
          rawAnalysis: response.text
        }
      }

      analyzedFiles.push({
        ...file,
        analysisResults,
        documentTypeDetected: analysisResults.documentType || 'Unknown Document',
        qualityScore: analysisResults.qualityScore || 50
      })

      console.log(`Analysis completed for ${file.fileName}: ${analysisResults.documentType} (Quality: ${analysisResults.qualityScore})`)

    } catch (error) {
      console.error(`Failed to analyze file ${file.fileName}:`, error)
      
      analyzedFiles.push({
        ...file,
        analysisResults: {
          error: error instanceof Error ? error.message : 'Analysis failed',
          documentType: 'Analysis Failed',
          qualityScore: 0
        },
        documentTypeDetected: 'Analysis Failed',
        qualityScore: 0
      })
    }
  }

  return analyzedFiles
}

export function calculateComplianceScore(
  analyzedFiles: AuditFile[],
  benchmark: ComplianceBenchmark,
  businessProfile: BusinessProfile
): AuditResults {
  const { requiredPolicies, scoringCriteria } = benchmark
  
  const detectedPolicyTypes = analyzedFiles
    .map(f => f.documentTypeDetected || '')
    .filter(type => type && type !== 'Unknown Document' && type !== 'Analysis Failed')

  const missingPolicies = requiredPolicies.filter(required => {
    return !detectedPolicyTypes.some(detected => 
      detected.toLowerCase().includes(required.toLowerCase()) ||
      required.toLowerCase().includes(detected.toLowerCase())
    )
  })

  const presentPolicies = requiredPolicies.filter(required => 
    !missingPolicies.includes(required)
  )

  const policyPresenceScore = Math.round(
    (presentPolicies.length / requiredPolicies.length) * 100
  )

  const qualityScores = analyzedFiles
    .map(f => f.qualityScore || 0)
    .filter(score => score > 0)

  const contentQualityScore = qualityScores.length > 0
    ? Math.round(qualityScores.reduce((sum, score) => sum + score, 0) / qualityScores.length)
    : 0

  const highComplianceFiles = analyzedFiles.filter(f => 
    f.analysisResults?.complianceLevel === 'high'
  ).length

  const complianceAlignmentScore = analyzedFiles.length > 0
    ? Math.round((highComplianceFiles / analyzedFiles.length) * 100)
    : 0

  const currentFiles = analyzedFiles.filter(f => 
    f.analysisResults?.currencyStatus === 'current'
  ).length

  const documentCurrencyScore = analyzedFiles.length > 0
    ? Math.round((currentFiles / analyzedFiles.length) * 100)
    : 0

  const weights = scoringCriteria
  const complianceScore = Math.round(
    (policyPresenceScore * weights.policy_presence_weight / 100) +
    (contentQualityScore * weights.content_quality_weight / 100) +
    (complianceAlignmentScore * weights.compliance_alignment_weight / 100) +
    (documentCurrencyScore * weights.document_currency_weight / 100)
  )

  const recommendations: string[] = []
  
  if (policyPresenceScore < 80) {
    recommendations.push(`Add missing critical policies: ${missingPolicies.slice(0, 3).join(', ')}${missingPolicies.length > 3 ? ' and others' : ''}`)
  }
  
  if (contentQualityScore < 70) {
    recommendations.push('Improve document structure and content quality with professional formatting')
  }
  
  if (complianceAlignmentScore < 70) {
    recommendations.push(`Update policies to align with current ${businessProfile.industry} industry standards`)
  }
  
  if (documentCurrencyScore < 60) {
    recommendations.push('Review and update outdated policies with current legislation references')
  }

  if (complianceScore < weights.minimum_passing_score) {
    recommendations.push('Consider professional compliance review before implementation')
  }

  const outdatedDocuments = analyzedFiles
    .filter(f => f.analysisResults?.currencyStatus === 'outdated' || 
                 (f.analysisResults?.issues && f.analysisResults.issues.length > 0))
    .map(f => ({
      fileName: f.fileName,
      issue: f.analysisResults?.currencyStatus === 'outdated' 
        ? 'Document appears outdated' 
        : f.analysisResults?.issues?.[0] || 'Quality issues detected',
      recommendation: f.analysisResults?.recommendations?.[0] || 'Review and update document'
    }))

  const completedChecks = presentPolicies.map(policy => `${policy} ✓`)

  return {
    complianceScore,
    missingPolicies,
    outdatedDocuments,
    completedChecks,
    recommendations,
    detailedAnalysis: {
      policyPresenceScore,
      contentQualityScore,
      complianceAlignmentScore,
      documentCurrencyScore
    }
  }
}

export function generateIndustryRecommendations(
  industry: string,
  auditResults: AuditResults,
  businessProfile: BusinessProfile
): string[] {
  const baseRecommendations = [...auditResults.recommendations]
  
  switch (industry.toLowerCase()) {
    case 'ndis':
      if (auditResults.missingPolicies.includes('NDIS Practice Standards Compliance')) {
        baseRecommendations.push('Implement NDIS Practice Standards compliance framework for registration requirements')
      }
      if (auditResults.complianceScore < 80) {
        baseRecommendations.push('Ensure all policies align with NDIS Quality and Safeguards Commission requirements')
      }
      break

    case 'aged-care':
      if (auditResults.missingPolicies.includes('Aged Care Quality Standards Compliance')) {
        baseRecommendations.push('Develop Aged Care Quality Standards compliance documentation')
      }
      if (auditResults.complianceScore < 85) {
        baseRecommendations.push('Review policies against Aged Care Quality and Safety Commission standards')
      }
      break

    case 'healthcare':
      if (auditResults.missingPolicies.includes('Clinical Governance Policy')) {
        baseRecommendations.push('Establish clinical governance framework for healthcare service delivery')
      }
      break

    case 'construction':
      if (auditResults.missingPolicies.includes('Work Health & Safety Policy')) {
        baseRecommendations.push('Prioritize WHS policy development - critical for construction industry compliance')
      }
      break

    case 'childcare':
      if (auditResults.missingPolicies.includes('Child Protection Policy')) {
        baseRecommendations.push('Child Protection Policy is mandatory - implement immediately for regulatory compliance')
      }
      break
  }

  if (businessProfile.region) {
    baseRecommendations.push(`Ensure all policies comply with ${businessProfile.region} state-specific regulations`)
  }

  return baseRecommendations.slice(0, 8)
}

export async function saveAuditResults(
  auditSessionId: string,
  auditResults: AuditResults,
  analyzedFiles: AuditFile[]
): Promise<void> {
  try {
    const { error: sessionError } = await supabaseAdmin
      .from('audit_sessions')
      .update({
        status: 'completed',
        compliance_score: auditResults.complianceScore,
        audit_results: auditResults,
        recommendations: auditResults.recommendations,
        missing_policies: auditResults.missingPolicies,
        outdated_documents: auditResults.outdatedDocuments,
        completed_checks: auditResults.completedChecks,
        completed_at: new Date().toISOString(),
        processed_files: analyzedFiles.length
      })
      .eq('id', auditSessionId)

    if (sessionError) {
      throw new Error(`Failed to update audit session: ${sessionError.message}`)
    }

    for (const file of analyzedFiles) {
      const { error: fileError } = await supabaseAdmin
        .from('audit_file_uploads')
        .update({
          analysis_status: 'completed',
          analysis_results: file.analysisResults,
          document_type_detected: file.documentTypeDetected,
          quality_score: file.qualityScore
        })
        .eq('id', file.id)

      if (fileError) {
        console.error(`Failed to update file analysis for ${file.fileName}:`, fileError)
      }
    }

    console.log(`Audit results saved successfully for session ${auditSessionId}`)

  } catch (error) {
    console.error('Error saving audit results:', error)
    throw error
  }
}
