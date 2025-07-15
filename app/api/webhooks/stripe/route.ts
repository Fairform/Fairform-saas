// /api/webhooks/stripe/route.ts

import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { supabase } from '@/lib/supabase'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2022-11-15', // Fixed: Using compatible API version
})

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!

export async function POST(req: NextRequest) {
  try {
    const body = await req.text()
    const sig = req.headers.get('stripe-signature')!

    let event: Stripe.Event

    try {
      event = stripe.webhooks.constructEvent(body, sig, webhookSecret)
    } catch (err: any) {
      console.error(`Webhook signature verification failed:`, err.message)
      return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
    }

    // Handle the event
    switch (event.type) {
      case 'checkout.session.completed':
        await handleCheckoutCompleted(event.data.object as Stripe.Checkout.Session)
        break
      
      case 'payment_intent.succeeded':
        await handlePaymentSucceeded(event.data.object as Stripe.PaymentIntent)
        break
      
      case 'invoice.payment_succeeded':
        await handleSubscriptionPayment(event.data.object as Stripe.Invoice)
        break
      
      case 'customer.subscription.created':
        await handleSubscriptionCreated(event.data.object as Stripe.Subscription)
        break
      
      case 'customer.subscription.updated':
        await handleSubscriptionUpdated(event.data.object as Stripe.Subscription)
        break
      
      case 'customer.subscription.deleted':
        await handleSubscriptionCanceled(event.data.object as Stripe.Subscription)
        break
      
      default:
        console.log(`Unhandled event type: ${event.type}`)
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('Webhook error:', error)
    return NextResponse.json({ error: 'Webhook handler failed' }, { status: 500 })
  }
}

async function handleCheckoutCompleted(session: Stripe.Checkout.Session) {
  try {
    console.log('Processing completed checkout:', session.id)

    // Update the session status in database
    const { error: updateError } = await supabase
      .from('stripe_sessions')
      .update({
        status: 'completed',
        updated_at: new Date().toISOString(),
      })
      .eq('session_id', session.id)

    if (updateError) {
      console.error('Error updating session status:', updateError)
    }

    // For one-time payments, grant immediate access
    if (session.mode === 'payment') {
      await grantProductAccess({
        userId: session.metadata?.userId!,
        productName: session.metadata?.productName!,
        accessType: 'one_time',
        metadata: {
          sessionId: session.id,
          amount: session.amount_total,
          currency: session.currency,
        }
      })
    }

    console.log(`Checkout completed for user ${session.metadata?.userId}`)
  } catch (error) {
    console.error('Error handling checkout completion:', error)
  }
}

async function handlePaymentSucceeded(paymentIntent: Stripe.PaymentIntent) {
  try {
    console.log('Payment succeeded:', paymentIntent.id)
  } catch (error) {
    console.error('Error handling payment success:', error)
  }
}

async function handleSubscriptionPayment(invoice: Stripe.Invoice) {
  try {
    console.log('Subscription payment succeeded:', invoice.id)
    
    if (invoice.subscription && invoice.billing_reason === 'subscription_cycle') {
      // Recurring payment - ensure continued access
      const subscription = await stripe.subscriptions.retrieve(
        invoice.subscription as string,
        { expand: ['items.data.price.product'] }
      )
      
      await grantProductAccess({
        userId: subscription.metadata?.userId!,
        productName: subscription.metadata?.productName!,
        accessType: 'subscription',
        metadata: {
          subscriptionId: subscription.id,
          invoiceId: invoice.id,
          billingReason: invoice.billing_reason,
        }
      })
    }
  } catch (error) {
    console.error('Error handling subscription payment:', error)
  }
}

async function handleSubscriptionCreated(subscription: Stripe.Subscription) {
  try {
    console.log('Subscription created:', subscription.id)
    
    // Get product details
    const lineItem = subscription.items.data[0]
    const product = lineItem.price.product as Stripe.Product
    
    // Create subscription record
    const { error: subError } = await supabase
      .from('user_subscriptions')
      .upsert({
        user_id: subscription.metadata?.userId!,
        stripe_subscription_id: subscription.id,
        stripe_customer_id: subscription.customer as string,
        status: subscription.status,
        current_period_start: new Date(subscription.current_period_start * 1000).toISOString(),
        current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
        cancel_at_period_end: subscription.cancel_at_period_end,
        product_name: product.name,
        price_id: lineItem.price.id,
        metadata: subscription.metadata,
      })

    if (subError) {
      console.error('Error creating subscription record:', subError)
    }
    
    // Grant access when subscription is first created
    await grantProductAccess({
      userId: subscription.metadata?.userId!,
      productName: product.name,
      accessType: 'subscription',
      metadata: {
        subscriptionId: subscription.id,
        priceId: lineItem.price.id,
      }
    })
  } catch (error) {
    console.error('Error handling subscription creation:', error)
  }
}

async function handleSubscriptionUpdated(subscription: Stripe.Subscription) {
  try {
    console.log('Subscription updated:', subscription.id)
    
    // Update subscription record
    const { error: updateError } = await supabase
      .from('user_subscriptions')
      .update({
        status: subscription.status,
        current_period_start: new Date(subscription.current_period_start * 1000).toISOString(),
        current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
        cancel_at_period_end: subscription.cancel_at_period_end,
        canceled_at: subscription.canceled_at ? new Date(subscription.canceled_at * 1000).toISOString() : null,
        updated_at: new Date().toISOString(),
      })
      .eq('stripe_subscription_id', subscription.id)

    if (updateError) {
      console.error('Error updating subscription:', updateError)
    }
    
    // Handle plan changes, downgrades, upgrades
    if (subscription.status === 'active') {
      const lineItem = subscription.items.data[0]
      const product = lineItem.price.product as Stripe.Product
      
      await grantProductAccess({
        userId: subscription.metadata?.userId!,
        productName: product.name,
        accessType: 'subscription',
        metadata: {
          subscriptionId: subscription.id,
          priceId: lineItem.price.id,
        }
      })
    } else if (subscription.status === 'canceled' || subscription.status === 'unpaid') {
      await revokeProductAccess(subscription.metadata?.userId!, 'subscription')
    }
  } catch (error) {
    console.error('Error handling subscription update:', error)
  }
}

async function handleSubscriptionCanceled(subscription: Stripe.Subscription) {
  try {
    console.log('Subscription canceled:', subscription.id)
    
    // Update subscription record
    const { error: updateError } = await supabase
      .from('user_subscriptions')
      .update({
        status: 'canceled',
        canceled_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .eq('stripe_subscription_id', subscription.id)

    if (updateError) {
      console.error('Error updating canceled subscription:', updateError)
    }
    
    await revokeProductAccess(subscription.metadata?.userId!, 'subscription')
  } catch (error) {
    console.error('Error handling subscription cancellation:', error)
  }
}

// Helper function to grant product access
async function grantProductAccess({
  userId,
  productName,
  accessType,
  metadata = {},
  expiresAt = null
}: {
  userId: string
  productName: string
  accessType: 'one_time' | 'subscription'
  metadata?: Record<string, any>
  expiresAt?: string | null
}) {
  try {
    const { error } = await supabase
      .from('user_access')
      .upsert({
        user_id: userId,
        product_name: productName,
        access_type: accessType,
        is_active: true,
        granted_at: new Date().toISOString(),
        expires_at: expiresAt,
        metadata,
      }, {
        onConflict: 'user_id,product_name,access_type'
      })

    if (error) {
      console.error('Error granting product access:', error)
    } else {
      console.log(`Granted ${accessType} access to ${productName} for user ${userId}`)
    }
  } catch (error) {
    console.error('Error in grantProductAccess:', error)
  }
}

// Helper function to revoke product access
async function revokeProductAccess(userId: string, accessType: 'one_time' | 'subscription' | 'all' = 'all') {
  try {
    let query = supabase
      .from('user_access')
      .update({ 
        is_active: false,
        revoked_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })
      .eq('user_id', userId)

    if (accessType !== 'all') {
      query = query.eq('access_type', accessType)
    }

    const { error } = await query

    if (error) {
      console.error('Error revoking product access:', error)
    } else {
      console.log(`Revoked ${accessType} access for user ${userId}`)
    }
  } catch (error) {
    console.error('Error in revokeProductAccess:', error)
  }
}