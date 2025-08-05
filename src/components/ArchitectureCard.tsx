'use client'

import React from 'react'
import Image from 'next/image'
import { Architecture } from '@/types'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { ArchitecturePreview } from '@/components/ArchitecturePreview'
import { getPerformanceColor, getPerformanceLabel } from '@/utils/helpers'

interface ArchitectureCardProps {
  architecture: Architecture
  onClick: () => void
}

export const ArchitectureCard: React.FC<ArchitectureCardProps> = ({ architecture, onClick }) => {
  return (
    <Card 
      onClick={onClick} 
      className="w-full h-80 bg-white dark:bg-dark-card border border-gray-200 dark:border-dark-border rounded-lg cursor-pointer transition-all duration-200 ease hover:shadow-lg dark:hover:shadow-dark-hover group"
    >
      <div className="p-4 h-full flex flex-col">
        {/* Visual Preview or Image */}
        <div className="relative w-full h-48 mb-3 rounded-md overflow-hidden">
          {architecture.visual ? (
            <ArchitecturePreview
              architecture={architecture.visual}
              width={300}
              height={150}
              showTitle={false}
              showType={false}
              showComponents={false}
              className="h-full"
            />
          ) : (
            <Image
              src={architecture.diagram.image}
              alt={architecture.diagram.alt}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            />
          )}
        </div>

        {/* Title */}
        <h3 className="text-sm font-semibold text-gray-900 dark:text-dark-text mb-2 line-clamp-1">
          {architecture.title}
        </h3>

        {/* Description */}
        <p className="text-xs text-gray-600 dark:text-dark-text-secondary mb-3 line-clamp-2 flex-1">
          {architecture.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1 mb-3">
          {architecture.tags.slice(0, 2).map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs px-2 py-0.5">
              {tag}
            </Badge>
          ))}
          {architecture.tags.length > 2 && (
            <span className="text-xs text-gray-500 dark:text-gray-400">
              +{architecture.tags.length - 2}
            </span>
          )}
        </div>

        {/* Author and Date */}
        <div className="flex items-center justify-between mt-auto">
          <div className="flex items-center space-x-2">
            <span className="text-xs text-gray-500 dark:text-gray-400">
              @{architecture.author.name.split(' ')[0].toLowerCase()}
            </span>
          </div>
          <span className="text-xs text-gray-400 dark:text-gray-500">
            {new Date(architecture.createdAt).getFullYear()}
          </span>
        </div>
      </div>
    </Card>
  )
}

export const AddArchitectureCard: React.FC = () => {
  const handleRedirect = () => {
    window.location.href = '/architecture-builder';
  };

  return (
    <Card
      onClick={handleRedirect}
      className="w-full h-80 border-2 border-dashed border-primary-300 dark:border-primary-600 hover:border-primary-400 dark:hover:border-primary-500 bg-white dark:bg-dark-card rounded-lg cursor-pointer transition-all duration-300 hover:translate-y-[-4px] hover:shadow-lg dark:hover:shadow-dark-hover group"
    >
      <div className="p-4 h-full flex flex-col items-center justify-center text-center">
        {/* Plus Icon */}
        <div className="w-12 h-12 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center mb-3 group-hover:bg-primary-200 dark:group-hover:bg-primary-800 transition-colors duration-200">
          <svg className="w-6 h-6 text-primary-600 dark:text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
        </div>
        
        <h3 className="text-sm font-semibold text-gray-900 dark:text-dark-text mb-1">
          Add New Architecture
        </h3>
        <p className="text-xs text-gray-600 dark:text-dark-text-secondary line-clamp-2">
          Create and visualize your multi-agent architecture with our builder.
        </p>
      </div>
    </Card>
  )
}