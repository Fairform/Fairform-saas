import { NextResponse } from 'next/server'
import { getSubscriptionProducts, formatPriceForPricing } from '@/lib/stripe'

export async function GET() {
  try {
    const products = getSubscriptionProducts()
    
    const plans = products.map(product => ({
      id: product.id,
      name: product.name,
      price: formatPriceForPricing(product),
      description: product.description,
      features: product.features,
      popular: product.id === 'pro_plan',
      priceId: product.priceId
    }))

    return NextResponse.json(plans, {
      headers: {
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400'
      }
    })
  } catch (error) {
    console.error('Error fetching subscription plans:', error)
    return NextResponse.json(
      { error: 'Failed to fetch subscription plans' },
      { status: 500 }
    )
  }
}
