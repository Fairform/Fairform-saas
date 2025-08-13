// types/index.ts

export interface BusinessInfo {
  businessName: string;
  abn: string;
  contactEmail?: string;
  industry?: string;
  address?: string;
  phone?: string;
  email?: string;
  website?: string;
  contactPerson?: string;
  tradingName?: string;
  acn?: string;
  state?: string;
  postcode?: string;
}

export interface GeneratedDocument {
  id: string;
  user_id: string;
  title: string;
  content: string;
  document_type: string;
  industry: string;
  format: 'docx' | 'pdf';
  file_url?: string;
  business_info: BusinessInfo;
  metadata?: Record<string, any>;
  created_at: string;
  updated_at: string;
}

export interface DocumentGenerationRequest {
  userId: string;
  documentType: string;
  industry: string;
  format?: 'docx' | 'pdf';
  businessInfo: BusinessInfo;
}

export interface DocumentGenerationResponse {
  success: boolean;
  document: {
    id: string;
    title: string;
    documentType: string;
    industry: string;
    format: string;
    createdAt: string;
    fileName: string;
    fileSize: number;
  };
  file: {
    data: string; // base64 encoded
    mimeType: string;
    fileName: string;
  };
}

export interface UserAccess {
  id: string;
  user_id: string;
  product_name: string;
  access_type: 'one_time' | 'subscription';
  is_active: boolean;
  granted_at: string;
  expires_at?: string;
  revoked_at?: string;
  metadata?: Record<string, any>;
  updated_at: string;
}

export interface StripeSession {
  id: string;
  session_id: string;
  user_id: string;
  amount: number;
  currency: string;
  status: string;
  product_type: string;
  metadata?: Record<string, any>;
  created_at: string;
  updated_at: string;
}

export interface UserSubscription {
  id: string;
  user_id: string;
  stripe_subscription_id: string;
  stripe_customer_id: string;
  status: string;
  current_period_start: string;
  current_period_end: string;
  cancel_at_period_end: boolean;
  canceled_at?: string;
  product_name: string;
  price_id: string;
  metadata?: Record<string, any>;
  created_at: string;
  updated_at: string;
}

export interface Agent {
  id: string;
  name: string;
  description: string;
  category: 'compliance' | 'legal' | 'safety' | 'general';
  icon: string;
  systemPrompt: string;
}

export interface IndustrySchema {
  industry: string;
  description: string;
  documents: string[];
}

export interface ComplianceBenchmark {
  id: string;
  industry: string;
  subIndustry?: string;
  requiredPolicies: string[];
  scoringCriteria: {
    policy_presence_weight: number;
    content_quality_weight: number;
    compliance_alignment_weight: number;
    document_currency_weight: number;
    minimum_passing_score: number;
  };
  metadata: any;
}

export interface AuditSession {
  id: string;
  sessionToken: string;
  businessProfileId: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  complianceScore?: number;
  auditResults?: AuditResults;
}

export interface AuditResults {
  complianceScore: number;
  missingPolicies: string[];
  outdatedDocuments: Array<{
    fileName: string;
    issue: string;
    recommendation: string;
  }>;
  completedChecks: string[];
  recommendations: string[];
  detailedAnalysis: {
    policyPresenceScore: number;
    contentQualityScore: number;
    complianceAlignmentScore: number;
    documentCurrencyScore: number;
  };
}

export interface AuditFile {
  id: string;
  fileName: string;
  filePath: string;
  fileSize: number;
  mimeType: string;
  analysisResults?: any;
  documentTypeDetected?: string;
  qualityScore?: number;
}

export interface PocketbookResponse {
  text: string;
  usage?: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

export interface PocketbookError {
  message: string;
  type: 'network' | 'api' | 'validation' | 'timeout';
  attempt?: number;
  originalError?: any;
}

// Stripe related types
export interface StripeCheckoutRequest {
  priceId: string;
  userId: string;
  customerEmail: string;
  coupon?: string;
  metadata?: Record<string, any>;
  allowPromotionCodes?: boolean;
}

export interface StripeCheckoutResponse {
  url: string;
  sessionId: string;
}

// Usage tracking
export interface UsageRecord {
  id: string;
  user_id: string;
  action: string;
  metadata?: Record<string, any>;
  created_at: string;
}

// Profile types
export interface UserProfile {
  id: string;
  email: string;
  full_name?: string;
  company?: string;
  avatar_url?: string;
  billing_address?: Record<string, any>;
  payment_method?: Record<string, any>;
  created_at: string;
  updated_at: string;
}

export type Industry = 
  | 'technology' | 'Technology'
  | 'healthcare' | 'Healthcare'
  | 'finance' | 'Finance'
  | 'retail' | 'Retail'
  | 'manufacturing' | 'Manufacturing'
  | 'construction' | 'Construction'
  | 'education' | 'Education'
  | 'hospitality' | 'Hospitality'
  | 'ndis' | 'NDIS'
  | 'general' | 'General'
  | 'Disability Services'
  | 'Aged Care'
  | 'Childcare'
  | 'Professional Services';

export type PolicyType = 
  | 'privacy_policy' | 'Privacy Policy'
  | 'terms_conditions'
  | 'employment_agreement'
  | 'service_agreement'
  | 'safety_policy'
  | 'compliance_policy'
  | 'risk_management' | 'Risk Management'
  | 'incident_management'
  | 'Workplace Health and Safety'
  | 'Code of Conduct'
  | 'Anti-Discrimination'
  | 'Incident Response'
  | 'Data Protection'
  | 'Quality Assurance'
  | 'NDIS Practice Standards'
  | 'Child Safety';

export type Region = 
  | 'australia'
  | 'new_south_wales' | 'NSW'
  | 'victoria' | 'VIC'
  | 'queensland' | 'QLD'
  | 'western_australia' | 'WA'
  | 'south_australia' | 'SA'
  | 'tasmania' | 'TAS'
  | 'northern_territory' | 'NT'
  | 'act' | 'ACT';

export interface AgentResponse {
  success: boolean;
  message: string;
  response: string;
  agentId: string;
  logId: string;
  data?: any;
  error?: string;
}

export interface PolicyInsight {
  id: string;
  industry: string;
  document_type: string;
  insight_type: 'best_practice' | 'common_gap' | 'regulatory_requirement' | 'effective_clause' | 'industry_pattern';
  insight_content: string;
  confidence_score: number;
  source_file_count: number;
  business_size_context?: string;
  region_context: string;
  metadata?: Record<string, any>;
  created_at: string;
  updated_at: string;
}

export interface OpenAIIngestionResult {
  insights: PolicyInsight[];
  summary: string;
  tokensUsed: number;
}
