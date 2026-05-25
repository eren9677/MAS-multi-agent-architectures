'use client'

import React from 'react'
import { Button } from '@/components/ui/Button'
import { VisualArchitecture, Connection } from '@/types/architecture'

interface BuilderToolbarProps {
  architecture: VisualArchitecture
  previewMode: boolean
  onTogglePreview: () => void
  onImport: () => void
  onExport: () => void
  onRestart: () => void
  onConnectionEdit: (connection: Connection) => void
}

export const BuilderToolbar: React.FC<BuilderToolbarProps> = ({
  architecture,
  previewMode,
  onTogglePreview,
  onImport,
  onExport,
  onRestart,
  onConnectionEdit,
}) => {
  return (
    <div className="flex flex-wrap gap-2">
      {architecture.connections.map(conn => {
        const fromComponent = architecture.components.find(c => c.id === conn.from)
        const toComponent = architecture.components.find(c => c.id === conn.to)
        const fromLabel = fromComponent?.label || conn.from
        const toLabel = toComponent?.label || conn.to

        return (
          <button
            key={conn.id}
            onClick={() => onConnectionEdit(conn)}
            className="px-3 py-1 bg-blue-500 hover:bg-blue-600 hover:shadow-lg text-white rounded text-sm transition-all duration-200 group"
            title={`Edit connection from "${fromLabel}" to "${toLabel}": ${conn.name}`}
          >
            <span className="block">
              <span className="group-hover:font-semibold transition-all duration-200">
                {fromLabel} &rarr; {toLabel}: {conn.name}
              </span>
            </span>
          </button>
        )
      })}
      <div className="relative group">
        <Button onClick={onRestart} variant="outline" size="sm">Restart</Button>
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block bg-gray-800 text-white text-xs rounded py-1 px-2 whitespace-nowrap">
          Clear the canvas and start over
        </div>
      </div>
      <div className="relative group">
        <Button onClick={onImport} variant="secondary" size="sm">Import</Button>
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block bg-gray-800 text-white text-xs rounded py-1 px-2 whitespace-nowrap">
          Import architecture from JSON
        </div>
      </div>
      <div className="relative group">
        <Button onClick={onTogglePreview} variant="secondary" size="sm">
          {previewMode ? 'Edit Mode' : 'Preview Mode'}
        </Button>
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block bg-gray-800 text-white text-xs rounded py-1 px-2 whitespace-nowrap">
          {previewMode ? 'Switch back to edit mode' : 'Preview how this will look on the site'}
        </div>
      </div>
      <div className="relative group">
        <Button onClick={onExport} variant="primary" size="sm">Export to GitHub</Button>
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block bg-gray-800 text-white text-xs rounded py-1 px-2 whitespace-nowrap">
          Create GitHub issue with this architecture
        </div>
      </div>
    </div>
  )
}
