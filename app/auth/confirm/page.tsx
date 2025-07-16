// app/auth/confirm/page.tsx
'use client'

import { useEffect, useState, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { Check, AlertCircle, Loader } from 'lucide-react'

function ConfirmEmailContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading')
  const [message, setMessage] = useState('')

  useEffect(() => {
    const handleEmailConfirmation = async () => {
      try {
        if (!searchParams) {
          throw new Error('No search parameters found')
        }

        const token_hash = searchParams.get('token_hash')
        const type = searchParams.get('type')

        if (token_hash && type) {
          const { error } = await supabase.auth.verifyOtp({
            token_hash,
            type: type as any,
          })

          if (error) {
            throw error
          }

          setStatus('success')
          setMessage('Email confirmed successfully! Redirecting to dashboard...')
          
          // Redirect to dashboard after 2 seconds
          setTimeout(() => {
            router.push('/dashboard')
          }, 2000)
        } else {
          throw new Error('Invalid confirmation link')
        }
      } catch (error: any) {
        console.error('Email confirmation error:', error)
        setStatus('error')
        setMessage(error.message || 'Failed to confirm email')
      }
    }

    handleEmailConfirmation()
  }, [searchParams, router])

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-6">
      <div className="max-w-md w-full text-center">
        <div className="bg-white border border-gray-200 rounded-2xl p-8">
          {status === 'loading' && (
            <>
              <Loader className="w-12 h-12 text-gray-400 mx-auto mb-4 animate-spin" />
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                Confirming your email...
              </h1>
              <p className="text-gray-600">
                Please wait while we verify your email address.
              </p>
            </>
          )}

          {status === 'success' && (
            <>
              <Check className="w-12 h-12 text-green-500 mx-auto mb-4" />
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                Email Confirmed!
              </h1>
              <p className="text-gray-600 mb-6">{message}</p>
              <div className="animate-pulse text-sm text-gray-500">
                Redirecting to dashboard...
              </div>
            </>
          )}

          {status === 'error' && (
            <>
              <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                Confirmation Failed
              </h1>
              <p className="text-gray-600 mb-6">{message}</p>
              <div className="space-y-3">
                <button
                  onClick={() => router.push('/login')}
                  className="w-full bg-black text-white py-3 px-6 rounded-lg font-medium hover:bg-gray-800 transition-colors"
                >
                  Go to Login
                </button>
                <button
                  onClick={() => window.location.reload()}
                  className="w-full bg-gray-100 text-gray-900 py-3 px-6 rounded-lg font-medium hover:bg-gray-200 transition-colors"
                >
                  Try Again
                </button>
              </div>
            </>
          )}
        </div>

        <div className="mt-6 text-center">
          <a href="/" className="text-gray-600 hover:text-gray-900 text-sm">
            ← Back to Formative
          </a>
        </div>
      </div>
    </div>
  )
}

export default function ConfirmEmailPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-white flex items-center justify-center px-6">
        <div className="max-w-md w-full text-center">
          <div className="bg-white border border-gray-200 rounded-2xl p-8">
            <Loader className="w-12 h-12 text-gray-400 mx-auto mb-4 animate-spin" />
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Loading...
            </h1>
            <p className="text-gray-600">
              Please wait while we load the page.
            </p>
          </div>
        </div>
      </div>
    }>
      <ConfirmEmailContent />
    </Suspense>
  )
}
