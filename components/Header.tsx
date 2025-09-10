'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Menu, X, HelpCircle } from 'lucide-react'
import { Logo } from './Logo'

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isHelpOpen, setIsHelpOpen] = useState(false)

  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/visualizer', label: 'Visualizer' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
  ]

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="fixed top-0 left-0 right-0 z-50 glass-strong border-b border-white/10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Logo />

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-brand-metal hover:text-white transition-colors duration-200 font-medium relative group"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-brand-blue to-brand-blueGlow group-hover:w-full transition-all duration-300" />
              </Link>
            ))}
          </nav>

          {/* Right side buttons */}
          <div className="flex items-center space-x-4">
            {/* Help button */}
            <button
              onClick={() => setIsHelpOpen(!isHelpOpen)}
              className="p-2 text-brand-metal hover:text-white transition-colors duration-200 relative"
              title="Help"
            >
              <HelpCircle size={20} />
              {isHelpOpen && (
                <div className="absolute top-full right-0 mt-2 w-64 glass p-4 rounded-xl text-sm">
                  <p className="text-white mb-2">Need help getting started?</p>
                  <p className="text-brand-metal text-xs">
                    Upload a car image, describe your modifications, and let AI create your dream ride.
                  </p>
                </div>
              )}
            </button>



            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-brand-metal hover:text-white transition-colors duration-200"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-white/10 py-4"
          >
            <nav className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-brand-metal hover:text-white transition-colors duration-200 font-medium py-2"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </motion.div>
        )}
      </div>
    </motion.header>
  )
}