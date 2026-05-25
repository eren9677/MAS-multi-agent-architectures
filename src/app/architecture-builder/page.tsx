'use client'

import React, { useState, useCallback, useEffect } from 'react'
import Link from 'next/link'
import Canvas from '@/components/Canvas'
import { PreviewCanvas } from '@/components/PreviewCanvas'
import { ThemeToggle } from '@/components/ThemeToggle'
import { useArchitectureBuilder } from '@/hooks/useArchitectureBuilder'
import { Component, Connection } from '@/types/architecture'
import { ComponentPalette } from '@/components/builder/ComponentPalette'
import { EditComponentModal } from '@/components/builder/EditComponentModal'
import { EditConnectionModal } from '@/components/builder/EditConnectionModal'
import { BuilderToolbar } from '@/components/builder/BuilderToolbar'
import { ArchitectureCodeView } from '@/components/builder/ArchitectureCodeView'

const ArchitectureBuilder: React.FC = () => {
  const builder = useArchitectureBuilder()
  const [errors, setErrors] = useState<string[]>([])
  const [editModalOpen, setEditModalOpen] = useState(false)
  const [editingComponent, setEditingComponent] = useState<Component | null>(null)
  const [editConnectionModalOpen, setEditConnectionModalOpen] = useState(false)
  const [editingConnection, setEditingConnection] = useState<Connection | null>(null)
  const [starCount, setStarCount] = useState<number | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('https://api.github.com/repos/eren9677/MAS-multi-agent-architectures')
      .then(r => r.ok ? r.json() : null)
      .then(data => { if (data) setStarCount(data.stargazers_count) })
      .catch(() => setStarCount(null))
      .finally(() => setLoading(false))
  }, [])

  const handleOpenEditModal = useCallback((component: Component) => {
    setEditingComponent(component)
    setEditModalOpen(true)
  }, [])

  const handleSaveEditComponent = useCallback((label: string, type: string, color: string) => {
    if (editingComponent) {
      builder.handleComponentUpdate({ ...editingComponent, label, type, color })
      setEditModalOpen(false)
      setEditingComponent(null)
    }
  }, [editingComponent, builder])

  const handleOpenConnectionEditModal = useCallback((connection: Connection) => {
    setEditingConnection(connection)
    setEditConnectionModalOpen(true)
  }, [])

  const handleSaveEditConnection = useCallback((name: string) => {
    if (editingConnection) {
      builder.handleConnectionUpdate({ ...editingConnection, name })
      setEditConnectionModalOpen(false)
      setEditingConnection(null)
    }
  }, [editingConnection, builder])

  const handleDeleteConnection = useCallback(() => {
    if (editingConnection) {
      builder.handleConnectionRemove(editingConnection.id)
      setEditConnectionModalOpen(false)
      setEditingConnection(null)
    }
  }, [editingConnection, builder])

  const handleImport = useCallback(() => {
    const input = prompt('Paste the architecture code (JSON format) to import:')
    if (!input) return
    if (builder.importArchitecture(input)) {
      alert('Architecture imported successfully!')
    } else {
      alert('Invalid architecture format or JSON')
    }
  }, [builder])

  const handleExport = useCallback(() => {
    window.open('https://github.com/eren9677/awesome-multi-agent-architectures/pulls', '_blank', 'noopener,noreferrer')
  }, [])

  return (
    <div className="min-h-screen bg-light-bg dark:bg-dark-bg transition-colors duration-200">
      <header className="border-b border-light-border dark:border-dark-border bg-light-card dark:bg-dark-card">
        <div className="max-w-7xl mx-auto px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <Link href="/">
                <h1 className="text-2xl font-bold bg-gradient-blueish bg-clip-text text-transparent bg-size-200 animate-gradient-shift hover:bg-gradient-blueish-hover hover:animate-gradient-hover transition-all duration-500 ease-in-out cursor-pointer">
                  MAS Design
                </h1>
              </Link>
              <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary mt-1">
                Collaborative Multi-Agent Architecture Directory
              </p>
            </div>

            <div className="flex items-center space-x-4">
              <a
                href="https://github.com/eren9677/MAS-multi-agent-architectures"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-light-text-secondary dark:text-dark-text-secondary hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                aria-label="GitHub Repository"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20" height="20"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  className="mr-1"
                >
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.11.82-.26.82-.577v-2.234c-3.338.726-4.042-1.61-4.042-1.61-.546-1.388-1.333-1.758-1.333-1.758-1.09-.745.082-.73.082-.73 1.205.085 1.84 1.238 1.84 1.238 1.07 1.834 2.807 1.304 3.492.997.108-.776.418-1.305.762-1.605-2.665-.3-5.466-1.335-5.466-5.93 0-1.31.467-2.38 1.235-3.22-.123-.302-.535-1.523.117-3.176 0 0 1.008-.322 3.3 1.23a11.52 11.52 0 0 1 3-.404c1.02.005 2.045.138 3 .404 2.29-1.552 3.296-1.23 3.296-1.23.655 1.653.244 2.874.12 3.176.77.84 1.233 1.91 1.233 3.22 0 4.61-2.807 5.625-5.48 5.92.43.372.823 1.103.823 2.222v3.293c0 .32.217.694.825.576C20.565 21.796 24 17.297 24 12c0-6.63-5.373-12-12-12z" />
                </svg>
                Repo
              </a>

              <div className="flex items-center space-x-2 text-sm text-light-text-secondary dark:text-dark-text-secondary">
                <span className="text-primary-500">&#9733;</span>
                <span>
                  {loading ? '...' : starCount !== null ? starCount.toLocaleString() : 'N/A'}
                </span>
              </div>

              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>

      <div className="p-4 sm:p-8">
        <div className="max-w-6xl mx-auto">
          <header className="mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-dark-text">Architecture Builder</h1>
            <p className="text-gray-600 dark:text-dark-text-secondary">Create and visualize your multi-agent architecture</p>
            <div className="mt-2 text-sm text-gray-500 dark:text-dark-text-secondary">
              <span className="inline-block bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded">Tip:</span>
              <span className="ml-2">Drag components from the palette to the canvas to build your architecture</span>
              <span className="ml-2">Click the + button or connection points to start connecting components</span>
              <span className="ml-2">Components can connect to themselves and multiple other components</span>
            </div>
          </header>

          {errors.length > 0 && (
            <div className="bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-700 rounded-lg p-4 mb-6">
              <h3 className="text-red-800 dark:text-red-300 font-medium mb-2">Validation Errors</h3>
              <ul className="list-disc pl-5 space-y-1">
                {errors.map((error, i) => (
                  <li key={i} className="text-red-600 dark:text-red-400">{error}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="bg-white dark:bg-dark-card rounded-lg shadow-md p-4 sm:p-6 mb-6 sm:mb-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6 gap-3">
              <h2 className="text-lg sm:text-xl font-semibold text-light-text dark:text-dark-text">Architecture Canvas</h2>
              <BuilderToolbar
                architecture={builder.architecture}
                previewMode={builder.previewMode}
                onTogglePreview={() => builder.setPreviewMode(v => !v)}
                onImport={handleImport}
                onExport={handleExport}
                onRestart={builder.resetArchitecture}
                onConnectionEdit={handleOpenConnectionEditModal}
              />
            </div>

            <div className="border-2 border-dashed border-gray-300 dark:border-dark-border rounded-lg h-64 sm:h-96">
              {builder.previewMode ? (
                <div className="w-full h-full flex flex-col bg-gray-50 dark:bg-dark-surface p-4 overflow-auto">
                  <div className="text-center mb-6">
                    <h3 className="text-lg sm:text-xl font-semibold text-light-text dark:text-dark-text mb-2">Architecture Preview</h3>
                    <p className="text-gray-600 dark:text-dark-text-secondary text-sm">This is how your architecture will appear on the site</p>
                  </div>
                  <div className="flex-1 flex items-center justify-center">
                    <div className="bg-white dark:bg-dark-card border border-gray-200 dark:border-dark-border rounded-lg p-6 shadow-sm max-w-3xl w-full">
                      <div className="mb-6 text-center">
                        <h4 className="text-lg font-medium mb-2 text-light-text dark:text-dark-text">{builder.architecture.name}</h4>
                        <p className="text-gray-600 dark:text-dark-text-secondary text-sm mb-4">Type: {builder.architecture.type}</p>
                      </div>
                      <div className="flex justify-center mb-6">
                        <PreviewCanvas
                          components={builder.architecture.components}
                          connections={builder.architecture.connections}
                          width={450}
                          height={200}
                          className="border border-gray-100 dark:border-dark-border"
                        />
                      </div>
                      <div className="flex flex-wrap gap-2 justify-center">
                        {builder.architecture.components.map(component => (
                          <span key={component.id} className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs px-2 py-1 rounded">
                            {component.label}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <Canvas
                  components={builder.architecture.components}
                  connections={builder.architecture.connections}
                  onComponentMove={builder.handleComponentMove}
                  onComponentAdd={builder.handleComponentAdd}
                  onComponentRemove={builder.handleComponentRemove}
                  onComponentEdit={(id) => {
                    const component = builder.architecture.components.find(c => c.id === id)
                    if (component) handleOpenEditModal(component)
                  }}
                  onConnectionAdd={builder.handleConnectionAdd}
                  onConnectionEdit={handleOpenConnectionEditModal}
                />
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ArchitectureCodeView
              architecture={builder.architecture}
              copyStatus={builder.copyStatus}
              onCopy={builder.copyToClipboard}
            />
            <ComponentPalette
              customComponents={builder.customComponents}
              onAddToCanvas={builder.addComponentFromPalette}
              onAddToPalette={builder.addCustomComponentType}
              onRemoveFromPalette={builder.removeCustomComponentType}
            />
          </div>
        </div>
      </div>

      <EditComponentModal
        isOpen={editModalOpen}
        component={editingComponent}
        onClose={() => setEditModalOpen(false)}
        onSave={handleSaveEditComponent}
      />

      <EditConnectionModal
        isOpen={editConnectionModalOpen}
        connection={editingConnection}
        components={builder.architecture.components}
        onClose={() => setEditConnectionModalOpen(false)}
        onSave={handleSaveEditConnection}
        onDelete={handleDeleteConnection}
      />
    </div>
  )
}

export default ArchitectureBuilder
