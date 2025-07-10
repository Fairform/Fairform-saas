import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'

interface IndustryCardProps {
  industry: {
    id: string
    name: string
    icon: string
    description: string
    documentCount: number
    gradient: string
  }
  index: number
}

export default function IndustryCard({ industry, index }: IndustryCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -8 }}
      className="group relative"
    >
      <div className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-10 blur-xl transition-opacity duration-500"
           style={{ background: industry.gradient }} />
      
      <Card hover className="h-full">
        <div className="flex items-start justify-between mb-4">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r opacity-20 blur-lg"
                 style={{ background: industry.gradient }} />
            <div className="relative w-14 h-14 rounded-xl bg-gradient-to-r flex items-center justify-center"
                 style={{ background: industry.gradient }}>
              <span className="text-2xl">{industry.icon}</span>
            </div>
          </div>
          
          <span className="text-sm text-text-muted">
            {industry.documentCount} documents
          </span>
        </div>
        
        <h3 className="text-xl font-semibold text-text-primary mb-2 group-hover:gradient-text transition-all">
          {industry.name}
        </h3>
        <p className="text-text-secondary mb-4 line-clamp-2">
          {industry.description}
        </p>
        
        <Link href={`/products#${industry.id}`}>
          <Button variant="secondary" size="sm" className="w-full group">
            View Pack
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </Link>
      </Card>
    </motion.div>
  )
}