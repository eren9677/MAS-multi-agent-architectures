import React, { useState, useRef, useCallback } from 'react'
import { MIN_SCALE, MAX_SCALE } from '@/utils/canvas'

interface ViewState {
  scale: number
  offsetX: number
  offsetY: number
}

export function useCanvasViewport() {
  const canvasRef = useRef<HTMLDivElement>(null)
  const [viewState, setViewState] = useState<ViewState>({
    scale: 1,
    offsetX: 0,
    offsetY: 0,
  })

  const screenToCanvas = useCallback((screenX: number, screenY: number) => {
    if (!canvasRef.current) return { x: 0, y: 0 }
    const rect = canvasRef.current.getBoundingClientRect()
    return {
      x: (screenX - rect.left - viewState.offsetX) / viewState.scale,
      y: (screenY - rect.top - viewState.offsetY) / viewState.scale,
    }
  }, [viewState])

  const canvasToScreen = useCallback((canvasX: number, canvasY: number) => {
    return {
      x: canvasX * viewState.scale + viewState.offsetX,
      y: canvasY * viewState.scale + viewState.offsetY,
    }
  }, [viewState])

  const zoomAt = useCallback((clientX: number, clientY: number, delta: number) => {
    const rect = canvasRef.current?.getBoundingClientRect()
    if (!rect) return

    const newScale = Math.max(MIN_SCALE, Math.min(MAX_SCALE, viewState.scale + delta))

    const mouseX = clientX - rect.left
    const mouseY = clientY - rect.top
    const scaleRatio = newScale / viewState.scale

    setViewState({
      scale: newScale,
      offsetX: mouseX - (mouseX - viewState.offsetX) * scaleRatio,
      offsetY: mouseY - (mouseY - viewState.offsetY) * scaleRatio,
    })
  }, [viewState])

  const zoomIn = useCallback(() => {
    setViewState(prev => ({ ...prev, scale: Math.min(prev.scale + 0.2, MAX_SCALE) }))
  }, [])

  const zoomOut = useCallback(() => {
    setViewState(prev => ({ ...prev, scale: Math.max(prev.scale - 0.2, MIN_SCALE) }))
  }, [])

  const resetView = useCallback(() => {
    setViewState({ scale: 1, offsetX: 0, offsetY: 0 })
  }, [])

  const pan = useCallback((deltaX: number, deltaY: number) => {
    setViewState(prev => ({
      ...prev,
      offsetX: prev.offsetX + deltaX,
      offsetY: prev.offsetY + deltaY,
    }))
  }, [])

  const handleWheelZoom = useCallback((e: React.WheelEvent) => {
    if (!e.ctrlKey && !e.metaKey) return
    e.preventDefault()
    e.stopPropagation()
    const delta = e.deltaY > 0 ? -0.15 : 0.15
    zoomAt(e.clientX, e.clientY, delta)
  }, [zoomAt])

  return {
    canvasRef,
    viewState,
    setViewState,
    screenToCanvas,
    canvasToScreen,
    zoomAt,
    zoomIn,
    zoomOut,
    resetView,
    pan,
    handleWheelZoom,
  }
}
