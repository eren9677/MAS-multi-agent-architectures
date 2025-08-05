import React, { useMemo } from 'react'

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

interface PreviewCanvasProps {
  components: Component[]
  connections: Connection[]
  width?: number
  height?: number
  className?: string
}

// Constants for preview (smaller than main canvas)
const PREVIEW_COMPONENT_WIDTH = 60
const PREVIEW_COMPONENT_HEIGHT = 30
const PREVIEW_CANVAS_WIDTH = 400
const PREVIEW_CANVAS_HEIGHT = 200
const CONNECTION_COLORS = ['#4f46e5', '#db2777', '#059669', '#d97706', '#6d28d9']

// Utility functions
const getComponentCenter = (component: Component, scale: number) => ({
  x: component.position.x * scale + (PREVIEW_COMPONENT_WIDTH / 2),
  y: component.position.y * scale + (PREVIEW_COMPONENT_HEIGHT / 2)
})

const getConnectionPoint = (component: Component, side: 'top' | 'right' | 'bottom' | 'left', scale: number) => {
  const scaledX = component.position.x * scale
  const scaledY = component.position.y * scale
  
  const points = {
    top: { x: scaledX + PREVIEW_COMPONENT_WIDTH / 2, y: scaledY },
    right: { x: scaledX + PREVIEW_COMPONENT_WIDTH, y: scaledY + PREVIEW_COMPONENT_HEIGHT / 2 },
    bottom: { x: scaledX + PREVIEW_COMPONENT_WIDTH / 2, y: scaledY + PREVIEW_COMPONENT_HEIGHT },
    left: { x: scaledX, y: scaledY + PREVIEW_COMPONENT_HEIGHT / 2 }
  }
  return points[side]
}

const getBestConnectionSides = (fromComponent: Component, toComponent: Component) => {
  if (fromComponent.id === toComponent.id) {
    return { fromSide: 'top', toSide: 'top' }
  }

  const fromCenter = { x: fromComponent.position.x + PREVIEW_COMPONENT_WIDTH / 2, y: fromComponent.position.y + PREVIEW_COMPONENT_HEIGHT / 2 }
  const toCenter = { x: toComponent.position.x + PREVIEW_COMPONENT_WIDTH / 2, y: toComponent.position.y + PREVIEW_COMPONENT_HEIGHT / 2 }
  
  const dx = toCenter.x - fromCenter.x
  const dy = toCenter.y - fromCenter.y
  
  if (Math.abs(dx) > Math.abs(dy)) {
    return {
      fromSide: dx > 0 ? 'right' : 'left',
      toSide: dx > 0 ? 'left' : 'right'
    }
  } else {
    return {
      fromSide: dy > 0 ? 'bottom' : 'top',
      toSide: dy > 0 ? 'top' : 'bottom'
    }
  }
}

const generateSimplePath = (fromPoint: {x: number, y: number}, toPoint: {x: number, y: number}, isSelfConnection = false) => {
  if (isSelfConnection) {
    const loopSize = 15
    const controlX1 = fromPoint.x + loopSize
    const controlY1 = fromPoint.y - loopSize
    const controlX2 = fromPoint.x + loopSize
    const controlY2 = fromPoint.y + loopSize
    
    return `M ${fromPoint.x} ${fromPoint.y}
            C ${controlX1} ${controlY1}
              ${controlX2} ${controlY2}
              ${fromPoint.x} ${fromPoint.y}`
  }

  const dx = toPoint.x - fromPoint.x
  const dy = toPoint.y - fromPoint.y
  const distance = Math.sqrt(dx * dx + dy * dy)
  
  const controlOffset = Math.min(distance * 0.3, 20)
  
  let cp1x, cp1y, cp2x, cp2y
  
  if (Math.abs(dx) > Math.abs(dy)) {
    cp1x = fromPoint.x + (dx > 0 ? controlOffset : -controlOffset)
    cp1y = fromPoint.y
    cp2x = toPoint.x + (dx > 0 ? -controlOffset : controlOffset)
    cp2y = toPoint.y
  } else {
    cp1x = fromPoint.x
    cp1y = fromPoint.y + (dy > 0 ? controlOffset : -controlOffset)
    cp2x = toPoint.x
    cp2y = toPoint.y + (dy > 0 ? -controlOffset : controlOffset)
  }
  
  return `M ${fromPoint.x} ${fromPoint.y} C ${cp1x} ${cp1y} ${cp2x} ${cp2y} ${toPoint.x} ${toPoint.y}`
}

export const PreviewCanvas: React.FC<PreviewCanvasProps> = ({
  components,
  connections,
  width = PREVIEW_CANVAS_WIDTH,
  height = PREVIEW_CANVAS_HEIGHT,
  className = ''
}) => {
  // Calculate scale to fit all components
  const { scale, offsetX, offsetY } = useMemo(() => {
    if (components.length === 0) {
      return { scale: 1, offsetX: 0, offsetY: 0 }
    }

    // Find bounds of all components
    let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity
    
    components.forEach(comp => {
      minX = Math.min(minX, comp.position.x)
      minY = Math.min(minY, comp.position.y)
      maxX = Math.max(maxX, comp.position.x + PREVIEW_COMPONENT_WIDTH + 25) // Add spacing
      maxY = Math.max(maxY, comp.position.y + PREVIEW_COMPONENT_HEIGHT + 25) // Add spacing
    })

    const contentWidth = maxX - minX
    const contentHeight = maxY - minY
    
    // Add padding
    const padding = 25
    const availableWidth = width - padding * 2
    const availableHeight = height - padding * 2
    
    // Calculate scale to fit content
    const scaleX = contentWidth > 0 ? availableWidth / contentWidth : 1
    const scaleY = contentHeight > 0 ? availableHeight / contentHeight : 1
    
    // Adjust max scale based on number of components and aspect ratio to prevent crowding
    const componentCountFactor = components.length > 15 ? 0.2 : components.length > 10 ? 0.3 : components.length > 5 ? 0.4 : 0.5
    const aspectRatio = contentWidth / contentHeight
    const aspectFactor = aspectRatio > 3 ? 0.6 : aspectRatio > 2 ? 0.7 : aspectRatio > 1.5 ? 0.8 : 1 // Reduce scale for wide architectures
    const maxScale = componentCountFactor * aspectFactor
    const scale = Math.min(scaleX, scaleY, maxScale)
    
    // Calculate offset to center content
    const scaledWidth = contentWidth * scale
    const scaledHeight = contentHeight * scale
    const offsetX = (width - scaledWidth) / 2 - minX * scale
    const offsetY = (height - scaledHeight) / 2 - minY * scale
    
    return { scale, offsetX, offsetY }
  }, [components, width, height])

  // Render connections
  const renderedConnections = useMemo(() => {
    return connections.map((conn, index) => {
      const fromComponent = components.find(c => c.id === conn.from)
      const toComponent = components.find(c => c.id === conn.to)

      if (!fromComponent || !toComponent) return null

      const isSelfConnection = fromComponent.id === toComponent.id
      const { fromSide, toSide } = getBestConnectionSides(fromComponent, toComponent)

      const fromPoint = getConnectionPoint(fromComponent, fromSide as any, scale)
      const toPoint = isSelfConnection ? fromPoint : getConnectionPoint(toComponent, toSide as any, scale)

      // Apply offset
      fromPoint.x += offsetX
      fromPoint.y += offsetY
      toPoint.x += offsetX
      toPoint.y += offsetY

      const pathData = generateSimplePath(fromPoint, toPoint, isSelfConnection)
      const color = CONNECTION_COLORS[index % CONNECTION_COLORS.length]

      return (
        <g key={conn.id}>
          <path
            d={pathData}
            stroke={color}
            strokeWidth={1.5}
            fill="none"
            markerEnd={`url(#preview-arrowhead-${index % CONNECTION_COLORS.length})`}
          />
        </g>
      )
    })
  }, [components, connections, scale, offsetX, offsetY])

  // Simplify connections when zoomed out
  const simplifiedConnections = useMemo(() => {
    if (scale >= 0.25) return renderedConnections;
    
    // When zoomed out significantly, render simplified straight lines
    return connections.map((conn, index) => {
      const fromComponent = components.find(c => c.id === conn.from);
      const toComponent = components.find(c => c.id === conn.to);

      if (!fromComponent || !toComponent) return null;

      const isSelfConnection = fromComponent.id === toComponent.id;
      if (isSelfConnection) return null; // Don't render self-connections when zoomed out

      const fromPoint = getComponentCenter(fromComponent, scale);
      const toPoint = getComponentCenter(toComponent, scale);

      // Apply offset
      fromPoint.x += offsetX;
      fromPoint.y += offsetY;
      toPoint.x += offsetX;
      toPoint.y += offsetY;

      const color = CONNECTION_COLORS[index % CONNECTION_COLORS.length];

      return (
        <g key={conn.id}>
          <line
            x1={fromPoint.x}
            y1={fromPoint.y}
            x2={toPoint.x}
            y2={toPoint.y}
            stroke={color}
            strokeWidth={scale < 0.15 ? 0.5 : 1}
            markerEnd={`url(#preview-arrowhead-${index % CONNECTION_COLORS.length})`}
          />
        </g>
      );
    });
  }, [components, connections, scale, offsetX, offsetY, renderedConnections]);

  return (
    <div className={`relative bg-gradient-to-br from-slate-50 to-slate-100 border-2 border-blue-300 rounded-lg overflow-hidden ${className}`} style={{ minHeight: height, minWidth: width }}>
      <svg
        width={width}
        height={height}
        className="absolute inset-0"
        style={{ zIndex: 1 }}
      >
        <defs>
          {CONNECTION_COLORS.map((color, index) => (
            <marker
              key={index}
              id={`preview-arrowhead-${index}`}
              markerWidth="8"
              markerHeight="6"
              refX="7"
              refY="3"
              orient="auto"
              markerUnits="strokeWidth"
            >
              <path d="M0,0 L0,6 L8,3 z" fill={color} />
            </marker>
          ))}
          {/* Grid pattern */}
          <pattern id="preview-grid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#e2e8f0" strokeWidth="0.5" opacity="0.3"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#preview-grid)" />
        
        {/* Connections */}
        {scale >= 0.2 ? renderedConnections : simplifiedConnections}
      </svg>

      {/* Components */}
      <div className="absolute inset-0" style={{ zIndex: 2 }}>
        {components.map(component => (
          <div
            key={component.id}
            className={`absolute border border-slate-300 rounded-md shadow-sm bg-white text-xs ${scale < 0.25 ? 'flex items-center justify-center' : ''}`}
            style={{
              left: component.position.x * scale + offsetX,
              top: component.position.y * scale + offsetY,
              width: PREVIEW_COMPONENT_WIDTH,
              height: PREVIEW_COMPONENT_HEIGHT,
              backgroundColor: component.color || '#ffffff',
            }}
          >
            {scale >= 0.25 ? (
              <div className="px-1 py-1 h-full flex flex-col justify-center items-center overflow-hidden">
                <div className="font-medium text-slate-800 text-center text-xs leading-tight mb-0.5 w-full px-1">
                  <div className="truncate">{component.label}</div>
                </div>
                <div className="text-xs text-slate-500 text-center w-full px-1">
                  <div className="truncate">{component.type}</div>
                </div>
              </div>
            ) : (
              // Simplified view when zoomed out significantly
              <div className="w-full h-full flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-slate-700"></div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Simplified view indicator */}
      {scale < 0.25 && (
        <div className="absolute top-2 right-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded z-10">
          Simplified view
        </div>
      )}

      {/* Empty state */}
      {components.length === 0 && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-slate-500">
            <div className="text-2xl mb-2">📐</div>
            <div className="text-sm">No components</div>
          </div>
        </div>
      )}
    </div>
  )
}