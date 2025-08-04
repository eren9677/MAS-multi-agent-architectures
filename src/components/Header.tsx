'use client'

import React, { useRef } from 'react'
import { Button } from './ui/Button'

export const Header: React.FC = () => {
  const headerRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)

  const handleHeaderClick = (e: React.MouseEvent) => {
    if (!headerRef.current || !titleRef.current) return
    
    // Get positions
    const headerRect = headerRef.current.getBoundingClientRect()
    const titleRect = titleRef.current.getBoundingClientRect()
    
    // Calculate click position relative to header
    const clickX = e.clientX - headerRect.left
    
    // Calculate title position relative to header
    const titleX = titleRect.left - headerRect.left
    
    // Create gradient element
    const gradient = document.createElement('div')
    gradient.className = 'navbar-gradient-animation'
    gradient.style.left = `${clickX}px`
    gradient.style.top = '0'
    gradient.style.height = '100%'
    
    // Calculate animation properties
    const distance = Math.abs(clickX - (titleX + titleRect.width / 2))
    const width = Math.max(distance * 2, 100)
    
    // Position the gradient element
    if (clickX < titleX) {
      gradient.style.width = `${width}px`
    } else {
      gradient.style.width = `${width}px`
      gradient.style.left = `${clickX - width}px`
    }
    
    // Add to header
    headerRef.current.appendChild(gradient)
    
    // Remove after animation
    setTimeout(() => {
      if (gradient.parentNode === headerRef.current) {
        headerRef.current?.removeChild(gradient)
      }
    }, 800)
  }

  return (
    <header 
      ref={headerRef}
      className="bg-white border-b border-gray-200 sticky top-0 z-40 overflow-hidden relative cursor-pointer"
      onClick={handleHeaderClick}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Title */}
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <h1 
                ref={titleRef}
                className="text-2xl font-bold text-primary-500 relative z-10"
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
            <Button
              variant="primary"
              size="md"
              className="hidden sm:inline-flex relative z-10"
            >
              Add Architecture
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
} 