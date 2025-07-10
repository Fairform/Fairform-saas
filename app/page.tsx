'use client'

import Link from 'next/link'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  ArrowRight, 
  CheckCircle, 
  Zap, 
  Shield, 
  FileText, 
  Users,
  Brain,
  Search,
  Award,
  Download,
  BarChart3,
  Star,
  Bell,
  Sparkles,
  Target,
  Play,
  Briefcase
} from 'lucide-react'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import GradientOrb from '@/components/gradient-orb'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import IndustryCard from '@/components/IndustryCard'
import Testimonial from '@/components/Testimonial'

export default function HomePage() {
  const [isPlaying, setIsPlaying] = useState(false)

  const industries = [
    {
      id: 'ndis',
      name: 'NDIS & Allied Health',
      icon: '🏥',
      description: 'Complete compliance packs for disability service providers',
      documentCount: 25,
      gradient: 'linear-gradient(135deg, #667EEA 0%, #764BA2 100%)'
    },
    {
      id: 'construction',
      name: 'Construction & Trades',
      icon: '🏗️',
      description: 'WHS policies and safety procedures for construction sites',
      documentCount: 20,
      gradient: 'linear-gradient(135deg, #F093FB 0%, #F5576C 100%)'
    },
    {
      id: 'childcare',
      name: 'Childcare & Education',
      icon: '👶',
      description: 'Policies for early learning and education services',
      documentCount: 22,
      gradient: 'linear-gradient(135deg, #4FACFE 0%, #00F2FE 100%)'
    },
    {
      id: 'hospitality',
      name: 'Hospitality & Venues',
      icon: '🍽️',
      description: 'Food safety and venue management policies',
      documentCount: 18,
      gradient: 'linear-gradient(135deg, #43E97B 0%, #38F9D7 100%)'
    }
  ]

  const testimonials = [
    {
      id: '1',
      name: 'Sarah Mitchell',
      role: 'Operations Manager',
      company: 'Sunshine Care Services',
      content: 'FairForm transformed our compliance process. What used to take weeks now takes minutes. The subscription model gives us access to everything we need.',
      rating: 5
    },
    {
      id: '2',
      name: 'James Chen',
      role: 'Director',
      company: 'BuildSafe Construction',
      content: 'The AI agents understand Australian regulations perfectly. We generated our entire WHS policy suite in one afternoon. Incredible value for money.',
      rating: 5
    },
    {
      id: '3',
      name: 'Emma Wilson',
      role: 'Centre Manager',
      company: 'Little Learners Childcare',
      content: 'As a childcare provider, compliance is critical. FairForm keeps us updated with the latest requirements and the documents are always audit-ready.',
      rating: 5
    }
  ]

  return (
    <>
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative min-h-screen overflow-hidden bg-surface-dark">
        {/* Gradient Background Effects */}
        <div className="absolute inset-0">
          <GradientOrb size="w-96 h-96" top="0" left="20%" />
          <GradientOrb color="from-accent-gradient-start to-accent-gradient-end" size="w-96 h-96" bottom="0" right="20%" delay={0.5} />
        </div>
        
        {/* Grid Pattern Overlay */}
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />
        
        <div className="relative z-10 container mx-auto px-6 pt-32 pb-20">
          <div className="max-w-5xl mx-auto text-center">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full bg-surface-elevated border border-border-subtle"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-success" />
              </span>
              <span className="text-sm text-text-secondary">AI-Powered Policy Generation</span>
            </motion.div>
            
            {/* Hero Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-hero font-bold text-text-primary mb-6"
            >
              Create Professional
              <span className="relative inline-block mx-3">
                <span className="absolute inset-0 bg-gradient-primary blur-lg opacity-75" />
                <span className="relative gradient-text">Policies</span>
              </span>
              in Minutes
            </motion.h1>
            
            {/* Hero Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-text-secondary max-w-3xl mx-auto mb-10"
            >
              Fairform's AI agents generate compliant, professional-grade policy documents 
              for NDIS, Healthcare, Construction, and 15+ industries. No templates, no hassle.
            </motion.p>
            
            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <Link href="/pricing">
                <Button size="lg" className="group">
                  Start Subscription
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              
              <Button variant="secondary" size="lg" onClick={() => setIsPlaying(!isPlaying)}>
                <Play className="mr-2 h-5 w-5" />
                Watch Demo
              </Button>
            </motion.div>
            
            {/* Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="grid grid-cols-3 gap-8 max-w-2xl mx-auto mt-20"
            >
              {[
                { value: "50K+", label: "Policies Generated" },
                { value: "15+", label: "Industries Covered" },
                { value: "99.8%", label: "Compliance Rate" }
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl font-bold gradient-text">
                    {stat.value}
                  </div>
                  <div className="text-sm text-text-muted mt-1">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <div className="w-6 h-10 rounded-full border-2 border-border-subtle flex justify-center">
            <motion.div
              animate={{ y: [0, 15, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="w-1 h-3 bg-text-secondary rounded-full mt-2"
            />
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-surface-elevated relative overflow-hidden">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-sm font-medium text-primary-gradient-start">FEATURES</span>
            <h2 className="text-h2 font-bold text-text-primary mt-4 mb-6">
              Everything You Need for Compliance
            </h2>
            <p className="text-xl text-text-secondary max-w-3xl mx-auto">
              Our AI-powered platform provides all the tools you need to generate, manage, 
              and maintain compliance documents across your organization.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Brain,
                title: "AI-Powered Generation",
                description: "Smart agents trained on thousands of compliant documents generate policies tailored to your business."
              },
              {
                icon: Shield,
                title: "Always Compliant",
                description: "Documents updated automatically when regulations change. Stay compliant without the manual work."
              },
              {
                icon: FileText,
                title: "Industry-Specific",
                description: "Pre-configured packs for 15+ industries including NDIS, construction, childcare, and healthcare."
              },
              {
                icon: Users,
                title: "Team Collaboration",
                description: "Share documents, assign reviews, and manage compliance across your entire organization."
              },
              {
                icon: BarChart3,
                title: "Compliance Analytics",
                description: "Track your compliance score, identify gaps, and get recommendations for improvement."
              },
              {
                icon: Zap,
                title: "Instant Updates",
                description: "Regulatory changes are monitored 24/7 and documents are updated automatically."
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card hover>
                  <feature.icon className="w-12 h-12 text-primary-gradient-start mb-6" />
                  <h3 className="text-xl font-semibold text-text-primary mb-3">{feature.title}</h3>
                  <p className="text-text-secondary">{feature.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Industries Section */}
      <section className="py-24 bg-surface-dark relative">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-sm font-medium text-accent-gradient-start">INDUSTRIES</span>
            <h2 className="text-h2 font-bold text-text-primary mt-4 mb-6">
              Compliance Packs for Every Industry
            </h2>
            <p className="text-xl text-text-secondary max-w-3xl mx-auto">
              Subscribe to access all industry packs and generate unlimited compliance documents.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {industries.map((industry, index) => (
              <IndustryCard key={industry.id} industry={industry} index={index} />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Link href="/products">
              <Button variant="secondary" size="lg">
                View All Industries
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-surface-elevated relative overflow-hidden">
        <GradientOrb color="from-primary-gradient-start to-primary-gradient-end" size="w-96 h-96" top="10%" right="-10%" />
        
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-sm font-medium text-success">TESTIMONIALS</span>
            <h2 className="text-h2 font-bold text-text-primary mt-4 mb-6">
              Trusted by Thousands of Businesses
            </h2>
            <p className="text-xl text-text-secondary max-w-3xl mx-auto">
              See why businesses across Australia choose FairForm for their compliance needs.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Testimonial key={testimonial.id} testimonial={testimonial} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-surface-dark relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-primary opacity-10" />
        
        <div className="container mx-auto px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-h2 font-bold text-text-primary mb-6">
              Ready to Simplify Your Compliance?
            </h2>
            <p className="text-xl text-text-secondary mb-8">
              Join thousands of businesses using FairForm to stay compliant. 
              Start your 14-day free trial today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/pricing">
                <Button size="lg">
                  Start Free Trial
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/document-engine">
                <Button variant="secondary" size="lg">
                  Try Demo
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </>
  )
}