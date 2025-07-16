// lib/pocketbook.ts
import axios from 'axios';
import { BusinessInfo, PocketbookResponse, PocketbookError } from '@/types';

const POCKETBOOK_API_URL = process.env.POCKETBOOK_LLM_API_URL || 'http://localhost:8000/generate';
const MAX_RETRIES = 3;
const TIMEOUT = 45000; // 45 seconds - increased for complex documents
const BASE_DELAY = 1000; // 1 second base delay

// Validate API URL format
const isValidUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

export const callPocketbookLLM = async (
  prompt: string,
  systemPrompt?: string,
  maxTokens: number = 3000
): Promise<PocketbookResponse> => {
  // Validate inputs
  if (!prompt || prompt.trim().length === 0) {
    throw new Error('Prompt cannot be empty');
  }

  if (!isValidUrl(POCKETBOOK_API_URL)) {
    throw new Error('Invalid Pocketbook API URL configuration');
  }

  if (maxTokens < 100 || maxTokens > 8000) {
    throw new Error('Max tokens must be between 100 and 8000');
  }

  let lastError: any;

  for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
    try {
      console.log(`Pocketbook LLM attempt ${attempt + 1}/${MAX_RETRIES + 1}`);
      
      const startTime = Date.now();
      
      const response = await axios.post(
        POCKETBOOK_API_URL,
        {
          prompt: prompt.trim(),
          system_prompt: systemPrompt?.trim() || '',
          max_tokens: maxTokens,
          temperature: 0.7,
          top_p: 0.9,
          frequency_penalty: 0.1,
          presence_penalty: 0.1
        },
        {
          timeout: TIMEOUT,
          headers: {
            'Content-Type': 'application/json',
            'User-Agent': 'Formative-SaaS/1.0',
          },
          validateStatus: (status) => status < 500, // Don't throw on 4xx errors
        }
      );

      const endTime = Date.now();
      console.log(`Pocketbook LLM response time: ${endTime - startTime}ms`);

      // Handle API errors
      if (response.status >= 400) {
        throw new Error(`API returned ${response.status}: ${response.data?.error || 'Unknown error'}`);
      }

      // Validate response structure
      if (!response.data) {
        throw new Error('Empty response from Pocketbook LLM');
      }

      if (!response.data.text || typeof response.data.text !== 'string') {
        throw new Error('Invalid response format: missing or invalid text field');
      }

      if (response.data.text.trim().length === 0) {
        throw new Error('Received empty text from Pocketbook LLM');
      }

      console.log(`Pocketbook LLM success: ${response.data.text.length} characters generated`);

      return {
        text: response.data.text.trim(),
        usage: response.data.usage || {
          prompt_tokens: 0,
          completion_tokens: 0,
          total_tokens: 0
        }
      };

    } catch (error: any) {
      lastError = error;
      
      const errorType = error.code === 'ECONNABORTED' || error.code === 'ETIMEDOUT' 
        ? 'timeout' 
        : error.response?.status >= 400 && error.response?.status < 500
        ? 'api'
        : 'network';
      
      console.error(`Pocketbook LLM attempt ${attempt + 1} failed (${errorType}):`, {
        message: error.message,
        status: error.response?.status,
        code: error.code
      });
      
      // Don't retry on client errors (4xx)
      if (errorType === 'api' && error.response?.status >= 400 && error.response?.status < 500) {
        throw new Error(`API error (${error.response.status}): ${error.response.data?.error || error.message}`);
      }
      
      // Exponential backoff for retries
      if (attempt < MAX_RETRIES) {
        const delay = BASE_DELAY * Math.pow(2, attempt) + Math.random() * 1000;
        console.log(`Retrying in ${delay.toFixed(0)}ms...`);
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
  }

  throw new Error(`Pocketbook LLM failed after ${MAX_RETRIES + 1} attempts. Last error: ${lastError?.message || 'Unknown error'}`);
};

export const generateDocumentContent = async (
  documentType: string,
  businessInfo: BusinessInfo,
  industry: string
): Promise<string> => {
  // Validate inputs
  if (!documentType || !businessInfo || !industry) {
    throw new Error('Missing required parameters for document generation');
  }

  if (!businessInfo.businessName || !businessInfo.abn) {
    throw new Error('Business name and ABN are required');
  }

  const systemPrompt = `You are a professional legal and compliance document generator specializing in Australian business documentation. 

Your expertise includes:
- Australian business regulations and compliance requirements
- Industry-specific standards and best practices
- Legal document structuring and formatting
- Risk management and safety protocols
- Employment law and workplace policies

Generate comprehensive, legally compliant, and professionally structured documents that meet Australian business standards. Use clear, professional language and include all necessary sections, clauses, and compliance requirements.

Always structure documents with proper headings, numbered sections where appropriate, and ensure all content is specific to the Australian business context.`;

  const prompt = `Generate a comprehensive ${documentType} document for an Australian ${industry} business with the following details:

Business Information:
- Business Name: ${businessInfo.businessName}
- ABN: ${businessInfo.abn}
- Industry: ${industry}
${businessInfo.tradingName ? `- Trading Name: ${businessInfo.tradingName}` : ''}
${businessInfo.acn ? `- ACN: ${businessInfo.acn}` : ''}
${businessInfo.address ? `- Address: ${businessInfo.address}` : ''}
${businessInfo.state ? `- State: ${businessInfo.state}` : ''}
${businessInfo.contactPerson ? `- Contact Person: ${businessInfo.contactPerson}` : ''}
${businessInfo.phone ? `- Phone: ${businessInfo.phone}` : ''}
${businessInfo.email ? `- Email: ${businessInfo.email}` : ''}

Document Requirements:
- Document Type: ${documentType}
- Industry Focus: ${industry}
- Jurisdiction: Australia
- Compliance Level: Professional/Commercial

Generate a complete, ready-to-use ${documentType} that includes:
1. All necessary legal and compliance sections
2. Industry-specific requirements for ${industry}
3. Professional formatting with clear headings and structure
4. Specific clauses and provisions relevant to Australian law
5. Practical implementation guidance where appropriate

Ensure the document is:
- Legally compliant with Australian regulations
- Industry-specific and relevant to ${industry} operations
- Professional in tone and structure
- Comprehensive and actionable
- Properly formatted with clear sections and headings

Use markdown formatting for headings (# ## ###) and structure the content professionally.`;

  try {
    console.log(`Generating ${documentType} for ${businessInfo.businessName} in ${industry} industry`);
    
    const response = await callPocketbookLLM(prompt, systemPrompt, 4000);
    
    // Post-process the content to ensure quality
    let processedContent = response.text;
    
    // Ensure document starts with proper title if not already present
    if (!processedContent.includes(documentType) && !processedContent.startsWith('#')) {
      processedContent = `# ${documentType}\n\n${processedContent}`;
    }
    
    // Add business info header if not present
    if (!processedContent.includes(businessInfo.businessName)) {
      processedContent = `# ${documentType}\n\n**Business:** ${businessInfo.businessName}  \n**ABN:** ${businessInfo.abn}  \n**Industry:** ${industry}\n\n---\n\n${processedContent}`;
    }
    
    // Validate content length
    if (processedContent.length < 500) {
      throw new Error('Generated content is too short - may indicate generation failure');
    }
    
    // Log success metrics
    console.log(`Document generation successful: ${processedContent.length} characters, ${processedContent.split('\n').length} lines`);
    
    return processedContent;
    
  } catch (error: any) {
    console.error('Document generation failed:', error.message);
    
    // Provide more specific error context
    if (error.message.includes('timeout')) {
      throw new Error(`Document generation timed out. This may be due to high complexity or API issues. Please try again.`);
    }
    
    if (error.message.includes('API error')) {
      throw new Error(`Document generation service error: ${error.message}`);
    }
    
    throw new Error(`Failed to generate ${documentType}: ${error.message}`);
  }
};

// Helper function to validate document content quality
export const validateDocumentContent = (content: string, documentType: string): boolean => {
  const minLength = 500;
  const requiredSections = ['#', '##']; // Should have some headings
  
  if (content.length < minLength) {
    console.warn(`Document content too short: ${content.length} characters`);
    return false;
  }
  
  const hasHeadings = requiredSections.some(section => content.includes(section));
  if (!hasHeadings) {
    console.warn('Document missing proper heading structure');
    return false;
  }
  
  // Check for common document elements
  const hasStructure = content.includes('\n\n') && content.split('\n').length > 10;
  if (!hasStructure) {
    console.warn('Document appears to lack proper structure');
    return false;
  }
  
  return true;
};

// Helper function to get estimated generation time
export const getEstimatedGenerationTime = (documentType: string, industry: string): number => {
  // Base time in seconds
  let baseTime = 15;
  
  // Adjust based on document complexity
  const complexDocuments = ['employment agreement', 'service agreement', 'privacy policy'];
  if (complexDocuments.some(doc => documentType.toLowerCase().includes(doc))) {
    baseTime += 10;
  }
  
  // Adjust based on industry complexity
  const complexIndustries = ['ndis', 'construction', 'healthcare'];
  if (complexIndustries.some(ind => industry.toLowerCase().includes(ind))) {
    baseTime += 5;
  }
  
  return baseTime;
};
