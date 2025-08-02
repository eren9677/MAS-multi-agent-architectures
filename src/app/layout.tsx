import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Multi-Agent Architectures - Open Source Collaboration Platform',
  description: 'Discover and share multi-agent AI architectures. A collaborative platform for researchers, developers, and AI enthusiasts to explore innovative agent-based systems.',
  keywords: 'multi-agent, AI, architecture, collaboration, open source, artificial intelligence, agent systems',
  authors: [{ name: 'Multi-Agent Architectures Community' }],
  openGraph: {
    title: 'Multi-Agent Architectures',
    description: 'Open source collaboration platform for multi-agent AI architectures',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Multi-Agent Architectures',
    description: 'Open source collaboration platform for multi-agent AI architectures',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
} 