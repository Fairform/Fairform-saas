'use client'

import { motion, Variants } from 'framer-motion'
import Link from 'next/link'
import { ArrowRightIcon, ChevronRightIcon, ClockIcon, DocumentTextIcon } from '@heroicons/react/24/outline'
import GradientOrb from './GradientOrb'

interface Agent {
  emoji: string
  name: string
  category: string
  color: 'blue' | 'orange' | 'purple' | 'green' | 'pink'
  features: string[]
  estimatedTime: string
  documentsCount: number
  href: string
}

const agents: Agent[] = [
  {
    emoji: '🏥',
    name: 'NDIS Expert',
    category: 'Disability Services',
    color: 'blue',
    features: ['Quality Standards', 'Safeguarding Policies', 'Practice Standards'],
    estimatedTime: '45-60 sec',
    documentsCount: 12,
    href: '/agents/ndis'
  },
  {
    emoji: '🏗️',
    name: 'Construction Safety',
    category: 'WHS & Safety', 
    color: 'orange',
    features: ['WHS Compliance', 'Risk Assessments', 'Safety Procedures'],
    estimatedTime: '50-65 sec',
    documentsCount: 15,
    href: '/agents/construction'
  },
  {
    emoji: '👶',
    name: 'Childcare Pro',
    category: 'Early Learning',
    color: 'purple',
    features: ['NQF Standards', 'Child Protection', 'Educational Programs'],
    estimatedTime: '40-55 sec',
    documentsCount: 10,
    href: '/agents/childcare'
  },
  {
    emoji: '🩺',
    name: 'Healthcare',
    category: 'Medical Compliance',
    color: 'green',
    features: ['Patient Safety', 'Clinical Standards', 'Privacy Policies'],
    estimatedTime: '55-70 sec',
    documentsCount: 14,
    href: '/agents/healthcare'
  }
]

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
}

const cardVariants: Variants = {
  hidden: { 
    opacity: 0, 
    y: 30,
    scale: 0.95
  },
  visible: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94] as const
    }
  }
}

export default function AgentShowcase() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50/50 via-white to-blue-50/30 pointer-events-none" />
      
      <div className="max-w-6xl mx-auto relative">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center space-x-2 bg-blue-50 border border-blue-100 rounded-full px-4 py-2 mb-6">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
            <span className="text-blue-700 text-sm font-medium">AI-Powered Specialists</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 tracking-tight">
            Industry-specific{" "}
            <span className="bg-gradient-to-r from-blue-600 via-violet-600 to-purple-600 bg-clip-text text-transparent">
              AI agents
            </span>
          </h2>
          
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Each agent is trained on specific regulations and requirements for your industry, 
            ensuring compliant and professional policy documents every time.
          </p>
        </motion.div>

        {/* Agent cards grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
        >
          {agents.map((agent, index) => (
            <motion.div
              key={agent.name}
              variants={cardVariants}
              className="group relative"
            >
              <div className="bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-xl hover:border-gray-300 transition-all duration-500 hover:-translate-y-1 h-full relative overflow-hidden">
                {/* Background orb glow */}
                <div className="absolute -top-8 -right-8 opacity-20">
                  <GradientOrb size="large" color={agent.color} animated={false} />
                </div>
                
                <div className="relative z-10">
                  {/* Agent header */}
                  <div className="flex items-center space-x-3 mb-6">
                    <GradientOrb 
                      size="medium" 
                      color={agent.color} 
                      emoji={agent.emoji}
                      className="flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-gray-900 text-lg truncate">
                        {agent.name}
                      </h3>
                      <p className="text-sm text-gray-600 font-medium">
                        {agent.category}
                      </p>
                    </div>
                  </div>

                  {/* Features list */}
                  <div className="space-y-3 mb-6">
                    {agent.features.map((feature, i) => (
                      <div key={i} className="flex items-center space-x-3 text-sm">
                        <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full flex-shrink-0" />
                        <span className="text-gray-700 leading-relaxed">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* Stats */}
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-6 p-3 bg-gray-50 rounded-xl">
                    <div className="flex items-center space-x-1">
                      <DocumentTextIcon className="w-3 h-3" />
                      <span>{agent.documentsCount} documents</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <ClockIcon className="w-3 h-3" />
                      <span>{agent.estimatedTime}</span>
                    </div>
                  </div>

                  {/* CTA button */}
                  <Link
                    href={agent.href}
                    className="group/btn w-full bg-gray-900 hover:bg-gray-800 text-white py-3 px-4 rounded-xl text-sm font-semibold transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl"
                  >
                    <span>Generate policies</span>
                    <ArrowRightIcon className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </Link>
                </div>

                {/* Hover effect overlay */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-transparent via-transparent to-gray-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Link 
            href="/agents" 
            className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-semibold transition-colors bg-blue-50 hover:bg-blue-100 px-6 py-3 rounded-xl group"
          >
            <span>Explore all AI agents</span>
            <ChevronRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
          
          <p className="text-sm text-gray-500 mt-4 max-w-md mx-auto">
            More industry specialists coming soon. Request a custom agent for your specific compliance needs.
          </p>
        </motion.div>
      </div>
    </section>
  )
}