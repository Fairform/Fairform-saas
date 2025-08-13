'use client'

import React, { useState, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { ArrowRight, ArrowLeft } from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'
import { NavigationLink } from '@/app/components/NavigationLink'

function ForgotPasswordPageContent() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const { resetPassword } = useAuth()
  const router = useRouter()
  const searchParams = useSearchParams()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email) {
      setError('Email is required')
      return
    }

    setLoading(true)
    setError('')
    
    try {
      await resetPassword(email)
      setSuccess('Password reset email sent! Please check your inbox and follow the instructions.')
    } catch (err: any) {
      setError(err.message || 'An error occurred while sending the reset email')
    } finally {
      setLoading(false)
    }
  }

  const handleBackToLogin = () => {
    const next = searchParams?.get('next')
    const loginUrl = next ? `/login?next=${encodeURIComponent(next)}` : '/login'
    router.push(loginUrl)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <div className="flex flex-col min-h-screen">
        <header className="border-b border-gray-100 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
          <div className="max-w-6xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <NavigationLink href="/" className="text-xl font-bold text-gray-900">
                Formative
              </NavigationLink>

              <div className="flex items-center space-x-4">
                <button
                  onClick={handleBackToLogin}
                  className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Back to Login
                </button>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 flex items-center justify-center px-6 py-12">
          <div className="w-full max-w-md">
            <div className="text-center mb-8">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
                Reset your password
              </h1>
              <p className="text-lg text-gray-600">
                Enter your email address and we'll send you a link to reset your password.
              </p>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-600 text-sm">{error}</p>
              </div>
            )}

            {success && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-green-600 text-sm">{success}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="bg-white border border-gray-200 rounded-2xl p-8">
              <div className="space-y-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-colors"
                    placeholder="your@email.com"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-black text-white py-3 px-4 rounded-lg font-medium hover:bg-gray-800 focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      <span>Sending reset email...</span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center space-x-2">
                      <span>Send reset email</span>
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  )}
                </button>
              </div>

              <div className="mt-6 text-center">
                <button
                  type="button"
                  onClick={handleBackToLogin}
                  className="inline-flex items-center space-x-2 text-gray-600 hover:text-gray-900 font-medium"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back to login</span>
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  )
}

export default function ForgotPasswordPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-50 flex items-center justify-center">Loading...</div>}>
      <ForgotPasswordPageContent />
    </Suspense>
  )
}
