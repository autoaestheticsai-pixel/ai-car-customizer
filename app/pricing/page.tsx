'use client'

import { motion } from 'framer-motion'
import { Check, Star, Zap, Crown } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'

export default function PricingPage() {
  const plans = [
    {
      name: 'Free',
      price: '$0',
      period: 'forever',
      description: 'Perfect for trying out the platform',
      icon: Zap,
      features: [
        '5 generations per month',
        'Basic image quality',
        'Standard processing time',
        'Community support',
      ],
      cta: 'Get Started',
      popular: false,
    },
    {
      name: 'Creator',
      price: '$19',
      period: 'per month',
      description: 'For car enthusiasts and content creators',
      icon: Star,
      features: [
        '100 generations per month',
        'High-quality renders',
        'Priority processing',
        'Reference image uploads',
        'Download in multiple formats',
        'Email support',
      ],
      cta: 'Start Free Trial',
      popular: true,
    },
    {
      name: 'Pro',
      price: '$49',
      period: 'per month',
      description: 'For professionals and businesses',
      icon: Crown,
      features: [
        'Unlimited generations',
        'Ultra-high quality renders',
        'Instant processing',
        'Batch processing',
        'API access',
        'Custom model training',
        'Priority support',
        'Commercial license',
      ],
      cta: 'Contact Sales',
      popular: false,
    },
  ]

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
          <Badge className="mb-4">Simple, transparent pricing</Badge>
          <h1 className="font-display font-bold text-4xl md:text-5xl text-white mb-6">
            Choose Your Plan
          </h1>
          <p className="text-xl text-brand-metal max-w-2xl mx-auto">
            Start free and upgrade as you grow. No hidden fees, cancel anytime.
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className={`relative glass p-8 rounded-3xl ${
                plan.popular ? 'ring-2 ring-brand-blue shadow-glow' : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-gradient-to-r from-brand-blue to-brand-blueGlow">
                    Most Popular
                  </Badge>
                </div>
              )}

              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-gradient-to-br from-brand-blue to-brand-blueGlow rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <plan.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-display font-bold text-2xl text-white mb-2">
                  {plan.name}
                </h3>
                <p className="text-brand-metal mb-4">{plan.description}</p>
                <div className="flex items-baseline justify-center">
                  <span className="font-display font-bold text-4xl text-white">
                    {plan.price}
                  </span>
                  <span className="text-brand-metal ml-2">/{plan.period}</span>
                </div>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start space-x-3">
                    <Check className="w-5 h-5 text-brand-blue mt-0.5 flex-shrink-0" />
                    <span className="text-brand-metal">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                variant={plan.popular ? 'primary' : 'secondary'}
                className="w-full"
                size="lg"
              >
                {plan.cta}
              </Button>
            </motion.div>
          ))}
        </div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="glass p-8 rounded-3xl"
        >
          <h2 className="font-display font-bold text-3xl text-white mb-8 text-center">
            Frequently Asked Questions
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold text-white mb-2">Can I change plans anytime?</h3>
              <p className="text-brand-metal text-sm">
                Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-white mb-2">What payment methods do you accept?</h3>
              <p className="text-brand-metal text-sm">
                We accept all major credit cards, PayPal, and bank transfers for annual plans.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-white mb-2">Is there a free trial?</h3>
              <p className="text-brand-metal text-sm">
                Yes, all paid plans come with a 14-day free trial. No credit card required.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-white mb-2">Can I cancel anytime?</h3>
              <p className="text-brand-metal text-sm">
                Absolutely. Cancel your subscription anytime with no cancellation fees or penalties.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Coming Soon Notice */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center mt-12"
        >
          <div className="glass p-6 rounded-2xl max-w-2xl mx-auto">
            <p className="text-brand-metal">
              <strong className="text-white">Auth coming soon.</strong> Payments in V1.5.
            </p>
            <p className="text-brand-metal/70 text-sm mt-2">
              Currently in development. Sign up for updates when we launch.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
