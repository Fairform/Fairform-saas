// lib/pocketbook.ts
import axios from 'axios';

const POCKETBOOK_API_URL = process.env.POCKETBOOK_LLM_API_URL || 'http://localhost:8000/generate';
const MAX_RETRIES = 2;
const TIMEOUT = 30000; // 30 seconds

export const callPocketbookLLM = async (
  prompt: string,
  systemPrompt?: string,
  maxTokens: number = 2000
) => {
  let lastError: any;

  for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
    try {
      const response = await axios.post(
        POCKETBOOK_API_URL,
        {
          prompt,
          system_prompt: systemPrompt,
          max_tokens: maxTokens,
          temperature: 0.7,
          top_p: 0.9
        },
        {
          timeout: TIMEOUT,
          headers: {
            'Content-Type': 'application/json',
          }
        }
      );

      if (response.data && response.data.text) {
        return {
          text: response.data.text,
          usage: response.data.usage
        };
      } else {
        throw new Error('Invalid response format from Pocketbook LLM');
      }
    } catch (error) {
      lastError = error;
      console.error(`Pocketbook LLM attempt ${attempt + 1} failed:`, error);
      
      if (attempt < MAX_RETRIES) {
        await new Promise(resolve => setTimeout(resolve, Math.pow(2, attempt) * 1000));
      }
    }
  }

  throw new Error(`Pocketbook LLM failed after ${MAX_RETRIES + 1} attempts: ${lastError.message}`);
};

export const generateDocumentContent = async (
  documentType: string,
  businessInfo: any,
  industry: string
): Promise<string> => {
  const systemPrompt = `You are a legal compliance assistant specializing in Australian business documentation.`;

  const prompt = `
Generate a comprehensive ${documentType} document for a ${industry} business:

Business Name: ${businessInfo.businessName}
ABN: ${businessInfo.abn}
Industry: ${industry}

Generate complete, legally compliant content for Australian businesses.
`;

  const response = await callPocketbookLLM(prompt, systemPrompt, 3000);
  return response.text;
};