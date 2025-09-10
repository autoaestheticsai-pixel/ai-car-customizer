'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Home, ArrowLeft, Search } from 'lucide-react'
import { Button } from '@/components/ui/Button'

export default function NotFound() {
  return (
    <div className="min-h-screen pt-20 pb-20 flex items-center justify-center">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="glass p-12 rounded-3xl"
        >
          {/* 404 Animation */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-8"
          >
            <div className="text-8xl font-display font-bold text-gradient mb-4">
              404
            </div>
            <div className="w-24 h-1 bg-gradient-to-r from-brand-blue to-brand-blueGlow mx-auto rounded-full" />
          </motion.div>

          {/* Lost in the nebula message */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mb-8"
          >
            <h1 className="font-display font-bold text-3xl text-white mb-4">
              Lost in the Nebula
            </h1>
            <p className="text-brand-metal text-lg mb-6">
              The page you're looking for seems to have drifted off into the cosmic void. 
              Don't worry, even the best navigators get lost sometimes.
            </p>
            <p className="text-brand-metal/70 text-sm">
              Error 404: Page not found
            </p>
          </motion.div>

          {/* Action buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link href="/">
              <Button size="lg" className="w-full sm:w-auto">
                <Home className="mr-2" size={20} />
                Back to Home
              </Button>
            </Link>
            
            <Button 
              variant="secondary" 
              size="lg" 
              className="w-full sm:w-auto"
              onClick={() => window.history.back()}
            >
              <ArrowLeft className="mr-2" size={20} />
              Go Back
            </Button>
          </motion.div>

          {/* Helpful links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-12 pt-8 border-t border-white/10"
          >
            <p className="text-brand-metal text-sm mb-4">Maybe you were looking for:</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/visualizer" className="text-brand-blue hover:text-brand-blueGlow transition-colors duration-200 text-sm">
                Visualizer
              </Link>
              <Link href="/gallery" className="text-brand-blue hover:text-brand-blueGlow transition-colors duration-200 text-sm">
                Gallery
              </Link>
              <Link href="/pricing" className="text-brand-blue hover:text-brand-blueGlow transition-colors duration-200 text-sm">
                Pricing
              </Link>
              <Link href="/about" className="text-brand-blue hover:text-brand-blueGlow transition-colors duration-200 text-sm">
                About
              </Link>
              <Link href="/contact" className="text-brand-blue hover:text-brand-blueGlow transition-colors duration-200 text-sm">
                Contact
              </Link>
            </div>
          </motion.div>

          {/* Floating elements */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl">
            <motion.div
              animate={{ 
                y: [0, -10, 0],
                rotate: [0, 5, 0]
              }}
              transition={{ 
                duration: 4,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
              className="absolute top-8 right-8 w-2 h-2 bg-brand-blue/30 rounded-full"
            />
            <motion.div
              animate={{ 
                y: [0, 15, 0],
                rotate: [0, -5, 0]
              }}
              transition={{ 
                duration: 5,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: 1
              }}
              className="absolute bottom-8 left-8 w-3 h-3 bg-brand-blueGlow/40 rounded-full"
            />
            <motion.div
              animate={{ 
                y: [0, -8, 0],
                x: [0, 10, 0]
              }}
              transition={{ 
                duration: 6,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: 2
              }}
              className="absolute top-1/2 left-4 w-1 h-1 bg-brand-metal/50 rounded-full"
            />
          </div>
        </motion.div>
      </div>
    </div>
  )
}
