import { NextRequest, NextResponse } from 'next/server'
import { checkDocumentGenerationLimit, getUserAccess, getUserSubscriptions } from '@/lib/access-control'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')

    if (!userId) {
      return NextResponse.json(
        { error: 'Missing userId parameter' },
        { status: 400 }
      )
    }

    const [limitCheck, userAccess, subscriptions] = await Promise.all([
      checkDocumentGenerationLimit(userId),
      getUserAccess(userId),
      getUserSubscriptions(userId)
    ])

    const purchasedPacks = userAccess.map(access => {
      const [industryId, packId] = access.product_name.split('-')
      return { industryId, packId }
    })

    return NextResponse.json({
      canGenerate: limitCheck.canGenerate,
      limit: limitCheck.limit,
      used: limitCheck.used,
      remaining: limitCheck.remaining,
      purchasedPacks,
      activeSubscriptions: subscriptions.map(sub => ({
        productName: sub.product_name,
        status: sub.status
      }))
    }, {
      headers: {
        'Cache-Control': 'private, no-cache, no-store, must-revalidate'
      }
    })
  } catch (error) {
    console.error('Subscription status error:', error)
    return NextResponse.json(
      { error: 'Failed to check subscription status' },
      { status: 500 }
    )
  }
}
