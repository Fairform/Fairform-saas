// lib/stripe.ts
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  // @ts-ignore - Using compatible API version
  apiVersion: '2023-10-16',
})

export const verifyStripeSession = async (sessionId: string) => {
  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId)
    
    if (session.payment_status !== 'paid') {
      throw new Error('Payment not completed')
    }

    return {
      id: session.id,
      amount: session.amount_total,
      currency: session.currency,
      customerEmail: session.customer_details?.email,
      metadata: session.metadata
    }
  } catch (error) {
    console.error('Error verifying Stripe session:', error)
    throw error
  }
}

export const createCheckoutSession = async (
  priceId: string,
  userId: string,
  successUrl: string,
  cancelUrl: string,
  metadata: Record<string, string> = {}
) => {
  try {
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: successUrl,
      cancel_url: cancelUrl,
      metadata: {
        userId,
        ...metadata
      },
    })

    return session
  } catch (error) {
    console.error('Error creating checkout session:', error)
    throw error
  }
}

export { stripe }