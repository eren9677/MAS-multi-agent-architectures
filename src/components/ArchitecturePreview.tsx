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

/**
 * ArchitecturePreview component for displaying architecture diagrams
 * This component can be used anywhere on the site to render architecture code as a visual preview
 */
export const ArchitecturePreview: React.FC<ArchitecturePreviewProps> = ({
  architecture,
  width = 400,
  height = 200,
  showTitle = true,
  showType = true,
  showComponents = true,
  className = ''
}) => {
  return (
    <div className={`bg-white border border-gray-200 rounded-lg p-4 shadow-sm ${className}`}>
      {/* Header */}
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

      {/* Visual Diagram */}
      <div className="flex justify-center mb-6">
        <PreviewCanvas
          components={architecture.components}
          connections={architecture.connections}
          width={width}
          height={height}
          className="border border-gray-100"
        />
      </div>

      {/* Component Tags */}
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

/**
 * Utility function to parse architecture code and render preview
 * This can be used to render architecture from JSON strings
 */
export const renderArchitectureFromCode = (
  architectureCode: string,
  options?: Omit<ArchitecturePreviewProps, 'architecture'>
) => {
  try {
    const architecture = JSON.parse(architectureCode) as VisualArchitecture
    
    // Basic validation
    if (
      typeof architecture.name === 'string' &&
      typeof architecture.type === 'string' &&
      Array.isArray(architecture.components) &&
      Array.isArray(architecture.connections)
    ) {
      return <ArchitecturePreview architecture={architecture} {...options} />
    } else {
      return (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
          <p className="text-red-600 text-sm">Invalid architecture format</p>
        </div>
      )
    }
  } catch (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
        <p className="text-red-600 text-sm">Invalid JSON format</p>
      </div>
    )
  }
}

/**
 * Interactive component for pasting and previewing architecture code
 */
interface ArchitectureCodePreviewProps {
  placeholder?: string
  className?: string
}

export const ArchitectureCodePreview: React.FC<ArchitectureCodePreviewProps> = ({
  placeholder = "Paste your architecture JSON code here...",
  className = ''
}) => {
  const [code, setCode] = React.useState('')
  const [architecture, setArchitecture] = React.useState<VisualArchitecture | null>(null)
  const [error, setError] = React.useState<string>('')

  const handleCodeChange = (value: string) => {
    setCode(value)
    setError('')
    
    if (!value.trim()) {
      setArchitecture(null)
      return
    }

    try {
      const parsed = JSON.parse(value) as VisualArchitecture
      
      // Basic validation
      if (
        typeof parsed.name === 'string' &&
        typeof parsed.type === 'string' &&
        Array.isArray(parsed.components) &&
        Array.isArray(parsed.connections)
      ) {
        setArchitecture(parsed)
      } else {
        setError('Invalid architecture format')
        setArchitecture(null)
      }
    } catch (e) {
      setError('Invalid JSON format')
      setArchitecture(null)
    }
  }

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Code Input */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Architecture Code
        </label>
        <textarea
          value={code}
          onChange={(e) => handleCodeChange(e.target.value)}
          placeholder={placeholder}
          className="w-full h-32 p-3 border border-gray-300 rounded-md text-sm font-mono resize-vertical focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
        {error && (
          <p className="mt-1 text-sm text-red-600">{error}</p>
        )}
      </div>

      {/* Preview */}
      {architecture && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Preview
          </label>
          <ArchitecturePreview architecture={architecture} />
        </div>
      )}
    </div>
  )
}