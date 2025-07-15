// pages/api/agent/ask.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { z } from 'zod';
import { callPocketbookLLM } from '@/lib/pocketbook';
import { supabaseAdmin } from '@/lib/supabase-admin';
import { AgentResponse } from '@/types';

const agentRequestSchema = z.object({
  agentId: z.string().min(1, 'Agent ID is required'),
  userId: z.string().uuid('Invalid user ID'),
  question: z.string().min(1, 'Question is required').max(1000),
  context: z.object({
    industry: z.string().min(1, 'Industry is required'),
    businessName: z.string().min(1, 'Business name is required')
  })
});

// Agent configurations
const agents = {
  'compliance-advisor': {
    name: 'Compliance Advisor',
    systemPrompt: 'You are a compliance advisor specializing in Australian business regulations. Provide accurate, practical advice on compliance requirements, regulations, and best practices for Australian businesses.'
  },
  'safety-consultant': {
    name: 'Safety Consultant', 
    systemPrompt: 'You are a workplace health and safety consultant with expertise in Australian WHS regulations. Provide practical safety advice, risk assessment guidance, and help businesses create safer workplaces.'
  },
  'legal-assistant': {
    name: 'Legal Assistant',
    systemPrompt: 'You are a legal assistant with knowledge of Australian business law. Help with contract review, legal document guidance, and general legal advice for small businesses. Always recommend consulting with a qualified lawyer for specific legal matters.'
  },
  'document-auditor': {
    name: 'Document Auditor',
    systemPrompt: 'You are a document auditor specializing in compliance documentation. Review documents for completeness, accuracy, and compliance with Australian regulations. Provide specific recommendations for improvements.'
  },
  'industry-specialist': {
    name: 'Industry Specialist',
    systemPrompt: 'You are an industry specialist with expertise across various Australian business sectors. Provide industry-specific advice on compliance, operations, and best practices tailored to the specific industry context.'
  }
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<AgentResponse>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      message: 'Method not allowed',
      response: '',
      agentId: '',
      logId: '',
      error: 'Method not allowed'
    });
  }

  try {
    // Validate input
    const validatedData = agentRequestSchema.parse(req.body);
    
    // Get agent configuration
    const agent = agents[validatedData.agentId as keyof typeof agents];
    if (!agent) {
      return res.status(400).json({
        success: false,
        message: 'Invalid agent ID',
        response: '',
        agentId: validatedData.agentId,
        logId: '',
        error: 'Invalid agent ID'
      });
    }

    // Build context-aware prompt
    const contextPrompt = `
Business Context:
- Business Name: ${validatedData.context.businessName}
- Industry: ${validatedData.context.industry}

User Question: ${validatedData.question}

Please provide a helpful and accurate response based on your expertise as a ${agent.name}.
Focus on Australian regulations and business practices.
`;

    // Call Pocketbook LLM
    const llmResponse = await callPocketbookLLM(
      contextPrompt,
      agent.systemPrompt,
      1500
    );

    // Save interaction log
    const { data: logEntry, error: logError } = await supabaseAdmin
      .from('agent_logs')
      .insert({
        user_id: validatedData.userId,
        agent_id: validatedData.agentId,
        question: validatedData.question,
        response: llmResponse.text,
        context: validatedData.context
      })
      .select()
      .single();

    if (logError) {
      console.error('Error saving agent log:', logError);
    }

    res.status(200).json({
      success: true,
      message: 'Response generated successfully',
      response: llmResponse.text,
      agentId: validatedData.agentId,
      logId: logEntry?.id || ''
    });

  } catch (error) {
    console.error('Agent ask API error:', error);
    
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        success: false,
        message: 'Invalid request data',
        response: '',
        agentId: '',
        logId: '',
        error: 'Invalid request data: ' + error.issues.map((e: any) => e.message).join(', ')
      });
    }

    res.status(500).json({
      success: false,
      message: 'Internal server error',
      response: '',
      agentId: '',
      logId: '',
      error: 'Internal server error'
    });
  }
}
