'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'
import { INDUSTRY_PACKS } from '@/lib/catalog'
import { redirectToCheckout } from '@/lib/stripe-client'
import { Check, ArrowLeft } from 'lucide-react'

export default function CheckoutPage() {
  const params = useParams()
  const router = useRouter()
  const { user, loading: authLoading } = useAuth()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  
  const industryId = params?.industryId as string
  const packId = params?.packId as string
  
  const industry = INDUSTRY_PACKS[industryId]
  const pack = industry?.packs.find(p => p.id === packId)

  useEffect(() => {
    if (!authLoading && !user) {
      router.push(`/(auth)/login?next=${encodeURIComponent(`/checkout/${industryId}/${packId}`)}`)
    }
  }, [user, authLoading, router, industryId, packId])

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  if (!industry || !pack) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Pack Not Found</h1>
          <p className="text-gray-600 mb-6">The requested document pack could not be found.</p>
          <button
            onClick={() => router.push('/pricing')}
            className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors"
          >
            View All Packs
          </button>
        </div>
      </div>
    )
  }

  const handleCheckout = async () => {
    if (!user?.email) {
      setError('User email not found. Please try logging in again.')
      return
    }

    setLoading(true)
    setError('')

    try {
      await redirectToCheckout({
        priceId: `price_${packId}` || 'price_placeholder',
        userId: user.id,
        customerEmail: user.email,
        metadata: {
          industryId,
          packId,
          packName: pack.label,
          industryName: industry.label
        }
      })
    } catch (err: any) {
      setError(err.message || 'Failed to start checkout process')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <button
          onClick={() => router.back()}
          className="inline-flex items-center space-x-2 text-gray-600 hover:text-gray-900 mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </button>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {pack.label}
              </h1>
              <p className="text-lg text-gray-600">
                {industry.label} Document Pack
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  What's Included
                </h2>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Check className="w-5 h-5 text-green-600" />
                    <span className="text-gray-700">
                      {pack.includes === 'all' ? 'All industry documents' : 
                       pack.includes === 'all-plus-extras' ? 'All documents + extras' :
                       'Essential documents'}
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Check className="w-5 h-5 text-green-600" />
                    <span className="text-gray-700">
                      Multiple formats: {pack.formats.join(', ').toUpperCase()}
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Check className="w-5 h-5 text-green-600" />
                    <span className="text-gray-700">
                      Customizable templates
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Check className="w-5 h-5 text-green-600" />
                    <span className="text-gray-700">
                      Compliance-ready documents
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Check className="w-5 h-5 text-green-600" />
                    <span className="text-gray-700">
                      Instant download
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 rounded-xl p-6">
                <div className="text-center mb-6">
                  <div className="text-4xl font-bold text-gray-900 mb-2">
                    ${pack.price}
                  </div>
                  <div className="text-gray-600">
                    One-time payment
                  </div>
                </div>

                {error && (
                  <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-red-600 text-sm">{error}</p>
                  </div>
                )}

                <button
                  onClick={handleCheckout}
                  disabled={loading}
                  className="w-full bg-black text-white py-4 px-6 rounded-lg font-semibold hover:bg-gray-800 focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      <span>Processing...</span>
                    </div>
                  ) : (
                    `Purchase ${pack.label} - $${pack.price}`
                  )}
                </button>

                <p className="text-xs text-gray-500 text-center mt-4">
                  Secure payment powered by Stripe
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
