'use client'

import React, { useState, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { ArrowRight, Eye, EyeOff } from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'
import { NavigationLink } from '@/app/components/NavigationLink'

const industries = [
  'NDIS Provider',
  'Construction & Trades',
  'Childcare & Education',
  'Healthcare & Medical',
  'Hospitality & Food Service',
  'Retail & E-commerce',
  'Professional Services',
  'Fitness & Wellness',
  'Beauty & Personal Care',
  'Cleaning Services',
  'Other'
]

function LoginPageContent() {
  const [isSignUp, setIsSignUp] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const { signIn, signUp, user, resetPassword } = useAuth()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    company: '',
    industry: ''
  })
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    if (searchParams?.get('mode') === 'signup') {
      setIsSignUp(true)
    }
    if (searchParams?.get('reset') === '1') {
      setSuccess('Password updated successfully! Please sign in with your new password.')
    }
  }, [searchParams])

  useEffect(() => {
    if (user) {
      const next = searchParams?.get('next')
      router.push(next || '/dashboard')
    }
  }, [user, router, searchParams])

  const validateForm = () => {
    if (!formData.email || !formData.password) {
      setError('Email and password are required')
      return false
    }

    if (isSignUp) {
      if (!formData.company || !formData.industry) {
        setError('Company name and industry are required')
        return false
      }
      if (formData.password !== formData.confirmPassword) {
        setError('Passwords do not match')
        return false
      }
      if (formData.password.length < 6) {
        setError('Password must be at least 6 characters')
        return false
      }
    }

    return true
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    setError('')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }
    
    setLoading(true)
    setError('')
    
    try {
      if (isSignUp) {
        const { user, error } = await signUp(formData.email, formData.password, {
          company: formData.company,
          industry: formData.industry
        })
        
        if (error) {
          setError(error.message)
        } else {
          setSuccess('Account created successfully! Please check your email to confirm your account.')
        }
      } else {
        const { user, error } = await signIn(formData.email, formData.password)
        
        if (error) {
          setError(error.message)
        } else {
          const next = searchParams?.get('next')
          router.push(next || '/dashboard')
        }
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  const handleModeSwitch = () => {
    setIsSignUp(!isSignUp)
    setError('')
    setSuccess('')
    setFormData({
      email: '',
      password: '',
      confirmPassword: '',
      company: '',
      industry: ''
    })
  }

  const handleForgotPassword = () => {
    const next = searchParams?.get('next')
    const forgotUrl = next ? `/forgot-password?next=${encodeURIComponent(next)}` : '/forgot-password'
    router.push(forgotUrl)
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
                <span className="text-sm text-gray-900 font-medium">
                  {isSignUp ? 'Sign up' : 'Log in'}
                </span>
                <button
                  onClick={handleModeSwitch}
                  className="bg-black text-white text-sm px-4 py-2 rounded-md hover:bg-gray-800 transition-colors"
                >
                  {isSignUp ? 'Log in' : 'Sign up'}
                </button>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 flex items-center justify-center px-6 py-12">
          <div className="w-full max-w-md">
            <div className="text-center mb-8">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
                {isSignUp ? 'Create your account' : 'Welcome back'}
              </h1>
              <p className="text-lg text-gray-600">
                {isSignUp 
                  ? 'Start generating compliance documents in minutes' 
                  : 'Sign in to your Formative account'
                }
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
                {isSignUp && (
                  <>
                    <div>
                      <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
                        Company Name
                      </label>
                      <input
                        id="company"
                        name="company"
                        type="text"
                        required={isSignUp}
                        value={formData.company}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-colors"
                        placeholder="Your company name"
                      />
                    </div>

                    <div>
                      <label htmlFor="industry" className="block text-sm font-medium text-gray-700 mb-2">
                        Industry
                      </label>
                      <select
                        id="industry"
                        name="industry"
                        required={isSignUp}
                        value={formData.industry}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-colors"
                      >
                        <option value="">Select your industry</option>
                        {industries.map((industry) => (
                          <option key={industry} value={industry}>
                            {industry}
                          </option>
                        ))}
                      </select>
                    </div>
                  </>
                )}

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-colors"
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={formData.password}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-colors pr-12"
                      placeholder="Enter your password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                {isSignUp && (
                  <div>
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                      Confirm Password
                    </label>
                    <div className="relative">
                      <input
                        id="confirmPassword"
                        name="confirmPassword"
                        type={showConfirmPassword ? 'text' : 'password'}
                        required={isSignUp}
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-colors pr-12"
                        placeholder="Confirm your password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                      >
                        {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>
                )}

                {!isSignUp && (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <input
                        id="remember"
                        name="remember"
                        type="checkbox"
                        className="h-4 w-4 text-gray-900 focus:ring-gray-900 border-gray-300 rounded"
                      />
                      <label htmlFor="remember" className="ml-2 block text-sm text-gray-700">
                        Remember me
                      </label>
                    </div>
                    <button
                      type="button"
                      onClick={handleForgotPassword}
                      className="text-sm text-gray-900 hover:underline"
                    >
                      Forgot password?
                    </button>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-black text-white py-3 px-4 rounded-lg font-medium hover:bg-gray-800 focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      <span>{isSignUp ? 'Creating account...' : 'Signing in...'}</span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center space-x-2">
                      <span>{isSignUp ? 'Create account' : 'Sign in'}</span>
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  )}
                </button>

                {isSignUp && (
                  <p className="text-[10px] text-gray-500 text-center">
                    By creating an account, you agree to our{' '}
                    <NavigationLink href="/terms" className="text-gray-900 hover:underline">
                      Terms of Service
                    </NavigationLink>{' '}
                    and{' '}
                    <NavigationLink href="/privacy" className="text-gray-900 hover:underline">
                      Privacy Policy
                    </NavigationLink>
                  </p>
                )}
              </div>

              <div className="mt-6 text-center">
                <p className="text-gray-600">
                  {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
                  <button
                    onClick={handleModeSwitch}
                    className="text-gray-900 hover:underline font-medium"
                  >
                    {isSignUp ? 'Sign in' : 'Sign up'}
                  </button>
                </p>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  )
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex items-center justify-center">Loading...</div>}>
      <LoginPageContent />
    </Suspense>
  )
}
