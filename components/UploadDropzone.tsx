'use client'

import { useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import { Upload, X, Image as ImageIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

interface UploadDropzoneProps {
  onFileSelect: (file: File) => void
  onFileRemove: () => void
  selectedFile: File | null
  previewUrl: string | null
  accept?: string
  maxSize?: number
  className?: string
}

export function UploadDropzone({
  onFileSelect,
  onFileRemove,
  selectedFile,
  previewUrl,
  accept = 'image/*',
  maxSize = 10 * 1024 * 1024, // 10MB
  className,
}: UploadDropzoneProps) {
  const [isDragOver, setIsDragOver] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleFile = useCallback((file: File) => {
    setError(null)
    
    if (!file.type.startsWith('image/')) {
      setError('Please select an image file')
      return
    }
    
    if (file.size > maxSize) {
      setError(`File size must be less than ${Math.round(maxSize / 1024 / 1024)}MB`)
      return
    }
    
    onFileSelect(file)
  }, [onFileSelect, maxSize])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
    
    const files = Array.from(e.dataTransfer.files)
    if (files.length > 0) {
      handleFile(files[0])
    }
  }, [handleFile])

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
  }, [])

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      handleFile(files[0])
    }
  }, [handleFile])

  if (selectedFile && previewUrl) {
    return (
      <div className={cn('relative', className)}>
        <div className="relative group">
          <img
            src={previewUrl}
            alt="Preview"
            className="w-full h-64 object-cover rounded-2xl"
          />
          <button
            onClick={onFileRemove}
            title="Remove image"
            aria-label="Remove uploaded image"
            className="absolute top-2 right-2 p-2 bg-black/50 hover:bg-black/70 rounded-full text-white transition-colors duration-200 opacity-0 group-hover:opacity-100"
          >
            <X size={16} />
          </button>
        </div>
        <div className="mt-2 text-sm text-brand-metal">
          {selectedFile.name} ({(selectedFile.size / 1024 / 1024).toFixed(2)} MB)
        </div>
      </div>
    )
  }

  return (
    <div className={cn('relative', className)}>
      <motion.div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={cn(
          'border-2 border-dashed rounded-2xl p-8 text-center transition-all duration-300 cursor-pointer',
          isDragOver
            ? 'border-brand-blue bg-brand-blue/10'
            : 'border-white/20 hover:border-brand-blue/50 hover:bg-white/5',
          error && 'border-red-400 bg-red-400/10'
        )}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <input
          type="file"
          accept={accept}
          onChange={handleFileInput}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          aria-label="Upload car image file"
        />
        
        <div className="flex flex-col items-center space-y-4">
          <div className="w-16 h-16 bg-gradient-to-br from-brand-blue to-brand-blueGlow rounded-2xl flex items-center justify-center">
            <Upload className="w-8 h-8 text-white" />
          </div>
          
          <div>
            <p className="text-white font-medium mb-2">
              {isDragOver ? 'Drop your image here' : 'Upload Car Image'}
            </p>
            <p className="text-brand-metal text-sm">
              Drag and drop or click to browse
            </p>
            <p className="text-brand-metal/70 text-xs mt-1">
              PNG, JPG up to 10MB
            </p>
          </div>
        </div>
      </motion.div>
      
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-2 text-sm text-red-400 flex items-center space-x-2"
        >
          <X size={16} />
          <span>{error}</span>
        </motion.div>
      )}
    </div>
  )
}
