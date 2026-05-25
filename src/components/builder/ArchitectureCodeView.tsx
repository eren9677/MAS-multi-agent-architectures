'use client'

import React from 'react'
import { VisualArchitecture } from '@/types/architecture'

interface ArchitectureCodeViewProps {
  architecture: VisualArchitecture
  copyStatus: string
  onCopy: () => void
}

export const ArchitectureCodeView: React.FC<ArchitectureCodeViewProps> = ({
  architecture,
  copyStatus,
  onCopy,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Architecture Code</h3>
        <div className="flex items-center gap-2">
          <button
            onClick={onCopy}
            className="flex items-center gap-1 text-xs bg-gray-200 hover:bg-gray-300 text-gray-700 px-2 py-1 rounded transition-colors"
            title="Copy architecture code"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
            {copyStatus || 'Copy'}
          </button>
          <span className="text-xs text-gray-500">Read-only</span>
        </div>
      </div>
      <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto text-xs">
        <code>{JSON.stringify(architecture, null, 2)}</code>
      </pre>
    </div>
  )
}
