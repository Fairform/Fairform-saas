// pages/generate.tsx
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import { supabase } from '../lib/supabase'
import { createCheckoutSession } from '../lib/stripe-client'
import { Industry, PolicyType, Region } from '../types'

const INDUSTRIES: Industry[] = [
  'Healthcare', 'Education', 'Disability Services', 'Aged Care', 'Childcare',
  'Construction', 'Manufacturing', 'Retail', 'Hospitality', 'Professional Services',
  'Technology', 'Finance'
]

const POLICY_TYPES: PolicyType[] = [
  'Workplace Health and Safety', 'Privacy Policy', 'Code of Conduct',
  'Anti-Discrimination', 'Risk Management', 'Incident Response',
  'Data Protection', 'Quality Assurance', 'NDIS Practice Standards', 'Child Safety'
]

const REGIONS: Region[] = ['NSW', 'VIC', 'QLD', 'WA', 'SA', 'TAS', 'ACT', 'NT']

export default function Generate() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    industry: '' as Industry,
    policyType: '' as PolicyType,
    businessName: '',
    abn: '',
    region: '' as Region,
    format: 'pdf' as 'docx' | 'pdf'
  })
  const router = useRouter()

  useEffect(() => {
    const getUser = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) {
        router.push('/login')
        return
      }
      setUser(session.user)
      
      // Load user profile data
      const { data: profile } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('auth_user_id', session.user.id)
        .single()
      
      if (profile) {
        setFormData(prev => ({
          ...prev,
          businessName: profile.business_name || '',
          industry: profile.industry || '',
          region: profile.region || '',
          abn: profile.abn || ''
        }))
      }
    }
    getUser()
  }, [router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Create Stripe checkout session
      const session = await createCheckoutSession(
        'price_1234567890', // Replace with your actual price ID
        `${window.location.origin}/generate/success`,
        `${window.location.origin}/generate`,
        user.id,
        {
          industry: formData.industry,
          policyType: formData.policyType,
          businessName: formData.businessName,
          abn: formData.abn,
          region: formData.region,
          format: formData.format
        }
      )

      // Redirect to Stripe Checkout
      window.location.href = session.url
    } catch (error) {
      console.error('Error creating checkout session:', error)
      alert('Failed to start payment process. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  return (
    <>
      <Head>
        <title>Generate Document - Fairform</title>
        <meta name="description" content="Generate AI-powered compliance documents" />
      </Head>

      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-6">
              <h1 className="text-2xl font-bold text-gray-900">Generate Document</h1>
              <button
                onClick={() => router.push('/dashboard')}
                className="text-primary-600 hover:text-primary-700"
              >
                ← Back to Dashboard
              </button>
            </div>
          </div>
        </header>

        <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white rounded-lg shadow-md p-8">
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Document Details</h2>
              <p className="text-gray-600">
                Fill in your business details to generate a customized compliance document.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Business Information */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Business Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.businessName}
                    onChange={(e) => handleInputChange('businessName', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    placeholder="Acme Healthcare Pty Ltd"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    ABN *
                  </label>
                  <input
                    type="text"
                    required
                    pattern="[0-9]{11}"
                    value={formData.abn}
                    onChange={(e) => handleInputChange('abn', e.target.value.replace(/\D/g, '').slice(0, 11))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    placeholder="12345678901"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Industry *
                  </label>
                  <select
                    required
                    value={formData.industry}
                    onChange={(e) => handleInputChange('industry', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  >
                    <option value="">Select Industry</option>
                    {INDUSTRIES.map(industry => (
                      <option key={industry} value={industry}>{industry}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Region *
                  </label>
                  <select
                    required
                    value={formData.region}
                    onChange={(e) => handleInputChange('region', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  >
                    <option value="">Select Region</option>
                    {REGIONS.map(region => (
                      <option key={region} value={region}>{region}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Policy Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Policy Type *
                </label>
                <select
                  required
                  value={formData.policyType}
                  onChange={(e) => handleInputChange('policyType', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                >
                  <option value="">Select Policy Type</option>
                  {POLICY_TYPES.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              {/* Format Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Document Format *
                </label>
                <div className="flex space-x-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="format"
                      value="pdf"
                      checked={formData.format === 'pdf'}
                      onChange={(e) => handleInputChange('format', e.target.value)}
                      className="mr-2"
                    />
                    PDF
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="format"
                      value="docx"
                      checked={formData.format === 'docx'}
                      onChange={(e) => handleInputChange('format', e.target.value)}
                      className="mr-2"
                    />
                    DOCX
                  </label>
                </div>
              </div>

              {/* Pricing Info */}
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-medium text-blue-900 mb-2">Document Generation - $9.99 AUD</h3>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• Professional, audit-ready document</li>
                  <li>• Australian regulation compliance</li>
                  <li>• Industry-specific requirements included</li>
                  <li>• Instant download in your chosen format</li>
                </ul>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-primary-600 text-white py-3 px-4 rounded-md font-medium hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Processing...' : 'Generate Document - $9.99 AUD'}
              </button>
            </form>
          </div>
        </main>
      </div>
    </>
  )
}