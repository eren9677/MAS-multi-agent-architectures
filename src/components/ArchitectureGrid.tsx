import React from 'react'
import { ArchitectureCard, AddArchitectureCard } from './ArchitectureCard'
import { Architecture } from '@/types'

interface ArchitectureGridProps {
  architectures: Architecture[]
  onArchitectureClick: (architecture: Architecture) => void
  onAddArchitectureClick: () => void
  className?: string
}

export const ArchitectureGrid: React.FC<ArchitectureGridProps> = ({
  architectures,
  onArchitectureClick,
  onAddArchitectureClick,
  className = ''
}) => {
  return (
    <div className={`flex flex-wrap gap-4 ${className}`}>
      {/* Add Architecture Card */}
      <AddArchitectureCard onClick={onAddArchitectureClick} />
      
      {/* Architecture Cards */}
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