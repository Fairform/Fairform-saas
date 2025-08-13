import { NextResponse } from 'next/server'
import { getSubscriptionProductsForPricing } from '../../../lib/stripe'

export async function GET() {
  try {
    const subscriptionPlans = getSubscriptionProductsForPricing()
    return NextResponse.json(subscriptionPlans)
  } catch (error) {
    console.error('Error fetching pricing data:', error)
    
    const fallbackPlans = [
      {
        id: 'starter',
        name: 'Starter',
        description: 'Perfect for small businesses getting started with compliance',
        price: 12900, // $129.00 in cents
        currency: 'aud',
        interval: 'month',
        priceId: 'price_starter_monthly',
        popular: false,
        features: [
          'Up to 3 document generations per month',
          'PDF and DOCX formats',
          'Basic compliance templates',
          'Email support'
        ]
      },
      {
        id: 'pro',
        name: 'Pro',
        description: 'Unlimited document generation for growing businesses',
        price: 17900, // $179.00 in cents
        currency: 'aud',
        interval: 'month',
        priceId: 'price_pro_monthly',
        popular: true,
        features: [
          'Unlimited document generations',
          'PDF and DOCX formats',
          'All compliance templates',
          'Priority email support',
          'Custom branding options'
        ]
      },
      {
        id: 'agency',
        name: 'Agency',
        description: 'Advanced features for agencies and consultants',
        price: 49900, // $499.00 in cents
        currency: 'aud',
        interval: 'month',
        priceId: 'price_agency_monthly',
        popular: false,
        features: [
          'Unlimited document generations',
          'Client pack management',
          'White-label capabilities',
          'Multi-user team access',
          'Phone and email support',
          'Custom integrations'
        ]
      },
      {
        id: 'enterprise',
        name: 'Enterprise',
        description: 'Custom solutions for large organizations',
        price: 0, // Custom pricing
        currency: 'aud',
        interval: 'month',
        priceId: 'price_enterprise_custom',
        popular: false,
        features: [
          'Unlimited document generation',
          'Custom compliance frameworks',
          'Dedicated account manager',
          'API access',
          'Custom training',
          'SLA guarantees'
        ]
      }
    ]
    
    return NextResponse.json(fallbackPlans)
  }
}
