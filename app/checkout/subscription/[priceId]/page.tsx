'use client'

import { useEffect, useState, Suspense } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'
import { getProductByPriceId, formatPriceForPricing } from '@/lib/stripe'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Loader2 } from 'lucide-react'

function SubscriptionCheckoutContent() {
  const params = useParams()
  const router = useRouter()
  const { user } = useAuth()
  const [loading, setLoading] = useState(false)
  const [product, setProduct] = useState<any>(null)

  const priceId = params?.priceId as string

  useEffect(() => {
    if (!user) {
      router.push(`/(auth)/login?next=/checkout/subscription/${priceId}`)
      return
    }

    const productData = getProductByPriceId(priceId)
    if (!productData) {
      router.push('/pricing')
      return
    }
    setProduct(productData)
  }, [user, priceId, router])

  const handleCheckout = async () => {
    if (!user || !product) return

    setLoading(true)
    try {
      const response = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          priceId: product.priceId,
          userId: user.id,
          customerEmail: user.email,
          metadata: {
            productName: product.name,
            productCategory: product.category
          }
        })
      })

      const { url, error } = await response.json()
      if (error) throw new Error(error)
      
      window.location.href = url
    } catch (error) {
      console.error('Checkout error:', error)
      alert('Failed to start checkout. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (!product) return <div>Loading...</div>

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-2xl mx-auto px-4">
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Subscribe to {product.name}</CardTitle>
            <div className="text-3xl font-bold text-blue-600">
              {formatPriceForPricing(product)}
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <Button 
              onClick={handleCheckout}
              disabled={loading}
              className="w-full"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                'Subscribe Now'
              )}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default function SubscriptionCheckoutPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SubscriptionCheckoutContent />
    </Suspense>
  )
}
