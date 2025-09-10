'use client'

import { motion } from 'framer-motion'
import { Shield, Zap, Users, Target, Heart, Upload, Wand2 } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import Link from 'next/link'

export default function AboutPage() {
  const values = [
    {
      title: 'Innovation at Speed',
      description: 'We constantly upgrade our AI engine to keep pace with the latest in automotive and design trends.',
    },
    {
      title: 'Simplicity',
      description: 'Car customization should be effortless. We design every feature to be intuitive and user-friendly.',
    },
    {
      title: 'Sustainability',
      description: 'By visualizing before modifying, we help reduce waste, unnecessary parts, and environmental impact.',
    },
    {
      title: 'Realism First',
      description: 'Every render is fine-tuned to look like a real photograph, not just a digital mockup.',
    },
    {
      title: 'Empowerment',
      description: 'We give car owners the tools to take control of their vision—without waiting on workshops or costly trials.',
    },
    {
      title: 'Global Reach',
      description: 'From Tokyo to New York, our platform is built for car enthusiasts worldwide.',
    },
  ]



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
          className="text-center mb-16"
        >
          <Badge className="mb-4">About AutoAesthetics</Badge>
          <h1 className="font-display font-bold text-4xl md:text-5xl text-white mb-6">
            About AutoAesthetics AI
          </h1>
          <p className="text-xl text-brand-metal max-w-3xl mx-auto">
            We are an advanced Virtual Car Customizer that lets you transform your vehicle's look in seconds. With cutting-edge AI, we make car customization online simple, interactive, and accessible for every car enthusiast worldwide.
          </p>
        </motion.div>

        {/* Mission Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="glass p-12 rounded-3xl mb-16"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-display font-bold text-3xl text-white mb-6">
                Who We Are
              </h2>
              <p className="text-brand-metal text-lg mb-6">
                At AutoAesthetics AI, we're passionate car lovers and tech innovators on a mission to redefine the way people customize their cars. Our platform combines powerful AI technology with an easy-to-use interface, so anyone can visualize modifications and explore endless styling options without leaving their screen.
              </p>
              <p className="text-brand-metal mb-8">
                We believe car personalization should be creative, fun, and hassle-free. That's why our Virtual Car Customizer gives drivers and enthusiasts the ability to test colors, wheels, and upgrades instantly, bringing the future of car customization online to your fingertips.
              </p>
              <Link href="/visualizer">
                <Button size="lg">
                  Try It Now
                </Button>
              </Link>
            </div>
            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-brand-blue/20 to-brand-blueGlow/20 rounded-3xl flex items-center justify-center">
                <div className="text-center">
                  <Heart className="w-16 h-16 text-brand-blue mx-auto mb-4" />
                  <p className="text-white font-medium">Made with passion</p>
                  <p className="text-brand-metal text-sm">for car enthusiasts</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* What We Do */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-16"
        >
          <h2 className="font-display font-bold text-3xl text-white mb-8 text-center">
            What We Do
          </h2>
          <div className="glass p-8 rounded-3xl mb-8">
            <p className="text-brand-metal text-lg text-center mb-6">
              We specialize in AI-powered car customization visualization using advanced machine learning algorithms to create photorealistic previews of automotive modifications.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-brand-blue to-brand-blueGlow rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-xl">AI</span>
                </div>
                <h3 className="font-semibold text-white mb-2">AI Technology</h3>
                <p className="text-brand-metal text-sm">Advanced machine learning models trained specifically for automotive visualization</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-brand-blue to-brand-blueGlow rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-xl">🎨</span>
                </div>
                <h3 className="font-semibold text-white mb-2">Customization</h3>
                <p className="text-brand-metal text-sm">Wraps, wheels, spoilers, tints, and more - visualize any modification</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-brand-blue to-brand-blueGlow rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-xl">⚡</span>
                </div>
                <h3 className="font-semibold text-white mb-2">Instant Results</h3>
                <p className="text-brand-metal text-sm">Get photorealistic results in seconds, not hours</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* How It Works */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mb-16"
        >
          <h2 className="font-display font-bold text-3xl text-white mb-8 text-center">
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Step 1: Upload Your Car Photo */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="glass p-6 rounded-2xl text-center group hover:shadow-glow transition-all duration-300"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-brand-blue to-brand-blueGlow rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <Upload className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-semibold text-white mb-3 text-lg">Upload Your Car Photo</h3>
              <p className="text-brand-metal text-sm">
                Snap a picture of your car or upload an existing one. Our system prepares it for customization while keeping every detail intact.
              </p>
            </motion.div>
            
            {/* Step 2: Customize with AI */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="glass p-6 rounded-2xl text-center group hover:shadow-glow transition-all duration-300"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-brand-blue to-brand-blueGlow rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <Wand2 className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-semibold text-white mb-3 text-lg">Customize with AI</h3>
              <p className="text-brand-metal text-sm">
                Choose modifications like colors, wheels, body kits, or lighting. Our AI applies changes seamlessly while preserving realistic angles, reflections, and textures.
              </p>
            </motion.div>
            
            {/* Step 3: Get Instant Results */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
              className="glass p-6 rounded-2xl text-center group hover:shadow-glow transition-all duration-300"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-brand-blue to-brand-blueGlow rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-semibold text-white mb-3 text-lg">Get Instant Results</h3>
              <p className="text-brand-metal text-sm">
                Within seconds, see your car transformed in a photorealistic preview. Make tweaks until it looks exactly the way you imagined.
              </p>
            </motion.div>
            
            {/* Step 4: Secure & Private */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.0 }}
              className="glass p-6 rounded-2xl text-center group hover:shadow-glow transition-all duration-300"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-brand-blue to-brand-blueGlow rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-semibold text-white mb-3 text-lg">Secure & Private</h3>
              <p className="text-brand-metal text-sm">
                Your photos are processed safely and never stored permanently. We prioritize your privacy at every step.
              </p>
            </motion.div>
          </div>
        </motion.div>



        {/* Values */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="mb-16"
        >
          <h2 className="font-display font-bold text-3xl text-white mb-8 text-center">
            Our Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 + index * 0.1 }}
                className="glass p-6 rounded-2xl text-center"
              >
                <h3 className="font-semibold text-white mb-3 text-lg">{value.title}</h3>
                <p className="text-brand-metal text-sm">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>


      </div>
    </motion.div>
  )
}
