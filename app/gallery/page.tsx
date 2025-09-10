'use client'

import { motion } from 'framer-motion'
import { Eye, ArrowRight, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'

// Mock gallery data
const galleryItems = [
  {
    id: 1,
    before: '/api/placeholder/400/300',
    after: '/api/placeholder/400/300',
    prompt: 'Matte black wrap with red racing stripes',
    car: 'BMW M3',
    likes: 42,
  },
  {
    id: 2,
    before: '/api/placeholder/400/300',
    after: '/api/placeholder/400/300',
    prompt: 'Carbon fiber spoiler and black rims',
    car: 'Audi RS5',
    likes: 38,
  },
  {
    id: 3,
    before: '/api/placeholder/400/300',
    after: '/api/placeholder/400/300',
    prompt: 'Chrome delete with dark window tints',
    car: 'Tesla Model S',
    likes: 56,
  },
  {
    id: 4,
    before: '/api/placeholder/400/300',
    after: '/api/placeholder/400/300',
    prompt: 'Lowered suspension and neon underglow',
    car: 'Honda Civic',
    likes: 29,
  },
  {
    id: 5,
    before: '/api/placeholder/400/300',
    after: '/api/placeholder/400/300',
    prompt: 'White wrap with blue accents',
    car: 'Porsche 911',
    likes: 67,
  },
  {
    id: 6,
    before: '/api/placeholder/400/300',
    after: '/api/placeholder/400/300',
    prompt: 'Carbon fiber hood and side skirts',
    car: 'Nissan GT-R',
    likes: 44,
  },
]

export default function GalleryPage() {
  return (
    <div className="min-h-screen pt-20 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="font-display font-bold text-4xl md:text-5xl text-white mb-6">
            Gallery
          </h1>
          <p className="text-xl text-brand-metal max-w-2xl mx-auto mb-8">
            Explore amazing car customizations created by our community
          </p>
          <Link href="/visualizer">
            <Button size="lg">
              Create Your Own
              <ArrowRight className="ml-2" size={20} />
            </Button>
          </Link>
        </motion.div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {galleryItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="group glass rounded-2xl overflow-hidden hover:shadow-glow transition-all duration-300"
            >
              {/* Image Container */}
              <div className="relative aspect-video bg-gradient-to-br from-brand-mid to-brand-black">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <Sparkles className="w-8 h-8 text-brand-blue" />
                    </div>
                    <p className="text-brand-metal text-sm">Before/After</p>
                    <p className="text-brand-metal/70 text-xs mt-1">{item.car}</p>
                  </div>
                </div>
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <Link href="/visualizer">
                    <Button variant="secondary" size="sm">
                      <Eye className="mr-2" size={16} />
                      Open in Visualizer
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="font-semibold text-white mb-2 line-clamp-2">
                  {item.prompt}
                </h3>
                <p className="text-brand-metal text-sm mb-4">
                  {item.car}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-brand-metal text-sm">
                    {item.likes} likes
                  </span>
                  <Link href="/visualizer">
                    <Button variant="ghost" size="sm">
                      Try This Style
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Load More */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center mt-16"
        >
          <Button variant="secondary" size="lg">
            Load More
          </Button>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="mt-20"
        >
          <div className="glass p-12 rounded-3xl text-center">
            <h2 className="font-display font-bold text-3xl text-white mb-4">
              Ready to Create Your Own?
            </h2>
            <p className="text-xl text-brand-metal mb-8 max-w-2xl mx-auto">
              Join thousands of car enthusiasts who are already visualizing their dream rides
            </p>
            <Link href="/visualizer">
              <Button size="lg">
                Start Creating
                <ArrowRight className="ml-2" size={20} />
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
