import { cn } from '@/lib/utils'
import { Loader2 } from 'lucide-react'

export function DocumentSkeleton() {
  return (
    <div className="bg-surface-card border border-border-subtle rounded-xl p-6 animate-pulse">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-surface-elevated rounded-lg" />
          <div>
            <div className="h-4 w-32 bg-surface-elevated rounded mb-2" />
            <div className="h-3 w-24 bg-surface-elevated rounded" />
          </div>
        </div>
      </div>
      <div className="space-y-2">
        <div className="h-3 w-full bg-surface-elevated rounded" />
        <div className="h-3 w-4/5 bg-surface-elevated rounded" />
      </div>
    </div>
  )
}

export function PulsingDot({ className }: { className?: string }) {
  return (
    <span className={cn('relative flex h-2 w-2', className)}>
      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75" />
      <span className="relative inline-flex rounded-full h-2 w-2 bg-success" />
    </span>
  )
}

export function LoadingSpinner({ size = 'md', className }: { size?: 'sm' | 'md' | 'lg', className?: string }) {
  const sizes = {
    sm: 'h-4 w-4',
    md: 'h-6 w-6',
    lg: 'h-8 w-8'
  }
  
  return (
    <Loader2 className={cn('animate-spin text-primary-gradient-start', sizes[size], className)} />
  )
}

export function PageLoader() {
  return (
    <div className="min-h-screen bg-surface-dark flex items-center justify-center">
      <div className="text-center">
        <LoadingSpinner size="lg" className="mx-auto mb-4" />
        <p className="text-text-secondary">Loading...</p>
      </div>
    </div>
  )
}

export function CardSkeleton() {
  return (
    <div className="bg-surface-card border border-border-subtle rounded-2xl p-8 animate-pulse">
      <div className="flex items-start justify-between mb-6">
        <div className="w-14 h-14 bg-surface-elevated rounded-xl" />
        <div className="w-20 h-6 bg-surface-elevated rounded-full" />
      </div>
      <div className="h-6 w-3/4 bg-surface-elevated rounded mb-3" />
      <div className="h-4 w-full bg-surface-elevated rounded mb-2" />
      <div className="h-4 w-5/6 bg-surface-elevated rounded mb-6" />
      <div className="space-y-2">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-3 w-full bg-surface-elevated rounded" />
        ))}
      </div>
      <div className="mt-6 h-10 bg-surface-elevated rounded-lg" />
    </div>
  )
}