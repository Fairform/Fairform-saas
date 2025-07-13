'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { CheckIcon, SparklesIcon } from '@heroicons/react/24/outline'
import { formatPrice } from '../lib/utils'
import { PRICING_PLANS } from '../lib/stripe'

export default function Pricing() {
  const plans = Object.values(PRICING_PLANS)

  return (
    <section id="pricing" className="section-padding bg-white">
      <div className="container-width">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center space-y-4 mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-heading font-bold text-gray-900">
            Simple, Transparent Pricing
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Choose the plan that fits your business needs. All plans include our industry-leading AI technology.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`relative group ${plan.popular ? 'scale-105' : ''}`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-full text-sm font-medium flex items-center space-x-2">
                    <SparklesIcon className="h-4 w-4" />
                    <span>Most Popular</span>
                  </div>
                </div>
              )}
              
              <div className={`glass-card rounded-2xl p-8 h-full transition-all duration-300 ${
                plan.popular 
                  ? 'ring-2 ring-blue-500 shadow-xl' 
                  : 'hover:shadow-xl group-hover:-translate-y-1'
              }`}>
                <div className="space-y-6">
                  {/* Plan Header */}
                  <div className="text-center space-y-2">
                    <h3 className="text-2xl font-heading font-bold text-gray-900">
                      {plan.name}
                    </h3>
                    <p className="text-gray-600">
                      {plan.description}
                    </p>
                  </div>

                  {/* Pricing */}
                  <div className="text-center space-y-1">
                    <div className="flex items-baseline justify-center space-x-1">
                      <span className="text-4xl font-heading font-bold text-gray-900">
                        {formatPrice(plan.price)}
                      </span>
                      {plan.interval && (
                        <span className="text-gray-600">/{plan.interval}</span>
                      )}
                    </div>
                    {!plan.interval && (
                      <p className="text-sm text-gray-500">One-time payment</p>
                    )}
                  </div>

                  {/* Features */}
                  <div className="space-y-4">
                    <ul className="space-y-3">
                      {plan.features.map((feature) => (
                        <li key={feature} className="flex items-start space-x-3">
                          <div className="flex-shrink-0 w-5 h-5 bg-green-100 rounded-full flex items-center justify-center mt-0.5">
                            <CheckIcon className="h-3 w-3 text-green-600" />
                          </div>
                          <span className="text-gray-700 text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* CTA Button */}
                  <div className="pt-6">
                    <Link
                      href={`/pricing?plan=${plan.id}`}
                      className={`block w-full text-center py-3 px-6 rounded-lg font-medium transition-all duration-200 ${
                        plan.popular
                          ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl'
                          : 'bg-gray-900 hover:bg-gray-800 text-white'
                      }`}
                    >
                      {plan.interval ? 'Start Free Trial' : 'Get Started'}
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-20 text-center space-y-8"
        >
          <h3 className="text-2xl font-heading font-bold text-gray-900">
            Frequently Asked Questions
          </h3>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto text-left">
            <div className="space-y-3">
              <h4 className="font-semibold text-gray-900">Can I cancel anytime?</h4>
              <p className="text-gray-600 text-sm">
                Yes, you can cancel your subscription at any time. No long-term contracts or cancellation fees.
              </p>
            </div>
            <div className="space-y-3">
              <h4 className="font-semibold text-gray-900">Are documents legally compliant?</h4>
              <p className="text-gray-600 text-sm">
                Our documents are created using industry standards and regulations, but we recommend legal review for your specific needs.
              </p>
            </div>
            <div className="space-y-3">
              <h4 className="font-semibold text-gray-900">What formats are available?</h4>
              <p className="text-gray-600 text-sm">
                All documents are available in both DOCX and PDF formats for maximum compatibility.
              </p>
            </div>
            <div className="space-y-3">
              <h4 className="font-semibold text-gray-900">Do you offer refunds?</h4>
              <p className="text-gray-600 text-sm">
                We offer a 30-day money-back guarantee if you're not satisfied with our service.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}