import { motion } from 'framer-motion'
import { Star, Quote } from 'lucide-react'
import { Card } from '@/components/ui/Card'

interface TestimonialProps {
  testimonial: {
    id: string
    name: string
    role: string
    company: string
    content: string
    rating: number
    image?: string
  }
  index: number
}

export default function Testimonial({ testimonial, index }: TestimonialProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.1 }}
      viewport={{ once: true }}
    >
      <Card className="h-full relative">
        {/* Quote Icon */}
        <div className="absolute top-6 right-6 text-primary-gradient-start/20">
          <Quote className="w-8 h-8" />
        </div>
        
        {/* Rating */}
        <div className="flex gap-1 mb-4">
          {[...Array(5)].map((_, i) => (
            <Star 
              key={i} 
              className={`w-5 h-5 ${
                i < testimonial.rating 
                  ? 'fill-accent-gradient-start text-accent-gradient-start' 
                  : 'text-border-subtle'
              }`} 
            />
          ))}
        </div>
        
        {/* Content */}
        <p className="text-text-secondary mb-6 italic relative z-10">
          "{testimonial.content}"
        </p>
        
        {/* Author */}
        <div className="flex items-center gap-4 mt-auto">
          {testimonial.image ? (
            <img
              src={testimonial.image}
              alt={testimonial.name}
              className="w-12 h-12 rounded-full object-cover"
            />
          ) : (
            <div className="w-12 h-12 rounded-full bg-gradient-primary flex items-center justify-center">
              <span className="text-white font-semibold">
                {testimonial.name.charAt(0)}
              </span>
            </div>
          )}
          
          <div>
            <div className="font-medium text-text-primary">{testimonial.name}</div>
            <div className="text-sm text-text-muted">
              {testimonial.role}, {testimonial.company}
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  )
}