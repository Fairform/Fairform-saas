'use client'

import { motion } from 'framer-motion'

interface GradientOrbProps {
  size?: 'small' | 'medium' | 'large' | 'xlarge'
  color?: 'blue' | 'purple' | 'orange' | 'green' | 'pink'
  className?: string
  emoji?: string | null
  animated?: boolean
}

const GradientOrb: React.FC<GradientOrbProps> = ({ 
  size = 'medium', 
  color = 'blue', 
  className = '',
  emoji = null,
  animated = true 
}) => {
  const sizeClasses = {
    small: 'w-12 h-12',
    medium: 'w-16 h-16',
    large: 'w-20 h-20',
    xlarge: 'w-24 h-24'
  }

  const colorGradients = {
    blue: {
      primary: 'from-blue-400 via-blue-500 to-indigo-600',
      glow: 'from-blue-300/60 to-indigo-400/60',
      shadow: 'shadow-blue-500/25'
    },
    purple: {
      primary: 'from-purple-400 via-violet-500 to-purple-600',
      glow: 'from-purple-300/60 to-violet-400/60',
      shadow: 'shadow-purple-500/25'
    },
    orange: {
      primary: 'from-orange-400 via-amber-500 to-orange-600',
      glow: 'from-orange-300/60 to-amber-400/60',
      shadow: 'shadow-orange-500/25'
    },
    green: {
      primary: 'from-emerald-400 via-teal-500 to-cyan-600',
      glow: 'from-emerald-300/60 to-teal-400/60',
      shadow: 'shadow-emerald-500/25'
    },
    pink: {
      primary: 'from-pink-400 via-rose-500 to-pink-600',
      glow: 'from-pink-300/60 to-rose-400/60',
      shadow: 'shadow-pink-500/25'
    }
  }

  const gradient = colorGradients[color] || colorGradients.blue

  return (
    <div className={`relative ${sizeClasses[size]} ${className}`}>
      {/* Outer glow effect */}
      <motion.div
        className={`absolute inset-0 rounded-full bg-gradient-to-br ${gradient.glow} blur-lg opacity-40`}
        {...(animated && {
          animate: {
            opacity: [0.4, 0.8, 0.4],
            scale: [1, 1.1, 1],
          },
          transition: {
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut" as const
          }
        })}
      />
      
      {/* Main orb */}
      <motion.div
        className={`absolute inset-0 rounded-full bg-gradient-to-br ${gradient.primary} ${gradient.shadow} shadow-lg`}
        {...(animated && {
          animate: {
            scale: [1, 1.05, 1],
            rotate: [0, 180, 360],
          },
          transition: {
            duration: 8,
            repeat: Infinity,
            ease: "linear" as const
          }
        })}
      >
        {/* Inner highlight */}
        <div className="absolute inset-2 rounded-full bg-gradient-to-br from-white/30 via-white/10 to-transparent" />
        
        {/* Center content (emoji if provided) */}
        {emoji && (
          <div className="absolute inset-0 flex items-center justify-center text-white">
            <span className="text-lg">{emoji}</span>
          </div>
        )}
      </motion.div>

      {/* Floating particles */}
      {animated && (
        <>
          <motion.div
            className="absolute -top-1 -right-1 w-2 h-2 bg-white/60 rounded-full"
            animate={{
              y: [-2, -8, -2],
              opacity: [0.4, 1, 0.4],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut" as const
            }}
          />
          <motion.div
            className="absolute -bottom-1 -left-1 w-1.5 h-1.5 bg-white/40 rounded-full"
            animate={{
              y: [2, 6, 2],
              x: [0, 2, 0],
              opacity: [0.6, 1, 0.6],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut" as const,
              delay: 1
            }}
          />
          <motion.div
            className="absolute top-1 -left-2 w-1 h-1 bg-white/50 rounded-full"
            animate={{
              opacity: [0.2, 0.8, 0.2],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut" as const,
              delay: 0.5
            }}
          />
        </>
      )}
    </div>
  )
}

export default GradientOrb