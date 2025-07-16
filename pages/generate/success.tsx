// pages/generate/success.tsx
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import { supabase } from '../../lib/supabase'
import { CheckCircle, Download, FileText, ArrowRight } from 'lucide-react'

interface DocumentData {
  filename: string
  fileSize: number
  downloadUrl: string
}

export default function GenerateSuccess() {
  const [loading, setLoading] = useState(true)
  const [document, setDocument] = useState<DocumentData | null>(null)
  const [error, setError] = useState('')
  const router = useRouter()
  const { session_id } = router.query

  useEffect(() => {
    if (session_id) {
      handleSuccessfulPayment(session_id as string)
    }
  }, [session_id])

  const handleSuccessfulPayment = async (sessionId: string) => {
    try {
      // Get current user
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) {
        router.push('/login')
        return
      }

      // Get user profile
      const { data: profile } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('auth_user_id', session.user.id)
        .single()

      if (!profile) {
        setError('User profile not found')
        setLoading(false)
        return
      }

      // Get payment metadata from URL params or localStorage
      const paymentData = JSON.parse(localStorage.getItem('pendingGeneration') || '{}')
      
      if (!paymentData.industry) {
        setError('Payment data not found. Please try generating the document again.')
        setLoading(false)
        return
      }

      // Generate document
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          stripeSessionId: sessionId,
          industry: paymentData.industry,
          policyType: paymentData.policyType,
          businessName: paymentData.businessName,
          abn: paymentData.abn,
          region: paymentData.region,
          format: paymentData.format,
          userId: profile.id,
        }),
      })

      const result = await response.json()

      if (result.success) {
        setDocument(result)
        // Clear pending generation data
        localStorage.removeItem('pendingGeneration')
      } else {
        setError(result.error || 'Failed to generate document')
      }
    } catch (error) {
      console.error('Error processing successful payment:', error)
      setError('An unexpected error occurred')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary-600 mx-auto"></div>
          <h2 className="mt-4 text-xl font-semibold text-gray-900">Generating Your Document</h2>
          <p className="mt-2 text-gray-600">Please wait while our AI creates your compliance document...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8 text-center">
          <div className="text-red-500 mb-4">
            <svg className="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 15.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Generation Failed</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <div className="space-y-3">
            <button
              onClick={() => router.push('/generate')}
              className="w-full bg-primary-600 text-white py-2 px-4 rounded-md hover:bg-primary-700"
            >
              Try Again
            </button>
            <button
              onClick={() => router.push('/dashboard')}
              className="w-full border border-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-50"
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      <Head>
        <title>Document Generated Successfully - Formative</title>
      </Head>

      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            {/* Success Icon */}
            <div className="flex justify-center mb-6">
              <CheckCircle className="h-16 w-16 text-green-500" />
            </div>

            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Document Generated Successfully!
            </h1>
            
            <p className="text-gray-600 mb-8">
              Your compliance document has been generated and is ready for download.
            </p>

            {/* Document Info */}
            <div className="bg-gray-50 rounded-lg p-6 mb-8">
              <div className="flex items-center justify-center mb-4">
                <FileText className="h-8 w-8 text-primary-600 mr-2" />
                <h3 className="text-lg font-semibold text-gray-900">Your Document</h3>
              </div>
              
              <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-600">
                <div>
                  <span className="font-medium">Filename:</span> {document?.filename}
                </div>
                <div>
                  <span className="font-medium">Size:</span> {Math.round((document?.fileSize || 0) / 1024)} KB
                </div>
              </div>
            </div>

            {/* Download Button */}
            <div className="space-y-4 mb-8">
              <a
                href={document?.downloadUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center bg-primary-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-primary-700 transition-colors"
              >
                <Download className="h-5 w-5 mr-2" />
                Download Document
              </a>
              
              <p className="text-sm text-gray-500">
                Your document will be available for download for 30 days.
              </p>
            </div>

            {/* Next Steps */}
            <div className="border-t pt-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">What's Next?</h3>
              <div className="grid md:grid-cols-2 gap-6 text-left">
                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-primary-100 rounded-lg p-2 mr-4">
                    <FileText className="h-5 w-5 text-primary-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Review & Customize</h4>
                    <p className="text-sm text-gray-600">Review the document and customize it to fit your specific business needs.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-primary-100 rounded-lg p-2 mr-4">
                    <CheckCircle className="h-5 w-5 text-primary-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Implement</h4>
                    <p className="text-sm text-gray-600">Share with your team and implement the policies in your workplace.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
              <button
                onClick={() => router.push('/generate')}
                className="flex items-center justify-center bg-white border border-primary-600 text-primary-600 px-6 py-2 rounded-md hover:bg-primary-50 transition-colors"
              >
                Generate Another Document
              </button>
              
              <button
                onClick={() => router.push('/smart-compliance')}
                className="flex items-center justify-center bg-white border border-gray-300 text-gray-700 px-6 py-2 rounded-md hover:bg-gray-50 transition-colors"
              >
                Chat with Compliance Experts
                <ArrowRight className="h-4 w-4 ml-2" />
              </button>
              
              <button
                onClick={() => router.push('/dashboard')}
                className="flex items-center justify-center bg-gray-600 text-white px-6 py-2 rounded-md hover:bg-gray-700 transition-colors"
              >
                Back to Dashboard
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
