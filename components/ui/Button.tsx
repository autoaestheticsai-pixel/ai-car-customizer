'use client'

import { cn } from '@/lib/utils'
import MotionButton from './MotionButton'

interface ButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onAnimationStart' | 'onAnimationEnd' | 'onAnimationIteration' | 'onDrag' | 'onDragStart' | 'onDragEnd'> {
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  children: React.ReactNode
}

export function Button({ 
  variant = 'primary', 
  size = 'md', 
  className, 
  children, 
  ...props 
}: ButtonProps) {
  const baseClasses = 'font-semibold rounded-2xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-brand-blue/50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center'
  
  const variants = {
    primary: 'glow-button magnetic',
    secondary: 'bg-white/10 hover:bg-white/20 text-white border border-white/20 magnetic',
    ghost: 'text-brand-metal hover:text-white hover:bg-white/5 magnetic',
  }
  
  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  }

  return (
    <MotionButton
      className={cn(baseClasses, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </MotionButton>
  )
}
