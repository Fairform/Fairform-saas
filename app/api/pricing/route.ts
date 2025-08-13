import { NextResponse } from 'next/server'
import { getSubscriptionProductsForPricing } from '../../../lib/stripe'

export async function GET() {
  try {
    const subscriptionPlans = getSubscriptionProductsForPricing()
    return NextResponse.json(subscriptionPlans)
  } catch (error) {
    console.error('Error fetching pricing data:', error)
    return NextResponse.json({ error: 'Failed to fetch pricing data' }, { status: 500 })
  }
}
