import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-AU', {
    style: 'currency',
    currency: 'AUD',
  }).format(price)
}

export function formatDate(date: string): string {
  return new Intl.DateTimeFormat('en-AU', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(date))
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export function generateDocumentId(): string {
  return Math.random().toString(36).substr(2, 9)
}

export const INDUSTRIES = [
  'NDIS (Disability Services)',
  'Construction & Building',
  'Childcare & Early Learning',
  'Healthcare & Medical',
  'Aged Care',
  'Education & Training',
  'Food & Hospitality',
  'Manufacturing',
  'Retail',
  'Professional Services',
  'Real Estate',
  'Transport & Logistics',
  'Security Services',
  'Cleaning Services',
  'IT & Technology',
  'Financial Services',
  'Legal Services',
  'Marketing & Advertising',
  'Fitness & Recreation',
  'Beauty & Personal Care',
  'Other'
] as const

export const DOCUMENT_TYPES = [
  'Work Health & Safety Policy',
  'Privacy Policy',
  'Quality Management Policy',
  'Environmental Policy',
  'Code of Conduct',
  'Anti-Discrimination Policy',
  'Complaint Handling Procedure',
  'Risk Management Policy',
  'Training & Development Policy',
  'Emergency Response Procedure',
  'Data Security Policy',
  'Financial Management Policy',
  'Human Resources Policy',
  'Customer Service Policy',
  'Incident Reporting Procedure'
] as const

export type Industry = typeof INDUSTRIES[number]
export type DocumentType = typeof DOCUMENT_TYPES[number]