'use client'

import React, { useState, useRef, useCallback, useEffect } from 'react'
import { Component, Connection } from '@/types/architecture'

interface CanvasProps {
  components: Component[]
  connections: Connection[]
  onComponentMove: (id: string, position: { x: number; y: number }) => void
  onComponentAdd: (component: Omit<Component, 'id'>) => void
  onComponentRemove: (id: string) => void
  onComponentEdit?: (id: string, label: string) => void
  onConnectionAdd?: (from: string, fromCorner: string, to: string, toCorner: string) => void
}

// Component dimensions
const COMPONENT_WIDTH = 100
const COMPONENT_HEIGHT = 50

const Canvas: React.FC<CanvasProps> = ({
  components,
  connections,
  onComponentMove,
  onComponentAdd,
  onComponentRemove,
  onComponentEdit,
  onConnectionAdd
}) => {
  const canvasRef = useRef<HTMLDivElement>(null)
  const svgRef = useRef<SVGSVGElement>(null)
  const [draggingComponent, setDraggingComponent] = useState<{
    id: string
    offsetX: number
    offsetY: number
  } | null>(null)
  const [panning, setPanning] = useState(false)
  const [panStart, setPanStart] = useState<{ x: number; y: number } | null>(null)
  const [panOffset, setPanOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 })
  const [scale, setScale] = useState(1)
  const [connectingStart, setConnectingStart] = useState<{ id: string } | null>(null)
  const [tempConnection, setTempConnection] = useState<{ x: number; y: number } | null>(null)

  // Calculate the best connection points between two components
  const getConnectionPoints = useCallback((fromComponent: Component, toComponent: Component) => {
    const fromCenter = {
      x: fromComponent.position.x + COMPONENT_WIDTH / 2,
      y: fromComponent.position.y + COMPONENT_HEIGHT / 2
    }
    const toCenter = {
      x: toComponent.position.x + COMPONENT_WIDTH / 2,
      y: toComponent.position.y + COMPONENT_HEIGHT / 2
    }

    // Calculate direction vector
    const dx = toCenter.x - fromCenter.x
    const dy = toCenter.y - fromCenter.y

    // Calculate connection points on component edges
    let fromPoint, toPoint

    // From component edge calculation
    if (Math.abs(dx) > Math.abs(dy)) {
      // Horizontal connection
      if (dx > 0) {
        // Connect from right edge of from component
        fromPoint = {
          x: fromComponent.position.x + COMPONENT_WIDTH,
          y: fromComponent.position.y + COMPONENT_HEIGHT / 2
        }
      } else {
        // Connect from left edge of from component
        fromPoint = {
          x: fromComponent.position.x,
          y: fromComponent.position.y + COMPONENT_HEIGHT / 2
        }
      }
    } else {
      // Vertical connection
      if (dy > 0) {
        // Connect from bottom edge of from component
        fromPoint = {
          x: fromComponent.position.x + COMPONENT_WIDTH / 2,
          y: fromComponent.position.y + COMPONENT_HEIGHT
        }
      } else {
        // Connect from top edge of from component
        fromPoint = {
          x: fromComponent.position.x + COMPONENT_WIDTH / 2,
          y: fromComponent.position.y
        }
      }
    }

    // To component edge calculation
    if (Math.abs(dx) > Math.abs(dy)) {
      // Horizontal connection
      if (dx > 0) {
        // Connect to left edge of to component
        toPoint = {
          x: toComponent.position.x,
          y: toComponent.position.y + COMPONENT_HEIGHT / 2
        }
      } else {
        // Connect to right edge of to component
        toPoint = {
          x: toComponent.position.x + COMPONENT_WIDTH,
          y: toComponent.position.y + COMPONENT_HEIGHT / 2
        }
      }
    } else {
      // Vertical connection
      if (dy > 0) {
        // Connect to top edge of to component
        toPoint = {
          x: toComponent.position.x + COMPONENT_WIDTH / 2,
          y: toComponent.position.y
        }
      } else {
        // Connect to bottom edge of to component
        toPoint = {
          x: toComponent.position.x + COMPONENT_WIDTH / 2,
          y: toComponent.position.y + COMPONENT_HEIGHT
        }
      }
    }

    return { fromPoint, toPoint }
  }, [])

  // Convert screen coordinates to canvas coordinates
  const screenToCanvas = useCallback((screenX: number, screenY: number) => {
    if (!canvasRef.current) return { x: 0, y: 0 }
    const rect = canvasRef.current.getBoundingClientRect()
    return {
      x: (screenX - rect.left - panOffset.x) / scale,
      y: (screenY - rect.top - panOffset.y) / scale
    }
  }, [scale, panOffset])

  const handleZoomIn = useCallback(() => {
    setScale(prev => Math.min(prev + 0.1, 2))
  }, [])

  const handleZoomOut = useCallback(() => {
    setScale(prev => Math.max(prev - 0.1, 0.5))
  }, [])

  const handleMouseDown = useCallback((e: React.MouseEvent, id: string) => {
    e.preventDefault()
    const component = components.find(c => c.id === id)
    if (!component) return

    const canvasCoords = screenToCanvas(e.clientX, e.clientY)

    setDraggingComponent({
      id,
      offsetX: canvasCoords.x - component.position.x,
      offsetY: canvasCoords.y - component.position.y
    })
  }, [components, screenToCanvas])

  const handleConnectionStart = useCallback((e: React.MouseEvent, componentId: string) => {
    e.preventDefault()
    e.stopPropagation()
    setConnectingStart({ id: componentId })
  }, [])

  const handleCanvasMouseDown = useCallback((e: React.MouseEvent) => {
    // Only start panning if clicking on the canvas background (not on a component)
    if (e.target === canvasRef.current) {
      setPanning(true)
      setPanStart({ x: e.clientX, y: e.clientY })
      e.preventDefault()
    }
  }, [])

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!canvasRef.current) return

    const canvasCoords = screenToCanvas(e.clientX, e.clientY)

    // Handle canvas panning
    if (panning && panStart) {
      const deltaX = e.clientX - panStart.x
      const deltaY = e.clientY - panStart.y
      
      setPanOffset(prev => ({
        x: prev.x + deltaX,
        y: prev.y + deltaY
      }))
      
      setPanStart({ x: e.clientX, y: e.clientY })
      return
    }

    // Handle component dragging
    if (draggingComponent) {
      const adjustedX = canvasCoords.x - draggingComponent.offsetX
      const adjustedY = canvasCoords.y - draggingComponent.offsetY
      onComponentMove(draggingComponent.id, { x: adjustedX, y: adjustedY })
    }

    // Handle temporary connection line
    if (connectingStart) {
      setTempConnection(canvasCoords)
    }
  }, [draggingComponent, connectingStart, panStart, panning, onComponentMove, screenToCanvas, components])

  const handleMouseUp = useCallback((e: React.MouseEvent) => {
    // Handle panning end
    if (panning) {
      setPanning(false)
      setPanStart(null)
      return
    }

    if (connectingStart && tempConnection) {
      const canvasCoords = screenToCanvas(e.clientX, e.clientY)
      
      // Find target component at this position
      let targetComponent = null
      
      for (const component of components) {
        if (component.id === connectingStart.id) continue
        
        // Check if click was within component bounds
        if (canvasCoords.x >= component.position.x && 
            canvasCoords.x <= component.position.x + COMPONENT_WIDTH &&
            canvasCoords.y >= component.position.y && 
            canvasCoords.y <= component.position.y + COMPONENT_HEIGHT) {
          targetComponent = component
          break
        }
      }
      
      if (targetComponent) {
        // Check if connection already exists (prevent duplicates)
        const connectionExists = connections.some(
          conn => 
            (conn.from === connectingStart.id && conn.to === targetComponent.id) ||
            (conn.from === targetComponent.id && conn.to === connectingStart.id)
        )
        
        if (!connectionExists) {
          // Limit to 20 connections per component
          const existingConnections = connections.filter(
            conn => conn.from === connectingStart.id || conn.to === connectingStart.id
          )
          
          if (existingConnections.length < 20) {
            onConnectionAdd?.(connectingStart.id, 'auto', targetComponent.id, 'auto')
          }
        }
      }
    }
    
    setDraggingComponent(null)
    setConnectingStart(null)
    setTempConnection(null)
  }, [connectingStart, tempConnection, components, connections, onConnectionAdd, panning, screenToCanvas])

  const handleCanvasClick = useCallback((e: React.MouseEvent) => {
    if (e.target === canvasRef.current) {
      // Canvas clicked, do nothing
    }
  }, [])

  const renderConnections = useCallback(() => {
    return connections.map((conn, index) => {
      const fromComponent = components.find(c => c.id === conn.from)
      const toComponent = components.find(c => c.id === conn.to)
      
      if (!fromComponent || !toComponent) return null
      
      const { fromPoint, toPoint } = getConnectionPoints(fromComponent, toComponent)
      
      // Calculate control points for curved arrows
      const dx = toPoint.x - fromPoint.x
      const dy = toPoint.y - fromPoint.y
      const distance = Math.sqrt(dx * dx + dy * dy)
      
      // Create curved path for better visual appeal
      const midX = (fromPoint.x + toPoint.x) / 2
      const midY = (fromPoint.y + toPoint.y) / 2
      
      // Offset the curve based on connection direction
      const offsetX = -dy * 0.2
      const offsetY = dx * 0.2
      
      const controlX = midX + offsetX
      const controlY = midY + offsetY
      
      const pathData = `M ${fromPoint.x} ${fromPoint.y} Q ${controlX} ${controlY} ${toPoint.x} ${toPoint.y}`
      
      return (
        <g key={`${conn.from}-${conn.to}-${index}`}>
          <path
            d={pathData}
            stroke="#4f46e5"
            strokeWidth="2"
            fill="none"
            markerEnd="url(#arrowhead)"
            className="connection-path"
          />
          {/* Connection label */}
          <text
            x={midX}
            y={midY - 5}
            fontSize="10"
            fill="#6b7280"
            textAnchor="middle"
            className="pointer-events-none select-none"
          >
            {conn.type}
          </text>
        </g>
      )
    })
  }, [components, connections, getConnectionPoints])

  const renderComponents = useCallback(() => {
    return components.map(component => (
      <div
        key={component.id}
        className="absolute border border-gray-300 rounded-lg shadow-md p-3 cursor-move w-24 text-center relative"
        style={{
          left: component.position.x,
          top: component.position.y,
          backgroundColor: component.color || '#ffffff',
          transform: `scale(${scale})`,
          transformOrigin: 'top left'
        }}
        onMouseDown={(e) => handleMouseDown(e, component.id)}
      >
        <div
          className="font-medium text-sm"
          onDoubleClick={() => onComponentEdit && onComponentEdit(component.id, component.label)}
        >
          {component.label}
        </div>
        <div className="text-xs text-gray-500 mt-1">{component.type}</div>
        
        {/* Remove button */}
        <button
          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs hover:bg-red-600 transition-colors"
          onClick={(e) => {
            e.stopPropagation()
            onComponentRemove(component.id)
          }}
        >
          ×
        </button>
        
        {/* Connection button */}
        <div
          className="absolute -bottom-2 -right-2 bg-blue-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs cursor-pointer hover:bg-blue-600 transition-colors"
          onMouseDown={(e) => handleConnectionStart(e, component.id)}
          title="Connect to another component"
        >
          +
        </div>
      </div>
    ))
  }, [components, scale, handleMouseDown, onComponentEdit, onComponentRemove, handleConnectionStart])

  return (
    <div className="relative w-full h-full bg-gray-50 border border-gray-300 rounded-lg overflow-hidden">
      {/* Zoom Controls */}
      <div className="absolute top-2 right-2 z-10 flex flex-col gap-1">
        <button
          className="bg-white border border-gray-300 rounded-md w-8 h-8 flex items-center justify-center shadow-sm hover:bg-gray-50"
          onClick={handleZoomIn}
        >
          +
        </button>
        <button
          className="bg-white border border-gray-300 rounded-md w-8 h-8 flex items-center justify-center shadow-sm hover:bg-gray-50"
          onClick={handleZoomOut}
        >
          -
        </button>
      </div>
      
      <div className="relative w-full h-full overflow-hidden">
        <div
          ref={canvasRef}
          className="relative w-full h-full"
          style={{ transform: `translate(${panOffset.x}px, ${panOffset.y}px)`, transformOrigin: 'top left' }}
          onMouseDown={handleCanvasMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onClick={handleCanvasClick}
        >
          <svg 
            ref={svgRef}
            className="absolute top-0 left-0 w-full h-full pointer-events-none" 
            style={{ 
              transform: `translate(${panOffset.x}px, ${panOffset.y}px) scale(${scale})`, 
              transformOrigin: 'top left' 
            }}
          >
            <defs>
              <marker
                id="arrowhead"
                markerWidth="12"
                markerHeight="12"
                refX="11"
                refY="6"
                orient="auto"
                markerUnits="strokeWidth"
              >
                <path d="M0,0 L12,6 L0,12 Z" fill="#4f46e5" />
              </marker>
              <marker
                id="arrowhead-temp"
                markerWidth="12"
                markerHeight="12"
                refX="11"
                refY="6"
                orient="auto"
                markerUnits="strokeWidth"
              >
                <path d="M0,0 L12,6 L0,12 Z" fill="#6366f1" />
              </marker>
              {/* Add glow effect for better visibility */}
              <filter id="glow">
                <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                <feMerge> 
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>
            {renderConnections()}
            {/* Temporary connection line */}
            {connectingStart && tempConnection && (() => {
              const fromComponent = components.find(c => c.id === connectingStart.id)
              if (!fromComponent) return null
              
              const fromCenter = {
                x: fromComponent.position.x + COMPONENT_WIDTH / 2,
                y: fromComponent.position.y + COMPONENT_HEIGHT / 2
              }
              
              // Create curved temporary connection
              const dx = tempConnection.x - fromCenter.x
              const dy = tempConnection.y - fromCenter.y
              const distance = Math.sqrt(dx * dx + dy * dy)
              
              if (distance > 10) {
                const midX = (fromCenter.x + tempConnection.x) / 2
                const midY = (fromCenter.y + tempConnection.y) / 2
                const offsetX = -dy * 0.2
                const offsetY = dx * 0.2
                const controlX = midX + offsetX
                const controlY = midY + offsetY
                
                const pathData = `M ${fromCenter.x} ${fromCenter.y} Q ${controlX} ${controlY} ${tempConnection.x} ${tempConnection.y}`
                
                return (
                  <path
                    d={pathData}
                    stroke="#6366f1"
                    strokeWidth="2"
                    fill="none"
                    strokeDasharray="8,4"
                    markerEnd="url(#arrowhead-temp)"
                    filter="url(#glow)"
                    opacity="0.8"
                  />
                )
              }
              
              return null
            })()}
          </svg>
          {renderComponents()}
        
        {components.length === 0 && (
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="text-gray-500">Drag components here to start building</p>
          </div>
        )}
        </div>
      </div>
      
      <div className="absolute bottom-2 right-2 bg-white bg-opacity-80 px-2 py-1 rounded text-xs text-gray-600">
        Zoom: {Math.round(scale * 100)}%
      </div>
    </div>
  )
}

export default Canvas