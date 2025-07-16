// /api/stripe/checkout/route.ts

import { NextResponse } from 'next/server'
import Stripe from 'stripe'
import { supabase } from '@/lib/supabase'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_placeholder', {
  apiVersion: '2022-11-15',
})

export async function POST(req: Request) {
  try {
    if (!process.env.STRIPE_SECRET_KEY || process.env.STRIPE_SECRET_KEY.includes('placeholder')) {
      return NextResponse.json({ 
        error: 'Stripe not configured',
        details: 'Please configure STRIPE_SECRET_KEY in environment variables' 
      }, { status: 500 })
    }
    const body = await req.json()
    const {
      priceId,
      userId,
      customerEmail,
      coupon, // Optional coupon ID
      metadata = {},
      allowPromotionCodes = true,
    } = body

    // Validation
    if (!priceId || !userId || !customerEmail) {
      return NextResponse.json({ 
        error: 'Missing required fields',
        details: 'priceId, userId, and customerEmail are required' 
      }, { status: 400 })
    }

    // Validate price ID format (should start with 'price_' and not be a placeholder)
    if (!priceId.startsWith('price_') || priceId.includes('placeholder') || priceId.includes('_pack') || priceId.includes('_monthly')) {
      return NextResponse.json({ 
        error: 'Invalid pricing configuration',
        details: 'This pricing plan is not yet configured. Please contact support or try again later.' 
      }, { status: 400 })
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(customerEmail)) {
      return NextResponse.json({ 
        error: 'Invalid email format' 
      }, { status: 400 })
    }

    // Get price details to determine mode and product info
    const price = await stripe.prices.retrieve(priceId, {
      expand: ['product']
    })

    const product = price.product as Stripe.Product
    const mode = price.type === 'recurring' ? 'subscription' : 'payment'

    // Create checkout session
    const sessionParams: Stripe.Checkout.SessionCreateParams = {
      mode,
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      customer_email: customerEmail,
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/pricing`,
      allow_promotion_codes: allowPromotionCodes,
      metadata: {
        userId,
        priceId,
        productName: product.name,
        mode,
        source: 'formative_website',
        ...metadata,
      },
    }

    // Add coupon if provided
    if (coupon) {
      sessionParams.discounts = [{ coupon }]
    }

    // Add subscription-specific configuration
    if (mode === 'subscription') {
      sessionParams.subscription_data = {
        metadata: {
          userId,
          priceId,
          productName: product.name,
          ...metadata,
        }
      }
    }

    const session = await stripe.checkout.sessions.create(sessionParams)

    // Log session creation to Supabase (before payment completion)
    const { error: dbError } = await supabase.from('stripe_sessions').insert({
      session_id: session.id,
      user_id: userId,
      amount: price.unit_amount,
      currency: price.currency,
      status: 'pending',
      product_type: product.name,
      metadata: {
        mode,
        priceId,
        customerEmail,
        ...metadata,
      },
    })

    if (dbError) {
      console.error('[SUPABASE_LOG_ERROR]', dbError)
      // Don't fail the request if logging fails
    }

    // Return the checkout URL for redirection
    return NextResponse.json({ 
      url: session.url,
      sessionId: session.id 
    })

  } catch (error: any) {
    console.error('[STRIPE_CHECKOUT_ERROR]', error)
    
    // Handle specific Stripe errors
    if (error.type === 'StripeCardError') {
      return NextResponse.json({ 
        error: 'Card error',
        details: error.message 
      }, { status: 400 })
    }
    
    if (error.type === 'StripeInvalidRequestError') {
      return NextResponse.json({ 
        error: 'Invalid request',
        details: error.message 
      }, { status: 400 })
    }

    return NextResponse.json({ 
      error: 'Internal Server Error',
      details: process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'
    }, { status: 500 })
  }
}
