import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/contexts/ThemeContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Multi-Agent Architectures - Open Source Collaboration Platform',
  description: 'Discover and share multi-agent AI architectures. A collaborative platform for researchers, developers, and AI enthusiasts to explore innovative agent-based systems with 25+ proven patterns and interactive builder.',
  keywords: 'multi-agent systems, AI architectures, agent coordination, distributed AI, collaborative agents, open source, artificial intelligence, agent patterns, system design, architecture builder',
  authors: [{ name: 'Multi-Agent Architectures Community' }],
  creator: 'Multi-Agent Architectures Community',
  publisher: 'Multi-Agent Architectures',
  
  // Enhanced Open Graph for better social sharing
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://masdesign.site',
    title: 'Multi-Agent Architectures - Open Source Collaboration Platform',
    description: 'Discover and share multi-agent AI architectures. Explore 25+ proven patterns from hierarchical to collaborative designs with our interactive builder.',
    siteName: 'Multi-Agent Architectures',
    images: [
      {
        url: 'https://masdesign.site/mainpage.png',
        width: 1200,
        height: 630,
        alt: 'Multi-Agent Architectures - Interactive Architecture Builder and Pattern Collection',
        type: 'image/png',
      },
      {
        url: 'https://masdesign.site/mainpage.png',
        width: 800,
        height: 600,
        alt: 'Multi-Agent Architectures Directory',
        type: 'image/png',
      }
    ],
  },
  
  // Icons and favicon
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  
  // Web app manifest
  manifest: '/site.webmanifest',
  
  // Enhanced Twitter Card
  twitter: {
    card: 'summary_large_image',
    site: '@masdesign_site', // Update with your actual Twitter handle
    creator: '@masdesign_site', // Update with your actual Twitter handle
    title: 'Multi-Agent Architectures - Open Source Collaboration Platform',
    description: 'Discover and share multi-agent AI architectures. Explore 25+ proven patterns with interactive builder.',
    images: ['https://masdesign.site/mainpage.png'],
  },
  
  // Additional SEO enhancements
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  
  // Canonical URL
  alternates: {
    canonical: 'https://masdesign.site',
  },
  
  // Category and classification
  category: 'Technology',
  
  // Verification (add if you have these services)
  // verification: {
  //   google: 'your-google-verification-code',
  //   yandex: 'your-yandex-verification-code',
  //   yahoo: 'your-yahoo-verification-code',
  // },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        {/* Favicon - Complete set */}
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        
        {/* Open Graph logo tag */}
        <meta property="og:logo" content="https://masdesign.site/apple-touch-icon.png" />
        
        {/* Additional meta tags for better social sharing */}
        <meta name="theme-color" content="#000000" />
        <meta name="application-name" content="Multi-Agent Architectures" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Multi-Agent Architectures" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        
        {/* Structured Data for Search Engines */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "Multi-Agent Architectures",
              "description": "Open source collaboration platform for multi-agent AI architectures",
              "url": "https://masdesign.site",
              "author": {
                "@type": "Organization",
                "name": "Multi-Agent Architectures Community"
              },
              "applicationCategory": "DeveloperApplication",
              "operatingSystem": "Web Browser",
              "offers": {
                "@type": "Offer",
                "description": "Free multi-agent architecture patterns and builder tool",
                "price": "0",
                "priceCurrency": "USD"
              }
            })
          }}
        />
      </head>
      <body className={inter.className}>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}