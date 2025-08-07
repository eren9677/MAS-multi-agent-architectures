'use client'

import React, { useRef } from 'react'
import Link from 'next/link'
import { Button } from './ui/Button'

export const Header: React.FC = () => {
  const headerRef = useRef<HTMLDivElement>(null)

  const handleTitleClick = () => {
    if (!headerRef.current) return
    
    // Create liquid splash element
    const splash = document.createElement('div')
    splash.className = 'liquid-splash'
    
    // Add to navbar
    headerRef.current.appendChild(splash)
    
    // Remove after animation
    setTimeout(() => {
      if (splash.parentNode === headerRef.current) {
        headerRef.current?.removeChild(splash)
      }
    }, 1000)
  }

  return (
    <header
      ref={headerRef}
      className="bg-white border-b border-gray-200 sticky top-0 z-40 overflow-hidden relative"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Title */}
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <h1
                className="text-2xl font-bold liquid-text relative z-10 cursor-pointer"
                onClick={handleTitleClick}
              >
                Multi-Agent Architectures
              </h1>
            </div>
            <p className="ml-4 text-sm text-gray-600 hidden sm:block">
              Open-source collaboration platform
            </p>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex space-x-8">
            <a
              href="#architectures"
              className="text-gray-700 hover:text-primary-500 px-3 py-2 text-sm font-medium transition-colors duration-200 relative z-10"
            >
              Architectures
            </a>
            <a
              href="#about"
              className="text-gray-700 hover:text-primary-500 px-3 py-2 text-sm font-medium transition-colors duration-200 relative z-10"
            >
              About
            </a>
            <a
              href="#contribute"
              className="text-gray-700 hover:text-primary-500 px-3 py-2 text-sm font-medium transition-colors duration-200 relative z-10"
            >
              Contribute
            </a>
          </nav>
          {/* CTA Button */}
          <div className="flex items-center">
            <Link
              href="/architecture-builder"
              className="hidden sm:inline-flex relative z-10 items-center justify-center font-medium rounded-md transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-light-bg dark:focus:ring-offset-dark-bg bg-primary-500 text-white hover:bg-primary-600 focus:ring-primary-500 shadow-soft hover:shadow-soft-hover transform hover:scale-105 px-4 py-2 text-sm"
            >
              Add Architecture
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}