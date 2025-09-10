'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Download, RotateCcw, Sparkles, Eye, X, ZoomIn } from 'lucide-react'
import { Button } from '@/components/ui/Button'

interface ResultViewerProps {
  originalImage: string | null
  generatedImage: string | null
  isGenerating: boolean
  onDownload: () => void
  onReset: () => void
  onNewRender: () => void
  className?: string
}

export function ResultViewer({
  originalImage,
  generatedImage,
  isGenerating,
  onDownload,
  onReset,
  onNewRender,
  className,
}: ResultViewerProps) {
  const [isImageExpanded, setIsImageExpanded] = useState(false)

  // Handle ESC key to close modal
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isImageExpanded) {
        setIsImageExpanded(false)
      }
    }

    if (isImageExpanded) {
      document.addEventListener('keydown', handleKeyDown)
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'unset'
    }
  }, [isImageExpanded])

  if (isGenerating) {
    return (
      <div className={className}>
        <div className="glass p-8 rounded-2xl">
          <div className="aspect-video bg-gradient-to-br from-brand-mid to-brand-black rounded-2xl flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-brand-blue to-brand-blueGlow rounded-2xl flex items-center justify-center mx-auto mb-4 animate-pulse">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <p className="text-white font-medium mb-2">Generating your custom ride...</p>
              <p className="text-brand-metal text-sm">This may take a few moments</p>
              <div className="mt-4 w-64 h-2 bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-brand-blue to-brand-blueGlow"
                  initial={{ width: '0%' }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 3, ease: 'easeInOut' }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!generatedImage) {
    return (
      <div className={className}>
        <div className="glass p-8 rounded-2xl">
          <div className="aspect-video bg-gradient-to-br from-brand-mid to-brand-black rounded-2xl flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Eye className="w-8 h-8 text-brand-metal" />
              </div>
              <p className="text-brand-metal">Your generated image will appear here</p>
              <p className="text-brand-metal/70 text-sm mt-2">Upload a car image and describe your modifications</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={className}>
      <div className="glass p-6 rounded-2xl">
        {/* Header */}
        <div className="mb-6">
          <h3 className="font-display font-semibold text-xl text-white mb-2">
            Generated Result
          </h3>
          <p className="text-brand-metal text-sm">
            Your custom car visualization is ready
          </p>
        </div>

        {/* Image Display */}
        <div className="relative mb-6">
          <div 
            className="aspect-video rounded-2xl overflow-hidden cursor-pointer group relative"
            onClick={() => setIsImageExpanded(true)}
          >
            <img
              src={generatedImage}
              alt="Generated result"
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            {/* Overlay with zoom icon */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="bg-white/20 backdrop-blur-sm rounded-full p-3">
                  <ZoomIn className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
            {/* Click hint */}
            <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="bg-black/50 backdrop-blur-sm rounded-lg px-2 py-1">
                <p className="text-white text-xs">Click to expand</p>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Button onClick={onDownload} className="flex-1">
            <Download className="mr-2" size={16} />
            Download
          </Button>
          
          <Button variant="secondary" onClick={onNewRender} className="flex-1">
            <Sparkles className="mr-2" size={16} />
            New Render
          </Button>
          
          <Button variant="ghost" onClick={onReset}>
            <RotateCcw className="mr-2" size={16} />
            Reset
          </Button>
        </div>
      </div>

      {/* Image Expansion Modal */}
      <AnimatePresence>
        {isImageExpanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={() => setIsImageExpanded(false)}
          >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
            
            {/* Modal Content */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative max-w-6xl max-h-[90vh] w-full"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setIsImageExpanded(false)}
                className="absolute -top-4 -right-4 z-10 bg-white/10 backdrop-blur-sm hover:bg-white/20 rounded-full p-2 transition-colors duration-200"
                aria-label="Close expanded image view"
              >
                <X className="w-6 h-6 text-white" />
              </button>

              {/* Image Container */}
              <div className="glass rounded-2xl overflow-hidden">
                <div className="relative">
                  <img
                    src={generatedImage}
                    alt="Generated result - expanded view"
                    className="w-full h-auto max-h-[80vh] object-contain"
                  />
                  
                  {/* Image Info Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-white font-semibold text-lg mb-1">
                          Your Custom Car Visualization
                        </h3>
                        <p className="text-white/80 text-sm">
                          Click outside or press ESC to close
                        </p>
                      </div>
                      
                      {/* Action Buttons in Modal */}
                      <div className="flex gap-2">
                        <Button 
                          onClick={onDownload}
                          size="sm"
                          className="bg-brand-blue hover:bg-brand-blueGlow"
                        >
                          <Download className="mr-2" size={16} />
                          Download
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
