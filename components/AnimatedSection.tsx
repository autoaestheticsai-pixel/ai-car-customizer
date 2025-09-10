'use client'

import { motion } from 'framer-motion'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'
import { ReactNode } from 'react'

interface AnimatedSectionProps {
  children: ReactNode
  className?: string
  animation?: 'fadeIn' | 'slideUp' | 'slideInLeft' | 'slideInRight' | 'scaleIn'
  delay?: number
  duration?: number
  threshold?: number
  triggerOnce?: boolean
}

const animationVariants = {
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  },
  slideUp: {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 }
  },
  slideInLeft: {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0 }
  },
  slideInRight: {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0 }
  },
  scaleIn: {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1 }
  }
}

export function AnimatedSection({
  children,
  className = '',
  animation = 'fadeIn',
  delay = 0,
  duration = 0.6,
  threshold = 0.1,
  triggerOnce = true
}: AnimatedSectionProps) {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>({ threshold, triggerOnce })

  return (
    <motion.div
      ref={ref}
      className={className}
      variants={animationVariants[animation]}
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
      transition={{
        duration,
        delay,
        ease: "easeOut"
      }}
    >
      {children}
    </motion.div>
  )
}

interface StaggeredAnimationProps {
  children: ReactNode[]
  className?: string
  animation?: 'fadeIn' | 'slideUp' | 'slideInLeft' | 'slideInRight' | 'scaleIn'
  staggerDelay?: number
  delay?: number
  duration?: number
  threshold?: number
}

export function StaggeredAnimation({
  children,
  className = '',
  animation = 'fadeIn',
  staggerDelay = 0.1,
  delay = 0,
  duration = 0.6,
  threshold = 0.1
}: StaggeredAnimationProps) {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>({ threshold, triggerOnce: true })

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: staggerDelay,
            delayChildren: delay
          }
        }
      }}
    >
      {children.map((child, index) => (
        <motion.div
          key={index}
          variants={animationVariants[animation]}
          transition={{ duration, ease: "easeOut" }}
        >
          {child}
        </motion.div>
      ))}
    </motion.div>
  )
}
