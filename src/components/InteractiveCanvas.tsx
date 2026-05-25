'use client'

import React, { useCallback, useMemo } from 'react'
import { Component, Connection } from '@/types/architecture'
import { useCanvasViewport } from '@/hooks/useCanvasViewport'
import {
  COMPONENT_WIDTH,
  COMPONENT_HEIGHT,
  CANVAS_BOUNDS,
  CONNECTION_COLORS,
  getConnectionPoint,
  getBestConnectionSides,
  generateSmoothPath,
  computeConnectionLabelPosition,
  generateGridLines,
} from '@/utils/canvas'

interface InteractiveCanvasProps {
  components: Component[]
  connections: Connection[]
}

export const InteractiveCanvas: React.FC<InteractiveCanvasProps> = ({ components, connections }) => {
  const { canvasRef, viewState, screenToCanvas, zoomIn, zoomOut, resetView, pan, handleWheelZoom } = useCanvasViewport()
  const [, setDragState] = React.useState<{
    type: 'none' | 'canvas'
    startPos?: { x: number; y: number }
  }>({ type: 'none' })

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    setDragState({ type: 'canvas', startPos: { x: e.clientX, y: e.clientY } })
    e.preventDefault()
  }, [])

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    setDragState(prev => {
      if (prev.type === 'canvas' && prev.startPos) {
        const deltaX = e.clientX - prev.startPos.x
        const deltaY = e.clientY - prev.startPos.y
        pan(deltaX, deltaY)
        return { type: 'canvas' as const, startPos: { x: e.clientX, y: e.clientY } }
      }
      return prev
    })
  }, [pan])

  const handleMouseUp = useCallback(() => {
    setDragState({ type: 'none' })
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
          <g key={conn.id}>
            <path
              d={pathData}
              stroke={color}
              strokeWidth={2}
              fill="none"
              markerEnd={`url(#arrowhead-${index % CONNECTION_COLORS.length})`}
              className="transition-all duration-200 hover:stroke-width-3"
            />
            <text
              x={labelPos.x}
              y={labelPos.y}
              fontSize={12}
              fontWeight="bold"
              fill="#334155"
              textAnchor="middle"
              className="select-none"
            >
              {conn.name}
            </text>
          </g>
        )
      })
    )
  }, [components, connections])

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
        onMouseLeave={() => setDragState({ type: 'none' })}
        onWheel={handleWheelZoom}
      >
        <svg
          className="absolute"
          style={{
            transform: `translate(${viewState.offsetX}px, ${viewState.offsetY}px) scale(${viewState.scale})`,
            transformOrigin: '0 0',
            zIndex: 1,
            width: CANVAS_BOUNDS.maxX,
            height: CANVAS_BOUNDS.maxY,
            left: 0, top: 0,
          }}
        >
          <defs>
            {CONNECTION_COLORS.map((color, i) => (
              <marker key={i} id={`arrowhead-${i}`} markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto" markerUnits="strokeWidth">
                <path d="M0,0 L0,7 L9,3.5 z" fill={color} />
              </marker>
            ))}
          </defs>
          <rect
            x={CANVAS_BOUNDS.minX} y={CANVAS_BOUNDS.minY}
            width={CANVAS_BOUNDS.maxX - CANVAS_BOUNDS.minX}
            height={CANVAS_BOUNDS.maxY - CANVAS_BOUNDS.minY}
            fill="none" stroke="#cbd5e1" strokeWidth={2} strokeDasharray="10,5" opacity={0.5}
          />
          {generateGridLines()}
          {renderedConnections}
        </svg>

        <div
          className="absolute bg-white/50"
          style={{
            transform: `translate(${viewState.offsetX}px, ${viewState.offsetY}px) scale(${viewState.scale})`,
            transformOrigin: '0 0', zIndex: 0,
            left: CANVAS_BOUNDS.minX, top: CANVAS_BOUNDS.minY,
            width: CANVAS_BOUNDS.maxX - CANVAS_BOUNDS.minX,
            height: CANVAS_BOUNDS.maxY - CANVAS_BOUNDS.minY,
            border: '2px dashed #cbd5e1', borderRadius: '8px',
          }}
        />

        <div
          className="absolute"
          style={{
            transform: `translate(${viewState.offsetX}px, ${viewState.offsetY}px) scale(${viewState.scale})`,
            transformOrigin: '0 0', zIndex: 2,
            left: 0, top: 0,
            width: CANVAS_BOUNDS.maxX, height: CANVAS_BOUNDS.maxY,
          }}
        >
          {components.map(component => (
            <div
              key={component.id}
              data-component-id={component.id}
              className="absolute border-2 border-slate-300 rounded-lg shadow-lg bg-white hover:shadow-xl hover:border-indigo-400 transition-all duration-200 select-none"
              style={{
                left: component.position.x, top: component.position.y,
                width: COMPONENT_WIDTH, height: COMPONENT_HEIGHT,
                backgroundColor: component.color || '#ffffff',
                cursor: 'default',
              }}
            >
              <div className="p-3 h-full flex flex-col justify-center">
                <div className="font-semibold text-sm text-slate-800 text-center" title={component.label}>
                  {component.label}
                </div>
                <div className="text-xs text-slate-500 text-center mt-1" title={component.type}>
                  {component.type}
                </div>
              </div>
            </div>
          ))}

          {components.length === 0 && (
            <div
              className="absolute flex items-center justify-center"
              style={{
                left: CANVAS_BOUNDS.maxX / 2 - 150, top: CANVAS_BOUNDS.maxY / 2 - 100,
                width: 300, height: 200,
              }}
            >
              <div className="text-center p-8 bg-white/90 backdrop-blur-sm rounded-xl shadow-lg border-2 border-dashed border-slate-300">
                <div className="text-4xl mb-4">&bull;</div>
                <h3 className="text-lg font-semibold text-slate-800 mb-2">No Components</h3>
                <p className="text-slate-600 text-sm">This architecture has no visual components</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
