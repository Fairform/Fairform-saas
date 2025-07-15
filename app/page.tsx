'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useAuth } from '@/hooks/useAuth'
import Logo from '@/components/Logo'
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
  Play,
  Building2,
  Heart,
  Briefcase,
  Home,
  Truck,
  GraduationCap,
  ChevronRight,
  Award,
  BookOpen,
  Target,
  Lightbulb
} from 'lucide-react'

// Navigation helper component - minimal fix for 404 error
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
  const { user, session } = useAuth()

  const handleStartNow = () => {
    if (!user || !session) {
      window.location.href = '/signup'
      return
    }
    window.location.href = '/dashboard'
  }
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <header className="w-full border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <NavigationLink href="/" className="flex items-center space-x-2">
              <Logo width={24} height={24} />
            </NavigationLink>
            
            <nav className="hidden md:flex items-center space-x-6">
              <NavigationLink href="/product" className="text-sm text-gray-600 hover:text-gray-900">Product</NavigationLink>
              <NavigationLink href="/pricing" className="text-sm text-gray-600 hover:text-gray-900">Pricing</NavigationLink>
              <NavigationLink href="/about" className="text-sm text-gray-600 hover:text-gray-900">About</NavigationLink>
            </nav>
          </div>

          <div className="flex items-center space-x-4">
            <NavigationLink 
              href="/login" 
              className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
            >
              Log in
            </NavigationLink>
            <NavigationLink 
              href="/signup" 
              className="bg-black text-white text-sm px-4 py-2 rounded-md hover:bg-gray-800 transition-colors"
            >
              Sign up
            </NavigationLink>
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
            {/* Badge with logos */}
            <div className="space-y-4">
              <div className="inline-flex items-center space-x-2 bg-gray-50 border border-gray-200 rounded-full px-4 py-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm font-medium text-gray-700">Trusted by 200+ businesses</span>
              </div>
              
              {/* Company logos */}
              <div className="flex items-center justify-center space-x-6 opacity-70">
                <div className="bg-white border border-gray-200 rounded-lg px-3 py-2 flex items-center space-x-2">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white text-xs font-bold">
                    H
                  </div>
                  <span className="text-xs font-medium text-gray-600">HealthCare Plus</span>
                </div>
                <div className="bg-white border border-gray-200 rounded-lg px-3 py-2 flex items-center space-x-2">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center text-white text-xs font-bold">
                    S
                  </div>
                  <span className="text-xs font-medium text-gray-600">Support Services</span>
                </div>
                <div className="bg-white border border-gray-200 rounded-lg px-3 py-2 flex items-center space-x-2">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white text-xs font-bold">
                    B
                  </div>
                  <span className="text-xs font-medium text-gray-600">BuildSafe</span>
                </div>
              </div>
            </div>

            {/* Main headline */}
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-[1.1] tracking-tight">
              Meet Your Intelligent
              <br />
              Policy Assistant
            </h1>

            {/* Subtitle */}
            <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
              The AI-powered Assistant to help you read, write, and organise policy with ease. Generate professional compliance documents in seconds, not weeks.
            </p>

            {/* CTA buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <button
                onClick={handleStartNow}
                className="bg-black hover:bg-gray-800 text-white font-medium px-8 py-4 rounded-lg transition-colors inline-flex items-center space-x-2 text-lg"
              >
                <span>Start now</span>
                <ArrowRight className="w-5 h-5" />
              </button>
              <button className="text-gray-700 hover:text-gray-900 font-medium px-8 py-4 transition-colors inline-flex items-center space-x-2">
                <Play className="w-5 h-5" />
                <span>See how it works</span>
              </button>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap items-center justify-center gap-8 text-sm text-gray-500 pt-8">
              <div className="flex items-center space-x-2">
                <Check className="w-4 h-4 text-green-600" />
                <span>Expert-reviewed documents</span>
              </div>
              <div className="flex items-center space-x-2">
                <Check className="w-4 h-4 text-green-600" />
                <span>Professional plan</span>
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
                            <div className="ml-auto text-[10px] text-gray-500">2.3 KB</div>
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

        {/* How It Works */}
        <section className="py-20 px-6 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                How FairForm works
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                From business details to compliance documents in three simple steps.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  step: "01",
                  title: "Tell us about your business",
                  description: "Simply select your industry and describe your services. Our intelligent system understands the unique compliance requirements for your sector.",
                  icon: Target
                },
                {
                  step: "02",
                  title: "AI generates your policies",
                  description: "Our advanced AI engine creates comprehensive, industry-specific compliance documents tailored to your business needs in under 60 seconds.",
                  icon: Brain
                },
                {
                  step: "03",
                  title: "Download and implement",
                  description: "Receive professional, audit-ready documents in Word and PDF formats. Customize with your branding and implement immediately.",
                  icon: Download
                }
              ].map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className="relative"
                >
                  <div className="bg-white rounded-lg p-8 border border-gray-200 h-full">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center mr-4">
                        <step.icon className="w-6 h-6 text-white" />
                      </div>
                      <span className="text-2xl font-bold text-gray-300">{step.step}</span>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">{step.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{step.description}</p>
                  </div>
                  {index < 2 && (
                    <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                      <ChevronRight className="w-8 h-8 text-gray-300" />
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Industries We Serve */}
        <section className="py-20 px-6 bg-white">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Built for every industry
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                FairForm understands the unique compliance requirements across diverse sectors.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  icon: Heart,
                  name: "NDIS Services",
                  description: "Complete NDIS compliance documentation including quality frameworks, safeguards, and participant rights.",
                  documents: "30+ documents"
                },
                {
                  icon: Building2,
                  name: "Construction",
                  description: "SWMS, JSA, risk assessments, safety procedures, and contract templates for construction projects.",
                  documents: "25+ documents"
                },
                {
                  icon: Briefcase,
                  name: "Professional Services",
                  description: "Privacy policies, data protection, client agreements, and professional standards documentation.",
                  documents: "20+ documents"
                },
                {
                  icon: Home,
                  name: "Hospitality",
                  description: "Food safety, hygiene protocols, staff training, and customer service policy frameworks.",
                  documents: "18+ documents"
                },
                {
                  icon: Truck,
                  name: "Transport & Logistics",
                  description: "Vehicle safety, driver policies, cargo handling, and chain of responsibility documentation.",
                  documents: "22+ documents"
                },
                {
                  icon: GraduationCap,
                  name: "Education & Training",
                  description: "Student safety, training compliance, assessment policies, and educational standards documentation.",
                  documents: "24+ documents"
                }
              ].map((industry, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-gray-50 rounded-lg p-6 border border-gray-200 hover:shadow-lg transition-all"
                >
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center mr-3">
                      <industry.icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{industry.name}</h3>
                      <span className="text-sm text-green-600 font-medium">{industry.documents}</span>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed">{industry.description}</p>
                </motion.div>
              ))}
            </div>

            <div className="text-center mt-12">
              <p className="text-gray-600 mb-4">Don't see your industry? We're constantly expanding our coverage.</p>
              <NavigationLink href="/contact" className="text-black hover:text-gray-700 font-medium inline-flex items-center space-x-2">
                <span>Request your industry</span>
                <ArrowRight className="w-4 h-4" />
              </NavigationLink>
            </div>
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
                  title: "Compliance-focused", 
                  description: "Every document follows regulatory frameworks and industry standards to support your compliance efforts."
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

        {/* Why Choose FairForm */}
        <section className="py-20 px-6 bg-white">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                  Why businesses choose FairForm
                </h2>
                <div className="space-y-6">
                  {[
                    {
                      icon: Award,
                      title: "Professional Quality",
                      description: "Every document is professionally written, follows industry best practices, and designed to support your compliance efforts."
                    },
                    {
                      icon: Lightbulb,
                      title: "Smart Technology",
                      description: "Our AI understands context, regulations, and industry-specific requirements to generate accurate policies."
                    },
                    {
                      icon: Clock,
                      title: "Save Time & Money",
                      description: "Reduce policy creation time from weeks to minutes. No need for expensive consultants or legal reviews."
                    },
                    {
                      icon: BookOpen,
                      title: "Continuous Updates",
                      description: "Stay current with evolving regulations. Our system automatically incorporates the latest compliance requirements."
                    }
                  ].map((benefit, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="flex items-start space-x-4"
                    >
                      <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <benefit.icon className="w-5 h-5 text-gray-700" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">{benefit.title}</h3>
                        <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
              
              <div className="lg:order-first">
                <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200">
                  <div className="space-y-6">
                    <div className="text-center">
                      <div className="text-4xl font-bold text-gray-900 mb-2">200+</div>
                      <div className="text-gray-600">Document templates</div>
                    </div>
                    <div className="grid grid-cols-2 gap-6 text-center">
                      <div>
                        <div className="text-2xl font-bold text-gray-900 mb-1">60s</div>
                        <div className="text-gray-600 text-sm">Average generation time</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-gray-900 mb-1">200+</div>
                        <div className="text-gray-600 text-sm">Document templates</div>
                      </div>
                    </div>
                    <div className="border-t border-gray-200 pt-6">
                      <div className="flex items-center justify-center space-x-2">
                        <div className="flex -space-x-2">
                          {[
                            { bg: 'from-blue-400 to-blue-600', initial: 'A' },
                            { bg: 'from-green-400 to-green-600', initial: 'M' },
                            { bg: 'from-purple-400 to-purple-600', initial: 'S' },
                            { bg: 'from-orange-400 to-orange-600', initial: 'L' }
                          ].map((avatar, i) => (
                            <div key={i} className={`w-8 h-8 rounded-full border-2 border-white bg-gradient-to-br ${avatar.bg} flex items-center justify-center text-white text-xs font-semibold`}>
                              {avatar.initial}
                            </div>
                          ))}
                        </div>
                        <span className="text-sm text-gray-600 ml-2">Trusted by 200+ businesses</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Expanded Social Proof */}
        <section className="py-20 px-6 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Loved by compliance teams worldwide
              </h2>
              <p className="text-xl text-gray-600">
                See how FairForm is transforming compliance for businesses like yours.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  quote: "FairForm completely transformed our policy creation process. What used to take our team weeks now happens in minutes. The quality is outstanding and our recent audit was the smoothest we've ever had.",
                  author: "Sarah Johnson",
                  role: "Compliance Director",
                  company: "HealthCare Plus",
                  industry: "Healthcare",
                  rating: 5,
                  highlight: "Reduced policy creation time by 95%"
                },
                {
                  quote: "As an NDIS provider, compliance is critical. FairForm understands the nuances of NDIS requirements better than any consultant we've worked with. It's like having a compliance expert on our team 24/7.",
                  author: "Michael Chen",
                  role: "Operations Manager", 
                  company: "Support Services Co.",
                  industry: "NDIS Services",
                  rating: 5,
                  highlight: "Excellent NDIS compliance support"
                },
                {
                  quote: "The AI generates policies that are more comprehensive and detailed than what we were creating manually. Our legal team was impressed with the accuracy and professional structure.",
                  author: "Emma Wilson",
                  role: "Safety Coordinator",
                  company: "BuildSafe Construction",
                  industry: "Construction",
                  rating: 5,
                  highlight: "Improved policy quality significantly"
                },
                {
                  quote: "We've rolled out FairForm across all our sites. The consistency and quality of documentation has improved dramatically. Our insurance premiums even decreased due to better risk management.",
                  author: "David Rodriguez",
                  role: "Risk Manager",
                  company: "Metro Transport Group",
                  industry: "Transport & Logistics",
                  rating: 5,
                  highlight: "Reduced insurance premiums by 15%"
                },
                {
                  quote: "FairForm saved us thousands in consulting fees. The documents are professional, thorough, and specifically tailored to our industry. Our staff actually read and follow these policies.",
                  author: "Lisa Thompson",
                  role: "HR Director",
                  company: "Coastal Hospitality",
                  industry: "Hospitality",
                  rating: 5,
                  highlight: "Saved $25,000 in consulting fees"
                },
                {
                  quote: "The speed and accuracy are incredible. We can now respond to compliance requests same-day instead of waiting weeks for external consultants. It's revolutionized our operations.",
                  author: "James Park",
                  role: "General Manager",
                  company: "Premier Education Services",
                  industry: "Education",
                  rating: 5,
                  highlight: "Same-day compliance responses"
                }
              ].map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-all"
                >
                  <div className="flex space-x-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  
                  <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-4">
                    <div className="text-sm font-medium text-green-800">{testimonial.highlight}</div>
                  </div>
                  
                  <blockquote className="text-gray-700 mb-4 leading-relaxed">
                    "{testimonial.quote}"
                  </blockquote>
                  
                    <div className="border-t border-gray-100 pt-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-400 to-gray-600 flex items-center justify-center text-white font-semibold flex-shrink-0">
                          {testimonial.author.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <div>
                              <div className="font-semibold text-gray-900">{testimonial.author}</div>
                              <div className="text-sm text-gray-600">{testimonial.role}</div>
                              <div className="text-sm text-gray-600">{testimonial.company}</div>
                            </div>
                            <div className="text-right">
                              <div className="text-[10px] text-gray-500 bg-gray-100 px-2 py-1 rounded">
                                {testimonial.industry}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                </motion.div>
              ))}
            </div>

            <div className="text-center mt-12">
              <div className="bg-white rounded-lg p-6 border border-gray-200 inline-block">
                <div className="flex items-center space-x-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">4.9/5</div>
                    <div className="text-sm text-gray-600">Average rating</div>
                  </div>
                  <div className="text-center border-l border-gray-200 pl-6">
                    <div className="text-2xl font-bold text-gray-900">200+</div>
                    <div className="text-sm text-gray-600">Happy customers</div>
                  </div>
                  <div className="text-center border-l border-gray-200 pl-6">
                    <div className="text-2xl font-bold text-gray-900">10+</div>
                    <div className="text-sm text-gray-600">Industries served</div>
                  </div>
                </div>
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
              Join hundreds of businesses already using FairForm to create professional compliance documents with AI.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <NavigationLink
                href="/signup"
                className="bg-black text-white hover:bg-gray-800 font-medium px-8 py-4 rounded-lg transition-colors inline-flex items-center space-x-2 text-lg"
              >
                <span>Start now</span>
                <ArrowRight className="w-5 h-5" />
              </NavigationLink>
              <NavigationLink
                href="/pricing"
                className="border border-gray-300 text-gray-700 hover:bg-gray-50 font-medium px-8 py-4 rounded-lg transition-colors inline-flex items-center space-x-2 text-lg"
              >
                <span>View pricing</span>
              </NavigationLink>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-100">
        <div className="max-w-6xl mx-auto px-6 py-12">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-8 md:space-y-0">
            <Logo width={24} height={24} />
            
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
              
              <div>© 2024 FairForm. All rights reserved.</div>
            </div>
          </div>

          {/* Legal Disclaimer */}
          <div className="border-t border-gray-100 mt-8 pt-8">
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-sm font-semibold text-gray-900 mb-3">Important Legal Disclaimer</h3>
              <div className="text-[10px] text-gray-600 space-y-2 leading-relaxed">
                <p>
                  <strong>NDIS Compliance:</strong> Our NDIS document templates are designed to align with NDIS Practice Standards and Quality and Safeguards Framework. However, NDIS compliance requirements may vary by provider type and services offered. Users must ensure their specific obligations are met.
                </p>
                <p>
                  <strong>Professional Advice:</strong> FairForm provides AI-generated compliance documents for informational purposes only. These documents do not constitute legal, professional, or regulatory advice. Users should always consult with qualified legal professionals, compliance specialists, or industry experts before implementing any policies or procedures.
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
                  <strong>Audit and Implementation:</strong> While our documents are designed to be audit-ready, users should conduct their own compliance audits and seek professional guidance for implementation and ongoing compliance monitoring.
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
