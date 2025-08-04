export interface Component {
  id: string
  type: string
  position: { x: number; y: number }
  label: string
}

export interface Connection {
  from: string
  to: string
  type: string
}

export interface VisualArchitecture {
  name: string
  type: string
  components: Component[]
  connections: Connection[]
}