'use client'

import { useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import { UploadDropzone } from '@/components/UploadDropzone'
import { PromptForm } from '@/components/PromptForm'
import { ResultViewer } from '@/components/ResultViewer'
import { useToast } from '@/components/ui/Toaster'

interface GenerationResult {
  imageUrl: string
  commentary?: string
}

export default function VisualizerPage() {
  const [carImage, setCarImage] = useState<File | null>(null)
  const [carImagePreview, setCarImagePreview] = useState<string | null>(null)
  const [referenceImage, setReferenceImage] = useState<File | null>(null)
  const [referenceImagePreview, setReferenceImagePreview] = useState<string | null>(null)
  const [prompt, setPrompt] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedImage, setGeneratedImage] = useState<string | null>(null)
  const { addToast } = useToast()

  const handleCarImageSelect = useCallback((file: File) => {
    setCarImage(file)
    const url = URL.createObjectURL(file)
    setCarImagePreview(url)
  }, [])

  const handleCarImageRemove = useCallback(() => {
    setCarImage(null)
    if (carImagePreview) {
      URL.revokeObjectURL(carImagePreview)
      setCarImagePreview(null)
    }
  }, [carImagePreview])

  const handleReferenceImageSelect = useCallback((file: File) => {
    setReferenceImage(file)
    const url = URL.createObjectURL(file)
    setReferenceImagePreview(url)
  }, [])

  const handleReferenceImageRemove = useCallback(() => {
    setReferenceImage(null)
    if (referenceImagePreview) {
      URL.revokeObjectURL(referenceImagePreview)
      setReferenceImagePreview(null)
    }
  }, [referenceImagePreview])

  const handleGenerate = useCallback(async () => {
    if (!carImage || !prompt.trim()) {
      addToast({
        type: 'error',
        title: 'Missing required fields',
        description: 'Please upload a car image and describe your modifications.',
      })
      return
    }

    setIsGenerating(true)
    
    try {
      const formData = new FormData()
      formData.append('image', carImage)
      formData.append('prompt', prompt)
      if (referenceImage) {
        formData.append('reference', referenceImage)
      }

      const response = await fetch('/api/generate', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || 'Failed to generate image')
      }

      const result: GenerationResult = await response.json()
      setGeneratedImage(result.imageUrl)
      
      addToast({
        type: 'success',
        title: 'Image generated successfully!',
        description: 'Your custom car visualization is ready.',
      })
    } catch (error) {
      console.error('Generation error:', error)
      addToast({
        type: 'error',
        title: 'Generation failed',
        description: error instanceof Error ? error.message : 'Something went wrong. Please try again.',
      })
    } finally {
      setIsGenerating(false)
    }
  }, [carImage, prompt, referenceImage, addToast])

  const handleDownload = useCallback(() => {
    if (generatedImage) {
      const link = document.createElement('a')
      link.href = generatedImage
      link.download = 'custom-car-visualization.jpg'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  }, [generatedImage])

  const handleReset = useCallback(() => {
    setCarImage(null)
    setCarImagePreview(null)
    setReferenceImage(null)
    setReferenceImagePreview(null)
    setPrompt('')
    setGeneratedImage(null)
    
    // Clean up object URLs
    if (carImagePreview) URL.revokeObjectURL(carImagePreview)
    if (referenceImagePreview) URL.revokeObjectURL(referenceImagePreview)
  }, [carImagePreview, referenceImagePreview])

  const handleNewRender = useCallback(() => {
    setGeneratedImage(null)
  }, [])

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen pt-20 pb-20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="font-display font-bold text-4xl md:text-5xl text-white mb-4">
            AI Car Visualizer
          </h1>
          <p className="text-xl text-brand-metal max-w-2xl mx-auto">
            Upload your car, describe your vision, and watch AI bring it to life
          </p>
        </motion.div>

        {/* Main Content - New Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          
          {/* Left Column */}
          <div className="space-y-6">
            {/* Row 1: Upload Car Image */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="glass p-6 rounded-2xl hover:shadow-blue-500/10 hover:border-blue-500/30 transition-all duration-300"
            >
              <h2 className="font-display font-semibold text-xl text-white mb-4">
                1. Upload Car Image
              </h2>
              <UploadDropzone
                onFileSelect={handleCarImageSelect}
                onFileRemove={handleCarImageRemove}
                selectedFile={carImage}
                previewUrl={carImagePreview}
              />
            </motion.div>
            
            {/* Row 2: Optional Reference Image */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="glass p-6 rounded-2xl hover:shadow-blue-500/10 hover:border-blue-500/30 transition-all duration-300"
            >
              <h2 className="font-display font-semibold text-xl text-white mb-4">
                3. Optional Reference Image
              </h2>
              <p className="text-brand-metal text-sm mb-4">
                Upload a reference image of wheels, spoilers, or wraps for better results
              </p>
              <UploadDropzone
                onFileSelect={handleReferenceImageSelect}
                onFileRemove={handleReferenceImageRemove}
                selectedFile={referenceImage}
                previewUrl={referenceImagePreview}
              />
            </motion.div>
          </div>
          
          {/* Right Column */}
          <div className="space-y-6">
            {/* Row 1: Describe Modification */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="glass p-6 rounded-2xl hover:shadow-blue-500/10 hover:border-blue-500/30 transition-all duration-300 h-fit"
            >
              <h2 className="font-display font-semibold text-xl text-white mb-4">
                2. Describe Your Vision
              </h2>
              <PromptForm
                value={prompt}
                onChange={setPrompt}
                onSubmit={handleGenerate}
                isGenerating={isGenerating}
              />
            </motion.div>
            
            {/* Row 2: Generated Result */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <ResultViewer
                originalImage={carImagePreview}
                generatedImage={generatedImage}
                isGenerating={isGenerating}
                onDownload={handleDownload}
                onReset={handleReset}
                onNewRender={handleNewRender}
              />
            </motion.div>
          </div>
        </div>

        {/* Mini History */}
        {generatedImage && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-12"
          >
            <div className="glass p-6 rounded-2xl">
              <h3 className="font-display font-semibold text-lg text-white mb-4">
                Recent Generations
              </h3>
              <div className="flex space-x-4">
                <div className="w-20 h-20 bg-gradient-to-br from-brand-mid to-brand-black rounded-xl flex items-center justify-center">
                  <span className="text-brand-metal text-xs">No history yet</span>
                </div>
                <div className="w-20 h-20 bg-gradient-to-br from-brand-mid to-brand-black rounded-xl flex items-center justify-center">
                  <span className="text-brand-metal text-xs">No history yet</span>
                </div>
                <div className="w-20 h-20 bg-gradient-to-br from-brand-mid to-brand-black rounded-xl flex items-center justify-center">
                  <span className="text-brand-metal text-xs">No history yet</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}
