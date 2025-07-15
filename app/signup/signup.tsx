'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Eye, EyeOff, Check, ArrowRight, Users, Zap, Shield } from 'lucide-react'

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    const checked = (e.target as HTMLInputElement).checked
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
            <NavigationLink 
              href="/login" 
              className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
            >
              Log in
            </NavigationLink>
            <span className="bg-black text-white text-sm px-4 py-2 rounded-md">
              Sign up
            </span>
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
                        <NavigationLink href="/terms" className="text-gray-900 hover:underline">
                          Terms of Service
                        </NavigationLink>
                        {' '}and{' '}
                        <NavigationLink href="/privacy" className="text-gray-900 hover:underline">
                          Privacy Policy
                        </NavigationLink>
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
                      <NavigationLink href="/login" className="text-gray-900 hover:underline font-medium">
                        Sign in
                      </NavigationLink>
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
              
              <div className="text-[10px] text-gray-400 max-w-md">
                * Compliance badges represent our commitment to industry standards. Users should verify specific requirements for their registration status.
              </div>
              
              <div>© 2024 FairForm. All rights reserved.</div>
            </div>
          </div>

          {/* Legal Disclaimer */}
          <div className="border-t border-gray-100 mt-8 pt-8">
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-sm font-semibold text-gray-900 mb-3">Important Legal Disclaimer</h3>
              <div className="text-[10px] text-gray-600 space-y-2 leading-relaxed">
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
