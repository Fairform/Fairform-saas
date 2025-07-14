// pages/api/agent/list.ts
import { NextApiRequest, NextApiResponse } from 'next';

const agents = [
  {
    id: 'compliance-advisor',
    name: 'Compliance Advisor',
    description: 'Expert guidance on Australian compliance requirements and regulations',
    category: 'compliance',
    icon: '📋'
  },
  {
    id: 'safety-consultant',
    name: 'Safety Consultant',
    description: 'Workplace health and safety guidance and risk assessment',
    category: 'safety',
    icon: '🦺'
  },
  {
    id: 'legal-assistant',
    name: 'Legal Assistant',
    description: 'Legal document review and contract guidance',
    category: 'legal',
    icon: '⚖️'
  },
  {
    id: 'document-auditor',
    name: 'Document Auditor',
    description: 'Review and audit existing compliance documents',
    category: 'compliance',
    icon: '🔍'
  },
  {
    id: 'industry-specialist',
    name: 'Industry Specialist',
    description: 'Industry-specific compliance and operational guidance',
    category: 'general',
    icon: '🏢'
  }
];

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { category } = req.query;

    let filteredAgents = agents;
    
    if (category && typeof category === 'string') {
      filteredAgents = agents.filter(agent => agent.category === category);
    }

    res.status(200).json({
      success: true,
      agents: filteredAgents,
      total: filteredAgents.length,
      categories: ['compliance', 'safety', 'legal', 'general']
    });

  } catch (error) {
    console.error('Agent list API error:', error);
    res.status(500).json({ 
      error: 'Internal server error',
      success: false,
      agents: [],
      total: 0
    });
  }
}