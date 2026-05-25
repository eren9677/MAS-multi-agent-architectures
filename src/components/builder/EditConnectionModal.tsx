'use client'

import React, { useState, useEffect } from 'react'
import { Connection, Component } from '@/types/architecture'
import { Modal } from '@/components/ui/Modal'
import { Button } from '@/components/ui/Button'

interface EditConnectionModalProps {
  isOpen: boolean
  connection: Connection | null
  components: Component[]
  onClose: () => void
  onSave: (name: string) => void
  onDelete: () => void
}

export const EditConnectionModal: React.FC<EditConnectionModalProps> = ({
  isOpen,
  connection,
  components,
  onClose,
  onSave,
  onDelete,
}) => {
  const [name, setName] = useState('')

  useEffect(() => {
    if (connection) setName(connection.name)
  }, [connection])

  const fromLabel = connection
    ? components.find(c => c.id === connection.from)?.label || connection.from
    : ''
  const toLabel = connection
    ? components.find(c => c.id === connection.to)?.label || connection.to
    : ''

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Edit Connection" size="sm">
      {connection && (
        <div className="space-y-4">
          <div className="bg-gray-50 p-3 rounded-md mb-4">
            <h4 className="text-sm font-medium text-gray-700 mb-2">Connection Details</h4>
            <div className="text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <span className="font-medium">From:</span>
                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                  {fromLabel}
                </span>
              </div>
              <div className="flex items-center gap-2 mt-1">
                <span className="font-medium">To:</span>
                <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">
                  {toLabel}
                </span>
              </div>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Connection Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
              placeholder="Enter a descriptive name for this connection"
            />
          </div>
          <div className="flex justify-between items-center gap-2 pt-4">
            <button
              className="text-red-600 hover:text-red-700 text-sm font-medium"
              onClick={() => { if (confirm('Delete this connection? This action cannot be undone.')) onDelete() }}
              title="Delete this connection"
            >
              Delete
            </button>
            <div className="flex gap-2">
              <Button variant="secondary" onClick={onClose}>Cancel</Button>
              <Button variant="primary" onClick={() => onSave(name)}>Save</Button>
            </div>
          </div>
        </div>
      )}
    </Modal>
  )
}
