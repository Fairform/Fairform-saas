// lib/access-control.ts
import { supabase } from '@/lib/supabase'

export interface UserAccess {
  id: string
  user_id: string
  product_name: string
  access_type: 'one_time' | 'subscription'
  is_active: boolean
  granted_at: string
  revoked_at?: string
  expires_at?: string
  metadata: Record<string, any>
}

export interface UserSubscription {
  id: string
  user_id: string
  stripe_subscription_id: string
  status: string
  current_period_start: string
  current_period_end: string
  cancel_at_period_end: boolean
  product_name: string
  price_id: string
}

// Check if user has access to a specific product
export async function checkUserAccess(userId: string, productName: string): Promise<boolean> {
  try {
    const { data, error } = await supabase
      .from('user_access')
      .select('*')
      .eq('user_id', userId)
      .eq('product_name', productName)
      .eq('is_active', true)
      .or('expires_at.is.null,expires_at.gt.now()')
      .single()

    if (error && error.code !== 'PGRST116') { // PGRST116 = no rows returned
      console.error('Error checking user access:', error)
      return false
    }

    return !!data
  } catch (error) {
    console.error('Error in checkUserAccess:', error)
    return false
  }
}

// Get all active access for a user
export async function getUserAccess(userId: string): Promise<UserAccess[]> {
  try {
    const { data, error } = await supabase
      .from('user_access')
      .select('*')
      .eq('user_id', userId)
      .eq('is_active', true)
      .or('expires_at.is.null,expires_at.gt.now()')

    if (error) {
      console.error('Error getting user access:', error)
      return []
    }

    return data || []
  } catch (error) {
    console.error('Error in getUserAccess:', error)
    return []
  }
}

// Get user's active subscriptions
export async function getUserSubscriptions(userId: string): Promise<UserSubscription[]> {
  try {
    const { data, error } = await supabase
      .from('user_subscriptions')
      .select('*')
      .eq('user_id', userId)
      .eq('status', 'active')

    if (error) {
      console.error('Error getting user subscriptions:', error)
      return []
    }

    return data || []
  } catch (error) {
    console.error('Error in getUserSubscriptions:', error)
    return []
  }
}

// Check document generation limits for user
export async function checkDocumentGenerationLimit(userId: string): Promise<{
  canGenerate: boolean
  limit: number // -1 for unlimited, 0 for no access, positive number for limit
  used: number
  remaining: number
}> {
  try {
    // Get user's access level
    const access = await getUserAccess(userId)
    
    // Determine limit based on access
    let limit = 0
    
    // Check for unlimited plans (Pro, Agency, or one-time purchases)
    if (access.some(a => 
      a.product_name.includes('Pro') || 
      a.product_name.includes('Agency') ||
      a.access_type === 'one_time'
    )) {
      limit = -1 // Unlimited
    } else if (access.some(a => a.product_name.includes('Starter'))) {
      limit = 3 // Starter plan limit
    }

    // If unlimited, return early
    if (limit === -1) {
      return {
        canGenerate: true,
        limit: -1,
        used: 0,
        remaining: -1
      }
    }

    // If no access, return early
    if (limit === 0) {
      return {
        canGenerate: false,
        limit: 0,
        used: 0,
        remaining: 0
      }
    }

    // Count documents generated this month
    const startOfMonth = new Date()
    startOfMonth.setDate(1)
    startOfMonth.setHours(0, 0, 0, 0)

    const { count, error } = await supabase
      .from('user_documents')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', userId)
      .gte('created_at', startOfMonth.toISOString())
      .is('deleted_at', null)

    if (error) {
      console.error('Error counting documents:', error)
      return {
        canGenerate: false,
        limit,
        used: 0,
        remaining: limit
      }
    }

    const used = count || 0
    const remaining = Math.max(0, limit - used)

    return {
      canGenerate: remaining > 0,
      limit,
      used,
      remaining
    }
  } catch (error) {
    console.error('Error in checkDocumentGenerationLimit:', error)
    return {
      canGenerate: false,
      limit: 0,
      used: 0,
      remaining: 0
    }
  }
}

// Track document generation
export async function trackDocumentGeneration(userId: string, documentId: string): Promise<void> {
  try {
    const { error } = await supabase.rpc('track_document_usage', {
      p_user_id: userId,
      p_document_id: documentId
    })

    if (error) {
      console.error('Error tracking document usage:', error)
    }
  } catch (error) {
    console.error('Error in trackDocumentGeneration:', error)
  }
}

// Track document download - Fixed: Removed supabase.raw usage
export async function trackDocumentDownload(
  userId: string, 
  documentId: string, 
  downloadType: 'initial' | 'redownload' = 'redownload',
  ipAddress?: string,
  userAgent?: string
): Promise<void> {
  try {
    const { error } = await supabase
      .from('user_downloads')
      .insert({
        user_id: userId,
        document_id: documentId,
        download_type: downloadType,
        ip_address: ipAddress,
        user_agent: userAgent
      })

    if (error) {
      console.error('Error tracking download:', error)
    }

    // Fixed: Get current download count and increment it
    const { data: currentDoc, error: fetchError } = await supabase
      .from('user_documents')
      .select('download_count')
      .eq('id', documentId)
      .single()

    if (fetchError) {
      console.error('Error fetching current download count:', fetchError)
      return
    }

    const newCount = (currentDoc?.download_count || 0) + 1

    const { error: updateError } = await supabase
      .from('user_documents')
      .update({
        download_count: newCount
      })
      .eq('id', documentId)

    if (updateError) {
      console.error('Error updating download count:', updateError)
    }
  } catch (error) {
    console.error('Error in trackDocumentDownload:', error)
  }
}

// Get user's document usage statistics
export async function getUserDocumentStats(userId: string): Promise<{
  totalDocuments: number
  monthlyDocuments: number
  totalDownloads: number
  favoriteIndustry: string | null
  mostUsedFormat: 'pdf' | 'docx' | null
}> {
  try {
    // Get total documents
    const { count: totalDocuments } = await supabase
      .from('user_documents')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', userId)
      .is('deleted_at', null)

    // Get monthly documents
    const startOfMonth = new Date()
    startOfMonth.setDate(1)
    startOfMonth.setHours(0, 0, 0, 0)

    const { count: monthlyDocuments } = await supabase
      .from('user_documents')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', userId)
      .gte('created_at', startOfMonth.toISOString())
      .is('deleted_at', null)

    // Get total downloads
    const { count: totalDownloads } = await supabase
      .from('user_downloads')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', userId)

    // Get document details for analysis
    const { data: documents } = await supabase
      .from('user_documents')
      .select('industry, format')
      .eq('user_id', userId)
      .is('deleted_at', null)

    // Analyze favorite industry and format
    let favoriteIndustry: string | null = null
    let mostUsedFormat: 'pdf' | 'docx' | null = null

    if (documents && documents.length > 0) {
      // Count industries
      const industryCount: Record<string, number> = {}
      const formatCount: Record<string, number> = {}

      documents.forEach(doc => {
        industryCount[doc.industry] = (industryCount[doc.industry] || 0) + 1
        formatCount[doc.format] = (formatCount[doc.format] || 0) + 1
      })

      favoriteIndustry = Object.entries(industryCount)
        .sort(([,a], [,b]) => b - a)[0]?.[0] || null

      mostUsedFormat = Object.entries(formatCount)
        .sort(([,a], [,b]) => b - a)[0]?.[0] as 'pdf' | 'docx' || null
    }

    return {
      totalDocuments: totalDocuments || 0,
      monthlyDocuments: monthlyDocuments || 0,
      totalDownloads: totalDownloads || 0,
      favoriteIndustry,
      mostUsedFormat
    }
  } catch (error) {
    console.error('Error in getUserDocumentStats:', error)
    return {
      totalDocuments: 0,
      monthlyDocuments: 0,
      totalDownloads: 0,
      favoriteIndustry: null,
      mostUsedFormat: null
    }
  }
}

// Formative specific product access checks
export const FORMATIVE_PRODUCTS = {
  LITE_PACK: 'Lite Pack',
  PRO_PACK: 'Pro Pack', 
  NDIS_PACK: 'NDIS Full Pack',
  CONSTRUCTION_PACK: 'Construction Compliance Pack',
  STARTER_PLAN: 'Starter Plan',
  PRO_PLAN: 'Pro Plan',
  AGENCY_PLAN: 'Agency Plan'
} as const

export type FormativeProduct = typeof FORMATIVE_PRODUCTS[keyof typeof FORMATIVE_PRODUCTS]

// Check specific Formative product access
export async function checkFormativeAccess(userId: string, product: FormativeProduct): Promise<boolean> {
  return checkUserAccess(userId, product)
}

// Check if user can generate documents (any active access)
export async function canGenerateDocuments(userId: string): Promise<boolean> {
  const access = await getUserAccess(userId)
  return access.length > 0
}

// Check if user has subscription access
export async function hasActiveSubscription(userId: string): Promise<boolean> {
  const subscriptions = await getUserSubscriptions(userId)
  return subscriptions.length > 0
}

// Check if user has access to a specific pack (either through subscription or direct purchase)
export async function checkUserPackAccess(userId: string, industryId: string, packId: string): Promise<boolean> {
  try {
    const subscriptions = await getUserSubscriptions(userId)
    const hasUnlimitedAccess = subscriptions.some(sub => 
      sub.product_name.includes('Pro') || 
      sub.product_name.includes('Agency') ||
      sub.product_name.includes('Enterprise')
    )
    
    if (hasUnlimitedAccess) {
      return true
    }
    
    const packName = `${industryId}-${packId}`
    return await checkUserAccess(userId, packName)
  } catch (error) {
    console.error('Error in checkUserPackAccess:', error)
    return false
  }
}
