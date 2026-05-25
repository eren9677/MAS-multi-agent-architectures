import React from 'react'
import { PreviewCanvas } from './PreviewCanvas'
import { VisualArchitecture } from '@/types/architecture'

interface ArchitecturePreviewProps {
  architecture: VisualArchitecture
  width?: number
  height?: number
  showTitle?: boolean
  showType?: boolean
  showComponents?: boolean
  className?: string
}

export const ArchitecturePreview: React.FC<ArchitecturePreviewProps> = ({
  architecture,
  width = 400,
  height = 200,
  showTitle = true,
  showType = true,
  showComponents = true,
  className = '',
}) => {
  return (
    <div className={`bg-white border border-gray-200 rounded-lg p-4 shadow-sm ${className}`}>
      {(showTitle || showType) && (
        <div className="mb-4 text-center">
          {showTitle && (
            <h4 className="text-lg font-medium mb-2">{architecture.name}</h4>
          )}
          {showType && (
            <p className="text-gray-600 text-sm mb-3">Type: {architecture.type}</p>
          )}
        </div>
      )}

      <div className="flex justify-center mb-6">
        <PreviewCanvas
          components={architecture.components}
          connections={architecture.connections}
          width={width}
          height={height}
          className="border border-gray-100"
        />
      </div>

      {showComponents && architecture.components.length > 0 && (
        <div className="flex flex-wrap gap-2 justify-center">
          {architecture.components.map(component => (
            <span
              key={component.id}
              className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded"
              style={{ backgroundColor: component.color ? `${component.color}40` : undefined }}
            >
              {component.label}
            </span>
          ))}
        </div>
      )}
    </div>
  )
}
