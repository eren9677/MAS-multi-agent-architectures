import React from 'react'
import { Component } from '@/types/architecture'

export const COMPONENT_WIDTH = 120
export const COMPONENT_HEIGHT = 60
export const CONNECTION_POINT_SIZE = 8
export const MIN_SCALE = 0.25
export const MAX_SCALE = 3
export const CONNECTION_COLORS = ['#4f46e5', '#db2777', '#059669', '#d97706', '#6d28d9']
export const GRID_SIZE = 50

export const CANVAS_BOUNDS = {
  minX: 0,
  minY: 0,
  maxX: 3000,
  maxY: 1500,
}

export type ConnectionSide = 'top' | 'right' | 'bottom' | 'left'

export const getComponentCenter = (component: Component) => ({
  x: component.position.x + COMPONENT_WIDTH / 2,
  y: component.position.y + COMPONENT_HEIGHT / 2,
})

export const getConnectionPoint = (component: Component, side: ConnectionSide) => {
  const points: Record<ConnectionSide, { x: number; y: number }> = {
    top: { x: component.position.x + COMPONENT_WIDTH / 2, y: component.position.y },
    right: { x: component.position.x + COMPONENT_WIDTH, y: component.position.y + COMPONENT_HEIGHT / 2 },
    bottom: { x: component.position.x + COMPONENT_WIDTH / 2, y: component.position.y + COMPONENT_HEIGHT },
    left: { x: component.position.x, y: component.position.y + COMPONENT_HEIGHT / 2 },
  }
  return points[side]
}

export const constrainPosition = (position: { x: number; y: number }) => ({
  x: Math.max(CANVAS_BOUNDS.minX, Math.min(CANVAS_BOUNDS.maxX - COMPONENT_WIDTH, position.x)),
  y: Math.max(CANVAS_BOUNDS.minY, Math.min(CANVAS_BOUNDS.maxY - COMPONENT_HEIGHT, position.y)),
})

export const getBestConnectionSides = (
  fromComponent: Component,
  toComponent: Component,
  index = 0,
  fromCorner?: string,
  toCorner?: string
) => {
  if (fromComponent.id === toComponent.id) {
    if (fromCorner && fromCorner !== 'auto') {
      return { fromSide: fromCorner as ConnectionSide, toSide: fromCorner as ConnectionSide }
    }
    return { fromSide: 'top' as ConnectionSide, toSide: 'top' as ConnectionSide }
  }

  const fromCenter = getComponentCenter(fromComponent)
  const toCenter = getComponentCenter(toComponent)

  const dx = toCenter.x - fromCenter.x
  const dy = toCenter.y - fromCenter.y

  if (Math.abs(dx) > Math.abs(dy)) {
    return {
      fromSide: (dx > 0 ? 'right' : 'left') as ConnectionSide,
      toSide: (dx > 0 ? 'left' : 'right') as ConnectionSide,
    }
  }
  return {
    fromSide: (dy > 0 ? 'bottom' : 'top') as ConnectionSide,
    toSide: (dy > 0 ? 'top' : 'bottom') as ConnectionSide,
  }
}

export const generateSmoothPath = (
  fromPoint: { x: number; y: number },
  toPoint: { x: number; y: number },
  isSelfConnection = false,
  index = 0,
  fromSide?: string,
  toSide?: string
) => {
  const offset = index * 40

  if (isSelfConnection) {
    const baseLoopSize = 80 + index * 30
    let cx1: number, cy1: number, cx2: number, cy2: number

    switch (fromSide) {
      case 'top':
        cx1 = fromPoint.x - baseLoopSize / 2
        cy1 = fromPoint.y - baseLoopSize
        cx2 = fromPoint.x + baseLoopSize / 2
        cy2 = fromPoint.y - baseLoopSize
        break
      case 'right':
        cx1 = fromPoint.x + baseLoopSize
        cy1 = fromPoint.y - baseLoopSize / 2
        cx2 = fromPoint.x + baseLoopSize
        cy2 = fromPoint.y + baseLoopSize / 2
        break
      case 'bottom':
        cx1 = fromPoint.x + baseLoopSize / 2
        cy1 = fromPoint.y + baseLoopSize
        cx2 = fromPoint.x - baseLoopSize / 2
        cy2 = fromPoint.y + baseLoopSize
        break
      case 'left':
        cx1 = fromPoint.x - baseLoopSize
        cy1 = fromPoint.y + baseLoopSize / 2
        cx2 = fromPoint.x - baseLoopSize
        cy2 = fromPoint.y - baseLoopSize / 2
        break
      default:
        cx1 = fromPoint.x + baseLoopSize
        cy1 = fromPoint.y - baseLoopSize / 2
        cx2 = fromPoint.x + baseLoopSize
        cy2 = fromPoint.y + baseLoopSize / 2
    }

    return `M ${fromPoint.x} ${fromPoint.y} C ${cx1} ${cy1} ${cx2} ${cy2} ${fromPoint.x} ${fromPoint.y}`
  }

  const dx = toPoint.x - fromPoint.x
  const dy = toPoint.y - fromPoint.y
  const distance = Math.sqrt(dx * dx + dy * dy)
  const controlOffset = Math.min(distance * 0.3, 80)

  let cp1x: number, cp1y: number, cp2x: number, cp2y: number

  if (Math.abs(dx) > Math.abs(dy)) {
    cp1x = fromPoint.x + (dx > 0 ? controlOffset : -controlOffset)
    cp1y = fromPoint.y + offset
    cp2x = toPoint.x + (dx > 0 ? -controlOffset : controlOffset)
    cp2y = toPoint.y + offset
  } else {
    cp1x = fromPoint.x + offset
    cp1y = fromPoint.y + (dy > 0 ? controlOffset : -controlOffset)
    cp2x = toPoint.x + offset
    cp2y = toPoint.y + (dy > 0 ? -controlOffset : controlOffset)
  }

  return `M ${fromPoint.x} ${fromPoint.y} C ${cp1x} ${cp1y} ${cp2x} ${cp2y} ${toPoint.x} ${toPoint.y}`
}

export const computeConnectionLabelPosition = (
  fromPoint: { x: number; y: number },
  toPoint: { x: number; y: number },
  isSelfConnection: boolean,
  index: number,
  fromSide?: string
) => {
  const offset = index * 40

  if (isSelfConnection) {
    const baseLoopSize = 80 + index * 30
    switch (fromSide) {
      case 'top':
        return { x: fromPoint.x, y: fromPoint.y - baseLoopSize / 2 }
      case 'right':
        return { x: fromPoint.x + baseLoopSize / 2, y: fromPoint.y }
      case 'bottom':
        return { x: fromPoint.x, y: fromPoint.y + baseLoopSize / 2 }
      case 'left':
        return { x: fromPoint.x - baseLoopSize / 2, y: fromPoint.y }
      default:
        return { x: fromPoint.x, y: fromPoint.y - baseLoopSize / 2 }
    }
  }

  const dx = toPoint.x - fromPoint.x
  const dy = toPoint.y - fromPoint.y

  if (Math.abs(dx) > Math.abs(dy)) {
    return {
      x: (fromPoint.x + toPoint.x) / 2,
      y: (fromPoint.y + toPoint.y) / 2 + offset - 8,
    }
  }
  return {
    x: (fromPoint.x + toPoint.x) / 2 + offset,
    y: (fromPoint.y + toPoint.y) / 2 + index * 15 - 8,
  }
}

export const generateGridLines = () => {
  const lines: React.ReactElement[] = []
  for (let x = CANVAS_BOUNDS.minX; x <= CANVAS_BOUNDS.maxX; x += GRID_SIZE) {
    const isMajor = x % (GRID_SIZE * 4) === 0
    lines.push(
      <line
        key={`v-${x}`}
        x1={x} y1={CANVAS_BOUNDS.minY}
        x2={x} y2={CANVAS_BOUNDS.maxY}
        stroke="#e2e8f0"
        strokeWidth={isMajor ? 1 : 0.5}
        opacity={isMajor ? 0.3 : 0.15}
      />
    )
  }
  for (let y = CANVAS_BOUNDS.minY; y <= CANVAS_BOUNDS.maxY; y += GRID_SIZE) {
    const isMajor = y % (GRID_SIZE * 4) === 0
    lines.push(
      <line
        key={`h-${y}`}
        x1={CANVAS_BOUNDS.minX} y1={y}
        x2={CANVAS_BOUNDS.maxX} y2={y}
        stroke="#e2e8f0"
        strokeWidth={isMajor ? 1 : 0.5}
        opacity={isMajor ? 0.3 : 0.15}
      />
    )
  }
  return lines
}
