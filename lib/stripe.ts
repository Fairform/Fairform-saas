import Stripe from 'stripe'
import { loadStripe } from '@stripe/stripe-js'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!) // ✅ removed apiVersion

export const getStripe = () => {
  return loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)
}

export const PRICING_PLANS = {
  starter: {
    id: 'starter',
    name: 'Starter Pack',
    price: 199,
    description: 'Essential compliance documents for getting started',
    features: [
      '10 Industry-specific policies',
      'Professional document formatting',
      'Logo and branding integration',
      'DOCX and PDF downloads',
      'Email support'
    ],
    stripePriceId: 'price_starter_pack'
  },
  pro: {
    id: 'pro',
    name: 'Pro Plan',
    price: 119,
    interval: 'month' as const,
    description: 'Complete compliance solution for growing businesses',
    features: [
      'Unlimited document generation',
      'All industry templates',
      'Priority AI processing',
      'Custom branding',
      'Document version control',
      'Priority support',
      'Compliance updates'
    ],
    popular: true,
    stripePriceId: 'price_pro_monthly'
  },
  enterprise: {
    id: 'enterprise',
    name: 'Enterprise',
    price: 149,
    interval: 'month' as const,
    description: 'Advanced features for large organizations',
    features: [
      'Everything in Pro',
      'Multi-location support',
      'Advanced customization',
      'API access',
      'Dedicated account manager',
      'Custom integrations',
      'SLA guarantee'
    ],
    stripePriceId: 'price_enterprise_monthly'
  }
} as const

export async function createCheckoutSession(
  priceId: string,
  userId: string,
  successUrl: string,
  cancelUrl: string
) {
  const session = await stripe.checkout.sessions.create({
    customer_email: undefined,
    metadata: {
      userId,
    },
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    mode: priceId.includes('monthly') ? 'subscription' : 'payment',
    success_url: successUrl,
    cancel_url: cancelUrl,
  })

  return session
}

