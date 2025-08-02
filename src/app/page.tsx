'use client'

import React, { useState, useMemo } from 'react'
import { SearchBar } from '@/components/SearchBar'
import { ArchitectureGrid } from '@/components/ArchitectureGrid'
import { ArchitectureModal } from '@/components/ArchitectureModal'
import { ThemeToggle } from '@/components/ThemeToggle'
import { Button } from '@/components/ui/Button'
import { architectures } from '@/data/architectures'
import { filterArchitectures, getAllCategories } from '@/utils/helpers'
import { Architecture, FilterOptions, ModalState } from '@/types'

export default function Home() {
  const [filters, setFilters] = useState<FilterOptions>({
    category: 'all',
    search: '',
    sortBy: 'newest'
  })

  const [modalState, setModalState] = useState<ModalState>({
    isOpen: false,
    architecture: null
  })

  const categories = useMemo(() => getAllCategories(architectures), [])
  
  const filteredArchitectures = useMemo(() => 
    filterArchitectures(architectures, filters), 
    [filters]
  )

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
      <header className="border-b border-light-border dark:border-dark-border bg-light-bg dark:bg-dark-bg sticky top-0 z-40 transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent bg-size-200 animate-gradient-shift hover:bg-gradient-primary-dark transition-all duration-300">
                Multi-Agent Architectures
              </h1>
              <span className="ml-2 text-sm text-light-text-secondary dark:text-dark-text-secondary">
                Open-source collaboration platform
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-light-text-secondary dark:text-dark-text-secondary">⭐ 5 architectures</span>
              <ThemeToggle />
              <Button variant="primary" size="sm">
                Add Architecture
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Left Sidebar */}
        <aside className="w-64 bg-light-surface dark:bg-dark-surface border-r border-light-border dark:border-dark-border min-h-screen p-6 transition-colors duration-200">
          <div className="space-y-6">
            {/* Platform Selection */}
            <div>
              <h3 className="text-sm font-medium text-light-text dark:text-dark-text mb-3">
                Choose your AI platform
              </h3>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-primary-500 text-white text-xs rounded-full">
                  Multi-Agent
                </span>
                <span className="px-3 py-1 bg-gray-200 dark:bg-dark-card text-gray-700 dark:text-dark-text-secondary text-xs rounded-full">
                  Single Agent
                </span>
                <span className="px-3 py-1 bg-gray-200 dark:bg-dark-card text-gray-700 dark:text-dark-text-secondary text-xs rounded-full">
                  Hybrid
                </span>
              </div>
            </div>

            {/* Category Section */}
            <div>
              <h3 className="text-sm font-medium text-primary-600 dark:text-primary-400 mb-3">
                Architecture Categories
              </h3>
              <div className="space-y-2">
                <button
                  onClick={() => setFilters({ ...filters, category: 'all' })}
                  className={`w-full text-left px-2 py-1 text-sm rounded transition-colors duration-200 ${
                    filters.category === 'all'
                      ? 'bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300'
                      : 'text-light-text dark:text-dark-text hover:bg-gray-100 dark:hover:bg-dark-card'
                  }`}
                >
                  All Architectures ({architectures.length})
                </button>
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setFilters({ ...filters, category })}
                    className={`w-full text-left px-2 py-1 text-sm rounded transition-colors duration-200 ${
                      filters.category === category
                        ? 'bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300'
                        : 'text-light-text dark:text-dark-text hover:bg-gray-100 dark:hover:bg-dark-card'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* Search */}
            <div>
              <SearchBar
                value={filters.search}
                onChange={(search) => setFilters({ ...filters, search })}
                placeholder="Search architectures..."
              />
            </div>

            {/* About Section */}
            <div className="pt-6 border-t border-light-border dark:border-dark-border">
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

        {/* Main Content */}
        <main className="flex-1 p-6 bg-light-bg dark:bg-dark-bg transition-colors duration-200">
          {/* Filter Controls */}
          <div className="mb-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <select
                  value={filters.sortBy}
                  onChange={(e) => setFilters({ ...filters, sortBy: e.target.value as FilterOptions['sortBy'] })}
                  className="text-sm border border-light-border dark:border-dark-border rounded px-3 py-1 bg-light-bg dark:bg-dark-bg text-light-text dark:text-dark-text focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors duration-200"
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
          <ArchitectureGrid
            architectures={filteredArchitectures}
            onArchitectureClick={handleArchitectureClick}
            onAddArchitectureClick={handleAddArchitectureClick}
          />

          {/* Footer Links */}
          <div className="mt-12 pt-8 border-t border-light-border dark:border-dark-border">
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