'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/Button'

interface PaletteItem {
  type: string
  label: string
  color?: string
}

interface ComponentPaletteProps {
  customComponents: PaletteItem[]
  onAddToCanvas: (type: string, label: string, color?: string) => void
  onAddToPalette: (type: string, label: string, color: string) => void
  onRemoveFromPalette: (index: number) => void
}

export const ComponentPalette: React.FC<ComponentPaletteProps> = ({
  customComponents,
  onAddToCanvas,
  onAddToPalette,
  onRemoveFromPalette,
}) => {
  const [newType, setNewType] = useState('')
  const [newLabel, setNewLabel] = useState('')
  const [newColor, setNewColor] = useState('#ffffff')

  const handleAdd = () => {
    if (newType.trim() && newLabel.trim()) {
      onAddToPalette(newType.trim(), newLabel.trim(), newColor)
      setNewType('')
      setNewLabel('')
      setNewColor('#ffffff')
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
      <h3 className="text-lg font-semibold mb-4">Component Palette</h3>

      <div className="mb-6 p-3 bg-gray-50 rounded-md">
        <h4 className="font-medium mb-2">Add Custom Component</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-2">
          <input
            type="text"
            placeholder="Component Type"
            value={newType}
            onChange={(e) => setNewType(e.target.value)}
            className="border border-gray-300 rounded px-2 py-1 text-sm"
          />
          <input
            type="text"
            placeholder="Component Label"
            value={newLabel}
            onChange={(e) => setNewLabel(e.target.value)}
            className="border border-gray-300 rounded px-2 py-1 text-sm"
          />
          <input
            type="color"
            value={newColor}
            onChange={(e) => setNewColor(e.target.value)}
            className="border border-gray-300 rounded px-2 py-1 text-sm w-full"
          />
        </div>
        <Button
          variant="primary"
          size="sm"
          onClick={handleAdd}
          disabled={!newType.trim() || !newLabel.trim()}
        >
          Add to Palette
        </Button>
      </div>

      <div className="mb-4">
        <h4 className="font-medium mb-2">Your Components</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-40 overflow-y-auto">
          {customComponents.map((component, index) => (
            <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded">
              <div>
                <div className="font-medium text-sm">{component.label}</div>
                <div className="text-xs text-gray-500">{component.type}</div>
              </div>
              <div className="flex gap-1">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => onAddToCanvas(component.type, component.label, component.color)}
                >
                  Add
                </Button>
                <button
                  className="text-red-500 hover:text-red-700"
                  onClick={() => onRemoveFromPalette(index)}
                >
                  &times;
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 text-xs text-gray-500">
        <p className="mb-1">&bull; Double-click on components to edit their properties</p>
        <p className="mb-1">&bull; Click the + button or connection points to start connections</p>
        <p className="mb-1">&bull; Components can connect to themselves (self-connections)</p>
        <p>&bull; No limit on the number of connections between components</p>
      </div>
    </div>
  )
}
