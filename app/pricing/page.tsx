'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Check, X, Menu, ArrowRight } from 'lucide-react'

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

export default function PricingPage() {
  const [isAnnual, setIsAnnual] = useState(false)

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation - exact Jenni.ai style */}
      <header className="w-full border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <a href="/" className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-black rounded-md"></div>
              <span className="text-lg font-medium text-gray-900">FairForm</span>
            </a>
            
            <nav className="hidden md:flex items-center space-x-6">
              <a href="/features" className="text-sm text-gray-600 hover:text-gray-900">Features</a>
              <a href="/pricing" className="text-sm text-gray-900 font-medium">Pricing</a>
              <a href="/about" className="text-sm text-gray-600 hover:text-gray-900">About</a>
            </nav>
          </div>

          <div className="flex items-center space-x-4">
            <a href="/login" className="text-sm text-gray-600 hover:text-gray-900">Log in</a>
            <a href="/signup" className="bg-black text-white text-sm px-4 py-2 rounded-md hover:bg-gray-800 transition-colors">
              Sign up
            </a>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main>
        {/* Hero section - exact Jenni.ai style */}
        <section className="max-w-4xl mx-auto px-6 pt-20 pb-16 text-center relative">
          <SubtleOrb className="top-10 left-1/4" />
          <SubtleOrb className="top-32 right-1/3" />
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-[1.1] tracking-tight">
              Simple pricing for
              <br />
              powerful compliance
            </h1>
            
            <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
              Start with our free plan. Upgrade to unlock unlimited AI-generated compliance documents and advanced features.
            </p>

            {/* Billing toggle - exact Jenni style */}
            <div className="inline-flex items-center bg-gray-100 rounded-full p-1 mb-16">
              <button
                onClick={() => setIsAnnual(false)}
                className={`px-5 py-2 text-sm font-medium rounded-full transition-all ${
                  !isAnnual ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600'
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setIsAnnual(true)}
                className={`px-5 py-2 text-sm font-medium rounded-full transition-all relative ${
                  isAnnual ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600'
                }`}
              >
                Annual
                <span className="absolute -top-1 -right-1 bg-green-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                  -20%
                </span>
              </button>
            </div>
          </motion.div>
        </section>

        {/* Pricing cards - exact Jenni.ai white cards with black accents */}
        <section className="max-w-4xl mx-auto px-6 pb-20">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Lite Plan */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-white border border-gray-200 rounded-2xl p-8 hover:border-gray-300 transition-colors"
            >
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Lite</h3>
                <div className="mb-4">
                  <span className="text-4xl font-bold text-gray-900">$119</span>
                  <span className="text-gray-600 ml-1">/month</span>
                </div>
                <p className="text-gray-600">Perfect for early-stage businesses</p>
              </div>

              <ul className="space-y-4 mb-8">
                <li className="flex items-start space-x-3">
                  <Check className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">AI-Powered Document Generation</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-5 h-5 mt-0.5 flex-shrink-0 flex items-center justify-center bg-gray-100 rounded text-xs font-medium text-gray-600">
                    Ltd
                  </div>
                  <span className="text-gray-700">Unlimited Policy Edits</span>
                </li>
                <li className="flex items-start space-x-3">
                  <Check className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Industry-Specific Templates</span>
                </li>
                <li className="flex items-start space-x-3">
                  <X className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-400">Audit-Ready Documents</span>
                </li>
                <li className="flex items-start space-x-3">
                  <Check className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Branded Downloads</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-5 h-5 mt-0.5 flex-shrink-0 flex items-center justify-center bg-gray-100 rounded text-xs font-medium text-gray-600">
                    72h
                  </div>
                  <span className="text-gray-700">Support Response Time</span>
                </li>
                <li className="flex items-start space-x-3">
                  <X className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-400">Team Access</span>
                </li>
              </ul>

              <button className="w-full bg-black text-white py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors">
                Get Lite
              </button>
            </motion.div>

            {/* Pro Plan */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white border-2 border-black rounded-2xl p-8 relative"
            >
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <div className="bg-black text-white text-sm font-medium px-4 py-1 rounded-full">
                  Most popular
                </div>
              </div>

              <div className="mb-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Pro</h3>
                <div className="mb-4">
                  <span className="text-4xl font-bold text-gray-900">$149</span>
                  <span className="text-gray-600 ml-1">/month</span>
                </div>
                <p className="text-gray-600">Best for growing or regulated teams</p>
              </div>

              <ul className="space-y-4 mb-8">
                <li className="flex items-start space-x-3">
                  <Check className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">AI-Powered Document Generation</span>
                </li>
                <li className="flex items-start space-x-3">
                  <Check className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Unlimited Policy Edits</span>
                </li>
                <li className="flex items-start space-x-3">
                  <Check className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Industry-Specific Templates</span>
                </li>
                <li className="flex items-start space-x-3">
                  <Check className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Audit-Ready Documents</span>
                </li>
                <li className="flex items-start space-x-3">
                  <Check className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Branded Downloads</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-5 h-5 mt-0.5 flex-shrink-0 flex items-center justify-center bg-gray-100 rounded text-xs font-medium text-gray-600">
                    24h
                  </div>
                  <span className="text-gray-700">Support Response Time</span>
                </li>
                <li className="flex items-start space-x-3">
                  <Check className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Team Access</span>
                </li>
              </ul>

              <button className="w-full bg-black text-white py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors">
                Go Pro
              </button>
            </motion.div>
          </div>
        </section>

        {/* FAQ Section - minimal Jenni style */}
        <section className="max-w-3xl mx-auto px-6 py-20">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Frequently asked questions
            </h2>
            <p className="text-lg text-gray-600">
              Can't find what you're looking for? Contact our support team.
            </p>
          </div>

          <div className="space-y-8">
            {[
              {
                q: "Can I change my plan at any time?",
                a: "Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle."
              },
              {
                q: "What's included in the Pro plan trial?",
                a: "The Pro plan includes unlimited AI-generated documents, all industry templates, team collaboration, and priority support."
              },
              {
                q: "Are the documents legally compliant?",
                a: "All documents are based on current regulations and best practices. We recommend having them reviewed by your legal team for your specific situation."
              },
              {
                q: "How does billing work?",
                a: "You can choose monthly or annual billing. Annual billing gives you a 20% discount on your subscription."
              }
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="border-b border-gray-200 pb-6 last:border-b-0"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  {faq.q}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {faq.a}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gray-50 py-20">
          <div className="max-w-4xl mx-auto px-6 text-center relative">
            <SubtleOrb className="top-8 left-1/3" />
            <SubtleOrb className="bottom-8 right-1/4" />
            
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Start creating compliant documents today
            </h2>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Join thousands of businesses using AI to generate professional compliance documentation in seconds.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/signup"
                className="bg-black text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors inline-flex items-center justify-center space-x-2"
              >
                <span>Start for free</span>
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="/demo"
                className="bg-white text-gray-900 border border-gray-300 px-6 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors"
              >
                Schedule a demo
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* Footer - ultra minimal */}
      <footer className="border-t border-gray-100">
        <div className="max-w-6xl mx-auto px-6 py-12">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-8 md:space-y-0">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-black rounded-md"></div>
              <span className="font-medium text-gray-900">FairForm</span>
            </div>
            
            <div className="flex flex-wrap gap-6 text-sm text-gray-600">
              <a href="/privacy" className="hover:text-gray-900">Privacy Policy</a>
              <a href="/terms" className="hover:text-gray-900">Terms of Service</a>
              <a href="/contact" className="hover:text-gray-900">Contact</a>
              <a href="/help" className="hover:text-gray-900">Help</a>
            </div>
          </div>
          
          <div className="border-t border-gray-100 mt-8 pt-8 text-center text-sm text-gray-500">
            © 2024 FairForm. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}