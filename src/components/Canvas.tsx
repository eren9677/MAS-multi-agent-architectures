'use client'

import React, { useState, useRef, useCallback, useMemo } from 'react'
import { Component, Connection } from '@/types/architecture'
import { useCanvasViewport } from '@/hooks/useCanvasViewport'
import {
  COMPONENT_WIDTH,
  COMPONENT_HEIGHT,
  CONNECTION_POINT_SIZE,
  CANVAS_BOUNDS,
  CONNECTION_COLORS,
  getComponentCenter,
  getConnectionPoint,
  constrainPosition,
  getBestConnectionSides,
  generateSmoothPath,
  computeConnectionLabelPosition,
  generateGridLines,
  ConnectionSide,
} from '@/utils/canvas'

interface CanvasProps {
  components: Component[]
  connections: Connection[]
  onComponentMove: (id: string, position: { x: number; y: number }) => void
  onComponentAdd: (component: Omit<Component, 'id'>) => void
  onComponentRemove: (id: string) => void
  onComponentEdit?: (id: string, label: string) => void
  onConnectionAdd?: (from: string, fromCorner: string, to: string, toCorner: string) => void
  onConnectionEdit: (connection: Connection) => void
}

const Canvas: React.FC<CanvasProps> = ({
  components,
  connections,
  onComponentMove,
  onComponentAdd,
  onComponentRemove,
  onComponentEdit,
  onConnectionAdd,
  onConnectionEdit,
}) => {
  const { canvasRef, viewState, screenToCanvas, zoomIn, zoomOut, resetView, pan, handleWheelZoom } = useCanvasViewport()
  const svgRef = useRef<SVGSVGElement>(null)

  const [dragState, setDragState] = useState<{
    type: 'none' | 'component' | 'canvas'
    componentId?: string
    startPos?: { x: number; y: number }
    componentOffset?: { x: number; y: number }
  }>({ type: 'none' })

  const [connectionState, setConnectionState] = useState<{
    isConnecting: boolean
    fromComponentId?: string
    currentPos?: { x: number; y: number }
  }>({ isConnecting: false })

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    const target = e.target as HTMLElement
    const componentElement = target.closest('[data-component-id]') as HTMLElement

    if (target.tagName === 'circle' || target.tagName === 'path' || target.tagName === 'text' || target.tagName === 'rect') {
      return
    }

    if (componentElement && !target.closest('button')) {
      const componentId = componentElement.getAttribute('data-component-id')!
      const component = components.find(c => c.id === componentId)
      if (!component) return

      const canvasPos = screenToCanvas(e.clientX, e.clientY)
      setDragState({
        type: 'component',
        componentId,
        startPos: { x: e.clientX, y: e.clientY },
        componentOffset: {
          x: canvasPos.x - component.position.x,
          y: canvasPos.y - component.position.y,
        },
      })
    } else {
      setDragState({
        type: 'canvas',
        startPos: { x: e.clientX, y: e.clientY },
      })
    }
    e.preventDefault()
  }, [components, screenToCanvas])

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (connectionState.isConnecting) {
      const canvasPos = screenToCanvas(e.clientX, e.clientY)
      setConnectionState(prev => ({ ...prev, currentPos: canvasPos }))
      return
    }

    if (dragState.type === 'component' && dragState.componentId && dragState.componentOffset) {
      const canvasPos = screenToCanvas(e.clientX, e.clientY)
      const newPosition = constrainPosition({
        x: canvasPos.x - dragState.componentOffset.x,
        y: canvasPos.y - dragState.componentOffset.y,
      })
      onComponentMove(dragState.componentId, newPosition)
    } else if (dragState.type === 'canvas' && dragState.startPos) {
      const deltaX = e.clientX - dragState.startPos.x
      const deltaY = e.clientY - dragState.startPos.y
      pan(deltaX, deltaY)
      setDragState(prev => ({ ...prev, startPos: { x: e.clientX, y: e.clientY } }))
    }
  }, [dragState, connectionState, screenToCanvas, onComponentMove, pan])

  const handleMouseUp = useCallback((e: React.MouseEvent) => {
    if (connectionState.isConnecting && connectionState.fromComponentId) {
      const canvasPos = screenToCanvas(e.clientX, e.clientY)
      const target = e.target as HTMLElement
      const componentElement = target.closest('[data-component-id]') as HTMLElement

      let targetComponentId: string | null = null

      if (componentElement) {
        targetComponentId = componentElement.getAttribute('data-component-id')!
      } else {
        for (const component of components) {
          if (
            canvasPos.x >= component.position.x &&
            canvasPos.x <= component.position.x + COMPONENT_WIDTH &&
            canvasPos.y >= component.position.y &&
            canvasPos.y <= component.position.y + COMPONENT_HEIGHT
          ) {
            targetComponentId = component.id
            break
          }
        }
      }

      if (targetComponentId) {
        onConnectionAdd?.(connectionState.fromComponentId, 'auto', targetComponentId, 'auto')
      }
      setConnectionState({ isConnecting: false })
    }
    setDragState({ type: 'none' })
  }, [connectionState, onConnectionAdd, components, screenToCanvas])

  const handleConnectionStart = useCallback((e: React.MouseEvent, componentId: string) => {
    e.stopPropagation()
    setConnectionState({ isConnecting: true, fromComponentId: componentId })
  }, [])

  const renderedConnections = useMemo(() => {
    const connectionGroups: Record<string, Connection[]> = {}
    connections.forEach(conn => {
      const key = [conn.from, conn.to].sort().join('-')
      if (!connectionGroups[key]) connectionGroups[key] = []
      connectionGroups[key].push(conn)
    })

    return Object.values(connectionGroups).flatMap(group =>
      group.map((conn, index) => {
        const fromComponent = components.find(c => c.id === conn.from)
        const toComponent = components.find(c => c.id === conn.to)
        if (!fromComponent || !toComponent) return null

        const isSelfConnection = fromComponent.id === toComponent.id
        const { fromSide, toSide } = getBestConnectionSides(fromComponent, toComponent, index, conn.fromCorner, conn.toCorner)
        const fromPoint = getConnectionPoint(fromComponent, fromSide)
        const toPoint = isSelfConnection ? fromPoint : getConnectionPoint(toComponent, toSide)
        const pathData = generateSmoothPath(fromPoint, toPoint, isSelfConnection, index, fromSide, toSide)
        const labelPos = computeConnectionLabelPosition(fromPoint, toPoint, isSelfConnection, index, fromSide)
        const color = CONNECTION_COLORS[index % CONNECTION_COLORS.length]

        return (
          <g key={conn.id} data-connection-id={conn.id}>
            <path
              d={pathData}
              stroke={color}
              strokeWidth={2}
              fill="none"
              markerEnd={`url(#arrowhead-${index % CONNECTION_COLORS.length})`}
              className="cursor-pointer transition-all duration-200 hover:stroke-width-3"
              onClick={(e) => {
                e.stopPropagation()
                onConnectionEdit(conn)
              }}
            />
            <text
              x={labelPos.x}
              y={labelPos.y}
              fontSize={12}
              fontWeight="bold"
              fill="#334155"
              textAnchor="middle"
              className="select-none cursor-pointer"
              onClick={(e) => {
                e.stopPropagation()
                onConnectionEdit(conn)
              }}
            >
              {conn.name}
            </text>
          </g>
        )
      })
    )
  }, [components, connections, onConnectionEdit])

  const tempConnection = useMemo(() => {
    if (!connectionState.isConnecting || !connectionState.fromComponentId || !connectionState.currentPos) return null
    const fromComponent = components.find(c => c.id === connectionState.fromComponentId)
    if (!fromComponent) return null

    const fromCenter = getComponentCenter(fromComponent)
    return (
      <path
        d={`M ${fromCenter.x} ${fromCenter.y} L ${connectionState.currentPos.x} ${connectionState.currentPos.y}`}
        stroke="#6366f1"
        strokeWidth={2}
        strokeDasharray="8,4"
        fill="none"
        markerEnd="url(#arrowhead-temp)"
        opacity={0.7}
      />
    )
  }, [connectionState, components])

  return (
    <div className="relative w-full h-full bg-gradient-to-br from-slate-50 to-slate-100 border border-slate-200 rounded-lg overflow-hidden">
      <div className="absolute top-4 right-4 z-20 flex flex-col gap-2 bg-white/90 backdrop-blur-sm rounded-lg p-2 shadow-lg">
        <button onClick={zoomIn} className="w-8 h-8 flex items-center justify-center bg-white border border-slate-300 rounded-md hover:bg-slate-50 transition-colors" title="Zoom In">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
        </button>
        <button onClick={zoomOut} className="w-8 h-8 flex items-center justify-center bg-white border border-slate-300 rounded-md hover:bg-slate-50 transition-colors" title="Zoom Out">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
          </svg>
        </button>
        <button onClick={resetView} className="w-8 h-8 flex items-center justify-center bg-white border border-slate-300 rounded-md hover:bg-slate-50 transition-colors" title="Reset View">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        </button>
      </div>

      <div className="absolute top-4 left-4 z-20 flex gap-2">
        {connectionState.isConnecting && (
          <div className="bg-blue-500 text-white px-3 py-1.5 rounded-lg text-sm font-medium shadow-lg">
            Click a component to connect
          </div>
        )}
        <div className="bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-lg text-sm text-slate-600 shadow-lg">
          Zoom: {Math.round(viewState.scale * 100)}% &middot; Hold Ctrl+Scroll to zoom
        </div>
        <div className="bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-lg text-sm text-slate-600 shadow-lg">
          Canvas: {CANVAS_BOUNDS.maxX}&times;{CANVAS_BOUNDS.maxY}px
        </div>
      </div>

      <div
        ref={canvasRef}
        className="w-full h-full cursor-grab active:cursor-grabbing"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={() => { setDragState({ type: 'none' }) }}
        onWheel={handleWheelZoom}        style={{
          cursor: connectionState.isConnecting ? 'crosshair' : dragState.type === 'canvas' ? 'grabbing' : 'grab',
        }}
      >
        <svg
          ref={svgRef}
          className="absolute"
          style={{
            transform: `translate(${viewState.offsetX}px, ${viewState.offsetY}px) scale(${viewState.scale})`,
            transformOrigin: '0 0',
            zIndex: 1,
            width: CANVAS_BOUNDS.maxX,
            height: CANVAS_BOUNDS.maxY,
            left: 0,
            top: 0,
          }}
        >
          <defs>
            {CONNECTION_COLORS.map((color, i) => (
              <marker key={i} id={`arrowhead-${i}`} markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto" markerUnits="strokeWidth">
                <path d="M0,0 L0,7 L9,3.5 z" fill={color} />
              </marker>
            ))}
            <marker id="arrowhead-temp" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
              <path d="M0,0 L0,6 L9,3 z" fill="#6366f1" />
            </marker>
          </defs>
          <rect
            x={CANVAS_BOUNDS.minX} y={CANVAS_BOUNDS.minY}
            width={CANVAS_BOUNDS.maxX - CANVAS_BOUNDS.minX}
            height={CANVAS_BOUNDS.maxY - CANVAS_BOUNDS.minY}
            fill="none" stroke="#cbd5e1" strokeWidth={2} strokeDasharray="10,5" opacity={0.5}
          />
          {generateGridLines()}
          {renderedConnections}
          {tempConnection}
        </svg>

        <div
          className="absolute bg-white/50"
          style={{
            transform: `translate(${viewState.offsetX}px, ${viewState.offsetY}px) scale(${viewState.scale})`,
            transformOrigin: '0 0',
            zIndex: 0,
            left: CANVAS_BOUNDS.minX,
            top: CANVAS_BOUNDS.minY,
            width: CANVAS_BOUNDS.maxX - CANVAS_BOUNDS.minX,
            height: CANVAS_BOUNDS.maxY - CANVAS_BOUNDS.minY,
            border: '2px dashed #cbd5e1',
            borderRadius: '8px',
          }}
        />

        <div
          className="absolute"
          style={{
            transform: `translate(${viewState.offsetX}px, ${viewState.offsetY}px) scale(${viewState.scale})`,
            transformOrigin: '0 0',
            zIndex: 2,
            left: 0, top: 0,
            width: CANVAS_BOUNDS.maxX,
            height: CANVAS_BOUNDS.maxY,
          }}
        >
          {components.map(component => (
            <ComponentNode
              key={component.id}
              component={component}
              isDragging={dragState.type === 'component' && dragState.componentId === component.id}
              onEdit={onComponentEdit}
              onRemove={onComponentRemove}
              onConnectionStart={handleConnectionStart}
            />
          ))}

          {components.length === 0 && (
            <div
              className="absolute flex items-center justify-center"
              style={{
                left: CANVAS_BOUNDS.maxX / 2 - 150,
                top: CANVAS_BOUNDS.maxY / 2 - 100,
                width: 300, height: 200,
              }}
            >
              <div className="text-center p-8 bg-white/90 backdrop-blur-sm rounded-xl shadow-lg border-2 border-dashed border-slate-300">
                <div className="text-4xl mb-4">&bull;</div>
                <h3 className="text-lg font-semibold text-slate-800 mb-2">Start Building</h3>
                <p className="text-slate-600 text-sm">Drag components from the palette</p>
                <p className="text-slate-500 text-xs mt-2">Stay within the dashed boundary</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

const ComponentNode: React.FC<{
  component: Component
  isDragging: boolean
  onEdit?: (id: string, label: string) => void
  onRemove: (id: string) => void
  onConnectionStart: (e: React.MouseEvent, id: string) => void
}> = ({ component, isDragging, onEdit, onRemove, onConnectionStart }) => {
  const connectionSides: { side: ConnectionSide; styles: React.CSSProperties }[] = [
    { side: 'top', styles: { top: -CONNECTION_POINT_SIZE / 2, left: '50%', transform: 'translateX(-50%)' } },
    { side: 'right', styles: { top: '50%', right: -CONNECTION_POINT_SIZE / 2, transform: 'translateY(-50%)' } },
    { side: 'bottom', styles: { bottom: -CONNECTION_POINT_SIZE / 2, left: '50%', transform: 'translateX(-50%)' } },
    { side: 'left', styles: { top: '50%', left: -CONNECTION_POINT_SIZE / 2, transform: 'translateY(-50%)' } },
  ]

  return (
    <div
      data-component-id={component.id}
      className="absolute border-2 border-slate-300 rounded-lg shadow-lg bg-white hover:shadow-xl hover:border-indigo-400 transition-all duration-200 select-none"
      style={{
        left: component.position.x,
        top: component.position.y,
        width: COMPONENT_WIDTH,
        height: COMPONENT_HEIGHT,
        backgroundColor: component.color || '#ffffff',
        cursor: isDragging ? 'grabbing' : 'grab',
      }}
    >
      <div className="p-3 h-full flex flex-col justify-center">
        <div
          className="font-semibold text-sm text-slate-800 text-center"
          title={component.label}
          onDoubleClick={() => onEdit?.(component.id, component.label)}
        >
          {component.label}
        </div>
        <div className="text-xs text-slate-500 text-center mt-1" title={component.type}>
          {component.type}
        </div>
      </div>

      {connectionSides.map(({ side, styles }) => (
        <div
          key={side}
          className="absolute w-2 h-2 bg-blue-500 rounded-full opacity-0 hover:opacity-100 transition-opacity cursor-crosshair z-10"
          style={{ ...styles, width: CONNECTION_POINT_SIZE, height: CONNECTION_POINT_SIZE }}
          onMouseDown={(e) => onConnectionStart(e, component.id)}
          title={`Connect from ${side}`}
        />
      ))}

      <button
        className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center text-xs hover:bg-red-600 transition-colors shadow-md z-10"
        onClick={(e) => { e.stopPropagation(); onRemove(component.id) }}
        title="Remove component"
      >
        &times;
      </button>

      <button
        className="absolute -bottom-2 -right-2 w-5 h-5 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs hover:bg-blue-600 transition-colors shadow-md z-10"
        onMouseDown={(e) => onConnectionStart(e, component.id)}
        title="Create connection"
      >
        +
      </button>
    </div>
  )
}

export default Canvas
