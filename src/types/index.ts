import { VisualArchitecture } from './architecture';

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
  performance?: {
    scalability: number
    complexity: number
    reliability: number
  }
  createdAt: string
  updatedAt: string
  githubUrl?: string | null
  documentationUrl?: string | null
  visual?: VisualArchitecture
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