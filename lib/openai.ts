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