// lib/stripe.ts
import Stripe from 'stripe';
import { getServiceRoleClient } from '@/lib/supabase';

// Initialize Stripe with your secret key
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2022-11-15',
  typescript: true,
});

const supabase = getServiceRoleClient();

// ================================
// STRIPE PRODUCTS CONFIGURATION
// ================================

export interface StripeProduct {
  id: string;
  name: string;
  description: string;
  price: number; // in cents
  currency: string;
  type: 'one_time' | 'recurring';
  interval?: 'month' | 'year';
  priceId: string; // Stripe Price ID - fill these in from your Stripe dashboard
  features: string[];
  popular?: boolean;
  category: 'lite' | 'pro' | 'ndis' | 'construction' | 'starter' | 'agency';
}

export const STRIPE_PRODUCTS: Record<string, StripeProduct> = {
  // ONE-TIME PURCHASES
  lite_pack: {
    id: 'lite_pack',
    name: 'Lite Pack',
    description: 'Essential compliance documents for small businesses',
    price: 7900, // $79 in cents
    currency: 'aud',
    type: 'one_time',
    priceId: 'price_1RlBbGPxQ5QMKmITp7UhoGQp', // Replace with actual Stripe Price ID
    category: 'lite',
    features: [
      'Basic compliance templates',
      'Employment agreements',
      'Privacy policy template',
      'Terms & conditions',
      'Basic workplace policies',
      'PDF & DOCX formats',
      'Email support'
    ]
  },

  pro_pack: {
    id: 'pro_pack',
    name: 'Pro Pack',
    description: 'Comprehensive compliance suite for growing businesses',
    price: 18900, // $189 in cents
    currency: 'aud',
    type: 'one_time',
    priceId: 'price_1RlBfFPxQ5QMKmITcZuIxr0g', // Replace with actual Stripe Price ID
    category: 'pro',
    popular: true,
    features: [
      'All Lite Pack features',
      'Advanced compliance templates',
      'Industry-specific policies',
      'Risk management templates',
      'HR policy suite',
      'Customer agreements',
      'Supplier agreements',
      'Priority email support'
    ]
  },

  ndis_full_pack: {
    id: 'ndis_full_pack',
    name: 'NDIS Full Pack',
    description: 'Complete NDIS compliance documentation suite',
    price: 49900, // $499 in cents
    currency: 'aud',
    type: 'one_time',
    priceId: 'price_1RlBgpPxQ5QMKmITotDVChes', // Replace with actual Stripe Price ID
    category: 'ndis',
    features: [
      'NDIS-specific service agreements',
      'Incident management policies',
      'Risk management framework',
      'Complaints handling procedures',
      'Participant rights & privacy',
      'Worker screening protocols',
      'Emergency response plans',
      'Staff training materials',
      'Audit-ready documentation',
      'Phone support included'
    ]
  },

  construction_pack: {
    id: 'construction_pack',
    name: 'Construction Pack',
    description: 'Specialized compliance for construction & trades',
    price: 34900, // $349 in cents
    currency: 'aud',
    type: 'one_time',
    priceId: 'price_1RlBiLPxQ5QMKmITIrR6FqgI', // Replace with actual Stripe Price ID
    category: 'construction',
    features: [
      'SWMS templates',
      'JSA (Job Safety Analysis)',
      'Hazard registers',
      'PPE checklists',
      'Toolbox talk templates',
      'Equipment maintenance logs',
      'Incident report forms',
      'Emergency response plans',
      'Contractor agreements',
      'WHS procedures'
    ]
  },

  // MONTHLY SUBSCRIPTIONS
  starter_monthly: {
    id: 'starter_monthly',
    name: 'Starter',
    description: 'Monthly access to essential compliance tools',
    price: 12900, // $129 in cents
    currency: 'aud',
    type: 'recurring',
    interval: 'month',
    priceId: 'price_1RlBtmPxQ5QMKmITcu0AWAWy', // Replace with actual Stripe Price ID
    category: 'starter',
    features: [
      'Generate up to 10 documents/month',
      'Basic compliance templates',
      'Industry-specific customization',
      'PDF & DOCX downloads',
      'Email support',
      'Regular template updates',
      'Cancel anytime'
    ]
  },

  pro_monthly: {
    id: 'pro_monthly',
    name: 'Pro',
    description: 'Advanced monthly compliance solution',
    price: 17900, // $179 in cents
    currency: 'aud',
    type: 'recurring',
    interval: 'month',
    priceId: 'price_1RlBufPxQ5QMKmITg9EUdIVl', // Replace with actual Stripe Price ID
    category: 'pro',
    popular: true,
    features: [
      'Generate up to 50 documents/month',
      'All compliance templates',
      'Priority customization',
      'Advanced industry templates',
      'Risk assessment tools',
      'Priority email support',
      'Template customization requests',
      'Quarterly compliance updates'
    ]
  },

  agency_monthly: {
    id: 'agency_monthly',
    name: 'Agency',
    description: 'Enterprise solution for agencies and consultants',
    price: 49900, // $499 in cents
    currency: 'aud',
    type: 'recurring',
    interval: 'month',
    priceId: 'price_1RlBvpPxQ5QMKmITN1Aj4t2W', // Replace with actual Stripe Price ID
    category: 'agency',
    features: [
      'Unlimited document generation',
      'White-label capabilities',
      'Custom branding options',
      'Multi-client management',
      'API access',
      'Bulk document generation',
      'Priority phone & email support',
      'Custom template development',
      'Dedicated account manager'
    ]
  }
};

// Helper functions for products
export function getProductById(productId: string): StripeProduct | null {
  return STRIPE_PRODUCTS[productId] || null;
}

export function getOneTimeProducts(): StripeProduct[] {
  return Object.values(STRIPE_PRODUCTS).filter(product => product.type === 'one_time');
}

export function getSubscriptionProducts(): StripeProduct[] {
  return Object.values(STRIPE_PRODUCTS).filter(product => product.type === 'recurring');
}

export function getProductsByCategory(category: string): StripeProduct[] {
  return Object.values(STRIPE_PRODUCTS).filter(product => product.category === category);
}

export function getPopularProducts(): StripeProduct[] {
  return Object.values(STRIPE_PRODUCTS).filter(product => product.popular === true);
}

export function formatPrice(product: StripeProduct): string {
  const price = new Intl.NumberFormat('en-AU', {
    style: 'currency',
    currency: product.currency.toUpperCase(),
  }).format(product.price / 100);

  if (product.type === 'recurring') {
    return `${price}/${product.interval}`;
  }
  return price;
}

// Validate if a price ID exists in our products
export function isValidPriceId(priceId: string): boolean {
  return Object.values(STRIPE_PRODUCTS).some(product => product.priceId === priceId);
}

// Get product by Stripe price ID
export function getProductByPriceId(priceId: string): StripeProduct | null {
  return Object.values(STRIPE_PRODUCTS).find(product => product.priceId === priceId) || null;
}

// ================================
// EXISTING STRIPE FUNCTIONS
// ================================

// Types for better type safety
export interface CreateCheckoutSessionParams {
  priceId: string;
  userId: string;
  customerEmail: string;
  successUrl?: string;
  cancelUrl?: string;
  coupon?: string;
  metadata?: Record<string, string>;
  allowPromotionCodes?: boolean;
}

export interface StripeSessionData {
  sessionId: string;
  userId: string;
  amount: number;
  currency: string;
  status: string;
  productType: string;
  metadata?: Record<string, any>;
}

// Create Stripe checkout session
export async function createCheckoutSession({
  priceId,
  userId,
  customerEmail,
  successUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
  cancelUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/pricing`,
  coupon,
  metadata = {},
  allowPromotionCodes = true,
}: CreateCheckoutSessionParams) {
  try {
    // Validate that the price ID exists in our products
    if (!isValidPriceId(priceId)) {
      throw new Error('Invalid price ID - product not found in catalog');
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(customerEmail)) {
      throw new Error('Invalid email format');
    }

    // Get our product information
    const product = getProductByPriceId(priceId);
    if (!product) {
      throw new Error('Product not found');
    }

    // Get price details from Stripe to verify
    const stripePrice = await stripe.prices.retrieve(priceId, {
      expand: ['product']
    });

    const mode = product.type === 'recurring' ? 'subscription' : 'payment';

    // Create checkout session parameters
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
      success_url: successUrl,
      cancel_url: cancelUrl,
      allow_promotion_codes: allowPromotionCodes,
      metadata: {
        userId,
        priceId,
        productId: product.id,
        productName: product.name,
        productCategory: product.category,
        mode,
        source: 'fairform_website',
        ...metadata,
      },
    };

    // Add coupon if provided
    if (coupon) {
      sessionParams.discounts = [{ coupon }];
    }

    // Add subscription-specific configuration
    if (mode === 'subscription') {
      sessionParams.subscription_data = {
        metadata: {
          userId,
          priceId,
          productId: product.id,
          productName: product.name,
          productCategory: product.category,
          ...metadata,
        }
      };
    }

    // Create the session
    const session = await stripe.checkout.sessions.create(sessionParams);

    // Log session creation to database
    await logStripeSession({
      sessionId: session.id,
      userId,
      amount: product.price,
      currency: product.currency,
      status: 'pending',
      productType: product.name,
      metadata: {
        mode,
        priceId,
        productId: product.id,
        productCategory: product.category,
        customerEmail,
        ...metadata,
      },
    });

    return {
      url: session.url,
      sessionId: session.id,
      product: product,
    };

  } catch (error: any) {
    console.error('[STRIPE_CHECKOUT_ERROR]', error);
    throw new Error(`Failed to create checkout session: ${error.message}`);
  }
}

// Log Stripe session to database
export async function logStripeSession(sessionData: StripeSessionData) {
  try {
    const { error } = await supabase
      .from('stripe_sessions')
      .insert({
        session_id: sessionData.sessionId,
        user_id: sessionData.userId,
        amount: sessionData.amount,
        currency: sessionData.currency,
        status: sessionData.status,
        product_type: sessionData.productType,
        metadata: sessionData.metadata,
      });

    if (error) {
      console.error('[SUPABASE_LOG_ERROR]', error);
    }
  } catch (error) {
    console.error('[SESSION_LOG_ERROR]', error);
  }
}

// Update session status
export async function updateSessionStatus(sessionId: string, status: string) {
  try {
    const { error } = await supabase
      .from('stripe_sessions')
      .update({
        status,
        updated_at: new Date().toISOString(),
      })
      .eq('session_id', sessionId);

    if (error) {
      console.error('[SESSION_UPDATE_ERROR]', error);
    }
  } catch (error) {
    console.error('[SESSION_UPDATE_ERROR]', error);
  }
}

// Grant product access to user
export async function grantProductAccess({
  userId,
  productName,
  accessType,
  metadata = {},
  expiresAt = null
}: {
  userId: string;
  productName: string;
  accessType: 'one_time' | 'subscription';
  metadata?: Record<string, any>;
  expiresAt?: string | null;
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
      });

    if (error) {
      console.error('Error granting product access:', error);
    } else {
      console.log(`Granted ${accessType} access to ${productName} for user ${userId}`);
    }
  } catch (error) {
    console.error('Error in grantProductAccess:', error);
  }
}

// Revoke product access
export async function revokeProductAccess(
  userId: string, 
  accessType: 'one_time' | 'subscription' | 'all' = 'all'
) {
  try {
    let query = supabase
      .from('user_access')
      .update({ 
        is_active: false,
        revoked_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })
      .eq('user_id', userId);

    if (accessType !== 'all') {
      query = query.eq('access_type', accessType);
    }

    const { error } = await query;

    if (error) {
      console.error('Error revoking product access:', error);
    } else {
      console.log(`Revoked ${accessType} access for user ${userId}`);
    }
  } catch (error) {
    console.error('Error in revokeProductAccess:', error);
  }
}

// Create or update subscription record
export async function createSubscriptionRecord({
  userId,
  stripeSubscriptionId,
  stripeCustomerId,
  status,
  currentPeriodStart,
  currentPeriodEnd,
  cancelAtPeriodEnd,
  productName,
  priceId,
  metadata = {}
}: {
  userId: string;
  stripeSubscriptionId: string;
  stripeCustomerId: string;
  status: string;
  currentPeriodStart: Date;
  currentPeriodEnd: Date;
  cancelAtPeriodEnd: boolean;
  productName: string;
  priceId: string;
  metadata?: Record<string, any>;
}) {
  try {
    const { error } = await supabase
      .from('user_subscriptions')
      .upsert({
        user_id: userId,
        stripe_subscription_id: stripeSubscriptionId,
        stripe_customer_id: stripeCustomerId,
        status,
        current_period_start: currentPeriodStart.toISOString(),
        current_period_end: currentPeriodEnd.toISOString(),
        cancel_at_period_end: cancelAtPeriodEnd,
        product_name: productName,
        price_id: priceId,
        metadata,
      }, {
        onConflict: 'stripe_subscription_id'
      });

    if (error) {
      console.error('Error creating subscription record:', error);
    }
  } catch (error) {
    console.error('Error in createSubscriptionRecord:', error);
  }
}

// Update subscription record
export async function updateSubscriptionRecord(
  stripeSubscriptionId: string,
  updates: Partial<{
    status: string;
    currentPeriodStart: Date;
    currentPeriodEnd: Date;
    cancelAtPeriodEnd: boolean;
    canceledAt: Date | null;
  }>
) {
  try {
    const updateData: any = {};

    if (updates.status) updateData.status = updates.status;
    if (updates.currentPeriodStart) updateData.current_period_start = updates.currentPeriodStart.toISOString();
    if (updates.currentPeriodEnd) updateData.current_period_end = updates.currentPeriodEnd.toISOString();
    if (updates.cancelAtPeriodEnd !== undefined) updateData.cancel_at_period_end = updates.cancelAtPeriodEnd;
    if (updates.canceledAt !== undefined) updateData.canceled_at = updates.canceledAt?.toISOString() || null;
    
    updateData.updated_at = new Date().toISOString();

    const { error } = await supabase
      .from('user_subscriptions')
      .update(updateData)
      .eq('stripe_subscription_id', stripeSubscriptionId);

    if (error) {
      console.error('Error updating subscription:', error);
    }
  } catch (error) {
    console.error('Error in updateSubscriptionRecord:', error);
  }
}

// Check if user has access to a product
export async function checkUserAccess(userId: string, productName?: string): Promise<boolean> {
  try {
    let query = supabase
      .from('user_access')
      .select('*')
      .eq('user_id', userId)
      .eq('is_active', true);

    if (productName) {
      query = query.eq('product_name', productName);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Error checking user access:', error);
      return false;
    }

    return data && data.length > 0;
  } catch (error) {
    console.error('Error in checkUserAccess:', error);
    return false;
  }
}

// Get user's active subscriptions
export async function getUserSubscriptions(userId: string) {
  try {
    const { data, error } = await supabase
      .from('user_subscriptions')
      .select('*')
      .eq('user_id', userId)
      .eq('status', 'active');

    if (error) {
      console.error('Error getting user subscriptions:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('Error in getUserSubscriptions:', error);
    return [];
  }
}

// Retrieve Stripe session details
export async function getStripeSession(sessionId: string) {
  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    return session;
  } catch (error) {
    console.error('Error retrieving Stripe session:', error);
    throw error;
  }
}

// Construct and verify webhook event
export function constructWebhookEvent(body: string, signature: string): Stripe.Event {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;
  
  try {
    return stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (error: any) {
    console.error('Webhook signature verification failed:', error.message);
    throw new Error('Invalid webhook signature');
  }
}

// Get price information
export async function getPriceInfo(priceId: string) {
  try {
    const price = await stripe.prices.retrieve(priceId, {
      expand: ['product']
    });
    return price;
  } catch (error) {
    console.error('Error retrieving price:', error);
    throw error;
  }
}

// Get customer information
export async function getCustomerInfo(customerId: string) {
  try {
    const customer = await stripe.customers.retrieve(customerId);
    return customer;
  } catch (error) {
    console.error('Error retrieving customer:', error);
    throw error;
  }
}

// Create Stripe customer
export async function createStripeCustomer(email: string, name?: string) {
  try {
    const customer = await stripe.customers.create({
      email,
      name,
    });
    return customer;
  } catch (error) {
    console.error('Error creating Stripe customer:', error);
    throw error;
  }
}

// Utility function to format currency
export function formatCurrency(amount: number, currency: string = 'AUD'): string {
  return new Intl.NumberFormat('en-AU', {
    style: 'currency',
    currency: currency.toUpperCase(),
  }).format(amount / 100); // Stripe amounts are in cents
}

// Utility function to get product name from metadata
export function getProductNameFromSession(session: Stripe.Checkout.Session): string {
  return session.metadata?.productName || 'Unknown Product';
}

// Utility function to check if session is for subscription
export function isSubscriptionSession(session: Stripe.Checkout.Session): boolean {
  return session.mode === 'subscription';
}