'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDownIcon } from '@heroicons/react/24/outline'

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const faqs = [
    {
      question: 'How accurate are the AI-generated compliance documents?',
      answer: 'Our AI uses GPT-4 technology trained on extensive compliance databases and regulatory frameworks. Documents are generated using current industry standards and best practices. However, we always recommend having documents reviewed by qualified legal professionals for your specific circumstances.'
    },
    {
      question: 'Which industries do you support?',
      answer: 'We support 20+ industries including NDIS disability services, construction, childcare, healthcare, aged care, education, food service, manufacturing, and many more. Each industry has specialized templates that incorporate relevant regulations and standards.'
    },
    {
      question: 'Can I customize the generated documents?',
      answer: 'Yes! All documents are provided in editable DOCX format so you can customize them to your specific needs. You can add your branding, modify sections, and adapt policies to your unique business requirements.'
    },
    {
      question: 'How long does document generation take?',
      answer: 'Most compliance packs are generated in 45-70 seconds. The exact time depends on the number of documents requested and complexity of your industry requirements. Our AI works incredibly fast while maintaining high quality.'
    },
    {
      question: 'Are the documents audit-ready?',
      answer: 'Yes, our documents are structured to meet audit requirements and include all essential components like purpose, scope, procedures, responsibilities, and review processes. They follow industry best practices for compliance documentation.'
    },
    {
      question: 'What happens to my business information?',
      answer: 'Your business information is securely stored and used only to generate your documents. We follow strict privacy policies and never share your data with third parties. You maintain full ownership of all generated documents.'
    },
    {
      question: 'Can I get support with implementation?',
      answer: 'Pro and Enterprise plans include priority support to help with document implementation. Our team can provide guidance on policy rollout, staff training recommendations, and compliance best practices.'
    },
    {
      question: 'Do you offer bulk discounts for multiple locations?',
      answer: 'Yes, Enterprise plans are designed for businesses with multiple locations or complex needs. Contact our sales team for custom pricing and features tailored to your organization.'
    }
  ]

  return (
    <section className="section-padding bg-gray-50">
      <div className="container-width">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center space-y-4 mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-heading font-bold text-gray-900">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Everything you need to know about FairForm and our compliance document generation service.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                viewport={{ once: true }}
                className="glass-card rounded-xl overflow-hidden"
              >
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full px-8 py-6 text-left flex items-center justify-between hover:bg-gray-50/50 transition-colors"
                >
                  <h3 className="text-lg font-medium text-gray-900 pr-8">
                    {faq.question}
                  </h3>
                  <motion.div
                    animate={{ rotate: openIndex === index ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="flex-shrink-0"
                  >
                    <ChevronDownIcon className="h-5 w-5 text-gray-500" />
                  </motion.div>
                </button>
                
                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-8 pb-6">
                        <div className="border-t border-gray-200 pt-6">
                          <p className="text-gray-600 leading-relaxed">
                            {faq.answer}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Contact CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="glass-card rounded-xl p-8">
            <h3 className="text-xl font-heading font-semibold text-gray-900 mb-4">
              Still have questions?
            </h3>
            <p className="text-gray-600 mb-6">
              Our support team is here to help you get started with compliance document generation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:support@fairform.com"
                className="btn-primary"
              >
                Contact Support
              </a>
              <a
                href="/contact"
                className="btn-secondary"
              >
                Schedule Demo
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}