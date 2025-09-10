'use client'

import { motion } from 'framer-motion'
import { Wand2 } from 'lucide-react'

interface PromptFormProps {
  value: string
  onChange: (value: string) => void
  onSubmit: () => void
  isGenerating: boolean
  className?: string
}


export function PromptForm({ value, onChange, onSubmit, isGenerating, className }: PromptFormProps) {

  return (
    <div className={className}>
      <div className="mb-4">
        <label className="block text-white font-medium mb-2">
          Describe the modification
        </label>
        <div className="relative">
          <textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="e.g., 'Apply a matte black wrap with red racing stripes' or 'Change the wheels to black 20-inch rims'"
            className="w-full h-32 px-4 py-3 bg-white/5 border border-white/20 rounded-2xl text-white placeholder-brand-metal/50 focus:outline-none focus:ring-2 focus:ring-brand-blue/50 focus:border-transparent resize-none"
            disabled={isGenerating}
          />
          <div className="absolute bottom-3 right-3 text-brand-metal/50 text-xs">
            {value.length}/500
          </div>
        </div>
      </div>


      {/* Generate Button */}
      <motion.button
        onClick={onSubmit}
        disabled={!value.trim() || isGenerating}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full glow-button magnetic disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
      >
        {isGenerating ? (
          <>
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            <span>Generating...</span>
          </>
        ) : (
          <>
            <Wand2 size={20} />
            <span>Generate</span>
          </>
        )}
      </motion.button>
    </div>
  )
}