'use client'

import React, { useRef } from 'react'

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

  const handleAddArchitectureClick = (e: React.MouseEvent) => {
    e.preventDefault()
    // Force navigation using window.location
    window.location.href = '/MAS-multi-agent-architectures/architecture-builder/'
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
        </div>
      </div>
    </header>
  )
}