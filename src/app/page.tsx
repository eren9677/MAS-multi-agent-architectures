'use client'

import React, { useState, useMemo } from 'react'
import { Architecture, FilterOptions, ModalState } from '@/types'
import { architectures } from '@/data/architectures'
import { filterArchitectures, getAllCategories } from '@/utils/helpers'
import { ArchitectureCard, AddArchitectureCard } from '@/components/ArchitectureCard'
import { ArchitectureModal } from '@/components/ArchitectureModal'
import { SearchBar } from '@/components/SearchBar'
import { ThemeToggle } from '@/components/ThemeToggle'

export default function Home() {
  const [filters, setFilters] = useState<FilterOptions>({
    category: '',
    search: '',
    sortBy: 'newest'
  })

  const [modalState, setModalState] = useState<ModalState>({
    isOpen: false,
    architecture: null
  })

  const filteredArchitectures = useMemo(() => {
    return filterArchitectures(architectures, filters)
  }, [filters])

  const categories = useMemo(() => {
    return getAllCategories(architectures)
  }, [])

  const handleArchitectureClick = (architecture: Architecture) => {
    setModalState({
      isOpen: true,
      architecture
    })
  }

  const handleModalClose = () => {
    setModalState({
      isOpen: false,
      architecture: null
    })
  }

  const handleAddArchitectureClick = () => {
    // TODO: Implement add architecture functionality
    console.log('Add architecture clicked')
  }

  return (
    <div className="min-h-screen bg-light-bg dark:bg-dark-bg transition-colors duration-200">
      {/* Header */}
      <header className="border-b border-light-border dark:border-dark-border bg-light-card dark:bg-dark-card">
        <div className="max-w-7xl mx-auto px-8 py-4">
          <div className="flex items-center justify-between">
            {/* Left: Logo */}
            <div>
              <h1 className="text-2xl font-bold bg-gradient-blueish bg-clip-text text-transparent bg-size-200 animate-gradient-shift hover:bg-gradient-blueish-hover hover:animate-gradient-hover transition-all duration-500 ease-in-out cursor-pointer">
                Multi-Agent Architectures
              </h1>
              <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary mt-1">
                World&apos;s First Multi-Agent Architecture Directory
              </p>
            </div>

            {/* Right: Utility Icons */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-sm text-light-text-secondary dark:text-dark-text-secondary">
                <span className="text-primary-500">★</span>
                <span>131,885</span>
              </div>
              <div className="w-6 h-6 text-light-text-secondary dark:text-dark-text-secondary">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>

      {/* Main Layout - Three Column Structure */}
      <div className="max-w-7xl mx-auto flex">
        {/* Left Sidebar - Fixed Width */}
        <aside className="w-64 flex-shrink-0 border-r border-light-border dark:border-dark-border bg-light-card dark:bg-dark-card">
          <div className="p-4 space-y-6">
            {/* Architecture Count */}
            <div>
              <h3 className="text-sm font-medium text-light-text dark:text-dark-text mb-2">
                Multi-Agent Architectures
              </h3>
              <p className="text-xs text-light-text-secondary dark:text-dark-text-secondary">
                {architectures.length} architectures
              </p>
            </div>

            {/* Search */}
            <div>
              <SearchBar
                value={filters.search}
                onChange={(search) => setFilters({ ...filters, search })}
                placeholder="Search architectures..."
              />
            </div>

            {/* Categories */}
            <div>
              <h4 className="text-sm font-medium text-light-text dark:text-dark-text mb-3">
                Categories
              </h4>
              <div className="space-y-1">
                <button
                  onClick={() => setFilters({ ...filters, category: '' })}
                  className={`w-full text-left px-2 py-1.5 text-xs rounded transition-colors duration-200 ${
                    filters.category === ''
                      ? 'bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300'
                      : 'text-light-text dark:text-dark-text hover:bg-gray-100 dark:hover:bg-dark-surface'
                  }`}
                >
                  All Architectures
                </button>
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setFilters({ ...filters, category })}
                    className={`w-full text-left px-2 py-1.5 text-xs rounded transition-colors duration-200 ${
                      filters.category === category
                        ? 'bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300'
                        : 'text-light-text dark:text-dark-text hover:bg-gray-100 dark:hover:bg-dark-surface'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* About Section */}
            <div className="pt-4 border-t border-light-border dark:border-dark-border">
              <h4 className="text-sm font-medium text-light-text dark:text-dark-text mb-2">About</h4>
              <p className="text-xs text-light-text-secondary dark:text-dark-text-secondary leading-relaxed">
                A curated collection of multi-agent AI architectures for researchers, developers, and AI enthusiasts. 
                Explore innovative agent-based systems and share your own architectures with the community.
              </p>
            </div>

            {/* Contributing Section */}
            <div>
              <h4 className="text-sm font-medium text-light-text dark:text-dark-text mb-2">Contributing</h4>
              <p className="text-xs text-light-text-secondary dark:text-dark-text-secondary leading-relaxed">
                If you&apos;d like to contribute, please fork the repository and make changes as you&apos;d like. 
                Pull requests are warmly welcome.
              </p>
            </div>
          </div>
        </aside>

        {/* Main Content - Flexible Width */}
        <main className="flex-1 p-8 bg-light-bg dark:bg-dark-bg">
          <div className="max-w-7xl mx-auto">
            {/* Filter Controls */}
            <div className="mb-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <select
                    value={filters.sortBy}
                    onChange={(e) => setFilters({ ...filters, sortBy: e.target.value as FilterOptions['sortBy'] })}
                    className="text-sm border border-light-border dark:border-dark-border rounded px-3 py-1.5 bg-light-card dark:bg-dark-card text-light-text dark:text-dark-text focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors duration-200"
                  >
                    <option value="newest">Newest</option>
                    <option value="popular">Popular</option>
                    <option value="alphabetical">Alphabetical</option>
                  </select>
                  <span className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
                    {filteredArchitectures.length} of {architectures.length} architectures
                  </span>
                </div>
              </div>
            </div>

          {/* Architecture Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 auto-rows-fr">
            {/* Add Architecture Card */}
            <AddArchitectureCard onClick={handleAddArchitectureClick} />
            
            {/* Architecture Cards */}
            {filteredArchitectures.map((architecture) => (
              <ArchitectureCard
                key={architecture.id}
                architecture={architecture}
                onClick={() => handleArchitectureClick(architecture)}
              />
            ))}
          </div>

          {/* Footer Links */}
          <div className="mt-16 pt-8 border-t border-light-border dark:border-dark-border">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-sm font-medium text-light-text dark:text-dark-text mb-3">Links</h4>
                <ul className="space-y-1 text-sm text-light-text-secondary dark:text-dark-text-secondary">
                  <li>• GitHub Repository</li>
                  <li>• Documentation</li>
                  <li>• Community</li>
                </ul>
              </div>
              <div>
                <h4 className="text-sm font-medium text-light-text dark:text-dark-text mb-3">Resources</h4>
                <ul className="space-y-1 text-sm text-light-text-secondary dark:text-dark-text-secondary">
                  <li>• Multi-Agent Systems Guide</li>
                  <li>• Best Practices</li>
                  <li>• Research Papers</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>

    {/* Architecture Modal */}
    <ArchitectureModal
      architecture={modalState.architecture}
      isOpen={modalState.isOpen}
      onClose={handleModalClose}
    />
  </div>
  )
} 