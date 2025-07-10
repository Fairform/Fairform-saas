import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
  typescript: true,
})

export const getStripeJs = async () => {
  const { loadStripe } = await import('@stripe/stripe-js')
  return loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)
}

export const PLANS = {
  starter: {
    name: 'Starter',
    priceMonthly: 4900, // $49 in cents
    priceYearly: 49000, // $490 in cents
    stripePriceIdMonthly: process.env.STRIPE_STARTER_MONTHLY_PRICE_ID!,
    stripePriceIdYearly: process.env.STRIPE_STARTER_YEARLY_PRICE_ID!,
  },
  professional: {
    name: 'Professional',
    priceMonthly: 14900, // $149 in cents
    priceYearly: 149000, // $1490 in cents
    stripePriceIdMonthly: process.env.STRIPE_PROFESSIONAL_MONTHLY_PRICE_ID!,
    stripePriceIdYearly: process.env.STRIPE_PROFESSIONAL_YEARLY_PRICE_ID!,
  },
  enterprise: {
    name: 'Enterprise',
    priceMonthly: null, // Custom pricing
    priceYearly: null,
    stripePriceIdMonthly: null,
    stripePriceIdYearly: null,
  },
}