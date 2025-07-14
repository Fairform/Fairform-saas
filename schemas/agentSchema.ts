// schemas/agentSchema.ts
import { z } from 'zod';

export const agentRequestSchema = z.object({
  agentId: z.string().min(1, 'Agent ID is required'),
  userId: z.string().uuid('Invalid user ID'),
  question: z.string().min(1, 'Question is required').max(1000),
  context: z.object({
    industry: z.string().min(1, 'Industry is required'),
    businessName: z.string().min(1, 'Business name is required')
  })
});

export type AgentRequestValidated = z.infer<typeof agentRequestSchema>;

export const templateUploadSchema = z.object({
  industry: z.enum([
    'construction',
    'ndis',
    'childcare', 
    'cleaning',
    'fitness',
    'beauty',
    'hospitality',
    'health',
    'retail',
    'freelancer',
    'general'
  ]),
  documentTitle: z.string().min(1, 'Document title is required').max(200),
  uploadedBy: z.string().min(1, 'Uploaded by is required')
});

export type TemplateUploadValidated = z.infer<typeof templateUploadSchema>;