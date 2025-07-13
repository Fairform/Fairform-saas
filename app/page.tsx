'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Check, 
  ArrowRight, 
  Clock, 
  Shield,
  Zap,
  Users,
  Download,
  Brain,
  FileText,
  Star,
  Play
} from 'lucide-react'

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

export default function HomePage() {
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
            <a href="/login" className="text-sm text-gray-600 hover:text-gray-900">Log in</a>
            <a href="/signup" className="bg-black text-white text-sm px-4 py-2 rounded-md hover:bg-gray-800 transition-colors">
              Sign up
            </a>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main>
        {/* Hero Section */}
        <section className="max-w-4xl mx-auto px-6 pt-20 pb-16 text-center relative">
          <SubtleOrb className="top-10 left-1/4" />
          <SubtleOrb className="top-32 right-1/3" />
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            {/* Badge */}
            <div className="inline-flex items-center space-x-2 bg-gray-50 border border-gray-200 rounded-full px-4 py-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm font-medium text-gray-700">Trusted by 10,000+ compliance teams</span>
            </div>

            {/* Main headline */}
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-[1.1] tracking-tight">
              Meet Your Intelligent
              <br />
              Policy Assistant
            </h1>

            {/* Subtitle */}
            <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
              The AI-powered Assistant to help you read, write, and organise policy with ease.
            </p>

            {/* CTA buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <a
                href="/generate"
                className="bg-black hover:bg-gray-800 text-white font-medium px-8 py-4 rounded-lg transition-colors inline-flex items-center space-x-2 text-lg"
              >
                <span>Start generating free</span>
                <ArrowRight className="w-5 h-5" />
              </a>
              <button className="text-gray-700 hover:text-gray-900 font-medium px-8 py-4 transition-colors inline-flex items-center space-x-2">
                <Play className="w-5 h-5" />
                <span>See how it works</span>
              </button>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap items-center justify-center gap-8 text-sm text-gray-500 pt-8">
              <div className="flex items-center space-x-2">
                <Check className="w-4 h-4 text-green-600" />
                <span>No credit card required</span>
              </div>
              <div className="flex items-center space-x-2">
                <Check className="w-4 h-4 text-green-600" />
                <span>Free forever plan</span>
              </div>
              <div className="flex items-center space-x-2">
                <Check className="w-4 h-4 text-green-600" />
                <span>Setup in 2 minutes</span>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Demo Section */}
        <section className="py-20 px-6">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl border border-gray-200 overflow-hidden"
            >
              {/* Browser chrome */}
              <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <div className="ml-4 text-sm text-gray-600 font-mono">fairform.ai</div>
                </div>
              </div>
              
              {/* Interface content */}
              <div className="p-8 lg:p-12">
                <div className="grid lg:grid-cols-3 gap-8">
                  {/* Left: Input */}
                  <div className="lg:col-span-1 space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Tell us about your business</h3>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Industry</label>
                          <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
                            <span className="text-green-700 font-medium">✓ NDIS Services</span>
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Service type</label>
                          <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
                            <span className="text-gray-700">Support Coordination</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right: Output */}
                  <div className="lg:col-span-2">
                    <div className="bg-gray-50 rounded-lg p-6 h-full">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="font-semibold text-gray-900">Generated Policy Documents</h4>
                        <div className="flex items-center space-x-2">
                          <SubtleOrb className="relative" />
                          <span className="text-sm text-gray-600">AI generating...</span>
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        {[
                          "Quality and Safeguards Policy",
                          "Participant Rights and Responsibilities", 
                          "Incident Management Procedures",
                          "Privacy and Confidentiality Policy"
                        ].map((doc, i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.2 }}
                            className="flex items-center space-x-3 p-3 bg-white rounded-lg border border-gray-200"
                          >
                            <FileText className="w-5 h-5 text-green-600" />
                            <span className="font-medium text-gray-900">{doc}</span>
                            <div className="ml-auto text-xs text-gray-500">2.3 KB</div>
                          </motion.div>
                        ))}
                      </div>

                      <div className="mt-6 pt-4 border-t border-gray-200">
                        <button className="bg-black text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors">
                          Download all policies
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Features */}
        <section className="py-20 px-6 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Everything you need to stay compliant
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Professional compliance tools designed for modern businesses.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: Zap,
                  title: "Generate in seconds",
                  description: "Create comprehensive policy documents in under 60 seconds with our AI engine."
                },
                {
                  icon: Shield,
                  title: "Audit-ready output", 
                  description: "Every document meets regulatory standards and passes professional audits."
                },
                {
                  icon: Brain,
                  title: "Industry expertise",
                  description: "Trained on thousands of compliance documents across 10+ industries."
                },
                {
                  icon: Users,
                  title: "Team collaboration",
                  description: "Share, review, and collaborate on policies with your entire team."
                },
                {
                  icon: Download,
                  title: "Export anywhere",
                  description: "Download as PDF, Word, or integrate with your existing systems."
                },
                {
                  icon: Clock,
                  title: "Always up-to-date",
                  description: "Policies automatically reflect the latest regulatory changes."
                }
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center"
                >
                  <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center mb-4 mx-auto border border-gray-200">
                    <feature.icon className="w-6 h-6 text-gray-700" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Social Proof */}
        <section className="py-20 px-6 bg-white">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-12">
              Trusted by compliance teams worldwide
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  quote: "FairForm cut our policy creation time from weeks to minutes. The quality is outstanding.",
                  author: "Sarah Johnson",
                  role: "Compliance Director",
                  company: "HealthCare Plus",
                  rating: 5
                },
                {
                  quote: "Finally, a tool that understands NDIS requirements. Our audits have never been smoother.",
                  author: "Michael Chen",
                  role: "Operations Manager", 
                  company: "Support Services Co.",
                  rating: 5
                },
                {
                  quote: "The AI generates policies that are more comprehensive than what we created manually.",
                  author: "Emma Wilson",
                  role: "Safety Coordinator",
                  company: "BuildSafe Construction",
                  rating: 5
                }
              ].map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-gray-50 p-6 rounded-lg border border-gray-200"
                >
                  <div className="flex space-x-1 mb-4 justify-center">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <blockquote className="text-gray-700 mb-4 leading-relaxed">
                    "{testimonial.quote}"
                  </blockquote>
                  <div className="text-center">
                    <div className="font-semibold text-gray-900">{testimonial.author}</div>
                    <div className="text-sm text-gray-600">{testimonial.role}, {testimonial.company}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section className="py-20 px-6 bg-gray-50">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Simple pricing for everyone
            </h2>
            <p className="text-xl text-gray-600 mb-12">
              Start free, upgrade when you need more.
            </p>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white border border-gray-200 rounded-2xl p-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Lite</h3>
                <div className="mb-4">
                  <span className="text-4xl font-bold text-gray-900">$119</span>
                  <span className="text-gray-600 ml-1">/month</span>
                </div>
                <ul className="space-y-3 text-left mb-8">
                  <li className="flex items-center space-x-3">
                    <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <span className="text-gray-700">Limited documents per month</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <span className="text-gray-700">Basic industry templates</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <span className="text-gray-700">PDF downloads</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <span className="text-gray-700">Email support</span>
                  </li>
                </ul>
                <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-900 py-3 px-6 rounded-lg font-medium transition-colors">
                  Get Lite
                </button>
              </div>

              <div className="bg-white border-2 border-black rounded-2xl p-8 relative">
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-black text-white px-3 py-1 rounded-full text-sm font-medium">
                    Most popular
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Pro</h3>
                <div className="mb-4">
                  <span className="text-4xl font-bold text-gray-900">$149</span>
                  <span className="text-gray-600 ml-1">/month</span>
                </div>
                <ul className="space-y-3 text-left mb-8">
                  <li className="flex items-center space-x-3">
                    <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <span className="text-gray-700">Unlimited documents</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <span className="text-gray-700">All industry agents</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <span className="text-gray-700">Word & PDF exports</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <span className="text-gray-700">Priority support</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <span className="text-gray-700">Team collaboration</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <span className="text-gray-700">Custom branding</span>
                  </li>
                </ul>
                <button className="w-full bg-black hover:bg-gray-800 text-white py-3 px-6 rounded-lg font-medium transition-colors">
                  Go Pro
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-20 px-6 bg-white">
          <div className="max-w-4xl mx-auto text-center relative">
            <SubtleOrb className="top-8 left-1/3" />
            <SubtleOrb className="bottom-8 right-1/4" />
            
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Ready to transform your compliance?
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Join thousands of businesses creating professional compliance documents with AI.
            </p>
            <a
              href="/signup"
              className="bg-black text-white hover:bg-gray-800 font-medium px-8 py-4 rounded-lg transition-colors inline-flex items-center space-x-2 text-lg"
            >
              <span>Start generating free</span>
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </section>
      </main>

      {/* Footer */}
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