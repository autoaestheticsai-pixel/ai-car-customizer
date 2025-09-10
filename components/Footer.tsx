'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Logo } from './Logo'

export function Footer() {
  const productLinks = [
    { href: '/visualizer', label: 'Visualizer' },
  ]

  const companyLinks = [
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
  ]

  return (
    <footer className="relative mt-20 bg-black">
      <div className="max-w-7xl mx-auto p-8 lg:p-12">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {/* Logo + Tagline */}
          <div className="space-y-4">
            <Logo className="mb-4" />
            <p className="text-gray-400 text-sm max-w-xs leading-relaxed">
              Made for car enthusiasts. Visualize your dream ride with AI-powered customization.
            </p>
            <p className="text-gray-500 text-xs">
              Style it before you drive it.
            </p>
          </div>

          {/* Product Links */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-white">Product</h3>
            <ul className="space-y-3">
              {productLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-[#00AEEF] transition-all duration-200 text-sm hover:translate-x-1 inline-block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-white">Company</h3>
            <ul className="space-y-3">
              {companyLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-[#00AEEF] transition-all duration-200 text-sm hover:translate-x-1 inline-block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-700 mt-6 pt-4">
          <p className="text-xs text-gray-500 text-center">
            © 2025 AutoAesthetics AI. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
