'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Check, X, ArrowRight, Bot, Zap, Shield, Clock, FileText, Settings, Play } from 'lucide-react'

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

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState('all')

  const agents = [
    {
      id: 'ndis',
      name: 'NDIS Compliance Specialist',
      category: 'Healthcare',
      description: 'Expert in NDIS Quality & Safeguards Commission standards, verification and certification audits, and participant rights compliance.',
      icon: <Shield className="w-6 h-6" />,
      features: [
        'Verification and certification audit packs',
        'NDIS Quality & Safeguards Commission standards',
        'Participant rights and safeguarding policies',
        'Incident management procedures',
        'Worker screening requirements',
        'Quality management systems'
      ],
      documents: 15,
      timeRange: '45-60 seconds',
      industry: 'NDIS Providers',
      compliance: ['NDIS Practice Standards', 'NDIS Code of Conduct', 'Quality & Safeguards Commission']
    },
    {
      id: 'construction',
      name: 'Construction & Trades Expert',
      category: 'Safety',
      description: 'Specialized in WHS compliance, site safety protocols, and contractor management for construction and trades businesses.',
      icon: <Settings className="w-6 h-6" />,
      features: [
        'Work Health & Safety Act compliance',
        'Site safety management plans',
        'Contractor compliance frameworks',
        'Risk assessment methodologies',
        'Emergency response procedures',
        'Safety training programs'
      ],
      documents: 12,
      timeRange: '40-55 seconds',
      industry: 'Construction & Trades',
      compliance: ['WHS Act 2011', 'Construction Work Code', 'Safe Work Australia Guidelines']
    },
    {
      id: 'childcare',
      name: 'Childcare & Education Pro',
      category: 'Education',
      description: 'Expert in child protection policies, educator compliance, and incident management for childcare and education providers.',
      icon: <FileText className="w-6 h-6" />,
      features: [
        'Child protection policies',
        'Educator compliance frameworks',
        'Incident management procedures',
        'National Quality Framework standards',
        'Staff qualification guidelines',
        'Family engagement strategies'
      ],
      documents: 10,
      timeRange: '35-50 seconds',
      industry: 'Childcare & Education',
      compliance: ['National Quality Framework', 'Child Protection Act', 'Education & Care Services Law']
    },
    {
      id: 'cleaning',
      name: 'Cleaning Services Specialist',
      category: 'Services',
      description: 'Comprehensive compliance for cleaning services including WHS protocols, equipment management, and site-specific procedures.',
      icon: <Shield className="w-6 h-6" />,
      features: [
        'WHS compliance for cleaning operations',
        'Equipment registers and maintenance',
        'Site-specific induction procedures',
        'Chemical safety protocols',
        'Staff training programs',
        'Client safety procedures'
      ],
      documents: 8,
      timeRange: '30-45 seconds',
      industry: 'Cleaning Services',
      compliance: ['WHS Act 2011', 'Chemical Safety Guidelines', 'Industry Standards']
    },
    {
      id: 'fitness',
      name: 'Fitness & Wellness Expert',
      category: 'Health',
      description: 'Specialized in fitness studio compliance including health waivers, staff policies, and first aid requirements.',
      icon: <Zap className="w-6 h-6" />,
      features: [
        'Health and fitness waivers',
        'Staff policies and procedures',
        'First aid and emergency protocols',
        'Equipment safety guidelines',
        'Member safety procedures',
        'Insurance compliance'
      ],
      documents: 9,
      timeRange: '25-40 seconds',
      industry: 'Fitness Studios',
      compliance: ['Fitness Industry Standards', 'Public Liability Requirements', 'WHS Guidelines']
    },
    {
      id: 'freelancer',
      name: 'Freelancer & Coach Assistant',
      category: 'Business',
      description: 'Essential policies for freelancers and coaches including client agreements, privacy protection, and intellectual property.',
      icon: <FileText className="w-6 h-6" />,
      features: [
        'Client service agreements',
        'Privacy and data protection policies',
        'Refund and cancellation policies',
        'Intellectual property protection',
        'Terms of service',
        'Professional liability coverage'
      ],
      documents: 7,
      timeRange: '20-35 seconds',
      industry: 'Freelancers & Coaches',
      compliance: ['Privacy Act 1988', 'Australian Consumer Law', 'IP Protection Guidelines']
    },
    {
      id: 'retail',
      name: 'Retail & E-commerce Pro',
      category: 'Commerce',
      description: 'Complete compliance suite for retail and e-commerce including terms of service, returns policy, and privacy compliance.',
      icon: <Settings className="w-6 h-6" />,
      features: [
        'Terms of service and conditions',
        'Returns and refunds policies',
        'Privacy compliance frameworks',
        'Consumer protection guidelines',
        'Online trading compliance',
        'Data security protocols'
      ],
      documents: 8,
      timeRange: '25-40 seconds',
      industry: 'Retail & E-commerce',
      compliance: ['Australian Consumer Law', 'Privacy Act 1988', 'E-commerce Guidelines']
    },
    {
      id: 'beauty',
      name: 'Beauty & Personal Care Specialist',
      category: 'Health',
      description: 'Expert in beauty industry compliance including infection control, service disclaimers, and staff management.',
      icon: <Shield className="w-6 h-6" />,
      features: [
        'Infection control protocols',
        'Service disclaimers and waivers',
        'Staff handbooks and training',
        'Client safety procedures',
        'Equipment sterilization guidelines',
        'Professional standards compliance'
      ],
      documents: 9,
      timeRange: '30-45 seconds',
      industry: 'Beauty & Personal Care',
      compliance: ['Health Department Guidelines', 'Professional Standards', 'WHS Requirements']
    },
    {
      id: 'hospitality',
      name: 'Hospitality Compliance Expert',
      category: 'Services',
      description: 'Comprehensive hospitality compliance covering staff policies, hygiene standards, and customer safety protocols.',
      icon: <Clock className="w-6 h-6" />,
      features: [
        'Staff policies and procedures',
        'Food safety and hygiene protocols',
        'Customer safety guidelines',
        'Compliance signage requirements',
        'Incident reporting procedures',
        'Licensing compliance'
      ],
      documents: 11,
      timeRange: '35-50 seconds',
      industry: 'Hospitality',
      compliance: ['Food Safety Standards', 'Liquor Licensing', 'WHS Requirements']
    },
    {
      id: 'health',
      name: 'Health Services Specialist',
      category: 'Healthcare',
      description: 'Specialized compliance for health practitioners including data protection, risk management, and patient care policies.',
      icon: <Shield className="w-6 h-6" />,
      features: [
        'Patient data protection policies',
        'Clinical risk management',
        'Professional practice standards',
        'Consent and privacy procedures',
        'Incident reporting frameworks',
        'Therapeutic compliance'
      ],
      documents: 13,
      timeRange: '40-55 seconds',
      industry: 'Health Services (non-NDIS)',
      compliance: ['Privacy Act 1988', 'Therapeutic Goods Administration', 'Professional Registration Standards']
    }
  ]

  const categories = [
    { id: 'all', name: 'All Industries', count: agents.length },
    { id: 'Healthcare', name: 'Healthcare', count: agents.filter(a => a.category === 'Healthcare').length },
    { id: 'Safety', name: 'Safety & Construction', count: agents.filter(a => a.category === 'Safety').length },
    { id: 'Education', name: 'Education', count: agents.filter(a => a.category === 'Education').length },
    { id: 'Services', name: 'Services', count: agents.filter(a => a.category === 'Services').length },
    { id: 'Business', name: 'Business', count: agents.filter(a => a.category === 'Business').length },
    { id: 'Commerce', name: 'Commerce', count: agents.filter(a => a.category === 'Commerce').length },
    { id: 'Health', name: 'Health & Wellness', count: agents.filter(a => a.category === 'Health').length }
  ]

  const filteredAgents = selectedCategory === 'all' 
    ? agents 
    : agents.filter(agent => agent.category === selectedCategory)

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
              <a href="/products" className="text-sm text-gray-900 font-medium">Products</a>
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
        <section className="max-w-6xl mx-auto px-6 pt-20 pb-16 text-center relative">
          <SubtleOrb className="top-10 left-1/4" />
          <SubtleOrb className="top-32 right-1/3" />
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8 mb-16"
          >
            <div className="inline-flex items-center space-x-2 bg-gray-50 border border-gray-200 rounded-full px-4 py-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm font-medium text-gray-700">Industry-trained AI agents</span>
            </div>

            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-[1.1] tracking-tight">
              Meet Your Intelligent
              <br />
              Policy Assistants
            </h1>
            
            <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
              Choose from our library of industry-specific AI agents, each trained on regulatory frameworks and compliance standards for your sector.
            </p>
          </motion.div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3 mb-16">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                  selectedCategory === category.id
                    ? 'bg-black text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category.name}
                <span className="ml-2 text-sm opacity-75">({category.count})</span>
              </button>
            ))}
          </div>
        </section>

        {/* Agents Grid */}
        <section className="max-w-6xl mx-auto px-6 pb-20">
          <div className="grid lg:grid-cols-2 gap-8">
            {filteredAgents.map((agent, index) => (
              <motion.div
                key={agent.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white border border-gray-200 rounded-2xl p-8 hover:border-gray-300 hover:shadow-lg transition-all duration-300"
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                      {agent.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-1">{agent.name}</h3>
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <span>{agent.industry}</span>
                        <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                        <span>{agent.category}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-500">Generation Time</div>
                    <div className="text-sm font-medium text-gray-900">{agent.timeRange}</div>
                  </div>
                </div>

                {/* Description */}
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {agent.description}
                </p>

                {/* Features */}
                <div className="space-y-4 mb-6">
                  <h4 className="text-sm font-semibold text-gray-900">Key Capabilities</h4>
                  <div className="space-y-2">
                    {agent.features.slice(0, 4).map((feature, idx) => (
                      <div key={idx} className="flex items-center space-x-3 text-sm">
                        <Check className="w-4 h-4 text-green-600 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                    {agent.features.length > 4 && (
                      <div className="text-sm text-gray-600 font-medium">
                        +{agent.features.length - 4} more capabilities
                      </div>
                    )}
                  </div>
                </div>

                {/* Compliance Standards */}
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-gray-900 mb-3">Compliance Standards</h4>
                  <div className="flex flex-wrap gap-2">
                    {agent.compliance.map((standard, idx) => (
                      <span key={idx} className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full">
                        {standard}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Stats */}
                <div className="flex items-center justify-between mb-6 pt-4 border-t border-gray-100">
                  <div className="flex items-center space-x-6 text-sm text-gray-600">
                    <div className="flex items-center space-x-2">
                      <FileText className="w-4 h-4" />
                      <span>{agent.documents} documents</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Bot className="w-4 h-4" />
                      <span>AI-powered</span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center space-x-3">
                  <a 
                    href={`/generate?agent=${agent.id}`}
                    className="flex-1 bg-black hover:bg-gray-800 text-white py-3 px-6 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2 group"
                  >
                    <Bot className="w-4 h-4" />
                    <span>Deploy Agent</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </a>
                  <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 p-3 rounded-lg transition-colors">
                    <Play className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Custom Agent CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-16"
          >
            <div className="bg-gray-50 border border-gray-200 rounded-2xl p-12 text-center">
              <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center mx-auto mb-6 border border-gray-200">
                <Settings className="w-8 h-8 text-gray-600" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Need a custom AI agent?</h3>
              <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
                We can train a specialized AI agent for your unique industry requirements, 
                regulatory frameworks, and compliance standards.
              </p>
              <a href="/contact" className="inline-flex items-center space-x-2 bg-black hover:bg-gray-800 text-white px-8 py-4 rounded-lg font-medium transition-colors">
                <span>Request Custom Agent</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </motion.div>
        </section>

        {/* Benefits Section */}
        <section className="py-20 px-6 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Why choose FairForm AI agents?
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Built by compliance experts, trained on real regulations, deployed in seconds.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center mx-auto mb-6 border border-gray-200">
                  <Zap className="w-8 h-8 text-gray-700" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Instant Deployment</h3>
                <p className="text-gray-600 leading-relaxed">
                  Deploy industry-specific AI agents in seconds. No training, setup, or configuration required.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center mx-auto mb-6 border border-gray-200">
                  <Shield className="w-8 h-8 text-gray-700" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Regulatory Expertise</h3>
                <p className="text-gray-600 leading-relaxed">
                  Each agent is trained on current regulations, standards, and best practices for maximum compliance.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center mx-auto mb-6 border border-gray-200">
                  <Clock className="w-8 h-8 text-gray-700" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Always Updated</h3>
                <p className="text-gray-600 leading-relaxed">
                  Our agents are continuously updated with the latest regulatory changes and industry standards.
                </p>
              </div>
            </div>
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