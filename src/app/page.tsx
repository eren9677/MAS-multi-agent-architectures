'use client'

import React, { useState, useMemo } from 'react'
import { SearchBar } from '@/components/SearchBar'
import { ArchitectureGrid } from '@/components/ArchitectureGrid'
import { ArchitectureModal } from '@/components/ArchitectureModal'
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

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-primary-500">
                Multi-Agent Architectures
              </h1>
              <span className="ml-2 text-sm text-gray-600">
                Open-source collaboration platform
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-500">⭐ 5 architectures</span>
              <Button variant="primary" size="sm">
                Add Architecture
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Left Sidebar */}
        <aside className="w-64 bg-gray-50 border-r border-gray-200 min-h-screen p-6">
          <div className="space-y-6">
            {/* Platform Selection */}
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-3">
                Choose your AI platform
              </h3>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-primary-500 text-white text-xs rounded-full">
                  Multi-Agent
                </span>
                <span className="px-3 py-1 bg-gray-200 text-gray-700 text-xs rounded-full">
                  Single Agent
                </span>
                <span className="px-3 py-1 bg-gray-200 text-gray-700 text-xs rounded-full">
                  Hybrid
                </span>
              </div>
            </div>

            {/* Category Section */}
            <div>
              <h3 className="text-sm font-medium text-primary-600 mb-3">
                Architecture Categories
              </h3>
              <div className="space-y-2">
                <button
                  onClick={() => setFilters({ ...filters, category: 'all' })}
                  className={`w-full text-left px-2 py-1 text-sm rounded ${
                    filters.category === 'all'
                      ? 'bg-primary-100 text-primary-700'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  All Architectures ({architectures.length})
                </button>
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setFilters({ ...filters, category })}
                    className={`w-full text-left px-2 py-1 text-sm rounded ${
                      filters.category === category
                        ? 'bg-primary-100 text-primary-700'
                        : 'text-gray-700 hover:bg-gray-100'
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
            <div className="pt-6 border-t border-gray-200">
              <h4 className="text-sm font-medium text-gray-900 mb-2">About</h4>
              <p className="text-xs text-gray-600 leading-relaxed">
                A curated collection of multi-agent AI architectures for researchers, developers, and AI enthusiasts. 
                Explore innovative agent-based systems and share your own architectures with the community.
              </p>
            </div>

            {/* Contributing Section */}
            <div>
              <h4 className="text-sm font-medium text-gray-900 mb-2">Contributing</h4>
              <p className="text-xs text-gray-600 leading-relaxed">
                If you'd like to contribute, please fork the repository and make changes as you'd like. 
                Pull requests are warmly welcome.
              </p>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {/* Filter Controls */}
          <div className="mb-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <select
                  value={filters.sortBy}
                  onChange={(e) => setFilters({ ...filters, sortBy: e.target.value as FilterOptions['sortBy'] })}
                  className="text-sm border border-gray-300 rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <option value="newest">Newest</option>
                  <option value="popular">Popular</option>
                  <option value="alphabetical">Alphabetical</option>
                </select>
                <span className="text-sm text-gray-600">
                  {filteredArchitectures.length} of {architectures.length} architectures
                </span>
              </div>
            </div>
          </div>

          {/* Architecture Grid */}
          <ArchitectureGrid
            architectures={filteredArchitectures}
            onArchitectureClick={handleArchitectureClick}
          />

          {/* Footer Links */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-3">Links</h4>
                <ul className="space-y-1 text-sm text-gray-600">
                  <li>• GitHub Repository</li>
                  <li>• Documentation</li>
                  <li>• Community</li>
                </ul>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-3">Resources</h4>
                <ul className="space-y-1 text-sm text-gray-600">
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