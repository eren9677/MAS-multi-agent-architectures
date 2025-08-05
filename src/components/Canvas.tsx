
import React, { useState, useRef, useCallback, useEffect, useMemo } from 'react'

// Types
interface Component {
  id: string
  type: string
  position: { x: number; y: number }
  label: string
  color?: string
}

interface Connection {
  id: string
  from: string
  to: string
  type: string
  name: string
  fromCorner?: string
  toCorner?: string
}

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

// Constants
const COMPONENT_WIDTH = 120
const COMPONENT_HEIGHT = 60
const CONNECTION_POINT_SIZE = 8
const MIN_SCALE = 0.25
const MAX_SCALE = 3
const CONNECTION_COLORS = ['#4f46e5', '#db2777', '#059669', '#d97706', '#6d28d9'];


// Canvas boundaries - define the working area
const CANVAS_BOUNDS = {
  minX: 0,
  minY: 0,
  maxX: 3000,
  maxY: 1500
}
const GRID_SIZE = 50 // Grid spacing for visual reference

// Utility functions
const getComponentCenter = (component: Component) => ({
  x: component.position.x + COMPONENT_WIDTH / 2,
  y: component.position.y + COMPONENT_HEIGHT / 2
})

const getConnectionPoint = (component: Component, side: 'top' | 'right' | 'bottom' | 'left') => {
  const points = {
    top: { x: component.position.x + COMPONENT_WIDTH / 2, y: component.position.y },
    right: { x: component.position.x + COMPONENT_WIDTH, y: component.position.y + COMPONENT_HEIGHT / 2 },
    bottom: { x: component.position.x + COMPONENT_WIDTH / 2, y: component.position.y + COMPONENT_HEIGHT },
    left: { x: component.position.x, y: component.position.y + COMPONENT_HEIGHT / 2 }
  }
  return points[side]
}

// Constrain component position within canvas bounds
const constrainPosition = (position: { x: number; y: number }) => ({
  x: Math.max(CANVAS_BOUNDS.minX, Math.min(CANVAS_BOUNDS.maxX - COMPONENT_WIDTH, position.x)),
  y: Math.max(CANVAS_BOUNDS.minY, Math.min(CANVAS_BOUNDS.maxY - COMPONENT_HEIGHT, position.y))
})

// Generate grid lines for visual reference
const generateGridLines = () => {
  const lines = []
  
  // Vertical lines
  for (let x = CANVAS_BOUNDS.minX; x <= CANVAS_BOUNDS.maxX; x += GRID_SIZE) {
    lines.push(
      <line
        key={`v-${x}`}
        x1={x}
        y1={CANVAS_BOUNDS.minY}
        x2={x}
        y2={CANVAS_BOUNDS.maxY}
        stroke="#e2e8f0"
        strokeWidth={x % (GRID_SIZE * 4) === 0 ? 1 : 0.5}
        opacity={x % (GRID_SIZE * 4) === 0 ? 0.3 : 0.15}
      />
    )
  }
  
  // Horizontal lines
  for (let y = CANVAS_BOUNDS.minY; y <= CANVAS_BOUNDS.maxY; y += GRID_SIZE) {
    lines.push(
      <line
        key={`h-${y}`}
        x1={CANVAS_BOUNDS.minX}
        y1={y}
        x2={CANVAS_BOUNDS.maxX}
        y2={y}
        stroke="#e2e8f0"
        strokeWidth={y % (GRID_SIZE * 4) === 0 ? 1 : 0.5}
        opacity={y % (GRID_SIZE * 4) === 0 ? 0.3 : 0.15}
      />
    )
  }
  
  return lines
}

const getBestConnectionSides = (fromComponent: Component, toComponent: Component) => {
  if (fromComponent.id === toComponent.id) {
    // Self-connection: right to left with a loop
    return { fromSide: 'right', toSide: 'left' }
  }

  const fromCenter = getComponentCenter(fromComponent)
  const toCenter = getComponentCenter(toComponent)
  
  const dx = toCenter.x - fromCenter.x
  const dy = toCenter.y - fromCenter.y
  
  if (Math.abs(dx) > Math.abs(dy)) {
    // Horizontal connection preferred
    return {
      fromSide: dx > 0 ? 'right' : 'left',
      toSide: dx > 0 ? 'left' : 'right'
    }
  } else {
    // Vertical connection preferred
    return {
      fromSide: dy > 0 ? 'bottom' : 'top',
      toSide: dy > 0 ? 'top' : 'bottom'
    }
  }
}

const generateSmoothPath = (fromPoint: {x: number, y: number}, toPoint: {x: number, y: number}, isSelfConnection = false, index = 0) => {
  const offset = index * 40; // Increased spacing between multiple connections for better visibility

  if (isSelfConnection) {
    // Create a larger, more visible loop for self-connections
    const baseLoopSize = 80; // Increased base size for better visibility
    const loopSize = baseLoopSize + (index * 50); // More spacing between multiple self-connections
    const loopHeight = 60 + (index * 30); // Vary height for multiple self-connections
    
    // Create a more prominent loop that extends further from the component
    const controlX1 = fromPoint.x + loopSize;
    const controlY1 = fromPoint.y - loopHeight;
    const controlX2 = toPoint.x + loopSize;
    const controlY2 = toPoint.y - loopHeight;
    
    return `M ${fromPoint.x} ${fromPoint.y}
            C ${controlX1} ${controlY1}
              ${controlX2} ${controlY2}
              ${toPoint.x} ${toPoint.y}`;
  }

  const dx = toPoint.x - fromPoint.x
  const dy = toPoint.y - fromPoint.y
  const distance = Math.sqrt(dx * dx + dy * dy)
  
  // Control point offset based on distance
  const controlOffset = Math.min(distance * 0.3, 80) // Increased max control offset
  
  // Determine control points based on direction
  let cp1x, cp1y, cp2x, cp2y
  
  if (Math.abs(dx) > Math.abs(dy)) {
    // Horizontal flow - increased spacing for multiple connections
    cp1x = fromPoint.x + (dx > 0 ? controlOffset : -controlOffset)
    cp1y = fromPoint.y + offset
    cp2x = toPoint.x + (dx > 0 ? -controlOffset : controlOffset)
    cp2y = toPoint.y + offset
  } else {
    // Vertical flow - increased spacing for multiple connections
    cp1x = fromPoint.x + offset
    cp1y = fromPoint.y + (dy > 0 ? controlOffset : -controlOffset)
    cp2x = toPoint.x + offset
    cp2y = toPoint.y + (dy > 0 ? -controlOffset : controlOffset)
  }
  
  return `M ${fromPoint.x} ${fromPoint.y} C ${cp1x} ${cp1y} ${cp2x} ${cp2y} ${toPoint.x} ${toPoint.y}`
}

const Canvas: React.FC<CanvasProps> = ({
  components,
  connections,
  onComponentMove,
  onComponentAdd,
  onComponentRemove,
  onComponentEdit,
  onConnectionAdd,
  onConnectionEdit
}) => {
  // State management
  const canvasRef = useRef<HTMLDivElement>(null)
  const svgRef = useRef<SVGSVGElement>(null)
  
  const [viewState, setViewState] = useState({
    scale: 1,
    offsetX: 0,
    offsetY: 0
  })
  
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

  // Coordinate transformation utilities
  const screenToCanvas = useCallback((screenX: number, screenY: number) => {
    if (!canvasRef.current) return { x: 0, y: 0 }
    const rect = canvasRef.current.getBoundingClientRect()
    return {
      x: (screenX - rect.left - viewState.offsetX) / viewState.scale,
      y: (screenY - rect.top - viewState.offsetY) / viewState.scale
    }
  }, [viewState])

  const canvasToScreen = useCallback((canvasX: number, canvasY: number) => {
    return {
      x: canvasX * viewState.scale + viewState.offsetX,
      y: canvasY * viewState.scale + viewState.offsetY
    }
  }, [viewState])

  // Event handlers
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    const target = e.target as HTMLElement
    const componentElement = target.closest('[data-component-id]') as HTMLElement
    
    // If clicking on any SVG element, don't interfere - let SVG handle it
    if (target.tagName === 'circle' || target.tagName === 'path' || target.tagName === 'text' || target.tagName === 'rect') {
      // Don't prevent default, let the SVG element handle the event
      return
    }
    
    // Check if clicking on a component (but not connection buttons)
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
          y: canvasPos.y - component.position.y
        }
      })
    } else {
      // If not clicking on a component, always allow canvas panning
      setDragState({
        type: 'canvas',
        startPos: { x: e.clientX, y: e.clientY }
      })
    }
    
    e.preventDefault()
  }, [components, screenToCanvas])

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (connectionState.isConnecting) {
      const canvasPos = screenToCanvas(e.clientX, e.clientY)
      setConnectionState(prev => ({
        ...prev,
        currentPos: canvasPos
      }))
      return
    }

    if (dragState.type === 'component' && dragState.componentId && dragState.componentOffset) {
      const canvasPos = screenToCanvas(e.clientX, e.clientY)
      const newPosition = constrainPosition({
        x: canvasPos.x - dragState.componentOffset.x,
        y: canvasPos.y - dragState.componentOffset.y
      })
      onComponentMove(dragState.componentId, newPosition)
    } else if (dragState.type === 'canvas' && dragState.startPos) {
      const deltaX = e.clientX - dragState.startPos.x
      const deltaY = e.clientY - dragState.startPos.y
      
      setViewState(prev => ({
        ...prev,
        offsetX: prev.offsetX + deltaX,
        offsetY: prev.offsetY + deltaY
      }))
      
      setDragState(prev => ({
        ...prev,
        startPos: { x: e.clientX, y: e.clientY }
      }))
    }
  }, [dragState, connectionState, screenToCanvas, onComponentMove])

  const handleMouseUp = useCallback((e: React.MouseEvent) => {
    if (connectionState.isConnecting && connectionState.fromComponentId) {
      const canvasPos = screenToCanvas(e.clientX, e.clientY)
      
      // First try to find component via DOM element (most reliable for direct clicks)
      const target = e.target as HTMLElement
      const componentElement = target.closest('[data-component-id]') as HTMLElement
      
      let targetComponentId: string | null = null
      
      if (componentElement) {
        targetComponentId = componentElement.getAttribute('data-component-id')!
      } else {
        // If no DOM element found, check if canvas coordinates hit any component
        // This handles cases where user clicks in scaled/zoomed areas
        for (const component of components) {
          if (canvasPos.x >= component.position.x &&
              canvasPos.x <= component.position.x + COMPONENT_WIDTH &&
              canvasPos.y >= component.position.y &&
              canvasPos.y <= component.position.y + COMPONENT_HEIGHT) {
            targetComponentId = component.id
            break
          }
        }
      }
      
      if (targetComponentId) {
        // Ensure both components are within bounds before creating connection
        const fromComp = components.find(c => c.id === connectionState.fromComponentId)
        const toComp = components.find(c => c.id === targetComponentId)
        
        if (fromComp && toComp) {
          if (onConnectionAdd) {
            onConnectionAdd(connectionState.fromComponentId, 'auto', targetComponentId, 'auto')
          }
        }
      }
      
      setConnectionState({ isConnecting: false })
    }
    
    setDragState({ type: 'none' })
  }, [connectionState, onConnectionAdd, components, screenToCanvas])

  const handleConnectionStart = useCallback((e: React.MouseEvent, componentId: string) => {
    e.stopPropagation()
    setConnectionState({
      isConnecting: true,
      fromComponentId: componentId
    })
  }, [])

  const handleWheel = useCallback((e: React.WheelEvent) => {
    // Only zoom if Ctrl key is held or if it's a pinch gesture (deltaY with ctrlKey)
    // This prevents accidental zooming during page scroll
    if (!e.ctrlKey && !e.metaKey) {
      return // Let the page scroll normally
    }
    
    e.preventDefault()
    e.stopPropagation()
    
    const delta = e.deltaY > 0 ? -0.1 : 0.1
    const newScale = Math.max(MIN_SCALE, Math.min(MAX_SCALE, viewState.scale + delta))
    
    // Scale around mouse position
    const rect = canvasRef.current?.getBoundingClientRect()
    if (rect) {
      const mouseX = e.clientX - rect.left
      const mouseY = e.clientY - rect.top
      
      const scaleRatio = newScale / viewState.scale
      const newOffsetX = mouseX - (mouseX - viewState.offsetX) * scaleRatio
      const newOffsetY = mouseY - (mouseY - viewState.offsetY) * scaleRatio
      
      setViewState({
        scale: newScale,
        offsetX: newOffsetX,
        offsetY: newOffsetY
      })
    }
  }, [viewState])

  // Alternative zoom handler for when mouse is specifically over canvas
  const handleCanvasWheel = useCallback((e: React.WheelEvent) => {
    // Only zoom when mouse is directly over the canvas and user holds Ctrl/Cmd
    if (!e.ctrlKey && !e.metaKey) {
      return
    }
    
    e.preventDefault()
    e.stopPropagation()
    
    const delta = e.deltaY > 0 ? -0.15 : 0.15
    const newScale = Math.max(MIN_SCALE, Math.min(MAX_SCALE, viewState.scale + delta))
    
    const rect = canvasRef.current?.getBoundingClientRect()
    if (rect) {
      const mouseX = e.clientX - rect.left
      const mouseY = e.clientY - rect.top
      
      const scaleRatio = newScale / viewState.scale
      const newOffsetX = mouseX - (mouseX - viewState.offsetX) * scaleRatio
      const newOffsetY = mouseY - (mouseY - viewState.offsetY) * scaleRatio
      
      setViewState({
        scale: newScale,
        offsetX: newOffsetX,
        offsetY: newOffsetY
      })
    }
  }, [viewState])

  // Render connections with stable positioning
  const renderedConnections = useMemo(() => {
    const connectionGroups: { [key: string]: Connection[] } = {};

    connections.forEach(conn => {
      // Normalize the key so that A->B and B->A are grouped together for path offsetting, but not for rendering direction.
      const key = [conn.from, conn.to].sort().join('-');
      if (!connectionGroups[key]) {
        connectionGroups[key] = [];
      }
      connectionGroups[key].push(conn);
    });

    return Object.values(connectionGroups).flatMap(group => {
      return group.map((conn, index) => {
        const fromComponent = components.find(c => c.id === conn.from);
        const toComponent = components.find(c => c.id === conn.to);

        if (!fromComponent || !toComponent) return null;

        const isSelfConnection = fromComponent.id === toComponent.id;
        const { fromSide, toSide } = getBestConnectionSides(fromComponent, toComponent);

        const fromPoint = getConnectionPoint(fromComponent, fromSide as any);
        const toPoint = getConnectionPoint(toComponent, toSide as any);

        const pathData = generateSmoothPath(fromPoint, toPoint, isSelfConnection, index);

        // Calculate label position to follow the connection path
        const offset = index * 40; // Same offset as used in generateSmoothPath
        
        let labelX, labelY;
        
        if (isSelfConnection) {
          // For self-connections, position labels further out
          labelX = fromPoint.x + 80 + (index * 50);
          labelY = fromPoint.y - 60 - (index * 30);
        } else {
          // For regular connections, follow the same offset logic as the path
          const dx = toPoint.x - fromPoint.x;
          const dy = toPoint.y - fromPoint.y;
          
          if (Math.abs(dx) > Math.abs(dy)) {
            // Horizontal connection - offset Y coordinate to match the path
            labelX = (fromPoint.x + toPoint.x) / 2;
            labelY = (fromPoint.y + toPoint.y) / 2 + offset - 8;
          } else {
            // Vertical connection - offset X coordinate to match the path, plus small Y offset to prevent overlap
            labelX = (fromPoint.x + toPoint.x) / 2 + offset;
            labelY = (fromPoint.y + toPoint.y) / 2 + (index * 15) - 8; // Add small Y spacing for readability
          }
        }
        
        const color = CONNECTION_COLORS[index % CONNECTION_COLORS.length];
        const markerId = `arrowhead-${index % CONNECTION_COLORS.length}`;

        return (
          <g key={conn.id}>
            <path
              d={pathData}
              stroke={color}
              strokeWidth={2}
              fill="none"
              markerEnd={`url(#${markerId})`}
              className="transition-all duration-200 hover:stroke-width-3"
            />
            <text
              x={labelX}
              y={labelY}
              fontSize={12}
              fontWeight="bold"
              fill="#334155"
              textAnchor="middle"
              className="select-none"
            >
              {conn.name}
            </text>
          </g>
        );
      });
    });
  }, [components, connections, onConnectionEdit]);

  // Render temporary connection
  const tempConnection = useMemo(() => {
    if (!connectionState.isConnecting || !connectionState.fromComponentId || !connectionState.currentPos) {
      return null
    }
    
    const fromComponent = components.find(c => c.id === connectionState.fromComponentId)
    if (!fromComponent) return null
    
    const fromCenter = getComponentCenter(fromComponent)
    const pathData = `M ${fromCenter.x} ${fromCenter.y} L ${connectionState.currentPos.x} ${connectionState.currentPos.y}`
    
    return (
      <path
        d={pathData}
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
      {/* Controls */}
      <div className="absolute top-4 right-4 z-20 flex flex-col gap-2 bg-white/90 backdrop-blur-sm rounded-lg p-2 shadow-lg">
        <button
          onClick={() => setViewState(prev => ({ ...prev, scale: Math.min(prev.scale + 0.2, MAX_SCALE) }))}
          className="w-8 h-8 flex items-center justify-center bg-white border border-slate-300 rounded-md hover:bg-slate-50 transition-colors"
          title="Zoom In"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
        </button>
        <button
          onClick={() => setViewState(prev => ({ ...prev, scale: Math.max(prev.scale - 0.2, MIN_SCALE) }))}
          className="w-8 h-8 flex items-center justify-center bg-white border border-slate-300 rounded-md hover:bg-slate-50 transition-colors"
          title="Zoom Out"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
          </svg>
        </button>
        <button
          onClick={() => setViewState({ scale: 1, offsetX: 0, offsetY: 0 })}
          className="w-8 h-8 flex items-center justify-center bg-white border border-slate-300 rounded-md hover:bg-slate-50 transition-colors"
          title="Reset View"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        </button>
      </div>

      {/* Status indicators */}
      <div className="absolute top-4 left-4 z-20 flex gap-2">
        {connectionState.isConnecting && (
          <div className="bg-blue-500 text-white px-3 py-1.5 rounded-lg text-sm font-medium shadow-lg">
            🔗 Click a component to connect
          </div>
        )}
        <div className="bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-lg text-sm text-slate-600 shadow-lg">
          Zoom: {Math.round(viewState.scale * 100)}% • Hold Ctrl+Scroll to zoom
        </div>
        <div className="bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-lg text-sm text-slate-600 shadow-lg">
          Canvas: {CANVAS_BOUNDS.maxX}×{CANVAS_BOUNDS.maxY}px
        </div>
      </div>

      {/* Main canvas */}
      <div
        ref={canvasRef}
        className="w-full h-full cursor-grab active:cursor-grabbing"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={() => setDragState({ type: 'none' })}
        onWheel={handleCanvasWheel}
        style={{
          cursor: connectionState.isConnecting ? 'crosshair' : 
                 dragState.type === 'canvas' ? 'grabbing' : 'grab'
        }}
      >
        {/* SVG Layer for connections and grid */}
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
            top: 0
          }}
          onClick={(e) => {
            const target = e.target as SVGElement
            console.log('SVG clicked, target:', target.tagName, target)
            
            // Check if clicked element is a connection path or text
            if (target.tagName === 'path' || target.tagName === 'text') {
              // Find the parent g element to get the connection data
              const gElement = target.closest('g')
              if (gElement) {
                const connectionId = gElement.getAttribute('data-connection-id')
                if (connectionId) {
                  const connection = connections.find(c => c.id === connectionId)
                  if (connection) {
                    console.log('Connection found:', connection)
                    onConnectionEdit(connection)
                  }
                }
              }
            }
          }}
        >
          <defs>
            {CONNECTION_COLORS.map((color, index) => (
              <marker
                key={index}
                id={`arrowhead-${index}`}
                markerWidth="10"
                markerHeight="7"
                refX="9"
                refY="3.5"
                orient="auto"
                markerUnits="strokeWidth"
              >
                <path d="M0,0 L0,7 L9,3.5 z" fill={color} />
              </marker>
            ))}
            <marker
              id="arrowhead-temp"
              markerWidth="10"
              markerHeight="10"
              refX="9"
              refY="3"
              orient="auto"
              markerUnits="strokeWidth"
            >
              <path d="M0,0 L0,6 L9,3 z" fill="#6366f1" />
            </marker>
          </defs>
          
          {/* Canvas boundary */}
          <rect
            x={CANVAS_BOUNDS.minX}
            y={CANVAS_BOUNDS.minY}
            width={CANVAS_BOUNDS.maxX - CANVAS_BOUNDS.minX}
            height={CANVAS_BOUNDS.maxY - CANVAS_BOUNDS.minY}
            fill="none"
            stroke="#cbd5e1"
            strokeWidth={2}
            strokeDasharray="10,5"
            opacity={0.5}
          />
          
          {/* Grid lines */}
          {generateGridLines()}
          
          {/* Connections */}
          {renderedConnections}
          {tempConnection}
        </svg>

        {/* Canvas boundary background */}
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
            borderRadius: '8px'
          }}
        />

        {/* Components Layer */}
        <div
          className="absolute"
          style={{
            transform: `translate(${viewState.offsetX}px, ${viewState.offsetY}px) scale(${viewState.scale})`,
            transformOrigin: '0 0',
            zIndex: 2,
            left: 0,
            top: 0,
            width: CANVAS_BOUNDS.maxX,
            height: CANVAS_BOUNDS.maxY
          }}
        >
          {components.map(component => (
            <div
              key={component.id}
              data-component-id={component.id}
              className="absolute border-2 border-slate-300 rounded-lg shadow-lg bg-white hover:shadow-xl hover:border-indigo-400 transition-all duration-200 select-none"
              style={{
                left: component.position.x,
                top: component.position.y,
                width: COMPONENT_WIDTH,
                height: COMPONENT_HEIGHT,
                backgroundColor: component.color || '#ffffff',
                cursor: dragState.type === 'component' && dragState.componentId === component.id ? 'grabbing' : 'grab'
              }}
            >
              {/* Component content */}
              <div className="p-3 h-full flex flex-col justify-center">
                <div
                  className="font-semibold text-sm text-slate-800 truncate text-center"
                  title={component.label}
                  onDoubleClick={() => onComponentEdit?.(component.id, component.label)}
                >
                  {component.label}
                </div>
                <div className="text-xs text-slate-500 truncate text-center mt-1" title={component.type}>
                  {component.type}
                </div>
              </div>

              {/* Connection points */}
              {['top', 'right', 'bottom', 'left'].map(side => {
                const positions = {
                  top: { top: -CONNECTION_POINT_SIZE/2, left: '50%', transform: 'translateX(-50%)' },
                  right: { top: '50%', right: -CONNECTION_POINT_SIZE/2, transform: 'translateY(-50%)' },
                  bottom: { bottom: -CONNECTION_POINT_SIZE/2, left: '50%', transform: 'translateX(-50%)' },
                  left: { top: '50%', left: -CONNECTION_POINT_SIZE/2, transform: 'translateY(-50%)' }
                }
                
                return (
                  <div
                    key={side}
                    className="absolute w-2 h-2 bg-blue-500 rounded-full opacity-0 hover:opacity-100 transition-opacity cursor-crosshair z-10"
                    style={{
                      ...positions[side as keyof typeof positions],
                      width: CONNECTION_POINT_SIZE,
                      height: CONNECTION_POINT_SIZE
                    }}
                    onMouseDown={(e) => handleConnectionStart(e, component.id)}
                    title={`Connect from ${side}`}
                  />
                )
              })}

              {/* Remove button */}
              <button
                className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center text-xs hover:bg-red-600 transition-colors shadow-md z-10"
                onClick={(e) => {
                  e.stopPropagation()
                  onComponentRemove(component.id)
                }}
                title="Remove component"
              >
                ×
              </button>

              {/* Connect button */}
              <button
                className="absolute -bottom-2 -right-2 w-5 h-5 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs hover:bg-blue-600 transition-colors shadow-md z-10"
                onMouseDown={(e) => handleConnectionStart(e, component.id)}
                title="Create connection"
              >
                +
              </button>
            </div>
          ))}

          {/* Empty state */}
          {components.length === 0 && (
            <div 
              className="absolute flex items-center justify-center"
              style={{
                left: CANVAS_BOUNDS.maxX / 2 - 150,
                top: CANVAS_BOUNDS.maxY / 2 - 100,
                width: 300,
                height: 200
              }}
            >
              <div className="text-center p-8 bg-white/90 backdrop-blur-sm rounded-xl shadow-lg border-2 border-dashed border-slate-300">
                <div className="text-4xl mb-4">🏗️</div>
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

export default Canvas