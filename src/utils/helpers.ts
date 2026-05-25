import { Architecture, FilterOptions } from '@/types'

export const filterArchitectures = (
  architectures: Architecture[],
  filters: FilterOptions
): Architecture[] => {
  let filtered = [...architectures]

  if (filters.category && filters.category !== 'all') {
    filtered = filtered.filter(arch =>
      arch.category.includes(filters.category)
    )
  }

  if (filters.search) {
    const searchTerm = filters.search.toLowerCase()
    filtered = filtered.filter(arch =>
      arch.title.toLowerCase().includes(searchTerm) ||
      arch.description.toLowerCase().includes(searchTerm) ||
      arch.tags.some(tag => tag.toLowerCase().includes(searchTerm)) ||
      arch.author.name.toLowerCase().includes(searchTerm)
    )
  }

  switch (filters.sortBy) {
    case 'newest':
      filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      break
    case 'popular':
      filtered.sort((a, b) => {
        const aScore = a.performance ? a.performance.scalability + a.performance.reliability : 0
        const bScore = b.performance ? b.performance.scalability + b.performance.reliability : 0
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
