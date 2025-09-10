'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, MessageSquare, Send, CheckCircle } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/ui/Button'
import { useToast } from '@/components/ui/Toaster'
import { trackContactFormSubmit, trackPageView } from '@/lib/gtag'

// Zod validation schema
const contactFormSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must be less than 50 characters')
    .regex(/^[a-zA-Z\s]+$/, 'Name can only contain letters and spaces'),
  email: z
    .string()
    .email('Please enter a valid email address')
    .max(100, 'Email must be less than 100 characters'),
  message: z
    .string()
    .min(10, 'Message must be at least 10 characters')
    .max(1000, 'Message must be less than 1000 characters'),
  company: z.string().optional(), // Honeypot field
})

type ContactFormData = z.infer<typeof contactFormSchema>

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const { addToast } = useToast()

  // Track page view on mount
  React.useEffect(() => {
    trackPageView('contact')
  }, [])

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: '',
      email: '',
      message: '',
      company: '', // Honeypot field
    },
  })

  // Watch honeypot field
  const honeypotValue = watch('company')

  const onSubmit = async (data: ContactFormData) => {
    // Honeypot protection - if company field is filled, reject submission
    if (honeypotValue && honeypotValue.trim() !== '') {
      console.log('Bot detected - submission rejected')
      return
    }

    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      // Sanitize inputs
      const sanitizedData = {
        name: data.name.trim(),
        email: data.email.trim().toLowerCase(),
        message: data.message.trim(),
      }

      // Additional validation for spam prevention
      if (sanitizedData.message.length < 10) {
        throw new Error('Message too short')
      }

      // Check for common spam patterns
      const spamPatterns = [
        /http[s]?:\/\/\S+/gi, // URLs
        /www\.\S+/gi, // www links
        /\b(click here|buy now|free money|viagra|casino)\b/gi, // Common spam words
      ]

      const isSpam = spamPatterns.some(pattern => 
        pattern.test(sanitizedData.message) || pattern.test(sanitizedData.name)
      )

      if (isSpam) {
        throw new Error('Spam detected')
      }

      const response = await fetch('https://formspree.io/f/xpwjovrk', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(sanitizedData),
      })

      if (!response.ok) {
        throw new Error('Failed to send message')
      }

      setSubmitStatus('success')
      setIsSubmitted(true)
      trackContactFormSubmit() // Track the specific contact form submit event
      addToast({
        type: 'success',
        title: 'Message sent successfully!',
        description: 'We\'ll get back to you as soon as possible.',
      })

      // Reset form
      reset()
    } catch (error) {
      setSubmitStatus('error')
      addToast({
        type: 'error',
        title: 'Failed to send message',
        description: 'Please try again or contact us directly.',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen pt-20 pb-20 flex items-center justify-center">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="glass p-12 rounded-3xl"
          >
            <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-white" />
            </div>
            <h1 className="font-display font-bold text-3xl text-white mb-4">
              Message Sent!
            </h1>
            <p className="text-brand-metal text-lg mb-8">
              Thank you for reaching out. We'll get back to you within 24 hours.
            </p>
            <Button onClick={() => setIsSubmitted(false)}>
              Send Another Message
            </Button>
          </motion.div>
        </div>
      </div>
    )
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen pt-20 pb-20"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="font-display font-bold text-4xl md:text-5xl text-white mb-6">
            Get in Touch
          </h1>
          <p className="text-xl text-brand-metal max-w-2xl mx-auto">
            Have questions, feedback, or need help? We'd love to hear from you.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="glass p-8 rounded-3xl"
          >
            <h2 className="font-display font-semibold text-2xl text-white mb-6">
              Send us a message
            </h2>
            
            {/* Success/Error Message */}
            {submitStatus === 'success' && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 p-4 bg-green-500/20 border border-green-500/30 rounded-2xl"
              >
                <p className="text-green-400 text-sm font-medium">
                  ✅ Your message has been sent!
                </p>
              </motion.div>
            )}
            
            {submitStatus === 'error' && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 p-4 bg-red-500/20 border border-red-500/30 rounded-2xl"
              >
                <p className="text-red-400 text-sm font-medium">
                  ❌ Something went wrong. Please try again.
                </p>
              </motion.div>
            )}
            
            <form 
              action="https://formspree.io/f/xpwjovrk"
              method="POST"
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-6"
            >
              {/* Honeypot field - hidden from users */}
              <div className="hidden">
                <label htmlFor="company">Company</label>
                <input
                  type="text"
                  id="company"
                  {...register('company')}
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>

              <div>
                <label htmlFor="name" className="block text-white font-medium mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  {...register('name')}
                  className={`w-full px-4 py-3 bg-brand-mid/20 border rounded-2xl text-white placeholder-brand-metal/50 focus:outline-none focus:ring-2 focus:ring-brand-blue/50 focus:border-transparent transition-all duration-200 ${
                    errors.name 
                      ? 'border-red-500/50 focus:ring-red-500/50' 
                      : 'border-white/20'
                  }`}
                  placeholder="Your name"
                />
                {errors.name && (
                  <motion.p
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-2 text-red-400 text-sm"
                  >
                    {errors.name.message}
                  </motion.p>
                )}
              </div>

              <div>
                <label htmlFor="email" className="block text-white font-medium mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  {...register('email')}
                  className={`w-full px-4 py-3 bg-brand-mid/20 border rounded-2xl text-white placeholder-brand-metal/50 focus:outline-none focus:ring-2 focus:ring-brand-blue/50 focus:border-transparent transition-all duration-200 ${
                    errors.email 
                      ? 'border-red-500/50 focus:ring-red-500/50' 
                      : 'border-white/20'
                  }`}
                  placeholder="your@email.com"
                />
                {errors.email && (
                  <motion.p
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-2 text-red-400 text-sm"
                  >
                    {errors.email.message}
                  </motion.p>
                )}
              </div>

              <div>
                <label htmlFor="message" className="block text-white font-medium mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  {...register('message')}
                  rows={6}
                  className={`w-full px-4 py-3 bg-white/5 border rounded-2xl text-white placeholder-brand-metal/50 focus:outline-none focus:ring-2 focus:ring-brand-blue/50 focus:border-transparent resize-none ${
                    errors.message 
                      ? 'border-red-500/50 focus:ring-red-500/50' 
                      : 'border-white/20'
                  }`}
                  placeholder="Tell us what's on your mind..."
                />
                {errors.message && (
                  <motion.p
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-2 text-red-400 text-sm"
                  >
                    {errors.message.message}
                  </motion.p>
                )}
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center"
                size="lg"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="mr-2" size={20} />
                    Send Message
                  </>
                )}
              </Button>
            </form>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-8"
          >
            <div className="glass p-8 rounded-3xl">
              <h2 className="font-display font-semibold text-2xl text-white mb-6">
                Contact Information
              </h2>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-brand-blue to-brand-blueGlow rounded-xl flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white mb-1">Email</h3>
                    <p className="text-brand-metal">autoaestheticsai@gmail.com</p>
                    <p className="text-brand-metal text-sm">We'll respond within 24 hours</p>
                  </div>
                </div>


              </div>
            </div>

            <div className="glass p-8 rounded-3xl">
              <h3 className="font-display font-semibold text-xl text-white mb-4">
                Frequently Asked
              </h3>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-white mb-1">How accurate are the previews?</h4>
                  <p className="text-brand-metal text-sm">
                    Our AI generates near-realistic renders so you can see how your car would look after modifications before spending time or money.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-medium text-white mb-1">Do I need design skills to use this?</h4>
                  <p className="text-brand-metal text-sm">
                    Not at all. Just upload a photo, choose your modifications, and our AI does the rest.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-medium text-white mb-1">Is my data safe?</h4>
                  <p className="text-brand-metal text-sm">
                    Absolutely. Every upload is encrypted, processed instantly, and never kept on our servers.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}
