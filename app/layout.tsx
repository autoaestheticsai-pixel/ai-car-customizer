import type { Metadata } from 'next'
import { Inter, Plus_Jakarta_Sans } from 'next/font/google'
import Script from 'next/script'
import './globals.css'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { AmbientBackground } from '@/components/AmbientBackground'
import { ClientToastProvider } from '@/components/ClientToastProvider'
import AnalyticsTracker from './analytics-tracker'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
})

const plusJakarta = Plus_Jakarta_Sans({ 
  subsets: ['latin'],
  variable: '--font-plus-jakarta',
})

export const metadata: Metadata = {
  title: 'AutoAesthetics AI - Visualize Your Dream Ride',
  description: 'Upload your car. Describe the look. Get a realistic render—instantly. AI-powered car customization visualization.',
  keywords: ['car customization', 'AI', 'visualization', 'automotive', 'design', 'AutoAesthetics AI'],
  authors: [{ name: 'AutoAesthetics AI' }],
  openGraph: {
    title: 'AutoAesthetics AI - Visualize Your Dream Ride',
    description: 'Upload your car. Describe the look. Get a realistic render—instantly. AI-powered car customization visualization.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AutoAesthetics AI - Visualize Your Dream Ride',
    description: 'Upload your car. Describe the look. Get a realistic render—instantly. AI-powered car customization visualization.',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${plusJakarta.variable}`}>
      <head>
        {/* Google Analytics */}
        <Script
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
        />
        <Script id="ga-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}', {
              page_path: window.location.pathname,
            });
          `}
        </Script>
      </head>
      <body className="min-h-screen">
        <ClientToastProvider>
          <AmbientBackground />
          <div className="relative z-10">
            <Header />
            <main className="min-h-screen">
              {children}
            </main>
            <Footer />
          </div>
          <AnalyticsTracker />
        </ClientToastProvider>
      </body>
    </html>
  )
}
