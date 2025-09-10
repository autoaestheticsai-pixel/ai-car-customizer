'use client'

import Image from 'next/image'
import Link from 'next/link'

interface LogoProps {
  className?: string
  showText?: boolean
}

export function Logo({ className = '', showText = true }: LogoProps) {
  return (
    <Link href="/" className={`flex items-center space-x-3 group ${className}`}>
      <div className="relative w-12 h-12">
        {/* AutoAesthetics AI Logo */}
        <Image
          src="/logo.png"
          alt="AutoAesthetics AI"
          width={48}
          height={48}
          className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-200"
          priority
        />
      </div>
      {showText && (
        <span className="font-display font-bold text-xl text-white group-hover:text-brand-blue transition-colors duration-200">
          AutoAesthetics AI
        </span>
      )}
    </Link>
  )
}
