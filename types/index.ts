// types/index.ts
export interface BusinessInfo {
  businessName: string;
  abn: string;
  logoUrl: string;
  selectedIndustry: string;
  compliancePackType: string;
  userId: string;
  email: string;
}

export interface GenerateRequest extends BusinessInfo {
  stripeSessionId: string;
  format: 'docx' | 'pdf';
}

export interface AgentRequest {
  agentId: string;
  userId: string;
  question: string;
  context: {
    industry: string;
    businessName: string;
  };
}

export interface DocumentMetadata {
  id: string;
  userId: string;
  fileName: string;
  filePath: string;
  documentType: string;
  industry: string;
  format: 'docx' | 'pdf';
  createdAt: Date;
  downloadUrl: string;
}

export interface StripeSession {
  id: string;
  sessionId: string;
  userId: string;
  amount: number;
  currency: string;
  status: 'pending' | 'completed' | 'failed';
  productType: string;
  metadata: Record<string, any>;
  createdAt: Date;
}

export interface AgentLog {
  id: string;
  userId: string;
  agentId: string;
  question: string;
  response: string;
  context: Record<string, any>;
  createdAt: Date;
}

export interface TemplateVersion {
  id: string;
  industry: string;
  documentTitle: string;
  version: number;
  filePath: string;
  uploadedBy: string;
  isActive: boolean;
  createdAt: Date;
}

export interface IndustrySchema {
  industry: string;
  documents: string[];
  description: string;
}

export interface Agent {
  id: string;
  name: string;
  description: string;
  systemPrompt: string;
  category: 'compliance' | 'legal' | 'safety' | 'general';
}

export interface PocketbookResponse {
  text: string;
  usage?: {
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
  };
}

export interface GenerateResponse {
  success: boolean;
  documents: DocumentMetadata[];
  message?: string;
  error?: string;
}

export interface AgentResponse {
  success: boolean;
  response: string;
  agentId: string;
  logId: string;
  error?: string;
}