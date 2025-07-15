'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Eye, EyeOff, Check, ArrowRight, AlertCircle, Shield } from 'lucide-react'

// Navigation helper component (matching pricing page)
const NavigationLink = ({ href, children, className, onClick }: { 
  href: string
  children: React.ReactNode
  className?: string
  onClick?: () => void
}) => {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    
    if (onClick) {
      onClick()
    } else {
      // For demonstration purposes, we'll use window.location.href
      // In a real app, you'd replace this with your routing solution:
      // - Next.js: Use next/link or router.push()
      // - React Router: Use Link component or navigate()
      // - Other: Your preferred routing method
      
      console.log(`Navigating to: ${href}`)
      window.location.href = href
    }
  }

  return (
    <a 
      href={href} 
      className={className}
      onClick={handleClick}
    >
      {children}
    </a>
  )
}

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
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    company: '',
    industry: ''
  })

  // Mock authentication functions (replace with your actual auth logic)
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

  const handleSubmit = async () => {
    setLoading(true)
    setError('')
    setSuccess('')

    if (!validateForm()) {
      setLoading(false)
      return
    }
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      if (isSignUp) {
        setSuccess('Account created! Please check your email to verify your account before signing in.')
      } else {
        setSuccess('Signed in successfully!')
        setTimeout(() => {
          // Navigate to dashboard
          window.location.href = '/dashboard'
        }, 1000)
      }
    } catch (error: any) {
      setError('An error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
    // Clear errors when user starts typing
    if (error) setError('')
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
            <NavigationLink href="/" className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-black rounded-md"></div>
              <span className="text-lg font-medium text-gray-900">FairForm</span>
            </NavigationLink>
            
            <nav className="hidden md:flex items-center space-x-6">
              <NavigationLink 
                href="/product" 
                className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
              >
                Product
              </NavigationLink>
              <NavigationLink 
                href="/pricing" 
                className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
              >
                Pricing
              </NavigationLink>
              <NavigationLink 
                href="/about" 
                className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
              >
                About
              </NavigationLink>
            </nav>
          </div>

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

            {/* Error/Success Messages */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start space-x-3"
              >
                <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-red-700">{error}</p>
              </motion.div>
            )}

            {success && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-start space-x-3"
              >
                <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-green-700">{success}</p>
              </motion.div>
            )}

            {/* Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white border border-gray-200 rounded-2xl p-8"
            >
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
                        required={isSignUp}
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
                    <NavigationLink href="/forgot-password" className="text-sm text-gray-600 hover:text-gray-900">
                      Forgot password?
                    </NavigationLink>
                  </div>
                )}

                <button
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
                    <NavigationLink href="/terms" className="text-gray-900 hover:underline">
                      Terms of Service
                    </NavigationLink>
                    {' '}and{' '}
                    <NavigationLink href="/privacy" className="text-gray-900 hover:underline">
                      Privacy Policy
                    </NavigationLink>
                  </p>
                )}
              </div>

              {/* Toggle */}
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
                  title: '60-second generation',
                  description: 'Create comprehensive policies faster than ever'
                },
                {
                  title: 'Industry-specific AI',
                  description: 'Agents trained on your industry regulations'
                },
                {
                  title: 'Audit-ready documents',
                  description: 'Pass compliance audits with confidence'
                },
                {
                  title: 'Scale with confidence',
                  description: 'From startup to enterprise, we grow with you'
                }
              ].map((benefit, idx) => (
                <div key={idx} className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-gray-200 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <Check className="w-4 h-4 text-gray-600" />
                  </div>
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
                <span className="text-gray-900 font-medium">Expert-reviewed documents</span>
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
      <footer className="border-t border-gray-100 bg-white">
        <div className="max-w-6xl mx-auto px-6 py-12">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-8 md:space-y-0">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-black rounded-md"></div>
              <span className="font-medium text-gray-900">FairForm</span>
            </div>
            
            <div className="flex flex-wrap gap-6 text-sm text-gray-600">
              <NavigationLink href="/privacy" className="hover:text-gray-900 transition-colors">
                Privacy Policy
              </NavigationLink>
              <NavigationLink href="/terms" className="hover:text-gray-900 transition-colors">
                Terms of Service
              </NavigationLink>
              <NavigationLink href="/contact" className="hover:text-gray-900 transition-colors">
                Contact
              </NavigationLink>
              <NavigationLink href="/help" className="hover:text-gray-900 transition-colors">
                Help
              </NavigationLink>
            </div>
          </div>
          
          <div className="border-t border-gray-100 mt-8 pt-8 text-center text-sm text-gray-500">
            <div className="flex flex-col items-center space-y-4">
              {/* NDIS Badge */}
              <div className="flex items-center justify-center space-x-6 mb-4">
                <div className="bg-blue-50 border border-blue-200 rounded-lg px-4 py-2 flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                    <Shield className="w-4 h-4 text-white" />
                  </div>
                  <div className="text-left">
                    <div className="text-sm font-semibold text-blue-900">NDIS Compliant</div>
                    <div className="text-xs text-blue-700">Registered Provider</div>
                  </div>
                </div>
                
                <div className="bg-green-50 border border-green-200 rounded-lg px-4 py-2 flex items-center space-x-3">
                  <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                  <div className="text-left">
                    <div className="text-sm font-semibold text-green-900">Quality Assured</div>
                    <div className="text-xs text-green-700">Industry Standards</div>
                  </div>
                </div>
              </div>
              
              <div className="text-xs text-gray-400 max-w-md">
                * Compliance badges represent our commitment to industry standards. Users should verify specific requirements for their registration status.
              </div>
              
              <div>© 2024 FairForm. All rights reserved.</div>
            </div>
          </div>

          {/* Legal Disclaimer */}
          <div className="border-t border-gray-100 mt-8 pt-8">
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-sm font-semibold text-gray-900 mb-3">Important Legal Disclaimer</h3>
              <div className="text-xs text-gray-600 space-y-2 leading-relaxed">
                <p>
                  <strong>Professional Advice:</strong> FairForm provides AI-generated compliance documents for informational purposes only. These documents do not constitute legal, professional, or regulatory advice. Users should always consult with qualified legal professionals, compliance specialists, or industry experts before implementing any policies or procedures.
                </p>
                <p>
                  <strong>Refund Policy:</strong> All sales are final. Due to the instant digital delivery nature of our products, refunds are not provided once documents have been downloaded. We encourage users to carefully review product descriptions and contact our support team with questions before purchasing.
                </p>
                <p>
                  <strong>NDIS Compliance:</strong> Our NDIS document templates are designed to align with NDIS Practice Standards and Quality and Safeguards Framework. However, NDIS compliance requirements may vary by provider type and services offered. Users must ensure their specific obligations are met.
                </p>
                <p>
                  <strong>Regulatory Compliance:</strong> While our documents are designed to align with current regulatory standards, compliance requirements vary by jurisdiction, industry, and specific business circumstances. Users are solely responsible for ensuring their policies meet applicable laws and regulations in their specific context.
                </p>
                <p>
                  <strong>No Warranty:</strong> FairForm makes no warranties, express or implied, regarding the accuracy, completeness, or fitness for purpose of generated documents. We do not guarantee that our documents will ensure regulatory compliance or prevent legal issues.
                </p>
                <p>
                  <strong>Limitation of Liability:</strong> To the maximum extent permitted by law, FairForm, its officers, employees, and affiliates shall not be liable for any direct, indirect, incidental, consequential, or punitive damages arising from the use of our platform or generated documents.
                </p>
                <p>
                  <strong>User Responsibility:</strong> Users must review, customize, and validate all generated documents for their specific needs, applicable laws, and industry standards. Regular updates and reviews of policies are essential to maintain compliance as regulations evolve.
                </p>
                <p>
                  <strong>Audit and Implementation:</strong> While our documents are designed to support your compliance efforts, users should conduct their own compliance audits and seek professional guidance for implementation and ongoing compliance monitoring.
                </p>
                <p className="pt-2 border-t border-gray-200">
                  By using FairForm, you acknowledge that you have read, understood, and agree to these terms. You confirm that you will seek appropriate professional advice and conduct proper due diligence before implementing any generated documents.
                </p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}