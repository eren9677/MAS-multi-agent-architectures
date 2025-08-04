'use client'

import React, { useState, useRef, useCallback } from 'react'
import { Component, Connection } from '@/types/architecture'

interface CanvasProps {
  components: Component[]
  connections: Connection[]
  onComponentMove: (id: string, position: { x: number; y: number }) => void
  onComponentAdd: (component: Omit<Component, 'id'>) => void
  onComponentRemove: (id: string) => void
}

const Canvas: React.FC<CanvasProps> = ({
  components,
  connections,
  onComponentMove,
  onComponentAdd,
  onComponentRemove
}) => {
  const canvasRef = useRef<HTMLDivElement>(null)
  const [draggingComponent, setDraggingComponent] = useState<{
    id: string
    offsetX: number
    offsetY: number
  } | null>(null)

  const handleMouseDown = useCallback((e: React.MouseEvent, id: string) => {
    e.preventDefault()
    const component = components.find(c => c.id === id)
    if (!component) return

    const rect = canvasRef.current?.getBoundingClientRect()
    if (!rect) return

    setDraggingComponent({
      id,
      offsetX: e.clientX - rect.left - component.position.x,
      offsetY: e.clientY - rect.top - component.position.y
    })
  }, [components])

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!draggingComponent || !canvasRef.current) return

    const rect = canvasRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left - draggingComponent.offsetX
    const y = e.clientY - rect.top - draggingComponent.offsetY

    onComponentMove(draggingComponent.id, { x, y })
  }, [draggingComponent, onComponentMove])

  const handleMouseUp = useCallback(() => {
    setDraggingComponent(null)
  }, [])

  const renderConnections = useCallback(() => {
    return connections.map((conn, index) => {
      const fromComponent = components.find(c => c.id === conn.from)
      const toComponent = components.find(c => c.id === conn.to)
      
      if (!fromComponent || !toComponent) return null
      
      // Simple line connection for now
      return (
        <line
          key={index}
          x1={fromComponent.position.x + 50}
          y1={fromComponent.position.y + 25}
          x2={toComponent.position.x + 50}
          y2={toComponent.position.y + 25}
          stroke="#94a3b8"
          strokeWidth="2"
        />
      )
    })
  }, [components, connections])

  const renderComponents = useCallback(() => {
    return components.map(component => (
      <div
        key={component.id}
        className="absolute bg-white border border-gray-300 rounded-lg shadow-md p-3 cursor-move w-24 text-center"
        style={{ left: component.position.x, top: component.position.y }}
        onMouseDown={(e) => handleMouseDown(e, component.id)}
      >
        <div className="font-medium text-sm truncate">{component.label}</div>
        <div className="text-xs text-gray-500 mt-1">{component.type}</div>
        <button
          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
          onClick={(e) => {
            e.stopPropagation()
            onComponentRemove(component.id)
          }}
        >
          ×
        </button>
      </div>
    ))
  }, [components, handleMouseDown, onComponentRemove])

  return (
    <div
      ref={canvasRef}
      className="relative w-full h-full bg-gray-50 border border-gray-300 rounded-lg overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <svg className="absolute top-0 left-0 w-full h-full pointer-events-none">
        {renderConnections()}
      </svg>
      {renderComponents()}
      
      {components.length === 0 && (
        <div className="absolute inset-0 flex items-center justify-center">
          <p className="text-gray-500">Drag components here to start building</p>
        </div>
      )}
    </div>
  )
}

export default Canvas