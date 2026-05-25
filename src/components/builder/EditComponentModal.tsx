'use client'

import React from 'react'
import { Component } from '@/types/architecture'
import { Modal } from '@/components/ui/Modal'
import { Button } from '@/components/ui/Button'

interface EditComponentModalProps {
  isOpen: boolean
  component: Component | null
  onClose: () => void
  onSave: (label: string, type: string, color: string) => void
}

export const EditComponentModal: React.FC<EditComponentModalProps> = ({
  isOpen,
  component,
  onClose,
  onSave,
}) => {
  const [label, setLabel] = React.useState('')
  const [type, setType] = React.useState('')
  const [color, setColor] = React.useState('#ffffff')

  React.useEffect(() => {
    if (component) {
      setLabel(component.label)
      setType(component.type)
      setColor(component.color || '#ffffff')
    }
  }, [component])

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Edit Component" size="sm">
      {component && (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Label</label>
            <input
              type="text"
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
            <input
              type="text"
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Color</label>
            <input
              type="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
            />
          </div>
          <div className="flex justify-end gap-2 pt-4">
            <Button variant="secondary" onClick={onClose}>Cancel</Button>
            <Button variant="primary" onClick={() => onSave(label, type, color)}>Save</Button>
          </div>
        </div>
      )}
    </Modal>
  )
}
