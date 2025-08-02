import React from 'react'
import Image from 'next/image'
import { Card } from './ui/Card'
import { Badge } from './ui/Badge'
import { Architecture } from '@/types'
import { formatDate } from '@/utils/helpers'

interface ArchitectureCardProps {
  architecture: Architecture
  onClick: () => void
}

export const ArchitectureCard: React.FC<ArchitectureCardProps> = ({
  architecture,
  onClick
}) => {
  return (
    <Card onClick={onClick} className="h-full">
      <div className="p-4">
        {/* Image */}
        <div className="relative h-32 mb-3 rounded-md overflow-hidden bg-gray-100">
          <Image
            src={architecture.diagram.image}
            alt={architecture.diagram.alt}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>

        {/* Title and Description */}
        <div className="mb-3">
          <h3 className="text-sm font-semibold text-gray-900 mb-1 line-clamp-1">
            {architecture.title}
          </h3>
          <p className="text-xs text-gray-600 line-clamp-2">
            {architecture.description}
          </p>
        </div>

        {/* Tags */}
        <div className="mb-3">
          <div className="flex flex-wrap gap-1">
            {architecture.tags.slice(0, 2).map((tag) => (
              <Badge key={tag} variant="secondary" size="sm">
                {tag}
              </Badge>
            ))}
            {architecture.tags.length > 2 && (
              <Badge variant="outline" size="sm">
                +{architecture.tags.length - 2}
              </Badge>
            )}
          </div>
        </div>

        {/* Author and Date */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {architecture.author.avatar && (
              <Image
                src={architecture.author.avatar}
                alt={architecture.author.name}
                width={16}
                height={16}
                className="rounded-full"
              />
            )}
            <span className="text-xs text-gray-600">
              {architecture.author.name}
            </span>
          </div>
          <span className="text-xs text-gray-500">
            {formatDate(architecture.createdAt)}
          </span>
        </div>

        {/* Action Icons */}
        <div className="absolute top-2 right-2 flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button className="p-1 bg-white rounded shadow-sm hover:bg-gray-50">
            <svg className="w-3 h-3 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          </button>
          <button className="p-1 bg-white rounded shadow-sm hover:bg-gray-50">
            <svg className="w-3 h-3 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
          </button>
          <button className="p-1 bg-white rounded shadow-sm hover:bg-gray-50">
            <svg className="w-3 h-3 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
            </svg>
          </button>
        </div>
      </div>
    </Card>
  )
} 