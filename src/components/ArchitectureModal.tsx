import React from 'react'
import Image from 'next/image'
import { Modal } from './ui/Modal'
import { Button } from './ui/Button'
import { Badge } from './ui/Badge'
import { Architecture } from '@/types'
import { InteractiveCanvas } from './InteractiveCanvas'
import { getPerformanceColor, getPerformanceLabel } from '@/utils/helpers'

interface ArchitectureModalProps {
  architecture: Architecture | null
  isOpen: boolean
  onClose: () => void
}

export const ArchitectureModal: React.FC<ArchitectureModalProps> = ({
  architecture,
  isOpen,
  onClose
}) => {
  if (!architecture) return null

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <div className="space-y-4">
        {/* Header */}
        <div className="border-b border-gray-200 pb-3">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h2 className="text-xl font-bold text-gray-900 mb-2">
                {architecture.title}
              </h2>
              <p className="text-sm text-gray-600 mb-3">
                {architecture.longDescription}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {architecture.category.map((cat) => (
                  <Badge key={cat} variant="primary">
                    {cat}
                  </Badge>
                ))}
              </div>
            </div>
            <div className="flex space-x-2">
              {architecture.githubUrl && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => window.open(architecture.githubUrl as string, '_blank', 'noopener,noreferrer')}
                >
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                  GitHub
                </Button>
              )}
              {architecture.documentationUrl && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => window.open(architecture.documentationUrl as string, '_blank', 'noopener,noreferrer')}
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Reference
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Diagram */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Architecture Diagram</h3>
          <div className="h-96 rounded-lg overflow-hidden">
            {architecture.visual ? (
              <InteractiveCanvas
                components={architecture.visual.components}
                connections={architecture.visual.connections}
              />
            ) : (
              <div className="relative h-full rounded-lg overflow-hidden bg-gray-100">
                <Image
                  src={architecture.diagram.image}
                  alt={architecture.diagram.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
            )}
          </div>
        </div>

        {/* Detailed Example */}
        {architecture.implementation && (
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Detailed Example</h3>
            <div className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
              {architecture.implementation.codeExample}
            </div>
          </div>
        )}

        {/* Performance Metrics */}
        {architecture.performance && (
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Performance Metrics</h3>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className={`text-2xl font-bold ${getPerformanceColor(architecture.performance.scalability)}`}>
                  {architecture.performance.scalability}/10
                </div>
                <div className="text-sm text-gray-600">Scalability</div>
                <div className="text-xs text-gray-500 mt-1">
                  {getPerformanceLabel(architecture.performance.scalability)}
                </div>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className={`text-2xl font-bold ${getPerformanceColor(architecture.performance.complexity)}`}>
                  {architecture.performance.complexity}/10
                </div>
                <div className="text-sm text-gray-600">Complexity</div>
                <div className="text-xs text-gray-500 mt-1">
                  {getPerformanceLabel(architecture.performance.complexity)}
                </div>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className={`text-2xl font-bold ${getPerformanceColor(architecture.performance.reliability)}`}>
                  {architecture.performance.reliability}/10
                </div>
                <div className="text-sm text-gray-600">Reliability</div>
                <div className="text-xs text-gray-500 mt-1">
                  {getPerformanceLabel(architecture.performance.reliability)}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Use Cases */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Use Cases</h3>
          <ul className="space-y-2">
            {architecture.useCases.map((useCase, index) => (
              <li key={index} className="flex items-start">
                <svg className="w-5 h-5 text-primary-500 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-700">{useCase}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Tags */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Tags</h3>
          <div className="flex flex-wrap gap-2">
            {architecture.tags.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 pt-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="text-sm text-gray-500">
                Contributed by {architecture.author.github ? `@${architecture.author.github}` : architecture.author.name}
              </div>
            </div>
            <Button variant="primary" onClick={onClose}>
              Close
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  )
} 