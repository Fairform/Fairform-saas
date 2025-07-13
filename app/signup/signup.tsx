'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Eye, EyeOff, Check, ArrowRight, Users, Zap, Shield } from 'lucide-react'

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

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    company: '',
    industry: '',
    teamSize: '',
    agreeToTerms: false
  })

  const handleSubmit = async () => {
    setLoading(true)
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false)
      alert('Account created successfully! Check your email to verify.')
    }, 1500)
  }

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const nextStep = () => {
    if (currentStep < 2) {
      setCurrentStep(currentStep + 1)
    } else {
      handleSubmit()
    }
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

  const teamSizes = [
    '1-5 employees',
    '6-20 employees',
    '21-50 employees',
    '51-200 employees',
    '200+ employees'
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
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
            <a href="/login" className="text-sm text-gray-600 hover:text-gray-900">
              Log in
            </a>
            <a href="/signup" className="bg-black text-white text-sm px-4 py-2 rounded-md">
              Sign up
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
                Create your account
              </h1>
              <p className="text-lg text-gray-600">
                Create professional compliance documents in minutes, not hours.
              </p>
            </div>

            {/* Progress indicator */}
            <div className="flex items-center justify-center space-x-4 mb-8">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                currentStep >= 1 ? 'bg-black text-white' : 'bg-gray-200 text-gray-600'
              }`}>
                1
              </div>
              <div className={`w-12 h-0.5 ${currentStep >= 2 ? 'bg-black' : 'bg-gray-200'}`}></div>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                currentStep >= 2 ? 'bg-black text-white' : 'bg-gray-200 text-gray-600'
              }`}>
                2
              </div>
            </div>

            {/* Form */}
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
              className="bg-white border border-gray-200 rounded-2xl p-8"
            >
              <div className="space-y-6">
                {currentStep === 1 && (
                  <>
                    <div className="text-center mb-6">
                      <h2 className="text-xl font-semibold text-gray-900 mb-2">
                        Let's get started
                      </h2>
                      <p className="text-gray-600">Tell us about yourself</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                          First Name
                        </label>
                        <input
                          id="firstName"
                          name="firstName"
                          type="text"
                          required
                          value={formData.firstName}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-colors"
                          placeholder="First name"
                        />
                      </div>
                      <div>
                        <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                          Last Name
                        </label>
                        <input
                          id="lastName"
                          name="lastName"
                          type="text"
                          required
                          value={formData.lastName}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-colors"
                          placeholder="Last name"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                        Work Email
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-colors"
                        placeholder="Enter your work email"
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
                          placeholder="Create a password"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                        >
                          {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                        </button>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">Must be at least 8 characters</p>
                    </div>

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
                          {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                        </button>
                      </div>
                    </div>
                  </>
                )}

                {currentStep === 2 && (
                  <>
                    <div className="text-center mb-6">
                      <h2 className="text-xl font-semibold text-gray-900 mb-2">
                        About your business
                      </h2>
                      <p className="text-gray-600">Help us personalize your experience</p>
                    </div>

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

                    <div>
                      <label htmlFor="teamSize" className="block text-sm font-medium text-gray-700 mb-2">
                        Team Size
                      </label>
                      <select
                        id="teamSize"
                        name="teamSize"
                        required
                        value={formData.teamSize}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-colors"
                      >
                        <option value="">Select team size</option>
                        {teamSizes.map((size) => (
                          <option key={size} value={size}>
                            {size}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="flex items-start space-x-3">
                      <input
                        id="agreeToTerms"
                        name="agreeToTerms"
                        type="checkbox"
                        checked={formData.agreeToTerms}
                        onChange={handleInputChange}
                        className="h-4 w-4 text-gray-900 focus:ring-gray-900 border-gray-300 rounded mt-1"
                      />
                      <label htmlFor="agreeToTerms" className="text-sm text-gray-700">
                        I agree to the{' '}
                        <a href="/terms" className="text-gray-900 hover:underline">Terms of Service</a>
                        {' '}and{' '}
                        <a href="/privacy" className="text-gray-900 hover:underline">Privacy Policy</a>
                      </label>
                    </div>
                  </>
                )}

                <button
                  type="button"
                  onClick={nextStep}
                  disabled={loading}
                  className="w-full bg-black hover:bg-gray-800 text-white py-3 px-6 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      <span>Creating account...</span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center space-x-2">
                      <span>{currentStep === 1 ? 'Continue' : 'Create account'}</span>
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  )}
                </button>

                {currentStep === 1 && (
                  <div className="text-center">
                    <p className="text-gray-600">
                      Already have an account?{' '}
                      <a href="/login" className="text-gray-900 hover:underline font-medium">
                        Sign in
                      </a>
                    </p>
                  </div>
                )}

                {currentStep === 2 && (
                  <button
                    type="button"
                    onClick={() => setCurrentStep(1)}
                    className="w-full text-gray-600 hover:text-gray-900 py-2 font-medium"
                  >
                    ← Back
                  </button>
                )}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Right Side - Benefits */}
        <div className="hidden lg:flex flex-1 bg-gray-50 items-center justify-center p-12">
          <div className="max-w-lg space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Join 500+ companies already using FairForm
              </h2>
              <p className="text-gray-600 text-lg">
                Generate professional, audit-ready compliance documents in under 60 seconds.
              </p>
            </div>

            <div className="space-y-6">
              {[
                {
                  icon: <Zap className="w-6 h-6" />,
                  title: 'Generate in seconds',
                  description: 'AI creates comprehensive policies instantly'
                },
                {
                  icon: <Shield className="w-6 h-6" />,
                  title: 'Audit-ready output',
                  description: 'Meet all regulatory standards automatically'
                },
                {
                  icon: <Users className="w-6 h-6" />,
                  title: 'Team collaboration',
                  description: 'Share and edit policies with your team'
                }
              ].map((benefit, idx) => (
                <div key={idx} className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center border border-gray-200">
                    {benefit.icon}
                  </div>
                  <div>
                    <h3 className="text-gray-900 font-semibold mb-1">{benefit.title}</h3>
                    <p className="text-gray-600 text-sm">{benefit.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <h3 className="text-gray-900 font-semibold mb-4">What's included:</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Check className="w-5 h-5 text-green-600" />
                  <span className="text-gray-700 text-sm">AI-powered document generation</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Check className="w-5 h-5 text-green-600" />
                  <span className="text-gray-700 text-sm">Industry-specific templates</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Check className="w-5 h-5 text-green-600" />
                  <span className="text-gray-700 text-sm">Professional formatting</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Check className="w-5 h-5 text-green-600" />
                  <span className="text-gray-700 text-sm">Export to PDF & Word</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Check className="w-5 h-5 text-green-600" />
                  <span className="text-gray-700 text-sm">Team collaboration</span>
                </div>
              </div>
            </div>

            {/* Social proof */}
            <div className="space-y-4">
              <p className="text-sm text-gray-600 font-medium">Trusted by teams at:</p>
              <div className="grid grid-cols-3 gap-4">
                {['HealthCorp', 'BuildSafe', 'CareFirst'].map((company, idx) => (
                  <div key={idx} className="bg-white rounded-lg p-3 border border-gray-200 text-center">
                    <span className="text-sm font-medium text-gray-700">{company}</span>
                  </div>
                ))}
              </div>
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