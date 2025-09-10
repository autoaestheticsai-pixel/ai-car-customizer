'use client'

import { cn } from '@/lib/utils'

interface BadgeProps {
  children: React.ReactNode
  variant?: 'default' | 'secondary' | 'outline'
  className?: string
}

export function Badge({ children, variant = 'default', className }: BadgeProps) {
  const baseClasses = 'inline-flex items-center px-3 py-1 rounded-full text-xs font-medium'
  
  const variants = {
    default: 'bg-gradient-to-r from-brand-blue to-brand-blueGlow text-white',
    secondary: 'bg-white/10 text-brand-metal border border-white/20',
    outline: 'border border-brand-metal/30 text-brand-metal hover:border-brand-blue/50 hover:text-brand-blue transition-colors duration-200',
  }

  return (
    <span className={cn(baseClasses, variants[variant], className)}>
      {children}
    </span>
  )
}
