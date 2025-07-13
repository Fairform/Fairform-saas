'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Eye, EyeOff, Check, ArrowRight } from 'lucide-react'

// Ultra-minimal orb - barely visible
const SubtleOrb = ({ className = '' }) => {
  return (
    <motion.div
      className={`absolute w-1 h-1 bg-gray-400/10 rounded-full blur-sm ${className}`}
      animate={{
        scale: [1, 1.5, 1],
        opacity: [0.1, 0.2, 0.1],
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    />
  )
}

export default function LoginPage() {
  const [isSignUp, setIsSignUp] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    company: '',
    industry: ''
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false)
      if (isSignUp) {
        alert('Account created successfully! Check your email to verify.')
      } else {
        window.location.href = '/dashboard'
      }
    }, 1500)
  }

  const handleInputChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const industries = [
    'NDIS (Disability Services)',
    'Construction & Building',
    'Childcare & Early Learning',
    'Healthcare & Medical',
    'Aged Care',
    'Education & Training',
    'Manufacturing',
    'Professional Services',
    'Other'
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation - matching pricing page */}
      <header className="w-full border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <a href="/" className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-black rounded-md"></div>
              <span className="text-lg font-medium text-gray-900">FairForm</span>
            </a>
            
            <nav className="hidden md:flex items-center space-x-6">
              <a href="/features" className="text-sm text-gray-600 hover:text-gray-900">Features</a>
              <a href="/pricing" className="text-sm text-gray-600 hover:text-gray-900">Pricing</a>
              <a href="/about" className="text-sm text-gray-600 hover:text-gray-900">About</a>
            </nav>
          </div>

          <div className="flex items-center space-x-4">
            <a href="/login" className="text-sm text-gray-900 font-medium">
              {isSignUp ? 'Sign up' : 'Log in'}
            </a>
            <a href="/signup" className="bg-black text-white text-sm px-4 py-2 rounded-md hover:bg-gray-800 transition-colors">
              {isSignUp ? 'Log in' : 'Sign up'}
            </a>
          </div>
        </div>
      </header>

      <div className="flex min-h-[calc(100vh-64px)]">
        {/* Left Side - Form */}
        <div className="flex-1 flex items-center justify-center px-6 py-12 relative">
          <SubtleOrb className="top-20 left-1/4" />
          <SubtleOrb className="bottom-20 right-1/3" />
          
          <div className="max-w-md w-full space-y-8">
            {/* Header */}
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
                {isSignUp ? 'Create your account' : 'Welcome back'}
              </h1>
              <p className="text-lg text-gray-600">
                {isSignUp 
                  ? 'Start generating compliance documents in minutes' 
                  : 'Sign in to your FairForm account'
                }
              </p>
            </div>

            {/* Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white border border-gray-200 rounded-2xl p-8"
            >
              <div onSubmit={handleSubmit} className="space-y-6">
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
                        required
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
                        required
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
                    Email address
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-colors"
                    placeholder="Enter your email"
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
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
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
                        required
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-colors pr-12"
                        placeholder="Confirm your password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="h-5 w-5" />
                        ) : (
                          <Eye className="h-5 w-5" />
                        )}
                      </button>
                    </div>
                  </div>
                )}

                {!isSignUp && (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <input
                        id="remember-me"
                        name="remember-me"
                        type="checkbox"
                        className="h-4 w-4 text-gray-900 focus:ring-gray-900 border-gray-300 rounded"
                      />
                      <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                        Remember me
                      </label>
                    </div>
                    <a href="/forgot-password" className="text-sm text-gray-600 hover:text-gray-900">
                      Forgot password?
                    </a>
                  </div>
                )}

                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={loading}
                  className="w-full bg-black hover:bg-gray-800 text-white py-3 px-6 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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
                  <p className="text-xs text-gray-500 text-center">
                    By creating an account, you agree to our{' '}
                    <a href="/terms" className="text-gray-900 hover:underline">Terms of Service</a>
                    {' '}and{' '}
                    <a href="/privacy" className="text-gray-900 hover:underline">Privacy Policy</a>
                  </p>
                )}
              </div>

              {/* Toggle */}
              <div className="mt-6 text-center">
                <p className="text-gray-600">
                  {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
                  <button
                    onClick={() => setIsSignUp(!isSignUp)}
                    className="text-gray-900 hover:underline font-medium"
                  >
                    {isSignUp ? 'Sign in' : 'Sign up'}
                  </button>
                </p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Right Side - Benefits */}
        <div className="hidden lg:flex flex-1 bg-gray-50 items-center justify-center p-12">
          <div className="max-w-lg space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Transform your compliance workflow
              </h2>
              <p className="text-gray-600 text-lg">
                Join hundreds of businesses generating professional, audit-ready policy documents in seconds.
              </p>
            </div>

            <div className="space-y-6">
              {[
                {
                  icon: '⚡',
                  title: '60-second generation',
                  description: 'Create comprehensive policies faster than ever'
                },
                {
                  icon: '🎯',
                  title: 'Industry-specific AI',
                  description: 'Agents trained on your industry regulations'
                },
                {
                  icon: '🛡️',
                  title: 'Audit-ready documents',
                  description: 'Pass compliance audits with confidence'
                },
                {
                  icon: '📈',
                  title: 'Scale with confidence',
                  description: 'From startup to enterprise, we grow with you'
                }
              ].map((benefit, idx) => (
                <div key={idx} className="flex items-start space-x-4">
                  <div className="text-2xl">{benefit.icon}</div>
                  <div>
                    <h3 className="text-gray-900 font-semibold mb-1">{benefit.title}</h3>
                    <p className="text-gray-600 text-sm">{benefit.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <div className="flex items-center space-x-3 mb-3">
                <Check className="w-5 h-5 text-green-600" />
                <span className="text-gray-900 font-medium">14-day free trial</span>
              </div>
              <div className="flex items-center space-x-3 mb-3">
                <Check className="w-5 h-5 text-green-600" />
                <span className="text-gray-900 font-medium">No credit card required</span>
              </div>
              <div className="flex items-center space-x-3">
                <Check className="w-5 h-5 text-green-600" />
                <span className="text-gray-900 font-medium">Cancel anytime</span>
              </div>
            </div>

            {/* Testimonial */}
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                  <span className="text-sm font-medium text-gray-600">SC</span>
                </div>
                <div>
                  <div className="text-gray-900 font-medium text-sm">Sarah Chen</div>
                  <div className="text-gray-600 text-xs">Compliance Manager</div>
                </div>
              </div>
              <blockquote className="text-gray-600 text-sm">
                "FairForm reduced our policy creation time from 3 weeks to 2 minutes. 
                The AI understands NDIS requirements perfectly."
              </blockquote>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-gray-100">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="w-6 h-6 bg-black rounded-md"></div>
              <span className="font-medium text-gray-900">FairForm</span>
            </div>
            
            <div className="flex space-x-6 text-sm text-gray-600">
              <a href="/privacy" className="hover:text-gray-900">Privacy Policy</a>
              <a href="/terms" className="hover:text-gray-900">Terms of Service</a>
              <a href="/contact" className="hover:text-gray-900">Contact</a>
              <a href="/help" className="hover:text-gray-900">Help</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}