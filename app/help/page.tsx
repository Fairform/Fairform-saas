'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  ArrowRight, 
  Shield,
  Award,
  Search,
  ChevronDown,
  ChevronRight,
  BookOpen,
  FileText,
  Users,
  Zap,
  Building2,
  Heart,
  CheckCircle,
  MessageCircle,
  Download,
  Settings,
  AlertTriangle,
  Clock,
  Star
} from 'lucide-react'
import Logo from '../../components/Logo'

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

// FAQ Item Component
const FAQItem = ({ question, answer, isOpen, onClick }: {
  question: string
  answer: string
  isOpen: boolean
  onClick: () => void
}) => (
  <div className="border border-gray-200 rounded-lg">
    <button
      onClick={onClick}
      className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
    >
      <span className="font-medium text-gray-900">{question}</span>
      {isOpen ? (
        <ChevronDown className="w-5 h-5 text-gray-500" />
      ) : (
        <ChevronRight className="w-5 h-5 text-gray-500" />
      )}
    </button>
    {isOpen && (
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: 'auto' }}
        transition={{ duration: 0.3 }}
        className="px-6 pb-4 border-t border-gray-200"
      >
        <p className="text-gray-600 leading-relaxed">{answer}</p>
      </motion.div>
    )}
  </div>
)

export default function HelpPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [openFAQ, setOpenFAQ] = useState<number | null>(0)
  const [selectedCategory, setSelectedCategory] = useState('getting-started')

  const faqData = {
    'getting-started': [
      {
        question: "How do I get started with Formative?",
        answer: "Getting started is simple: choose your industry, select a document pack that matches your needs, provide basic business information, and our AI will generate your complete compliance documentation in under 60 seconds."
      },
      {
        question: "What information do I need to provide?",
        answer: "You'll need basic business details like your company name, industry type, services offered, and any specific compliance requirements. The more specific you are, the better we can customize your documents."
      },
      {
        question: "How long does it take to generate documents?",
        answer: "Most document packs are generated within 60 seconds. Complex custom packs may take up to 5 minutes. You'll receive an email notification when your documents are ready for download."
      },
      {
        question: "Can I customize the generated documents?",
        answer: "Absolutely! All documents are provided in editable Word format, allowing you to customize content, add your branding, and modify sections to match your specific operational needs."
      }
    ],
    'compliance': [
      {
        question: "Are Formative documents legally compliant?",
        answer: "Our documents are designed to align with current regulatory standards and industry best practices. However, compliance requirements vary by jurisdiction and business circumstances. We recommend having them reviewed by your legal advisor."
      },
      {
        question: "How do you ensure NDIS compliance?",
        answer: "Our NDIS templates are built specifically for the NDIS Practice Standards and Quality and Safeguards Framework. They're regularly updated by compliance specialists familiar with NDIS requirements."
      },
      {
        question: "What if regulations change?",
        answer: "We continuously monitor regulatory changes and update our templates accordingly. Customers receive notifications when significant updates are available for their industry."
      },
      {
        question: "Can I use these documents for audits?",
        answer: "Our documents are designed to support your compliance efforts and audit readiness. However, you should conduct your own compliance review and seek professional guidance for audit preparation."
      }
    ],
    'industries': [
      {
        question: "Which industries do you support?",
        answer: "We currently support NDIS Services, Construction & Trades, Healthcare, Education & Childcare, Hospitality, Transport & Logistics, and Professional Services. We're constantly expanding our coverage."
      },
      {
        question: "Can you create custom packs for my industry?",
        answer: "Yes! If your industry isn't covered by our standard packs, we can create custom documentation tailored to your specific regulatory requirements and operational needs."
      },
      {
        question: "How industry-specific are the documents?",
        answer: "Very specific. Each pack is built around the unique compliance requirements, terminology, and operational realities of that industry. We don't use generic templates."
      }
    ],
    'technical': [
      {
        question: "What file formats do you provide?",
        answer: "All documents are provided in Microsoft Word (.docx) and PDF formats. Word files allow for easy customization, while PDFs are ready for immediate sharing or printing."
      },
      {
        question: "How do I download my documents?",
        answer: "Once generated, you'll receive a download link via email. Documents are also available in your Formative dashboard for 90 days after generation."
      },
      {
        question: "Can I generate documents multiple times?",
        answer: "Yes, you can regenerate documents as many times as needed. This is useful when your business details change or you need updates for different locations."
      }
    ]
  }

  const helpCategories = [
    { id: 'getting-started', name: 'Getting Started', icon: Zap },
    { id: 'compliance', name: 'Compliance', icon: Shield },
    { id: 'industries', name: 'Industries', icon: Building2 },
    { id: 'technical', name: 'Technical', icon: Settings }
  ]

  const quickActions = [
    {
      title: "Download Sample Documents",
      description: "See examples of our compliance documentation",
      icon: Download,
      action: "View Samples"
    },
    {
      title: "Contact Support",
      description: "Get help from our compliance specialists",
      icon: MessageCircle,
      action: "Get Help"
    },
    {
      title: "Custom Pack Request",
      description: "Need industry-specific documentation?",
      icon: FileText,
      action: "Request Custom"
    }
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <header className="w-full border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <NavigationLink href="/" className="flex items-center space-x-2">
              <span className="text-lg font-medium text-gray-900">Formative</span>
            </NavigationLink>
            
            <nav className="hidden md:flex items-center space-x-6">
              <NavigationLink href="/product" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">Product</NavigationLink>
              <NavigationLink href="/pricing" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">Pricing</NavigationLink>
              <NavigationLink href="/about" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">About</NavigationLink>
            </nav>
          </div>

          <div className="flex items-center space-x-4">
            <NavigationLink href="/login" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">Log in</NavigationLink>
            <NavigationLink href="/signup" className="bg-black text-white text-sm px-4 py-2 rounded-md hover:bg-gray-800 transition-colors">
              Sign up
            </NavigationLink>
          </div>
        </div>
      </header>

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
              <BookOpen className="w-4 h-4 text-gray-600" />
              <span className="text-sm font-medium text-gray-700">Help Center</span>
            </div>

            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-[1.1] tracking-tight">
              How can we help?
            </h1>
            
            <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
              Find answers to common questions, learn how to use Formative effectively, 
              and get the support you need for your compliance requirements.
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search for help articles, FAQs, or topics..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-lg text-lg focus:ring-2 focus:ring-black focus:border-black transition-colors"
              />
            </div>
          </motion.div>
        </section>

        {/* Quick Actions */}
        <section className="py-20 px-6 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Quick Actions</h2>
              <p className="text-gray-600">Get started quickly with these common tasks</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {quickActions.map((action, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-lg p-6 border border-gray-200 hover:shadow-lg transition-all cursor-pointer"
                >
                  <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mb-4">
                    <action.icon className="w-6 h-6 text-gray-700" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{action.title}</h3>
                  <p className="text-gray-600 text-sm mb-4">{action.description}</p>
                  <div className="flex items-center text-black hover:text-gray-700 font-medium">
                    <span>{action.action}</span>
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 px-6 bg-white">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
              <p className="text-gray-600">Find answers to the most common questions about Formative</p>
            </div>

            <div className="grid lg:grid-cols-4 gap-8">
              {/* Category Navigation */}
              <div className="lg:col-span-1">
                <div className="space-y-2">
                  {helpCategories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => {
                        setSelectedCategory(category.id)
                        setOpenFAQ(0)
                      }}
                      className={`w-full text-left px-4 py-3 rounded-lg transition-colors flex items-center space-x-3 ${
                        selectedCategory === category.id
                          ? 'bg-black text-white'
                          : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <category.icon className="w-5 h-5" />
                      <span>{category.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* FAQ Content */}
              <div className="lg:col-span-3">
                <div className="space-y-4">
                  {faqData[selectedCategory as keyof typeof faqData]?.map((faq, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <FAQItem
                        question={faq.question}
                        answer={faq.answer}
                        isOpen={openFAQ === index}
                        onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
                      />
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Getting Started Guide */}
        <section className="py-20 px-6 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Getting Started with Formative</h2>
              <p className="text-gray-600">Follow these simple steps to create your first compliance documents</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  step: 1,
                  title: "Choose Your Industry",
                  description: "Select from our comprehensive list of industries or request a custom pack for your specific sector.",
                  icon: Building2,
                  details: ["NDIS Services", "Construction & Trades", "Healthcare", "Education & Childcare", "And more..."]
                },
                {
                  step: 2,
                  title: "Provide Business Details",
                  description: "Enter your company information and specific requirements to ensure accurate document generation.",
                  icon: FileText,
                  details: ["Company name & location", "Services offered", "Compliance requirements", "Operational details"]
                },
                {
                  step: 3,
                  title: "Download & Customize",
                  description: "Receive professional documents in Word and PDF formats, ready to customize with your branding.",
                  icon: Download,
                  details: ["Editable Word documents", "Print-ready PDFs", "Custom branding options", "Regular updates included"]
                }
              ].map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-lg p-8 border border-gray-200 relative"
                >
                  <div className="absolute -top-4 left-8">
                    <div className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center text-sm font-bold">
                      {step.step}
                    </div>
                  </div>
                  
                  <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mb-6 mt-4">
                    <step.icon className="w-6 h-6 text-gray-700" />
                  </div>
                  
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">{step.title}</h3>
                  <p className="text-gray-600 mb-6">{step.description}</p>
                  
                  <ul className="space-y-2">
                    {step.details.map((detail, idx) => (
                      <li key={idx} className="flex items-center text-sm text-gray-600">
                        <CheckCircle className="w-4 h-4 text-green-600 mr-2 flex-shrink-0" />
                        {detail}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Support Section */}
        <section className="py-20 px-6 bg-white">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Still need help?</h2>
              <p className="text-xl text-gray-600 mb-8">
                Our compliance specialists are here to help with your specific requirements
              </p>
              
              <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
                <NavigationLink
                  href="/contact"
                  className="bg-black text-white p-6 rounded-lg hover:bg-gray-800 transition-colors"
                >
                  <MessageCircle className="w-8 h-8 mx-auto mb-4" />
                  <div className="font-semibold mb-2">Contact Support</div>
                  <div className="text-sm opacity-90">Get personalized help</div>
                </NavigationLink>
                
                <a 
                  href="mailto:support@formative.ai"
                  className="border-2 border-gray-300 text-gray-700 p-6 rounded-lg hover:border-gray-400 hover:bg-gray-50 transition-colors"
                >
                  <Clock className="w-8 h-8 mx-auto mb-4" />
                  <div className="font-semibold mb-2">Email Support</div>
                  <div className="text-sm">24-hour response time</div>
                </a>
              </div>

              <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <p className="text-blue-800 text-sm">
                  <strong>Pro tip:</strong> Include your industry and specific compliance requirements 
                  in your support request for faster, more accurate assistance.
                </p>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-100">
        <div className="max-w-6xl mx-auto px-6 py-12">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-8 md:space-y-0">
            <span className="text-lg font-medium text-gray-900">Formative</span>
            
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
                    <Award className="w-4 h-4 text-white" />
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
              
              <div>© 2024 Formative. All rights reserved.</div>
            </div>
          </div>

          {/* Legal Disclaimer */}
          <div className="border-t border-gray-100 mt-8 pt-8">
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-sm font-semibold text-gray-900 mb-3">Important Legal Disclaimer</h3>
              <div className="text-[10px] text-gray-600 space-y-2 leading-relaxed">
                <p>
                  <strong>Professional Advice:</strong> Formative provides AI-generated compliance documents for informational purposes only. These documents do not constitute legal, professional, or regulatory advice. Users should always consult with qualified legal professionals, compliance specialists, or industry experts before implementing any policies or procedures.
                </p>
                <p>
                  <strong>NDIS Compliance:</strong> Our NDIS document templates are designed to align with NDIS Practice Standards and Quality and Safeguards Framework. However, NDIS compliance requirements may vary by provider type and services offered. Users must ensure their specific obligations are met.
                </p>
                <p>
                  <strong>Regulatory Compliance:</strong> While our documents are designed to align with current regulatory standards, compliance requirements vary by jurisdiction, industry, and specific business circumstances. Users are solely responsible for ensuring their policies meet applicable laws and regulations in their specific context.
                </p>
                <p>
                  <strong>No Warranty:</strong> Formative makes no warranties, express or implied, regarding the accuracy, completeness, or fitness for purpose of generated documents. We do not guarantee that our documents will ensure regulatory compliance or prevent legal issues.
                </p>
                <p>
                  <strong>Limitation of Liability:</strong> To the maximum extent permitted by law, Formative, its officers, employees, and affiliates shall not be liable for any direct, indirect, incidental, consequential, or punitive damages arising from the use of our platform or generated documents.
                </p>
                <p>
                  <strong>User Responsibility:</strong> Users must review, customize, and validate all generated documents for their specific needs, applicable laws, and industry standards. Regular updates and reviews of policies are essential to maintain compliance as regulations evolve.
                </p>
                <p>
                  <strong>Audit and Implementation:</strong> While our documents are designed to support your compliance efforts, users should conduct their own compliance audits and seek professional guidance for implementation and ongoing compliance monitoring.
                </p>
                <p className="pt-2 border-t border-gray-200">
                  By using Formative, you acknowledge that you have read, understood, and agree to these terms. You confirm that you will seek appropriate professional advice and conduct proper due diligence before implementing any generated documents.
                </p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
