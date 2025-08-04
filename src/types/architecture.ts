export interface Component {
  id: string
  type: string
  position: { x: number; y: number }
  label: string
  color?: string
}

export interface Connection {
  from: string
  to: string
  type: string
  fromCorner?: string
  toCorner?: string
}

export interface VisualArchitecture {
  name: string
  type: string
  components: Component[]
  connections: Connection[]
}