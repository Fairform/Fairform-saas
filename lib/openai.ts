import OpenAI from 'openai'

export const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function generateComplianceDocument(
  businessName: string,
  industry: string,
  documentType: string,
  additionalRequirements?: string
) {
  const prompt = `
Generate a comprehensive ${documentType} policy document for ${businessName}, a business operating in the ${industry} industry.

Requirements:
- Professional, legal-compliant language
- Industry-specific regulations and standards
- Actionable procedures and guidelines
- Clear responsibility assignments
- Regular review and update procedures
${additionalRequirements ? `- Additional requirements: ${additionalRequirements}` : ''}

The document should be structured with:
1. Purpose and Scope
2. Policy Statement
3. Definitions
4. Responsibilities
5. Procedures
6. Training Requirements
7. Monitoring and Review
8. Non-Compliance Consequences
9. Related Documents
10. Approval and Review History

Format the response as a professional policy document with clear headings and comprehensive content suitable for audit purposes.
`

  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: 'system',
        content: 'You are an expert compliance consultant specializing in creating audit-ready policy documents for various industries. Generate comprehensive, professional documents that meet regulatory standards.'
      },
      {
        role: 'user',
        content: prompt
      }
    ],
    model: 'gpt-4',
    temperature: 0.3,
    max_tokens: 4000,
  })

  return completion.choices[0]?.message?.content || ''
}

export async function generateMultipleDocuments(
  businessName: string,
  industry: string,
  documentTypes: string[],
  additionalRequirements?: string
) {
  const documents = await Promise.all(
    documentTypes.map(async (docType) => {
      const content = await generateComplianceDocument(
        businessName,
        industry,
        docType,
        additionalRequirements
      )
      return {
        type: docType,
        content,
        title: `${docType} Policy - ${businessName}`
      }
    })
  )

  return documents
}

export async function extractPolicyKnowledge(
  documentContent: string,
  fileName: string,
  industry: string,
  businessProfile: any
): Promise<any> {
  const prompt = `
Analyze this uploaded policy document and extract valuable knowledge that can improve future compliance audits and recommendations.

Document: ${fileName}
Industry: ${industry}
Business: ${businessProfile.businessName}
Business Size: ${businessProfile.orgSize || 'Unknown'}
Region: ${businessProfile.region || 'Australia'}

Extract the following types of insights:

1. BEST PRACTICES: Identify excellent policy structures, clauses, or approaches that other businesses could benefit from
2. COMMON GAPS: Note missing elements or weak areas that are frequently problematic in this industry
3. REGULATORY REQUIREMENTS: Identify specific regulatory references, compliance requirements, or legal obligations mentioned
4. EFFECTIVE CLAUSES: Extract well-written policy clauses that demonstrate good compliance practices
5. INDUSTRY PATTERNS: Note industry-specific approaches, terminology, or requirements that are characteristic of this sector

For each insight, provide:
- Type (best_practice, common_gap, regulatory_requirement, effective_clause, industry_pattern)
- Content (the actual insight or knowledge extracted)
- Confidence score (0-100 based on how valuable/reliable this insight is)

Respond in JSON format:
{
  "insights": [
    {
      "insight_type": "best_practice",
      "insight_content": "Detailed description of the best practice identified",
      "confidence_score": 85
    }
  ],
  "summary": "Brief summary of key learnings from this document",
  "analysis_quality": "high|medium|low"
}
`;

  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: 'system',
        content: 'You are an expert compliance consultant who analyzes policy documents to extract valuable knowledge that can improve future compliance audits. Focus on actionable insights that would help other businesses in the same industry improve their compliance posture.'
      },
      {
        role: 'user',
        content: prompt
      }
    ],
    model: 'gpt-4',
    temperature: 0.2,
    max_tokens: 2000,
  });

  const responseText = completion.choices[0]?.message?.content || '';
  
  try {
    const parsed = JSON.parse(responseText);
    return {
      insights: parsed.insights || [],
      summary: parsed.summary || 'Knowledge extraction completed',
      tokensUsed: completion.usage?.total_tokens || 0
    };
  } catch (error) {
    console.warn('Failed to parse OpenAI knowledge extraction response:', error);
    return {
      insights: [],
      summary: 'Knowledge extraction failed to parse',
      tokensUsed: completion.usage?.total_tokens || 0
    };
  }
}
