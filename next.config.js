/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost', 'autoaestheticsai.com', 'www.autoaestheticsai.com'],
    unoptimized: false, // Enable image optimization for production
  },
  env: {
    AI_API_URL: process.env.AI_API_URL,
    AI_API_KEY: process.env.AI_API_KEY,
  },
  // Enable compression and optimization
  compress: true,
  // Enable experimental features for better performance
  experimental: {
    optimizeCss: true,
  },
  // Ensure proper headers for security
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
    ]
  },
}

module.exports = nextConfig
