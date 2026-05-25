'use client'

import { useState, useCallback, useEffect } from 'react'
import {
  VisualArchitecture,
  Component,
  Connection,
  validateArchitecture,
  createConnection,
  createComponent,
} from '@/types/architecture'

const STORAGE_KEY = 'architectureBuilder'
const CUSTOM_COMPONENTS_KEY = 'customComponents'

interface PaletteItem {
  type: string
  label: string
  color?: string
}

const defaultArchitecture: VisualArchitecture = {
  name: 'My Architecture',
  type: 'microservices',
  components: [
    { id: 'api-gateway', type: 'gateway', position: { x: 100, y: 200 }, label: 'API Gateway', color: '#dbeafe' },
    { id: 'user-service', type: 'service', position: { x: 300, y: 200 }, label: 'User Service', color: '#dcfce7' },
    { id: 'database', type: 'database', position: { x: 500, y: 200 }, label: 'Database', color: '#f0f9ff' },
  ],
  connections: [
    { id: 'conn-1', from: 'api-gateway', to: 'user-service', type: 'http', name: 'Request' },
    { id: 'conn-2', from: 'user-service', to: 'database', type: 'query', name: 'GetUser' },
  ],
}

const defaultPalette: PaletteItem[] = [
  { type: 'gateway', label: 'API Gateway', color: '#dbeafe' },
  { type: 'service', label: 'Service', color: '#dcfce7' },
  { type: 'database', label: 'Database', color: '#f0f9ff' },
  { type: 'queue', label: 'Message Queue', color: '#fdf4ff' },
]

function loadStored<T>(key: string, fallback: T): T {
  try {
    const stored = localStorage.getItem(key)
    return stored ? JSON.parse(stored) : fallback
  } catch {
    return fallback
  }
}

export function useArchitectureBuilder() {
  const [architecture, setArchitecture] = useState<VisualArchitecture>(defaultArchitecture)
  const [customComponents, setCustomComponents] = useState<PaletteItem[]>(defaultPalette)
  const [previewMode, setPreviewMode] = useState(false)
  const [copyStatus, setCopyStatus] = useState('')
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setArchitecture(loadStored(STORAGE_KEY, defaultArchitecture))
    setCustomComponents(loadStored(CUSTOM_COMPONENTS_KEY, defaultPalette))
    setIsLoaded(true)
  }, [])

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(architecture))
    }
  }, [architecture, isLoaded])

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(CUSTOM_COMPONENTS_KEY, JSON.stringify(customComponents))
    }
  }, [customComponents, isLoaded])

  const validate = useCallback((): string[] => {
    const errors: string[] = []
    if (!architecture.name.trim()) errors.push('Architecture name is required')
    if (architecture.components.length === 0) errors.push('At least one component is required')
    if (!validateArchitecture(architecture)) errors.push('Architecture data integrity check failed')
    return errors
  }, [architecture])

  const handleComponentMove = useCallback((id: string, position: { x: number; y: number }) => {
    setArchitecture(prev => ({
      ...prev,
      components: prev.components.map(c => (c.id === id ? { ...c, position } : c)),
    }))
  }, [])

  const handleComponentAdd = useCallback((component: Omit<Component, 'id'>) => {
    const newComponent = createComponent(component.type, component.position, component.label, component.color)
    setArchitecture(prev => ({ ...prev, components: [...prev.components, newComponent] }))
  }, [])

  const handleComponentRemove = useCallback((id: string) => {
    setArchitecture(prev => ({
      ...prev,
      components: prev.components.filter(c => c.id !== id),
      connections: prev.connections.filter(conn => conn.from !== id && conn.to !== id),
    }))
  }, [])

  const handleComponentUpdate = useCallback((component: Component) => {
    setArchitecture(prev => ({
      ...prev,
      components: prev.components.map(c => (c.id === component.id ? component : c)),
    }))
  }, [])

  const handleConnectionAdd = useCallback((from: string, fromCorner: string, to: string, toCorner: string) => {
    const newConnection = createConnection(
      from, to, 'custom',
      `Connection ${architecture.connections.length + 1}`,
      fromCorner, toCorner
    )
    setArchitecture(prev => ({ ...prev, connections: [...prev.connections, newConnection] }))
  }, [architecture.connections.length])

  const handleConnectionUpdate = useCallback((connection: Connection) => {
    setArchitecture(prev => ({
      ...prev,
      connections: prev.connections.map(c => (c.id === connection.id ? connection : c)),
    }))
  }, [])

  const handleConnectionRemove = useCallback((id: string) => {
    setArchitecture(prev => ({
      ...prev,
      connections: prev.connections.filter(c => c.id !== id),
    }))
  }, [])

  const addComponentFromPalette = useCallback((type: string, label: string, color?: string) => {
    handleComponentAdd({ type, position: { x: 200, y: 200 }, label, color })
  }, [handleComponentAdd])

  const addCustomComponentType = useCallback((type: string, label: string, color: string) => {
    const item: PaletteItem = { type: type.trim(), label: label.trim(), color }
    setCustomComponents(prev => [...prev, item])
  }, [])

  const removeCustomComponentType = useCallback((index: number) => {
    setCustomComponents(prev => prev.filter((_, i) => i !== index))
  }, [])

  const importArchitecture = useCallback((json: string) => {
    const parsed = JSON.parse(json) as VisualArchitecture
    if (
      typeof parsed.name === 'string' &&
      typeof parsed.type === 'string' &&
      Array.isArray(parsed.components) &&
      Array.isArray(parsed.connections)
    ) {
      setArchitecture(parsed)
      return true
    }
    return false
  }, [])

  const copyToClipboard = useCallback(async () => {
    const code = JSON.stringify(architecture, null, 2)
    try {
      await navigator.clipboard.writeText(code)
      setCopyStatus('Copied!')
      setTimeout(() => setCopyStatus(''), 2000)
      return true
    } catch {
      setCopyStatus('Failed to copy')
      setTimeout(() => setCopyStatus(''), 2000)
      return false
    }
  }, [architecture])

  const resetArchitecture = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY)
    setArchitecture(defaultArchitecture)
  }, [])

  return {
    architecture,
    setArchitecture,
    customComponents,
    previewMode,
    setPreviewMode,
    copyStatus,
    validate,
    handleComponentMove,
    handleComponentAdd,
    handleComponentRemove,
    handleComponentUpdate,
    handleConnectionAdd,
    handleConnectionUpdate,
    handleConnectionRemove,
    addComponentFromPalette,
    addCustomComponentType,
    removeCustomComponentType,
    importArchitecture,
    copyToClipboard,
    resetArchitecture,
  }
}
