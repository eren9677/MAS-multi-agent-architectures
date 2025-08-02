import React from 'react'
import { Button } from './ui/Button'

export const Header: React.FC = () => {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Title */}
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-bold text-primary-500">
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
              className="text-gray-700 hover:text-primary-500 px-3 py-2 text-sm font-medium transition-colors duration-200"
            >
              Architectures
            </a>
            <a
              href="#about"
              className="text-gray-700 hover:text-primary-500 px-3 py-2 text-sm font-medium transition-colors duration-200"
            >
              About
            </a>
            <a
              href="#contribute"
              className="text-gray-700 hover:text-primary-500 px-3 py-2 text-sm font-medium transition-colors duration-200"
            >
              Contribute
            </a>
          </nav>

          {/* CTA Button */}
          <div className="flex items-center">
            <Button
              variant="primary"
              size="md"
              className="hidden sm:inline-flex"
            >
              Add Architecture
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
} 