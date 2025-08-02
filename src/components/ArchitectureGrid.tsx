import React from 'react'
import { ArchitectureCard } from './ArchitectureCard'
import { Architecture } from '@/types'

interface ArchitectureGridProps {
  architectures: Architecture[]
  onArchitectureClick: (architecture: Architecture) => void
  className?: string
}

export const ArchitectureGrid: React.FC<ArchitectureGridProps> = ({
  architectures,
  onArchitectureClick,
  className = ''
}) => {
  if (architectures.length === 0) {
    return (
      <div className={`text-center py-8 ${className}`}>
        <div className="text-gray-500">
          <svg className="mx-auto h-8 w-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">No architectures found</h3>
          <p className="mt-1 text-xs text-gray-500">
            Try adjusting your search or filter criteria.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 ${className}`}>
      {architectures.map((architecture) => (
        <ArchitectureCard
          key={architecture.id}
          architecture={architecture}
          onClick={() => onArchitectureClick(architecture)}
        />
      ))}
    </div>
  )
} 