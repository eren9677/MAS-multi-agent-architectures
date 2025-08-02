export interface Architecture {
  id: string
  title: string
  description: string
  longDescription: string
  author: {
    name: string
    avatar?: string
    github?: string
  }
  category: string[]
  tags: string[]
  diagram: {
    image: string
    alt: string
  }
  implementation: {
    codeExample: string
    language: string
  }
  useCases: string[]
  performance: {
    scalability: number
    complexity: number
    reliability: number
  }
  createdAt: string
  updatedAt: string
  githubUrl?: string
  documentationUrl?: string
}

export interface FilterOptions {
  category: string
  search: string
  sortBy: 'newest' | 'popular' | 'alphabetical'
}

export interface ModalState {
  isOpen: boolean
  architecture: Architecture | null
} 