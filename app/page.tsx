'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Upload, Wand2, Download, Shield, Eye, Sparkles, Zap, Brain, Monitor, ImageIcon, Target } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { AnimatedSection, StaggeredAnimation } from '@/components/AnimatedSection'

export default function HomePage() {
  const features = [
    {
      icon: Upload,
      title: 'Upload Car Image',
      description: 'Simply drag and drop your car photo or browse to select from your device.',
    },
    {
      icon: Wand2,
      title: 'Describe Modifications',
      description: 'Tell us what you want: "matte black wrap", "red rims", "carbon spoiler", or upload reference images.',
    },
    {
      icon: Download,
      title: 'Get Realistic Render',
      description: 'AI generates a photorealistic image of your customized car in seconds.',
    },
  ]

  const featureGrid = [
    {
      icon: Brain,
      title: 'Smart AI Modifications',
      description: 'Apply photorealistic changes like color, wheels, and styling with AI precision.',
    },
    {
      icon: Monitor,
      title: 'High-Resolution Downloads',
      description: 'Save your customized designs in sharp, print-ready quality.',
    },
    {
      icon: ImageIcon,
      title: 'Reference Matching',
      description: 'Upload images of styles or parts, and our AI adapts them seamlessly to your car.',
    },
    {
      icon: Shield,
      title: 'Privacy First',
      description: 'Your images are processed securely and never stored permanently.',
    },
    {
      icon: Target,
      title: 'Realistic Detailing',
      description: 'Every modification is fine-tuned to look authentic, blending naturally with your car.',
    },
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-20">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="glass-metallic p-12 rounded-3xl max-w-4xl mx-auto"
          >
            <Badge className="mb-6 text-base px-6 py-2">Style it before you drive it</Badge>
            
            <h1 className="font-display font-bold text-5xl md:text-7xl text-white mb-6">
              Visualize Your{' '}
              <span className="text-gradient">Dream Ride</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-brand-metal mb-8 max-w-3xl mx-auto">
              Upload your car. Describe the look. Get a realistic render instantly.
            </p>
            
            <div className="flex justify-center items-center mb-12">
              <Link href="/visualizer">
                <Button size="lg" className="w-full sm:w-auto flex items-center justify-center">
                  Try it for free No Signup Required
                  <ArrowRight className="ml-2" size={20} />
                </Button>
              </Link>
            </div>


            {/* Floating elements */}
            <div className="relative">
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
                className="absolute -top-20 -left-20 w-4 h-4 bg-brand-blue/30 rounded-full"
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
                className="absolute -top-10 -right-16 w-3 h-3 bg-brand-blueGlow/40 rounded-full"
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
                className="absolute -bottom-16 -left-12 w-2 h-2 bg-brand-metal/50 rounded-full"
              />
            </div>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          >
            <div className="flex flex-col items-center text-brand-metal text-sm">
              <span>↓ Scroll down</span>
              <div className="w-px h-8 bg-gradient-to-b from-brand-blue to-transparent mt-2" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection
            animation="slideUp"
            className="text-center mb-16"
          >
            <h2 className="font-display font-bold text-4xl md:text-5xl text-white mb-6">
              How It Works
            </h2>
            <p className="text-xl text-brand-metal max-w-2xl mx-auto">
              Three simple steps to transform your car visualization
            </p>
          </AnimatedSection>

          <StaggeredAnimation
            animation="scaleIn"
            staggerDelay={0.2}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className="card-metallic text-center group hover:shadow-glow transition-all duration-300"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-brand-blue to-brand-blueGlow rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-display font-semibold text-xl text-white mb-4">
                  {feature.title}
                </h3>
                <p className="text-brand-metal">
                  {feature.description}
                </p>
              </div>
            ))}
          </StaggeredAnimation>
        </div>
      </section>

      {/* Before/After Demo */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection
            animation="slideUp"
            className="text-center mb-16"
          >
            <h2 className="font-display font-bold text-4xl md:text-5xl text-white mb-6">
              See the Magic
            </h2>
            <p className="text-xl text-brand-metal max-w-2xl mx-auto">
              Transform your car with AI-powered precision
            </p>
          </AnimatedSection>

          <AnimatedSection
            animation="scaleIn"
            className="glass-electric p-8 rounded-3xl max-w-4xl mx-auto"
          >
            <div className="aspect-video bg-gradient-to-br from-brand-mid to-brand-black rounded-2xl flex items-center justify-center overflow-hidden relative">
              {/* Demo Image using Next.js Image component */}
              <Image
                src="/images/demo.jpg"
                alt="AI Before/After Demo"
                fill
                className="object-cover rounded-xl shadow-lg"
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
              />
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection
            animation="slideUp"
            className="text-center mb-16"
          >
            <h2 className="font-display font-bold text-4xl md:text-5xl text-white mb-6">
              Powerful Features
            </h2>
            <p className="text-xl text-brand-metal max-w-2xl mx-auto">
              Everything you need to customize and visualize your car.
            </p>
          </AnimatedSection>

          <StaggeredAnimation
            animation="fadeIn"
            staggerDelay={0.1}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {featureGrid.map((feature, index) => (
              <div
                key={feature.title}
                className="card-metallic group hover:shadow-glow transition-all duration-300"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-brand-blue to-brand-blueGlow rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-display font-semibold text-lg text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-brand-metal text-sm">
                  {feature.description}
                </p>
              </div>
            ))}
          </StaggeredAnimation>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <AnimatedSection
            animation="scaleIn"
            className="glass-electric p-12 rounded-3xl"
          >
            <h2 className="font-display font-bold text-4xl md:text-5xl text-white mb-6">
              Ready to Transform Your Ride?
            </h2>
            <p className="text-xl text-brand-metal mb-8">
              Style it before you drive it. Start visualizing your dream car today.
            </p>
            <Link href="/visualizer">
              <Button size="lg" className="w-full sm:w-auto flex items-center justify-center">
                Try it for free
                <ArrowRight className="ml-2" size={20} />
              </Button>
            </Link>
          </AnimatedSection>
        </div>
      </section>
    </div>
  )
}
