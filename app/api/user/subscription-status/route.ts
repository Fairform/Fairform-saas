import { NextRequest, NextResponse } from 'next/server'
import { checkDocumentGenerationLimit } from '@/lib/access-control'

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

    const limitCheck = await checkDocumentGenerationLimit(userId)

    return NextResponse.json({
      canGenerate: limitCheck.canGenerate,
      limit: limitCheck.limit,
      used: limitCheck.used,
      remaining: limitCheck.remaining
    })
  } catch (error) {
    console.error('Subscription status error:', error)
    return NextResponse.json(
      { error: 'Failed to check subscription status' },
      { status: 500 }
    )
  }
}
