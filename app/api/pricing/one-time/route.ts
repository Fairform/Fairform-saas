import { NextResponse } from 'next/server'
import { getOneTimeProducts, formatPriceForPricing } from '@/lib/stripe'
import { getDocumentsForPack } from '@/lib/catalog'

export async function GET() {
  try {
    const products = getOneTimeProducts()
    
    const packs = products.map(product => {
      let industryId: string
      let packId: string
      let documents: any[] = []
      
      switch (product.id) {
        case 'lite_pack':
          industryId = 'construction-trades'
          packId = 'lite'
          documents = getDocumentsForPack('construction-trades', 'lite')
          break
        case 'pro_pack':
          industryId = 'construction-trades'
          packId = 'pro'
          documents = getDocumentsForPack('construction-trades', 'pro')
          break
        case 'ndis_full':
          industryId = 'ndis'
          packId = 'ndis-full'
          documents = getDocumentsForPack('ndis', 'ndis-full')
          break
        case 'construction_full':
          industryId = 'construction-trades'
          packId = 'construction-full'
          documents = getDocumentsForPack('construction-trades', 'construction-full')
          break
        default:
          industryId = 'construction-trades'
          packId = 'lite'
          documents = []
      }
      
      return {
        id: product.id,
        name: product.name,
        price: formatPriceForPricing(product),
        description: product.description,
        features: product.features || documents.slice(0, 5).map(doc => doc.title),
        industryId,
        packId,
        priceId: product.priceId,
        documentCount: documents.length,
        formats: product.id.includes('lite') ? ['PDF'] : ['PDF', 'DOCX']
      }
    })

    return NextResponse.json(packs, {
      headers: {
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400'
      }
    })
  } catch (error) {
    console.error('Error fetching one-time packs:', error)
    return NextResponse.json(
      { error: 'Failed to fetch one-time packs' },
      { status: 500 }
    )
  }
}
