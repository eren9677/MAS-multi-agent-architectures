'use client'

import { useState, useMemo, useEffect, useCallback } from 'react'
import { Architecture, FilterOptions, ModalState } from '@/types'
import { architectures } from '@/data/architectures'
import { filterArchitectures, getAllCategories } from '@/utils/helpers'
import { ArchitectureCard, AddArchitectureCard } from '@/components/ArchitectureCard'
import { ArchitectureModal } from '@/components/ArchitectureModal'
import { SearchBar } from '@/components/SearchBar'
import { ThemeToggle } from '@/components/ThemeToggle'

const PAGE_SIZE = 9

export default function Home() {
  const [filters, setFilters] = useState<FilterOptions>({
    category: '',
    search: '',
    sortBy: 'newest',
  })

  const [page, setPage] = useState(1)

  const [modalState, setModalState] = useState<ModalState>({
    isOpen: false,
    architecture: null,
  })

  const [starCount, setStarCount] = useState<number | null>(null)
  const [loading, setLoading] = useState(true)

  const filteredArchitectures = useMemo(() => {
    return filterArchitectures(architectures, filters)
  }, [filters])

  const totalPages = useMemo(() => {
    if (filteredArchitectures.length === 0) return 1
    const remaining = filteredArchitectures.length - (PAGE_SIZE - 1)
    if (remaining <= 0) return 1
    return 1 + Math.ceil(remaining / PAGE_SIZE)
  }, [filteredArchitectures])

  useEffect(() => {
    setPage(1)
  }, [filters])

  const pageArchitectures = useMemo(() => {
    if (page === 1) {
      return filteredArchitectures.slice(0, PAGE_SIZE - 1)
    }
    const start = (page - 2) * PAGE_SIZE + (PAGE_SIZE - 1)
    return filteredArchitectures.slice(start, start + PAGE_SIZE)
  }, [filteredArchitectures, page])

  const categories = useMemo(() => {
    return getAllCategories(architectures)
  }, [])

  const handleArchitectureClick = useCallback((architecture: Architecture) => {
    setModalState({ isOpen: true, architecture })
  }, [])

  const handleModalClose = useCallback(() => {
    setModalState({ isOpen: false, architecture: null })
  }, [])

  const handleSearchChange = useCallback((search: string) => {
    setFilters(prev => ({ ...prev, search }))
  }, [])

  const handleCategoryChange = useCallback((category: string) => {
    setFilters(prev => ({ ...prev, category }))
  }, [])

  const handleSortChange = useCallback((sortBy: FilterOptions['sortBy']) => {
    setFilters(prev => ({ ...prev, sortBy }))
  }, [])

  useEffect(() => {
    const fetchStarCount = async () => {
      try {
        const response = await fetch('https://api.github.com/repos/eren9677/MAS-multi-agent-architectures')
        if (response.ok) {
          const data = await response.json()
          setStarCount(data.stargazers_count)
        } else {
          setStarCount(null)
        }
      } catch {
        setStarCount(null)
      } finally {
        setLoading(false)
      }
    }

    fetchStarCount()
  }, [])

  const getPageNumbers = (): (number | 'ellipsis')[] => {
    const pages: (number | 'ellipsis')[] = []
    const maxVisible = 5

    if (totalPages <= maxVisible + 2) {
      for (let i = 1; i <= totalPages; i++) pages.push(i)
      return pages
    }

    pages.push(1)
    if (page > 3) pages.push('ellipsis')

    const start = Math.max(2, page - 1)
    const end = Math.min(totalPages - 1, page + 1)
    for (let i = start; i <= end; i++) pages.push(i)

    if (page < totalPages - 2) pages.push('ellipsis')
    pages.push(totalPages)
    return pages
  }

  return (
    <div className="min-h-screen bg-light-bg dark:bg-dark-bg transition-colors duration-200">
      <header className="border-b border-light-border dark:border-dark-border bg-light-card dark:bg-dark-card">
        <div className="max-w-7xl mx-auto px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold bg-gradient-blueish bg-clip-text text-transparent bg-size-200 animate-gradient-shift hover:bg-gradient-blueish-hover hover:animate-gradient-hover transition-all duration-500 ease-in-out cursor-pointer">
                MAS Design
              </h1>
              <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary mt-1">
                Collaborative Multi-Agent Architecture Directory
              </p>
            </div>

            <div className="flex items-center space-x-4">
              <a
                href="https://github.com/eren9677/MAS-multi-agent-architectures"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-light-text-secondary dark:text-dark-text-secondary hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                aria-label="GitHub Repository"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24" className="mr-1">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.11.82-.26.82-.577v-2.234c-3.338.726-4.042-1.61-4.042-1.61-.546-1.388-1.333-1.758-1.333-1.758-1.09-.745.082-.73.082-.73 1.205.085 1.84 1.238 1.84 1.238 1.07 1.834 2.807 1.304 3.492.997.108-.776.418-1.305.762-1.605-2.665-.3-5.466-1.335-5.466-5.93 0-1.31.467-2.38 1.235-3.22-.123-.302-.535-1.523.117-3.176 0 0 1.008-.322 3.3 1.23a11.52 11.52 0 0 1 3-.404c1.02.005 2.045.138 3 .404 2.29-1.552 3.296-1.23 3.296-1.23.655 1.653.244 2.874.12 3.176.77.84 1.233 1.91 1.233 3.22 0 4.61-2.807 5.625-5.48 5.92.43.372.823 1.103.823 2.222v3.293c0 .32.217.694.825.576C20.565 21.796 24 17.297 24 12c0-6.63-5.373-12-12-12z" />
                </svg>
                Repo
              </a>

              <div className="flex items-center space-x-2 text-sm text-light-text-secondary dark:text-dark-text-secondary">
                <span className="text-primary-500">&star;</span>
                <span>
                  {loading ? '...' : starCount !== null ? starCount.toLocaleString() : 'N/A'}
                </span>
              </div>

              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto flex">
        <aside className="w-64 flex-shrink-0 border-r border-light-border dark:border-dark-border bg-light-card dark:bg-dark-card">
          <div className="p-4 space-y-6">
            <div>
              <h3 className="text-sm font-medium text-light-text dark:text-dark-text mb-2">
                Multi-Agent Architectures
              </h3>
              <p className="text-xs text-light-text-secondary dark:text-dark-text-secondary">
                {architectures.length} architectures
              </p>
            </div>

            <div>
              <SearchBar
                value={filters.search}
                onChange={handleSearchChange}
                placeholder="Search architectures..."
              />
            </div>

            <div>
              <h4 className="text-sm font-medium text-light-text dark:text-dark-text mb-3">Categories</h4>
              <div className="space-y-1">
                <button
                  onClick={() => handleCategoryChange('')}
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
                    onClick={() => handleCategoryChange(category)}
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

            <div className="pt-4 border-t border-light-border dark:border-dark-border">
              <h4 className="text-sm font-medium text-light-text dark:text-dark-text mb-2">About</h4>
              <p className="text-xs text-light-text-secondary dark:text-dark-text-secondary leading-relaxed mb-2">
                A curated collection of multi-agent AI architectures for researchers, developers, and AI enthusiasts.
                Explore innovative agent-based systems and share your own architectures with the community.
              </p>
              <p className="text-xs text-light-text-secondary dark:text-dark-text-secondary leading-relaxed">
                Curated by <a
                  href="https://www.linkedin.com/in/eren9677/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-600 hover:text-primary-800 dark:text-primary-400 dark:hover:text-primary-300 underline transition-colors duration-200"
                >Eren K&#305;z&#305;l&#305;rmak</a>
              </p>
            </div>

            <div>
              <h4 className="text-sm font-medium text-light-text dark:text-dark-text mb-2">Contributing</h4>
              <p className="text-xs text-light-text-secondary dark:text-dark-text-secondary leading-relaxed">
                If you&apos;d like to contribute, please fork the repository and make changes as you&apos;d like.
                Pull requests are warmly welcome.
              </p>
            </div>
          </div>
        </aside>

        <main className="flex-1 p-8 bg-light-bg dark:bg-dark-bg">
          <div className="max-w-7xl mx-auto">
            <div className="mb-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <select
                    value={filters.sortBy}
                    onChange={(e) => handleSortChange(e.target.value as FilterOptions['sortBy'])}
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

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 auto-rows-fr">
              {page === 1 && <AddArchitectureCard />}

              {pageArchitectures.map((architecture) => (
                <ArchitectureCard
                  key={architecture.id}
                  architecture={architecture}
                  onClick={() => handleArchitectureClick(architecture)}
                />
              ))}
            </div>

            {totalPages > 1 && (
              <div className="mt-8 flex items-center justify-center gap-2">
                <button
                  onClick={() => setPage(p => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="px-3 py-2 text-sm border border-light-border dark:border-dark-border rounded-md bg-light-card dark:bg-dark-card text-light-text dark:text-dark-text hover:bg-gray-100 dark:hover:bg-dark-surface disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                  &larr; Previous
                </button>

                {getPageNumbers().map((p, i) =>
                  p === 'ellipsis' ? (
                    <span key={`e-${i}`} className="px-2 text-sm text-light-text-secondary dark:text-dark-text-secondary">&hellip;</span>
                  ) : (
                    <button
                      key={p}
                      onClick={() => setPage(p)}
                      className={`w-9 h-9 text-sm rounded-md transition-colors ${
                        page === p
                          ? 'bg-primary-500 text-white font-semibold'
                          : 'border border-light-border dark:border-dark-border bg-light-card dark:bg-dark-card text-light-text dark:text-dark-text hover:bg-gray-100 dark:hover:bg-dark-surface'
                      }`}
                    >
                      {p}
                    </button>
                  )
                )}

                <button
                  onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className="px-3 py-2 text-sm border border-light-border dark:border-dark-border rounded-md bg-light-card dark:bg-dark-card text-light-text dark:text-dark-text hover:bg-gray-100 dark:hover:bg-dark-surface disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                  Next &rarr;
                </button>
              </div>
            )}
          </div>
        </main>
      </div>

      <ArchitectureModal
        architecture={modalState.architecture}
        isOpen={modalState.isOpen}
        onClose={handleModalClose}
      />
    </div>
  )
}
