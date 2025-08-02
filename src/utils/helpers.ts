import { Architecture, FilterOptions } from '@/types'

export const filterArchitectures = (
  architectures: Architecture[],
  filters: FilterOptions
): Architecture[] => {
  let filtered = architectures

  // Filter by category
  if (filters.category && filters.category !== 'all') {
    filtered = filtered.filter(arch =>
      arch.category.includes(filters.category)
    )
  }

  // Filter by search term
  if (filters.search) {
    const searchTerm = filters.search.toLowerCase()
    filtered = filtered.filter(arch =>
      arch.title.toLowerCase().includes(searchTerm) ||
      arch.description.toLowerCase().includes(searchTerm) ||
      arch.tags.some(tag => tag.toLowerCase().includes(searchTerm)) ||
      arch.author.name.toLowerCase().includes(searchTerm)
    )
  }

  // Sort results
  switch (filters.sortBy) {
    case 'newest':
      filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      break
    case 'popular':
      filtered.sort((a, b) => {
        const aScore = a.performance.scalability + a.performance.reliability
        const bScore = b.performance.scalability + b.performance.reliability
        return bScore - aScore
      })
      break
    case 'alphabetical':
      filtered.sort((a, b) => a.title.localeCompare(b.title))
      break
  }

  return filtered
}

export const getAllCategories = (architectures: Architecture[]): string[] => {
  const categories = new Set<string>()
  architectures.forEach(arch => {
    arch.category.forEach(cat => categories.add(cat))
  })
  return Array.from(categories).sort()
}

export const getAllTags = (architectures: Architecture[]): string[] => {
  const tags = new Set<string>()
  architectures.forEach(arch => {
    arch.tags.forEach(tag => tags.add(tag))
  })
  return Array.from(tags).sort()
}

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

export const getPerformanceColor = (score: number): string => {
  if (score >= 8) return 'text-green-600'
  if (score >= 6) return 'text-yellow-600'
  return 'text-red-600'
}

export const getPerformanceLabel = (score: number): string => {
  if (score >= 8) return 'Excellent'
  if (score >= 6) return 'Good'
  return 'Fair'
} 