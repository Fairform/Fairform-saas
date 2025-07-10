import OpenAI from 'openai'

export const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function generatePolicyDocument(params: {
  businessDetails: any
  industry: string
  compliancePacks: string[]
  customizations?: any
}) {
  const { businessDetails, industry, compliancePacks, customizations } = params

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4-turbo-preview",
      messages: [
        {
          role: "system",
          content: "You are an expert compliance document generator specializing in Australian business regulations. Generate professional, legally sound policy documents."
        },
        {
          role: "user",
          content: `Generate a comprehensive policy document for:
            Business: ${businessDetails.name}
            Industry: ${industry}
            Compliance Areas: ${compliancePacks.join(', ')}
            Customizations: ${JSON.stringify(customizations)}
            
            Include all necessary sections, legal language, and industry-specific requirements.`
        }
      ],
      temperature: 0.7,
      max_tokens: 4000,
    })

    return completion.choices[0].message.content
  } catch (error) {
    console.error('OpenAI generation error:', error)
    throw new Error('Failed to generate document')
  }
}