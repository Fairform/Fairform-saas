'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Check, FileText, Download } from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'

interface PricingPlan {
  id: string
  name: string
  price: string
  description: string
  features: string[]
  popular?: boolean
  priceId: string
}

interface OneTimePack {
  id: string
  name: string
  price: string
  description: string
  features: string[]
  industryId: string
  packId: string
  priceId: string
  documentCount: number
  formats: string[]
}

export default function PricingPage() {
  const { user } = useAuth()
  const [pricingMode, setPricingMode] = useState<'subscription' | 'one_time'>('subscription')
  const [subscriptionPlans, setSubscriptionPlans] = useState<PricingPlan[]>([])
  const [oneTimePacks, setOneTimePacks] = useState<OneTimePack[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPricingData = async () => {
      try {
        const [subscriptionsRes, packsRes] = await Promise.all([
          fetch('/api/pricing/subscriptions'),
          fetch('/api/pricing/one-time')
        ])
        
        if (subscriptionsRes.ok) {
          const subscriptions = await subscriptionsRes.json()
          setSubscriptionPlans(subscriptions)
        }
        
        if (packsRes.ok) {
          const packs = await packsRes.json()
          setOneTimePacks(packs)
        }
      } catch (error) {
        console.error('Error fetching pricing data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchPricingData()
  }, [])

  const handlePlanSelect = (priceId: string, isSubscription: boolean) => {
    const nextPath = isSubscription 
      ? `/checkout/subscription/${priceId}`
      : `/checkout/one-time/${priceId}`
    
    if (!user) {
      window.location.href = `/login?next=${encodeURIComponent(nextPath)}`
    } else {
      window.location.href = nextPath
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Choose Your Plan</h1>
            <p className="text-xl text-gray-600">
              Generate professional compliance documents with flexible pricing options.
            </p>
          </div>
          <div className="flex justify-center items-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
            <span className="ml-2 text-gray-600">Loading pricing plans...</span>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Choose Your Plan</h1>
          <p className="text-xl text-gray-600 mb-8">
            Generate professional compliance documents with flexible pricing options.
          </p>
          
          <div className="inline-flex bg-white rounded-lg p-1 border border-gray-200">
            <button
              onClick={() => setPricingMode('subscription')}
              className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${
                pricingMode === 'subscription'
                  ? 'bg-gray-900 text-white'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Subscription Plans
            </button>
            <button
              onClick={() => setPricingMode('one_time')}
              className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${
                pricingMode === 'one_time'
                  ? 'bg-gray-900 text-white'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              One-Time Packs
            </button>
          </div>
        </div>

        {pricingMode === 'subscription' ? (
          <>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              {subscriptionPlans.map((plan) => (
                <Card key={plan.id} className={`relative ${plan.popular ? 'ring-2 ring-blue-500' : ''}`}>
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                        Most Popular
                      </span>
                    </div>
                  )}
                  <CardHeader className="text-center">
                    <CardTitle className="text-xl">{plan.name}</CardTitle>
                    <div className="text-3xl font-bold text-blue-600">{plan.price}</div>
                    <CardDescription>{plan.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <ul className="space-y-2">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="flex items-center space-x-2">
                          <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                          <span className="text-sm text-gray-600">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button 
                      onClick={() => handlePlanSelect(plan.priceId, true)}
                      className="w-full"
                      variant={plan.popular ? "default" : "outline"}
                    >
                      Get Started
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Enterprise</h2>
              <div className="text-3xl font-bold text-blue-600 mb-4">Custom Pricing</div>
              <p className="text-gray-600 mb-6">
                For large organizations with custom requirements, dedicated support, and volume pricing.
              </p>
              <Button variant="outline" size="lg">
                Contact Sales
              </Button>
            </div>
          </>
        ) : (
          <div className="space-y-12">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Industry-Specific Document Packs</h2>
              <p className="text-lg text-gray-600">
                Purchase once, use forever. Get unlimited document generation for your chosen industry.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {oneTimePacks.map((pack) => (
                <Card key={pack.id} className="relative">
                  <CardHeader className="text-center">
                    <CardTitle className="text-lg">{pack.name}</CardTitle>
                    <div className="text-2xl font-bold text-green-600">{pack.price}</div>
                    <CardDescription>{pack.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <div className="flex items-center space-x-1">
                        <FileText className="w-4 h-4" />
                        <span>{pack.documentCount} documents</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Download className="w-4 h-4" />
                        <span>{pack.formats.join(', ')}</span>
                      </div>
                    </div>
                    
                    <ul className="space-y-1">
                      {pack.features.slice(0, 4).map((feature, index) => (
                        <li key={index} className="flex items-center space-x-2">
                          <Check className="w-3 h-3 text-green-500 flex-shrink-0" />
                          <span className="text-xs text-gray-600">{feature}</span>
                        </li>
                      ))}
                      {pack.features.length > 4 && (
                        <li className="text-xs text-gray-500">
                          +{pack.features.length - 4} more documents
                        </li>
                      )}
                    </ul>
                    
                    <Button 
                      onClick={() => handlePlanSelect(pack.priceId, false)}
                      className="w-full"
                      variant="outline"
                    >
                      Buy Now
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        <div className="mt-16 bg-white rounded-2xl p-8 border border-gray-200">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Why Choose Formative?
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Check className="w-6 h-6 text-blue-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Expert-Reviewed</h4>
              <p className="text-gray-600 text-sm">
                All documents are reviewed by compliance experts and updated regularly.
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Check className="w-6 h-6 text-blue-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Industry-Specific</h4>
              <p className="text-gray-600 text-sm">
                Tailored templates for your specific industry and compliance requirements.
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Check className="w-6 h-6 text-blue-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Instant Generation</h4>
              <p className="text-gray-600 text-sm">
                Generate professional documents in seconds, not weeks.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
