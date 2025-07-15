import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

export { stripePromise };

export async function createCheckoutSession({
  priceId,
  userId,
  customerEmail,
  coupon,
  metadata = {},
}: {
  priceId: string;
  userId: string;
  customerEmail: string;
  coupon?: string;
  metadata?: Record<string, any>;
}) {
  try {
    const response = await fetch('/api/stripe/checkout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        priceId,
        userId,
        customerEmail,
        coupon,
        metadata,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to create checkout session');
    }

    const { url, sessionId } = await response.json();
    
    return {
      url,
      sessionId,
    };
  } catch (error: any) {
    console.error('Error creating checkout session:', error);
    throw new Error(`Checkout failed: ${error.message}`);
  }
}

export async function redirectToCheckout({
  priceId,
  userId,
  customerEmail,
  coupon,
  metadata = {},
}: {
  priceId: string;
  userId: string;
  customerEmail: string;
  coupon?: string;
  metadata?: Record<string, any>;
}) {
  try {
    const { url } = await createCheckoutSession({
      priceId,
      userId,
      customerEmail,
      coupon,
      metadata,
    });

    window.location.href = url;
  } catch (error: any) {
    console.error('Error redirecting to checkout:', error);
    throw error;
  }
}

export async function getStripe() {
  return await stripePromise;
}
