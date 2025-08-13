import { openai } from '@/lib/openai'

export interface BusinessInfo {
  businessName: string
  firstName: string
  lastName: string
  address: string
  phone: string
  email: string
  abn?: string
  acn?: string
}

export async function generateDocumentContent(
  documentType: string,
  businessInfo: BusinessInfo,
  industry:  string,
): Promise<string> {
  const systemPrompt = 'You are a master business document generator specialized in Australian compliance regulations. You produce detailed, professional documents that meet legal requirements for each industry.';

  const prompt =
    'Generate a ' + documentType + ' for a ' + industry + ' business.\n\n' +
    'Business details:\n' +
    '- Business Name: ' + businessInfo.businessName + '\n' +
    '- Owner Name: ' + businessInfo.firstName + ' ' + businessInfo.lastName + '\n' +
    '- Address: ' + businessInfo.address + '\n' +
    '- Phone: ' + businessInfo.phone + '\n' +
    '- Email: ' + businessInfo.email + '\n' +
    (businessInfo.abn ? '- ABN: ' + businessInfo.abn + '\n' : '') +
    (businessInfo.acn ? '- ACN: ' + businessInfo.acn + '\n' : '') +
    '\nInclude all necessary compliance clauses and tailor the content to the Australian industry standards. Provide comprehensive sections and ensure the document reads professionally.';

  const response = await openai.chat.completions.create({
    model: 'gpt-4o',
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: prompt }
    ],
    max_tokens: 3000,
    temperature: 0.7,
    top_p: 0.9,
  });

  const message = response.choices?.[0]?.message?.content?.trim() || '';
  if (!message || message.length < 500) {
    throw new Error('Generated content is too short');
  }
  return message;
}
