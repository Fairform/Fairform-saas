'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  ArrowRight, 
  Shield,
  Users,
  Brain,
  FileText,
  Award,
  Target,
  Lightbulb,
  CheckCircle,
  Heart,
  Building2,
  Clock
} from 'lucide-react'

// Navigation helper component - prevents 404 errors
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

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">

      {/* Main content */}
      <main>
        {/* Hero Section */}
        <section className="max-w-4xl mx-auto px-6 pt-20 pb-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div className="inline-flex items-center space-x-2 bg-gray-50 border border-gray-200 rounded-full px-4 py-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span className="text-sm font-medium text-gray-700">Making compliance accessible to everyone</span>
            </div>

            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-[1.1] tracking-tight">
              Simplifying compliance,<br />
              one policy at a time
            </h1>
            
            <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
              We believe every business deserves access to professional compliance documentation, 
              regardless of size or budget. That's why we built Formative.
            </p>
          </motion.div>
        </section>

        {/* Story Section */}
        <section className="py-20 px-6 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                  The problem we saw
                </h2>
                <div className="space-y-6 text-gray-600 leading-relaxed">
                  <p>
                    While working with NDIS providers and small businesses across Australia, we noticed the same 
                    frustrating pattern: entrepreneurs and operators spending weeks waiting for expensive consultants 
                    to deliver basic compliance documents.
                  </p>
                  <p>
                    <strong className="text-gray-900">A simple privacy policy could take 3 weeks and cost $3,000.</strong> 
                    Meanwhile, businesses remained non-compliant, risking fines and losing opportunities.
                  </p>
                  <p>
                    We knew there had to be a better way. What if we could combine industry expertise with 
                    AI to make professional compliance documentation accessible to everyone?
                  </p>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-8 border border-gray-200"
              >
                <div className="space-y-6">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-gray-900 mb-2">3 weeks</div>
                    <div className="text-gray-600">Average wait time for consultants</div>
                  </div>
                  <div className="text-center border-t border-gray-200 pt-6">
                    <div className="text-4xl font-bold text-black mb-2">60 seconds</div>
                    <div className="text-gray-600">Average time with Formative</div>
                  </div>
                  <div className="text-center border-t border-gray-200 pt-6">
                    <div className="text-2xl font-bold text-green-600 mb-2">90% less cost</div>
                    <div className="text-gray-600">Than traditional consulting</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Mission & Values */}
        <section className="py-20 px-6 bg-white">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Our mission & values
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Guided by our commitment to making compliance simple, accessible, and reliable.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: Shield,
                  title: "Accuracy First",
                  description: "Every document is built on real compliance requirements and industry best practices. We don't take shortcuts when it comes to your business protection."
                },
                {
                  icon: Users,
                  title: "Accessible to All",
                  description: "Professional compliance shouldn't be a privilege. We're democratizing access to expert-level documentation for businesses of every size."
                },
                {
                  icon: Lightbulb,
                  title: "Continuous Innovation",
                  description: "We're constantly improving our AI and expanding our coverage to serve more industries and compliance requirements."
                }
              ].map((value, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center"
                >
                  <div className="w-16 h-16 bg-gray-100 rounded-xl flex items-center justify-center mx-auto mb-6">
                    <value.icon className="w-8 h-8 text-gray-700" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">{value.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats & Achievements */}
        <section className="py-20 px-6 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Growing impact
              </h2>
              <p className="text-xl text-gray-600">
                Numbers that reflect our commitment to making compliance easier.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  number: "200+",
                  label: "Businesses served",
                  icon: Building2
                },
                {
                  number: "10+",
                  label: "Industries covered",
                  icon: Target
                },
                {
                  number: "5,000+",
                  label: "Documents generated",
                  icon: FileText
                },
                {
                  number: "4.9/5",
                  label: "Customer satisfaction",
                  icon: Award
                }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-lg p-6 border border-gray-200 text-center"
                >
                  <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <stat.icon className="w-6 h-6 text-gray-700" />
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-2">{stat.number}</div>
                  <div className="text-gray-600">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Team Philosophy */}
        <section className="py-20 px-6 bg-white">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
                Built by compliance professionals, for real businesses
              </h2>
              <div className="bg-gray-50 rounded-2xl p-8 md:p-12 border border-gray-200">
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  "We're not just technologists building another AI tool. Our team includes compliance 
                  specialists, former auditors, and business operators who understand the real challenges 
                  of staying compliant in Australia."
                </p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  <strong className="text-gray-900">Every template is reviewed by industry experts.</strong> 
                  Every feature is tested with real businesses. We're building the compliance solution 
                  we wish we'd had when running our own companies.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-6 bg-gray-50">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Ready to experience Formative?
              </h2>
              <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                Join the hundreds of Australian businesses already using Formative to simplify their compliance.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <NavigationLink
                  href="/signup"
                  className="bg-black text-white hover:bg-gray-800 font-medium px-8 py-4 rounded-lg transition-colors inline-flex items-center space-x-2 text-lg"
                >
                  <span>Get started</span>
                  <ArrowRight className="w-5 h-5" />
                </NavigationLink>
                <NavigationLink
                  href="/product"
                  className="border border-gray-300 text-gray-700 hover:bg-gray-50 font-medium px-8 py-4 rounded-lg transition-colors inline-flex items-center space-x-2 text-lg"
                >
                  <span>Explore products</span>
                </NavigationLink>
              </div>
              
              {/* Trust indicators */}
              <div className="flex flex-wrap items-center justify-center gap-8 text-sm text-gray-500 pt-8 mt-8 border-t border-gray-200">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span>NDIS compliant templates</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span>Expert-reviewed documents</span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
    </div>
  )
}
