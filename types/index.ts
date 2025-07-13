import { User as SupabaseUser } from '@supabase/supabase-js'

// Re-export Supabase User type
export type User = SupabaseUser

// Application-specific types
export interface Profile {
  id: string
  email: string
  full_name?: string
  company?: string
  avatar_url?: string
  billing_address?: any
  payment_method?: any
  created_at: string
  updated_at: string
}

export interface Product {
  id: string
  active?: boolean
  name?: string
  description?: string
  image?: string
  metadata?: Record<string, any>
  prices?: Price[]
}

export interface Price {
  id: string
  product_id?: string
  active?: boolean
  description?: string
  unit_amount?: number
  currency?: string
  type?: 'one_time' | 'recurring'
  interval?: 'month' | 'year'
  interval_count?: number
  trial_period_days?: number
  metadata?: Record<string, any>
}

export interface Subscription {
  id: string
  user_id: string
  status?: string
  metadata?: Record<string, any>
  price_id?: string
  quantity?: number
  cancel_at_period_end?: boolean
  created: string
  current_period_start: string
  current_period_end: string
  ended_at?: string
  cancel_at?: string
  canceled_at?: string
  trial_start?: string
  trial_end?: string
  prices?: {
    products?: Product
  }
}

export interface UsageRecord {
  id: string
  user_id: string
  action: string
  metadata?: Record<string, any>
  created_at: string
}

export interface GeneratedDocument {
  id: string
  user_id: string
  title: string
  content?: string
  document_type?: string
  industry?: string
  metadata?: Record<string, any>
  created_at: string
  updated_at: string
}

// Pricing page specific types
export interface PricingPlan {
  id: string
  name: string
  description: string
  price: Price
  features: string[]
  popular?: boolean
  cta: string
}

// API Response types
export interface ApiResponse<T = any> {
  data?: T
  error?: string
  message?: string
}

// Form types
export interface SignUpForm {
  email: string
  password: string
  full_name?: string
  company?: string
}

export interface SignInForm {
  email: string
  password: string
}

export interface ProfileForm {
  full_name?: string
  company?: string
  avatar_url?: string
}

// Component prop types
export interface PricingCardProps {
  plan: PricingPlan
  currentPlan?: string
  onSubscribe: (priceId: string) => void
  loading?: boolean
}

export interface AuthFormProps {
  mode: 'signin' | 'signup'
  onSubmit: (data: SignInForm | SignUpForm) => void
  loading?: boolean
  error?: string
}

// Utility types
export type SubscriptionStatus = 
  | 'incomplete' 
  | 'incomplete_expired' 
  | 'trialing' 
  | 'active' 
  | 'past_due' 
  | 'canceled' 
  | 'unpaid'

export type DocumentType = 
  | 'ndis_policy' 
  | 'whs_policy' 
  | 'childcare_policy' 
  | 'healthcare_policy'
  | 'custom_policy'

export type Industry = 
  | 'ndis' 
  | 'construction' 
  | 'childcare' 
  | 'healthcare' 
  | 'education'
  | 'other'