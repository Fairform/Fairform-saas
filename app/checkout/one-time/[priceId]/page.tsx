'use client'

import { useEffect, useState, Suspense } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'
import { getProductByPriceId, formatPriceForPricing } from '@/lib/stripe'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Loader2, Check } from 'lucide-react'

function OneTimeCheckoutContent() {
  const params = useParams()
  const router = useRouter()
  const { user } = useAuth()
  const [loading, setLoading] = useState(false)
  const [product, setProduct] = useState<any>(null)

  const priceId = params?.priceId as string

  useEffect(() => {
    if (!user) {
      router.push(`/login?next=/checkout/one-time/${priceId}`)
      return
    }

    const productData = getProductByPriceId(priceId)
    if (!productData || productData.type !== 'one_time') {
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
            productCategory: product.category,
            productType: 'one_time'
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
            <CardTitle className="text-2xl">Purchase {product.name}</CardTitle>
            <div className="text-3xl font-bold text-green-600">
              {formatPriceForPricing(product)}
            </div>
            <p className="text-gray-600 mt-2">{product.description}</p>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">What's included:</h3>
              <ul className="space-y-2">
                {product.features.map((feature: string, index: number) => (
                  <li key={index} className="flex items-center space-x-2">
                    <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                    <span className="text-sm text-gray-600">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-medium text-blue-900 mb-2">One-time purchase benefits:</h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Lifetime access to purchased documents</li>
                <li>• Unlimited document generation</li>
                <li>• No recurring fees</li>
                <li>• Future template updates included</li>
              </ul>
            </div>
            
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
                'Purchase Now'
              )}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default function OneTimeCheckoutPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <OneTimeCheckoutContent />
    </Suspense>
  )
}
