// components/gradient-orb.tsx
import { motion } from 'framer-motion'

interface GradientOrbProps {
  color?: string
  size?: string
  top?: string
  left?: string
  right?: string
  bottom?: string
  delay?: number
  className?: string
  animate?: boolean
}

export default function GradientOrb({
  color = 'from-primary-gradient-start to-primary-gradient-end',
  size = 'w-96 h-96',
  top,
  left,
  right,
  bottom,
  delay = 0,
  className = '',
  animate = true
}: GradientOrbProps) {
  return (
    <motion.div
      initial={animate ? { opacity: 0, scale: 0.8 } : {}}
      animate={animate ? { 
        opacity: [0.1, 0.2, 0.1],
        scale: [0.8, 1, 0.8]
      } : {}}
      transition={animate ? {
        duration: 8,
        delay,
        repeat: Infinity,
        repeatType: "reverse"
      } : {}}
      className={`absolute ${size} bg-gradient-to-r ${color} rounded-full blur-3xl ${className}`}
      style={{
        top: top || 'auto',
        left: left || 'auto',
        right: right || 'auto',
        bottom: bottom || 'auto',
        opacity: animate ? undefined : 0.2
      }}
    />
  )
}

// Export preset gradient orbs for consistency
export const PrimaryOrb = (props: Omit<GradientOrbProps, 'color'>) => (
  <GradientOrb color="from-primary-gradient-start to-primary-gradient-end" {...props} />
)

export const AccentOrb = (props: Omit<GradientOrbProps, 'color'>) => (
  <GradientOrb color="from-accent-gradient-start to-accent-gradient-end" {...props} />
)

export const SuccessOrb = (props: Omit<GradientOrbProps, 'color'>) => (
  <GradientOrb color="from-success to-success" {...props} />
)