
'use client'

import React, { useState, useCallback, useEffect } from 'react'
import { Button } from '@/components/ui/Button'
import Canvas from '@/components/Canvas'
import { PreviewCanvas } from '@/components/PreviewCanvas'
import { Modal } from '@/components/ui/Modal'
import { VisualArchitecture, Component, Connection, validateArchitecture, createConnection, createComponent } from '@/types/architecture'

const ArchitectureBuilder: React.FC = () => {
  const [architecture, setArchitecture] = useState<VisualArchitecture>({
    name: 'My Architecture',
    type: 'microservices',
    components: [
      { id: 'api-gateway', type: 'gateway', position: { x: 100, y: 200 }, label: 'API Gateway', color: '#dbeafe' },
      { id: 'user-service', type: 'service', position: { x: 300, y: 200 }, label: 'User Service', color: '#dcfce7' },
      { id: 'database', type: 'database', position: { x: 500, y: 200 }, label: 'Database', color: '#f0f9ff' }
    ],
    connections: [
      { id: 'conn-1', from: 'api-gateway', to: 'user-service', type: 'http', name: 'Request' },
      { id: 'conn-2', from: 'user-service', to: 'database', type: 'query', name: 'GetUser' }
    ]
  })

  const [previewMode, setPreviewMode] = useState(false)
  const [errors, setErrors] = useState<string[]>([])
  const [copyStatus, setCopyStatus] = useState<string>('')
  const [customComponents, setCustomComponents] = useState<Array<{ type: string; label: string; color?: string }>>([
    { type: 'gateway', label: 'API Gateway', color: '#dbeafe' },
    { type: 'service', label: 'Service', color: '#dcfce7' },
    { type: 'database', label: 'Database', color: '#f0f9ff' },
    { type: 'queue', label: 'Message Queue', color: '#fdf4ff' }
  ])
  const [newComponentType, setNewComponentType] = useState('')
  const [newComponentLabel, setNewComponentLabel] = useState('')
  const [newComponentColor, setNewComponentColor] = useState('#ffffff')
  const [editModalOpen, setEditModalOpen] = useState(false)
  const [editingComponent, setEditingComponent] = useState<Component | null>(null)
  const [editComponentLabel, setEditComponentLabel] = useState('')
  const [editComponentType, setEditComponentType] = useState('')
  const [editComponentColor, setEditComponentColor] = useState('#ffffff')
  const [editConnectionModalOpen, setEditConnectionModalOpen] = useState(false)
  const [editingConnection, setEditingConnection] = useState<Connection | null>(null)
  const [editConnectionName, setEditConnectionName] = useState('')

  // Load architecture from localStorage on mount
  useEffect(() => {
    const savedArchitecture = localStorage.getItem('architectureBuilder')
    if (savedArchitecture) {
      try {
        setArchitecture(JSON.parse(savedArchitecture))
      } catch (e) {
        console.error('Failed to parse saved architecture', e)
      }
    }
    
    const savedCustomComponents = localStorage.getItem('customComponents')
    if (savedCustomComponents) {
      try {
        setCustomComponents(JSON.parse(savedCustomComponents))
      } catch (e) {
        console.error('Failed to parse saved custom components', e)
      }
    }
  }, [])

  // Save architecture to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('architectureBuilder', JSON.stringify(architecture))
  }, [architecture])

  // Save custom components to localStorage
  useEffect(() => {
    localStorage.setItem('customComponents', JSON.stringify(customComponents))
  }, [customComponents])

  const validateArchitectureForm = useCallback(() => {
    const newErrors: string[] = []
    
    if (!architecture.name.trim()) {
      newErrors.push('Architecture name is required')
    }
    
    if (architecture.components.length === 0) {
      newErrors.push('At least one component is required')
    }
    
    // Use the validateArchitecture function from types
    if (!validateArchitecture(architecture)) {
      newErrors.push('Architecture data integrity check failed')
    }
    
    setErrors(newErrors)
    return newErrors.length === 0
  }, [architecture])

  const handleExport = useCallback(() => {
    if (!validateArchitectureForm()) {
      return
    }
    
    // Convert architecture to YAML format
    const yamlContent = `name: "${architecture.name}"
type: "${architecture.type}"
components:
${architecture.components.map(c => `  - id: "${c.id}"
    type: "${c.type}"
    position: {x: ${c.position.x}, y: ${c.position.y}}
    label: "${c.label}"`).join('\n')}
connections:
${architecture.connections.map(conn => `  - id: "${conn.id}"
    from: "${conn.from}"
    to: "${conn.to}"
    type: "${conn.type}"
    name: "${conn.name}"`).join('\n')}`

    // Generate GitHub issue URL with pre-filled template
    // In a real application, these would be configurable
    const githubUsername = process.env.NEXT_PUBLIC_GITHUB_USERNAME || 'username'
    const githubRepo = process.env.NEXT_PUBLIC_GITHUB_REPO || 'repo'
    
    const title = encodeURIComponent(`[Architecture] ${architecture.name}`)
    const body = encodeURIComponent(`## Architecture Submission

### Description
Please describe your architecture pattern and its use cases.

### Architecture Code
\`\`\`yaml
${yamlContent}
\`\`\`

### Additional Notes
Add any additional notes or considerations for this architecture.`)
    
    const url = `https://github.com/${githubUsername}/${githubRepo}/issues/new?template=architecture-submission.md&title=${title}&body=${body}`
    window.open(url, '_blank')
  }, [architecture, validateArchitecture])

  const togglePreviewMode = useCallback(() => {
    setPreviewMode(prev => !prev)
  }, [])

  const handleComponentMove = useCallback((id: string, position: { x: number; y: number }) => {
    setArchitecture(prev => ({
      ...prev,
      components: prev.components.map(component =>
        component.id === id ? { ...component, position } : component
      )
    }))
  }, [])

  const handleComponentAdd = useCallback((component: Omit<Component, 'id'>) => {
    const newComponent = createComponent(
      component.type,
      component.position,
      component.label,
      component.color
    )
    
    setArchitecture(prev => ({
      ...prev,
      components: [...prev.components, newComponent]
    }))
  }, [])

  const handleComponentRemove = useCallback((id: string) => {
    setArchitecture(prev => ({
      ...prev,
      components: prev.components.filter(component => component.id !== id),
      connections: prev.connections.filter(
        conn => conn.from !== id && conn.to !== id
      )
    }))
  }, [])

  const handleComponentEdit = useCallback((id: string, label: string) => {
    setArchitecture(prev => ({
      ...prev,
      components: prev.components.map(component =>
        component.id === id ? { ...component, label } : component
      )
    }))
  }, [])

  const handleOpenEditModal = useCallback((component: Component) => {
    setEditingComponent(component)
    setEditComponentLabel(component.label)
    setEditComponentType(component.type)
    setEditComponentColor(component.color || '#ffffff')
    setEditModalOpen(true)
  }, [])

  const handleSaveEditComponent = useCallback(() => {
    if (editingComponent) {
      setArchitecture(prev => ({
        ...prev,
        components: prev.components.map(component =>
          component.id === editingComponent.id
            ? { ...component, label: editComponentLabel, type: editComponentType, color: editComponentColor }
            : component
        )
      }))
      setEditModalOpen(false)
      setEditingComponent(null)
    }
  }, [editingComponent, editComponentLabel, editComponentType, editComponentColor])

  const handleConnectionAdd = useCallback((from: string, fromCorner: string, to: string, toCorner: string) => {
    const newConnection = createConnection(from, to, 'custom', `Connection ${architecture.connections.length + 1}`, fromCorner, toCorner);
    
    setArchitecture(prev => ({
      ...prev,
      connections: [...prev.connections, newConnection]
    }));
    
    // Validate architecture after adding connection
    setTimeout(() => {
      if (validateArchitecture(architecture)) {
        console.log('Architecture data integrity maintained');
      } else {
        console.error('Architecture data integrity compromised');
      }
    }, 0);
  }, [architecture]);

  const handleOpenConnectionEditModal = useCallback((connection: Connection) => {
    setEditingConnection(connection);
    setEditConnectionName(connection.name);
    setEditConnectionModalOpen(true);
  }, []);

  const handleSaveEditConnection = useCallback(() => {
    if (editingConnection) {
      setArchitecture(prev => ({
        ...prev,
        connections: prev.connections.map(conn =>
          conn.id === editingConnection.id
            ? { ...conn, name: editConnectionName }
            : conn
        )
      }));
      setEditConnectionModalOpen(false);
      setEditingConnection(null);
    }
  }, [editingConnection, editConnectionName]);

  const handleAddComponentFromPalette = useCallback((type: string, label: string, color?: string) => {
    handleComponentAdd({
      type,
      position: { x: 200, y: 200 }, // Default position
      label,
      color
    })
  }, [handleComponentAdd])

  const handleAddCustomComponent = useCallback(() => {
    if (newComponentType.trim() && newComponentLabel.trim()) {
      const newComponent = {
        type: newComponentType.trim(),
        label: newComponentLabel.trim(),
        color: newComponentColor
      }
      
      setCustomComponents(prev => [...prev, newComponent])
      setNewComponentType('')
      setNewComponentLabel('')
      setNewComponentColor('#ffffff')
    }
  }, [newComponentType, newComponentLabel, newComponentColor])

  const handleRemoveCustomComponent = useCallback((index: number) => {
    setCustomComponents(prev => prev.filter((_, i) => i !== index))
  }, [])

  const handleImport = useCallback(() => {
    const input = prompt('Paste the architecture code (JSON format) to import:')
    if (!input) return
    
    try {
      const importedArchitecture = JSON.parse(input) as VisualArchitecture
      // Basic validation
      if (
        typeof importedArchitecture.name === 'string' &&
        typeof importedArchitecture.type === 'string' &&
        Array.isArray(importedArchitecture.components) &&
        Array.isArray(importedArchitecture.connections)
      ) {
        setArchitecture(importedArchitecture)
        alert('Architecture imported successfully!')
      } else {
        alert('Invalid architecture format')
      }
    } catch (e) {
      alert('Invalid JSON format')
    }
  }, [])

  const handleCopyCode = useCallback(() => {
    const codeToCopy = JSON.stringify(architecture, null, 2)
    navigator.clipboard.writeText(codeToCopy).then(() => {
      setCopyStatus('Copied!')
      setTimeout(() => setCopyStatus(''), 2000)
    }).catch(err => {
      setCopyStatus('Failed to copy')
      console.error('Failed to copy: ', err)
      setTimeout(() => setCopyStatus(''), 2000)
    })
  }, [architecture])

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-8">
      <div className="max-w-6xl mx-auto">
        <header className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Architecture Builder</h1>
          <p className="text-gray-600">Create and visualize your multi-agent architecture</p>
          <div className="mt-2 text-sm text-gray-500">
            <span className="inline-block bg-blue-100 text-blue-800 px-2 py-1 rounded">Tip:</span>
            <span className="ml-2">Drag components from the palette to the canvas to build your architecture</span>
            <span className="ml-2">Click the + button or connection points to start connecting components</span>
            <span className="ml-2">Components can connect to themselves and multiple other components</span>
          </div>
        </header>

        {errors.length > 0 && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <h3 className="text-red-800 font-medium mb-2">Validation Errors</h3>
            <ul className="list-disc pl-5 space-y-1">
              {errors.map((error, index) => (
                <li key={index} className="text-red-600">{error}</li>
              ))}
            </ul>
          </div>
        )}

        <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6 gap-3">
            <h2 className="text-lg sm:text-xl font-semibold">Architecture Canvas</h2>
            <div className="flex flex-wrap gap-2">
              {architecture.connections.map(conn => {
                const fromComponent = architecture.components.find(c => c.id === conn.from)
                const toComponent = architecture.components.find(c => c.id === conn.to)
                const fromLabel = fromComponent?.label || conn.from
                const toLabel = toComponent?.label || conn.to
                
                return (
                  <button
                    key={conn.id}
                    onClick={() => handleOpenConnectionEditModal(conn)}
                    className="px-3 py-1 bg-blue-500 hover:bg-blue-600 hover:shadow-lg text-white rounded text-sm transition-all duration-200 group"
                    title={`Edit connection from "${fromLabel}" to "${toLabel}": ${conn.name}`}
                  >
                    <span className="block">
                      <span className="group-hover:font-semibold transition-all duration-200">
                        ✎ {fromLabel} → {toLabel}: {conn.name}
                      </span>
                    </span>
                  </button>
                )
              })}
              <div className="relative group">
                <Button onClick={handleImport} variant="secondary" size="sm">
                  Import
                </Button>
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block bg-gray-800 text-white text-xs rounded py-1 px-2 whitespace-nowrap">
                  Import architecture from JSON
                </div>
              </div>
              <div className="relative group">
                <Button onClick={togglePreviewMode} variant="secondary" size="sm">
                  {previewMode ? 'Edit Mode' : 'Preview Mode'}
                </Button>
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block bg-gray-800 text-white text-xs rounded py-1 px-2 whitespace-nowrap">
                  {previewMode ? 'Switch back to edit mode' : 'Preview how this will look on the site'}
                </div>
              </div>
              <div className="relative group">
                <Button onClick={handleExport} variant="primary" size="sm">
                  Export to GitHub
                </Button>
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block bg-gray-800 text-white text-xs rounded py-1 px-2 whitespace-nowrap">
                  Create GitHub issue with this architecture
                </div>
              </div>
            </div>
          </div>
          
          <div className="border-2 border-dashed border-gray-300 rounded-lg h-64 sm:h-96">
            {previewMode ? (
              <div className="w-full h-full flex flex-col bg-gray-50 p-4 overflow-auto">
                <div className="text-center mb-6">
                  <h3 className="text-lg sm:text-xl font-semibold mb-2">Architecture Preview</h3>
                  <p className="text-gray-600 text-sm">This is how your architecture will appear on the site</p>
                </div>
                <div className="flex-1 flex items-center justify-center">
                  <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm max-w-3xl w-full">
                    <div className="mb-6 text-center">
                      <h4 className="text-lg font-medium mb-2">{architecture.name}</h4>
                      <p className="text-gray-600 text-sm mb-4">Type: {architecture.type}</p>
                    </div>
                    <div className="flex justify-center mb-6">
                      <PreviewCanvas
                        components={architecture.components}
                        connections={architecture.connections}
                        width={450}
                        height={200}
                        className="border border-gray-100"
                      />
                    </div>
                    <div className="flex flex-wrap gap-2 justify-center">
                      {architecture.components.map(component => (
                        <span
                          key={component.id}
                          className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded"
                        >
                          {component.label}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <Canvas
                components={architecture.components}
                connections={architecture.connections}
                onComponentMove={handleComponentMove}
                onComponentAdd={handleComponentAdd}
                onComponentRemove={handleComponentRemove}
                onComponentEdit={(id, label) => {
                  const component = architecture.components.find(c => c.id === id);
                  if (component) {
                    handleOpenEditModal(component);
                  }
                }}
                onConnectionAdd={handleConnectionAdd}
                onConnectionEdit={handleOpenConnectionEditModal}
              />
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Architecture Code</h3>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopyCode}
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
          
          <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
            <h3 className="text-lg font-semibold mb-4">Component Palette</h3>
            
            {/* Custom Component Creation */}
            <div className="mb-6 p-3 bg-gray-50 rounded-md">
              <h4 className="font-medium mb-2">Add Custom Component</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-2">
                <input
                  type="text"
                  placeholder="Component Type"
                  value={newComponentType}
                  onChange={(e) => setNewComponentType(e.target.value)}
                  className="border border-gray-300 rounded px-2 py-1 text-sm"
                />
                <input
                  type="text"
                  placeholder="Component Label"
                  value={newComponentLabel}
                  onChange={(e) => setNewComponentLabel(e.target.value)}
                  className="border border-gray-300 rounded px-2 py-1 text-sm"
                />
                <input
                  type="color"
                  value={newComponentColor}
                  onChange={(e) => setNewComponentColor(e.target.value)}
                  className="border border-gray-300 rounded px-2 py-1 text-sm w-full"
                />
              </div>
              <Button
                variant="primary"
                size="sm"
                onClick={handleAddCustomComponent}
                disabled={!newComponentType.trim() || !newComponentLabel.trim()}
              >
                Add to Palette
              </Button>
            </div>
            
            {/* Custom Components List */}
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
                        onClick={() => handleAddComponentFromPalette(component.type, component.label, component.color)}
                      >
                        Add
                      </Button>
                      <button
                        className="text-red-500 hover:text-red-700"
                        onClick={() => handleRemoveCustomComponent(index)}
                      >
                        ×
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Instructions */}
            <div className="mt-4 text-xs text-gray-500">
              <p className="mb-1">• Double-click on components to edit their properties</p>
              <p className="mb-1">• Click the + button or connection points to start connections</p>
              <p className="mb-1">• Components can connect to themselves (self-connections)</p>
              <p>• No limit on the number of connections between components</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Edit Component Modal */}
      <Modal
        isOpen={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        title="Edit Component"
        size="sm"
      >
        {editingComponent && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Label</label>
              <input
                type="text"
                value={editComponentLabel}
                onChange={(e) => setEditComponentLabel(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
              <input
                type="text"
                value={editComponentType}
                onChange={(e) => setEditComponentType(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Color</label>
              <input
                type="color"
                value={editComponentColor}
                onChange={(e) => setEditComponentColor(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
              />
            </div>
            <div className="flex justify-end gap-2 pt-4">
              <Button
                variant="secondary"
                onClick={() => setEditModalOpen(false)}
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                onClick={handleSaveEditComponent}
              >
                Save
              </Button>
            </div>
          </div>
        )}
      </Modal>

      {/* Edit Connection Modal */}
      <Modal
        isOpen={editConnectionModalOpen}
        onClose={() => setEditConnectionModalOpen(false)}
        title="Edit Connection"
        size="sm"
      >
        {editingConnection && (
          <div className="space-y-4">
            <div className="bg-gray-50 p-3 rounded-md mb-4">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Connection Details</h4>
              <div className="text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <span className="font-medium">From:</span>
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                    {architecture.components.find(c => c.id === editingConnection.from)?.label || editingConnection.from}
                  </span>
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <span className="font-medium">To:</span>
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">
                    {architecture.components.find(c => c.id === editingConnection.to)?.label || editingConnection.to}
                  </span>
                </div>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Connection Name</label>
              <input
                type="text"
                value={editConnectionName}
                onChange={(e) => setEditConnectionName(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                placeholder="Enter a descriptive name for this connection"
              />
            </div>
            <div className="flex justify-end gap-2 pt-4">
              <Button
                variant="secondary"
                onClick={() => setEditConnectionModalOpen(false)}
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                onClick={handleSaveEditConnection}
              >
                Save
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}

export default ArchitectureBuilder