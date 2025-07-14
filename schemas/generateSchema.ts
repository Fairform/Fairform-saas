// schemas/generateSchema.ts
import { z } from 'zod';

export const generateSchema = z.object({
  stripeSessionId: z.string().min(1, 'Stripe session ID is required'),
  businessName: z.string().min(1, 'Business name is required').max(100),
  abn: z.string().min(9, 'ABN must be at least 9 characters').max(15),
  logoUrl: z.string().url('Invalid logo URL').optional().or(z.literal('')),
  selectedIndustry: z.enum([
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
  compliancePackType: z.enum(['lite', 'pro', 'ndis-full']),
  userId: z.string().uuid('Invalid user ID'),
  format: z.enum(['docx', 'pdf']),
  email: z.string().email('Invalid email address')
});

export type GenerateRequestValidated = z.infer<typeof generateSchema>;