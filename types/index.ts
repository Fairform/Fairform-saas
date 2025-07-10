export interface User {
  id: string
  email: string
  name: string
  company?: string
  role: 'user' | 'admin'
  subscription?: Subscription
  created_at: string
  updated_at: string
}

export interface Subscription {
  id: string
  user_id: string
  stripe_customer_id: string
  stripe_subscription_id: string
  plan: 'starter' | 'professional' | 'enterprise'
  status: 'active' | 'canceled' | 'past_due' | 'trialing'
  current_period_start: string
  current_period_end: string
  cancel_at?: string
  canceled_at?: string
  created_at: string
  updated_at: string
}

export interface Document {
  id: string
  user_id: string
  title: string
  type: string
  content: string
  industry: string
  status: 'generating' | 'completed' | 'failed'
  metadata?: {
    businessName?: string
    compliancePacks?: string[]
    customizations?: any
  }
  created_at: string
  updated_at: string
}

export interface AIAgent {
  id: string
  name: string
  description: string
  icon: string
  status: 'idle' | 'running' | 'completed'
  capabilities: string[]
  performance: {
    accuracy: number
    speed: string
    documents: number
  }
  gradient?: string
}

export interface CompliancePack {
  id: string
  name: string
  description: string
  icon: string
  category: string
  documents: string[]
  features: string[]
  industries: string[]
  popular?: boolean
  gradient: string
}

export interface ApiResponse<T> {
  data?: T
  error?: string
  message?: string
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  pageSize: number
  totalPages: number
}

export interface ToastProps {
  type: 'success' | 'error' | 'info'
  message: string
}

export interface BusinessDetails {
  name: string
  abn: string
  address: string
  phone: string
  email: string
  website?: string
}

export interface PricingPlan {
  id: string
  name: string
  price: number
  priceYearly: number
  features: string[]
  highlighted?: boolean
  cta: string
}