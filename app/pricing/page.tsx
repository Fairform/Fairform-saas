'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useAuth } from '@/hooks/useAuth'
import { 
  Check, 
  ArrowRight, 
  X,
  Star,
  Shield,
  Zap,
  Users,
  Download,
  Brain,
  FileText,
  Clock,
  MessageCircle
} from 'lucide-react'
import Logo from '../../components/Logo'

// Checkout hook
const useCheckout = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { user, session } = useAuth()

  const initiateCheckout = async (priceId: string, planName: string) => {
    setLoading(true)
    setError(null)

    if (!user || !session) {
      window.location.href = '/login'
      setLoading(false)
      return
    }

    try {
      const response = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.access_token}`
        },
        body: JSON.stringify({
          priceId,
          userId: user.id,
          customerEmail: user.email,
          metadata: {
            planName,
            source: 'pricing_page'
          }
        })
      })

      const data = await response.json()
      
      if (!response.ok) {
        if (data.error === 'Invalid pricing configuration') {
          setError('This plan is not yet available. Please contact support.')
        } else if (data.error === 'Stripe not configured') {
          setError('Payment system is currently unavailable. Please try again later.')
        } else {
          setError(data.details || data.error || 'Failed to create checkout session')
        }
        setLoading(false)
        return
      }
      
      if (data.url) {
        window.location.href = data.url
      }
    } catch (error: any) {
      setError(error.message)
      console.error('Checkout failed:', error)
    } finally {
      setLoading(false)
    }
  }

  return { initiateCheckout, loading, error }
}

// Navigation helper component
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

// Price IDs - Replace with your actual Stripe price IDs
const PRICE_IDS = {
  // One-time purchases
  LITE_PACK: 'price_lite_pack',
  PRO_PACK: 'price_pro_pack',
  NDIS_PACK: 'price_ndis_pack',
  CONSTRUCTION_PACK: 'price_construction_pack',
  
  // Monthly subscriptions
  STARTER_MONTHLY: 'price_starter_monthly',
  PRO_MONTHLY: 'price_pro_monthly',
  AGENCY_MONTHLY: 'price_agency_monthly',
}

export default function PricingPage() {
  const [pricingMode, setPricingMode] = useState('monthly') // 'monthly' or 'oneTime'
  const [billingCycle, setBillingCycle] = useState('monthly') // 'monthly' or 'yearly'
  const { initiateCheckout, loading, error } = useCheckout()
  const { user } = useAuth()

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
            <div className="inline-flex items-center space-x-2 bg-green-50 border border-green-200 rounded-full px-4 py-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm font-medium text-green-700">Get compliant in 60 seconds</span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Stop paying thousands for compliance consultants
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Get the exact same professional documents that cost $5,000+ from consultants. Download instantly, customize with your branding, and be compliant today.
            </p>
            
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 max-w-md mx-auto">
              <div className="text-sm text-yellow-800">
                <strong>Limited Time:</strong> Save up to 95% vs hiring consultants
              </div>
            </div>
          </motion.div>
        </section>

        {/* Error Display */}
        {error && (
          <div className="max-w-md mx-auto mb-8 px-6">
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
              {error}
            </div>
          </div>
        )}

        {/* Pricing Toggle */}
        <section className="max-w-6xl mx-auto px-6 pb-12" id="pricing">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Choose your path to instant compliance
            </h2>
            <p className="text-gray-600">One-time purchase or ongoing compliance support - both save you thousands</p>
          </div>
          
          <div className="flex items-center justify-center mb-12">
            <div className="bg-gray-200 p-1 rounded-lg">
              <button
                onClick={() => setPricingMode('oneTime')}
                className={`px-6 py-3 rounded-md text-sm font-medium transition-colors ${
                  pricingMode === 'oneTime' 
                    ? 'bg-white text-gray-900 shadow-sm' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                One-Time Purchase
                <span className="block text-xs text-green-600 mt-1">Save 90% vs consultants</span>
              </button>
              <button
                onClick={() => setPricingMode('monthly')}
                className={`px-6 py-3 rounded-md text-sm font-medium transition-colors ${
                  pricingMode === 'monthly' 
                    ? 'bg-white text-gray-900 shadow-sm' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Monthly Plans
                <span className="block text-xs text-blue-600 mt-1">Always up-to-date</span>
              </button>
            </div>
          </div>

          {/* One-time Purchase Plans */}
          {pricingMode === 'oneTime' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {[
                {
                  name: "Lite Pack",
                  price: "$79",
                  currency: "AUD",
                  description: "Perfect for quick compliance needs",
                  priceId: PRICE_IDS.LITE_PACK,
                  features: [
                    "PDF format only",
                    "Watermarked documents", 
                    "Non-editable",
                    "Basic compliance coverage",
                    "Email support"
                  ],
                  notIncluded: [
                    "Word format",
                    "Custom branding",
                    "Priority support"
                  ]
                },
                {
                  name: "Pro Pack",
                  price: "$189",
                  currency: "AUD", 
                  description: "Complete professional solution",
                  priceId: PRICE_IDS.PRO_PACK,
                  features: [
                    "Word & PDF formats",
                    "Fully editable documents",
                    "Custom branding support",
                    "Audit-ready documents",
                    "Priority email support",
                    "Legal compliance guaranteed"
                  ],
                  notIncluded: [],
                  popular: true
                },
                {
                  name: "NDIS Full Pack",
                  price: "$499",
                  currency: "AUD",
                  description: "Complete NDIS compliance suite",
                  priceId: PRICE_IDS.NDIS_PACK,
                  features: [
                    "30+ NDIS-specific documents",
                    "Verification audit ready",
                    "Certification audit ready",
                    "NDIS Commission compliant",
                    "Word & PDF formats",
                    "Dedicated NDIS support"
                  ],
                  notIncluded: []
                },
                {
                  name: "Construction Pack",
                  price: "$349", 
                  currency: "AUD",
                  description: "Construction & trade essentials",
                  priceId: PRICE_IDS.CONSTRUCTION_PACK,
                  features: [
                    "SWMS templates",
                    "JSA documents", 
                    "Risk assessment matrices",
                    "Contract templates",
                    "Safety procedure docs",
                    "Industry-specific compliance"
                  ],
                  notIncluded: []
                }
              ].map((plan, index) => (
                <div 
                  key={index}
                  className={`bg-white rounded-2xl p-6 relative border-2 transition-all hover:shadow-xl ${
                    plan.popular 
                      ? 'border-black shadow-lg transform scale-105' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <span className="bg-black text-white px-4 py-1 rounded-full text-sm font-medium">
                        Most popular
                      </span>
                    </div>
                  )}
                  
                  <div className="text-center mb-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                    
                    <div className="mb-2">
                      <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                      <span className="text-gray-600 ml-1">{plan.currency}</span>
                    </div>
                    <p className="text-sm text-gray-600">{plan.description}</p>
                  </div>

                  <div className="space-y-4 mb-8">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">What you get:</h4>
                      <ul className="space-y-2">
                        {plan.features.map((feature, i) => (
                          <li key={i} className="flex items-center space-x-3 text-sm">
                            <Check className="w-4 h-4 text-green-600 flex-shrink-0" />
                            <span className="text-gray-700">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    {plan.notIncluded.length > 0 && (
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3">Not included:</h4>
                        <ul className="space-y-2">
                          {plan.notIncluded.map((feature, i) => (
                            <li key={i} className="flex items-center space-x-3 text-sm">
                              <X className="w-4 h-4 text-gray-400 flex-shrink-0" />
                              <span className="text-gray-500">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  <button 
                    onClick={() => initiateCheckout(plan.priceId, plan.name)}
                    disabled={loading}
                    className={`w-full py-4 px-6 rounded-lg font-bold text-lg transition-all disabled:opacity-50 transform hover:scale-105 ${
                      plan.popular 
                        ? 'bg-black hover:bg-gray-800 text-white shadow-lg'
                        : 'bg-gray-900 hover:bg-black text-white'
                    }`}
                  >
                    {loading ? 'Processing...' : `Get ${plan.name} Now`}
                  </button>
                  
                  <div className="text-center mt-3">
                    <div className="text-[10px] text-gray-500">Instant download</div>
                    <div className="text-[10px] text-gray-500">Lifetime access</div>
                  </div>
                </div>
              ))}
            </motion.div>
          )}

          {/* Monthly Subscription Plans */}
          {pricingMode === 'monthly' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {[
                {
                  name: "Starter",
                  price: "$129",
                  currency: "AUD/month",
                  description: "Perfect for small businesses",
                  priceId: PRICE_IDS.STARTER_MONTHLY,
                  features: [
                    "3 documents per month",
                    "Core industry templates",
                    "PDF downloads",
                    "Email support",
                    "Basic compliance coverage"
                  ],
                  notIncluded: [
                    "Word format",
                    "Unlimited documents",
                    "Priority support",
                    "Custom branding"
                  ]
                },
                {
                  name: "Pro",
                  price: "$179",
                  currency: "AUD/month",
                  description: "Everything you need to scale",
                  priceId: PRICE_IDS.PRO_MONTHLY,
                  features: [
                    "Unlimited documents",
                    "All industry templates",
                    "Word & PDF formats",
                    "Custom branding support",
                    "Priority support",
                    "Advanced compliance features"
                  ],
                  notIncluded: [],
                  popular: true
                },
                {
                  name: "Agency", 
                  price: "$499",
                  currency: "AUD/month",
                  description: "For agencies & consultants",
                  priceId: PRICE_IDS.AGENCY_MONTHLY,
                  features: [
                    "Everything in Pro",
                    "Team collaboration",
                    "White-label branding",
                    "Unlimited client documents",
                    "Multi-client management",
                    "Dedicated account manager"
                  ],
                  notIncluded: []
                },
                {
                  name: "Enterprise",
                  price: "Custom",
                  currency: "pricing",
                  description: "Large organizations",
                  priceId: null,
                  features: [
                    "Everything in Agency",
                    "API access",
                    "Custom integrations",
                    "Bulk document generation",
                    "SLA agreements",
                    "On-site training",
                    "Custom workflows"
                  ],
                  notIncluded: []
                }
              ].map((plan, index) => (
                <div 
                  key={index}
                  className={`bg-white rounded-2xl p-6 relative border-2 transition-all hover:shadow-xl ${
                    plan.popular 
                      ? 'border-black shadow-lg transform scale-105' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <span className="bg-black text-white px-4 py-1 rounded-full text-sm font-medium">
                        Most popular
                      </span>
                    </div>
                  )}
                  
                  <div className="text-center mb-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                    <div className="mb-2">
                      <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                      <span className="text-gray-600 ml-1 text-sm">{plan.currency}</span>
                    </div>
                    <p className="text-sm text-gray-600">{plan.description}</p>
                  </div>

                  <div className="space-y-4 mb-8">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">What you get:</h4>
                      <ul className="space-y-2">
                        {plan.features.map((feature, i) => (
                          <li key={i} className="flex items-center space-x-3 text-sm">
                            <Check className="w-4 h-4 text-green-600 flex-shrink-0" />
                            <span className="text-gray-700">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    {plan.notIncluded.length > 0 && (
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3">Upgrade to get:</h4>
                        <ul className="space-y-2">
                          {plan.notIncluded.map((feature, i) => (
                            <li key={i} className="flex items-center space-x-3 text-sm">
                              <X className="w-4 h-4 text-gray-400 flex-shrink-0" />
                              <span className="text-gray-500">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  <button 
                    onClick={() => {
                      if (plan.name === 'Enterprise') {
                        window.location.href = '/contact'
                      } else if (plan.priceId) {
                        initiateCheckout(plan.priceId, plan.name)
                      }
                    }}
                    disabled={loading}
                    className={`w-full py-4 px-6 rounded-lg font-bold text-lg transition-all disabled:opacity-50 transform hover:scale-105 ${
                      plan.popular 
                        ? 'bg-black hover:bg-gray-800 text-white shadow-lg'
                        : 'bg-gray-900 hover:bg-black text-white'
                    }`}
                  >
                    {loading ? 'Processing...' : (plan.name === 'Enterprise' ? 'Talk to Sales' : `Start ${plan.name} Plan`)}
                  </button>
                  
                  <div className="text-center mt-3">
                    <div className="text-[10px] text-gray-500">Cancel anytime</div>
                    <div className="text-[10px] text-gray-500">No contracts or commitments</div>
                  </div>
                </div>
              ))}
            </motion.div>
          )}
        </section>

        {/* Features Comparison */}
        <section className="py-20 px-6 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Everything you need for compliance
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Professional-grade features designed for modern businesses.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: Zap,
                  title: "Lightning Fast Generation",
                  description: "Create comprehensive policy documents in under 60 seconds. Our AI engine processes complex requirements instantly."
                },
                {
                  icon: Shield,
                  title: "Audit-Ready Documents", 
                  description: "Every document meets regulatory standards and passes professional audits. Guarantee compliance with confidence."
                },
                {
                  icon: Brain,
                  title: "Industry Expertise",
                  description: "Trained on thousands of compliance documents across 10+ industries including NDIS, construction, healthcare, and more."
                },
                {
                  icon: Users,
                  title: "Team Collaboration",
                  description: "Share, review, and collaborate on policies with your entire team. Track changes and maintain version control."
                },
                {
                  icon: Download,
                  title: "Export Anywhere",
                  description: "Download as PDF, Word, or integrate with your existing document management systems via our API."
                },
                {
                  icon: Clock,
                  title: "Always Up-to-Date",
                  description: "Policies automatically reflect the latest regulatory changes. Never worry about outdated compliance requirements."
                }
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center bg-white rounded-lg p-6 border border-gray-200"
                >
                  <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mb-4 mx-auto">
                    <feature.icon className="w-6 h-6 text-gray-700" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 px-6 bg-white">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Questions? We've got answers
              </h2>
              <p className="text-xl text-gray-600">
                Everything you need to know to make the right decision today.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {[
                {
                  question: "How much will I really save vs hiring consultants?",
                  answer: "Compliance consultants typically charge $5,000-$15,000+ for basic documentation packages. Our Pro Pack at $189 gives you the same professional quality for 95% less. That's $7,000+ saved on your first purchase alone."
                },
                {
                  question: "Are these documents actually legally compliant?",
                  answer: "Yes! Every document follows current regulatory frameworks and industry standards. However, we recommend having them reviewed by your legal team for your specific situation - just like you would with any consultant's work."
                },
                {
                  question: "How do I know these are better than consultant documents?",
                  answer: "Our documents are created using the same frameworks and standards that top-tier consultants use, but with AI precision and consistency. Many consultants actually use similar templates - you're just cutting out the middleman and markup."
                },
                {
                  question: "How quickly can I get my documents?",
                  answer: "Instantly! As soon as your payment is confirmed, you'll receive download links for all your documents. No waiting weeks for consultants - you can be compliant in the next 5 minutes."
                },
                {
                  question: "Can I really customize these with my branding?",
                  answer: "Absolutely! Our Pro Pack and higher include fully editable Word documents. Remove watermarks, add your logo, customize content, and make them 100% yours. It's like having a consultant create them just for you."
                },
                {
                  question: "What if my industry isn't listed?",
                  answer: "Contact us! We create custom compliance packs for unique industries all the time. Many of our most popular packs started as custom requests. We'll work with you to create exactly what you need."
                }
              ].map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-gray-50 rounded-lg p-6 hover:bg-gray-100 transition-colors"
                >
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">{faq.question}</h3>
                  <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                </motion.div>
              ))}
            </div>

            <div className="text-center mt-12">
              <div className="bg-green-50 border border-green-200 rounded-lg p-6 max-w-md mx-auto">
                <p className="text-green-800 font-semibold mb-2">Still have questions?</p>
                <p className="text-green-700 text-sm mb-4">Get answers from our compliance experts in under 2 hours</p>
                <NavigationLink 
                  href="/contact" 
                  className="inline-flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>Chat with Expert</span>
                </NavigationLink>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-20 px-6 bg-gradient-to-br from-gray-900 to-black">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-6 py-3 rounded-full inline-block mb-8">
              <span className="font-bold">LIMITED TIME: Save up to 95% vs consultants</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Don't wait weeks for compliance.
              <br />
              <span className="text-yellow-400">Get it done today.</span>
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Join 200+ businesses who chose instant compliance over expensive consultants. Download your documents in the next 5 minutes.
            </p>
            
            <div className="grid md:grid-cols-3 gap-6 mb-10">
              <div className="bg-white/10 backdrop-blur rounded-lg p-6">
                <div className="text-3xl font-bold text-yellow-400 mb-2">$7,311</div>
                <div className="text-white text-sm">Average savings vs consultants</div>
              </div>
              <div className="bg-white/10 backdrop-blur rounded-lg p-6">
                <div className="text-3xl font-bold text-green-400 mb-2">60 sec</div>
                <div className="text-white text-sm">Time to get compliant</div>
              </div>
              <div className="bg-white/10 backdrop-blur rounded-lg p-6">
                <div className="text-3xl font-bold text-blue-400 mb-2">200+</div>
                <div className="text-white text-sm">Businesses trust Formative</div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
              <button
                onClick={() => {
                  const pricingSection = document.getElementById('pricing')
                  if (pricingSection) {
                    pricingSection.scrollIntoView({ behavior: 'smooth' })
                  }
                }}
                className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold px-10 py-5 rounded-lg transition-all transform hover:scale-105 inline-flex items-center space-x-2 text-xl shadow-xl"
              >
                <span>Get Instant Compliance</span>
                <ArrowRight className="w-6 h-6" />
              </button>
              <NavigationLink
                href="/contact"
                className="border-2 border-white text-white hover:bg-white hover:text-black font-bold px-10 py-5 rounded-lg transition-all inline-flex items-center space-x-2 text-xl"
              >
                <MessageCircle className="w-6 h-6" />
                <span>Talk to Expert First</span>
              </NavigationLink>
            </div>
            
            <div className="flex items-center justify-center space-x-8 text-sm text-gray-400">
              <div className="flex items-center space-x-2">
                <Check className="w-4 h-4 text-green-400" />
                <span>No hidden fees</span>
              </div>
              <div className="flex items-center space-x-2">
                <Check className="w-4 h-4 text-green-400" />
                <span>Instant download</span>
              </div>
              <div className="flex items-center space-x-2">
                <Check className="w-4 h-4 text-green-400" />
                <span>Lifetime access</span>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-100 bg-white">
        <div className="max-w-6xl mx-auto px-6 py-12">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-8 md:space-y-0">
            <div className="flex items-center space-x-2">
              <Logo width={24} height={24} showText={true} />
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
                  <strong>Refund Policy:</strong> All sales are final. Due to the instant digital delivery nature of our products, refunds are not provided once documents have been downloaded. We encourage users to carefully review product descriptions and contact our support team with questions before purchasing.
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
