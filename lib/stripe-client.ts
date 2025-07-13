// pages/api/webhooks/stripe.ts
import { NextApiRequest, NextApiResponse } from 'next'
import { stripe } from '../../../lib/stripe'
import { supabaseAdmin } from '../../../lib/supabase-admin'
import { buffer } from 'micro'
import Stripe from 'stripe'

export const config = {
  api: {
    bodyParser: false,
  },
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).end()
  }

  const body = await buffer(req)
  const sig = req.headers['stripe-signature']!

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message)
    return res.status(400).send(`Webhook Error: ${err.message}`)
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session
        await handleCheckoutCompleted(session)
        break
      }
      
      case 'payment_intent.succeeded': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent
        await handlePaymentSucceeded(paymentIntent)
        break
      }
      
      case 'payment_intent.payment_failed': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent
        await handlePaymentFailed(paymentIntent)
        break
      }
      
      default:
        console.log(`Unhandled event type: ${event.type}`)
    }

    res.status(200).json({ received: true })
  } catch (error) {
    console.error('Webhook handler error:', error)
    res.status(500).send(`Webhook Error: ${error.message}`)
  }
}

async function handleCheckoutCompleted(session: Stripe.Checkout.Session) {
  console.log('Checkout completed:', session.id)
  
  try {
    // Update session status in database
    const { error } = await supabaseAdmin
      .from('stripe_sessions')
      .update({
        payment_status: 'paid',
        updated_at: new Date().toISOString(),
      })
      .eq('stripe_session_id', session.id)

    if (error) {
      console.error('Failed to update session status:', error)
    }

    // Log successful payment for analytics
    await supabaseAdmin
      .from('usage_tracking')
      .insert({
        user_id: session.client_reference_id,
        action_type: 'payment_completed',
        date: new Date().toISOString().split('T')[0],
      })
      .select()

  } catch (error) {
    console.error('Error handling checkout completed:', error)
  }
}

async function handlePaymentSucceeded(paymentIntent: Stripe.PaymentIntent) {
  console.log('Payment succeeded:', paymentIntent.id)
  
  try {
    // Find the session related to this payment intent
    const { data: sessions } = await supabaseAdmin
      .from('stripe_sessions')
      .select('*')
      .eq('payment_status', 'paid')
      .order('created_at', { ascending: false })
      .limit(10)

    // Additional success handling can go here
    // e.g., send confirmation emails, trigger document generation, etc.
    
  } catch (error) {
    console.error('Error handling payment succeeded:', error)
  }
}

async function handlePaymentFailed(paymentIntent: Stripe.PaymentIntent) {
  console.log('Payment failed:', paymentIntent.id)
  
  try {
    // Update any related sessions to failed status
    // Note: This might require additional session tracking logic
    
    // Log failed payment for analytics
    if (paymentIntent.metadata?.userId) {
      await supabaseAdmin
        .from('usage_tracking')
        .insert({
          user_id: paymentIntent.metadata.userId,
          action_type: 'payment_failed',
          date: new Date().toISOString().split('T')[0],
        })
    }
    
  } catch (error) {
    console.error('Error handling payment failed:', error)
  }
}