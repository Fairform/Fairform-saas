import { motion } from 'framer-motion'
import { Play, Pause, CheckCircle, Loader2, Brain, Shield, FileText, Users, BarChart3, Zap } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/utils'

interface AgentCardProps {
  agent: {
    id: string
    name: string
    description: string
    icon: string
    status: 'idle' | 'running' | 'completed'
    capabilities: string[]
    performance: {
      accuracy: number
      speed: string
      documents: number
    }
  }
  onRun: (id: string) => void
}

const iconMap = {
  Brain,
  Shield,
  FileText,
  Users,
  BarChart3,
  Zap
}

export default function AgentCard({ agent, onRun }: AgentCardProps) {
  const gradients = {
    'gap-analysis': 'linear-gradient(135deg, #667EEA 0%, #764BA2 100%)',
    'policy-generator': 'linear-gradient(135deg, #F093FB 0%, #F5576C 100%)',
    'audit-reviewer': 'linear-gradient(135deg, #4FACFE 0%, #00F2FE 100%)',
    'ndis-specialist': 'linear-gradient(135deg, #43E97B 0%, #38F9D7 100%)',
    'whs-expert': 'linear-gradient(135deg, #FA709A 0%, #FEE140 100%)',
    'training-designer': 'linear-gradient(135deg, #30CFD0 0%, #8B5CF6 100%)'
  }
  
  const gradient = gradients[agent.id as keyof typeof gradients] || gradients['gap-analysis']
  const Icon = iconMap[agent.icon as keyof typeof iconMap] || Brain
  
  return (
    <motion.div
      whileHover={{ y: -8 }}
      className="relative group"
    >
      <div className="absolute inset-0 opacity-0 group-hover:opacity-10 blur-xl transition-opacity duration-500"
           style={{ background: gradient }} />
      
      <Card hover className="h-full">
        {/* Agent Header */}
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-4">
            <motion.div 
              className="relative"
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="absolute inset-0 opacity-20 blur-lg" style={{ background: gradient }} />
              <div className="relative w-16 h-16 rounded-xl flex items-center justify-center"
                   style={{ background: gradient }}>
                <Icon className="w-8 h-8 text-white" />
              </div>
            </motion.div>
            
            <div>
              <h3 className="text-xl font-semibold text-text-primary">{agent.name}</h3>
              <p className="text-sm text-text-muted">AI Compliance Agent</p>
            </div>
          </div>
          
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className={cn(
              'px-3 py-1 text-xs font-medium rounded-full',
              agent.status === 'completed' && 'text-success bg-success/10',
              agent.status === 'running' && 'text-accent-gradient-start bg-accent-gradient-start/10',
              agent.status === 'idle' && 'text-text-muted bg-surface-elevated'
            )}
          >
            {agent.status === 'running' && <Loader2 className="w-3 h-3 mr-1 animate-spin inline" />}
            {agent.status === 'completed' && <CheckCircle className="w-3 h-3 mr-1 inline" />}
            {agent.status === 'idle' ? 'Ready' : agent.status}
          </motion.span>
        </div>
        
        {/* Description */}
        <p className="text-text-secondary mb-6">{agent.description}</p>
        
        {/* Capabilities */}
        <div className="mb-6">
          <h4 className="text-sm font-medium text-text-primary mb-3">Capabilities</h4>
          <div className="flex flex-wrap gap-2">
            {agent.capabilities.map((capability, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                className="px-3 py-1 text-xs bg-surface-elevated rounded-lg text-text-secondary"
              >
                {capability}
              </motion.span>
            ))}
          </div>
        </div>
        
        {/* Performance Metrics */}
        <div className="grid grid-cols-3 gap-4 pt-6 border-t border-border-subtle">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="text-2xl font-bold gradient-text">{agent.performance.accuracy}%</div>
            <div className="text-xs text-text-muted">Accuracy</div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="text-2xl font-bold text-text-primary">{agent.performance.speed}</div>
            <div className="text-xs text-text-muted">Avg. Time</div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="text-2xl font-bold text-text-primary">{agent.performance.documents}+</div>
            <div className="text-xs text-text-muted">Generated</div>
          </motion.div>
        </div>
        
        {/* Action Button */}
        <Button
          onClick={() => onRun(agent.id)}
          disabled={agent.status === 'running'}
          variant="secondary"
          className="w-full mt-6"
        >
          {agent.status === 'running' ? (
            <>
              <Pause className="w-4 h-4 mr-2" />
              Running...
            </>
          ) : agent.status === 'completed' ? (
            <>
              <CheckCircle className="w-4 h-4 mr-2" />
              View Results
            </>
          ) : (
            <>
              <Play className="w-4 h-4 mr-2" />
              Run Agent
            </>
          )}
        </Button>
      </Card>
    </motion.div>
  )
}