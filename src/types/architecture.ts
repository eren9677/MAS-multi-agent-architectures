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

// Helper function to validate architecture data integrity
export function validateArchitecture(architecture: VisualArchitecture): boolean {
  // Check if architecture has required fields
  if (!architecture.name || !architecture.type) {
    return false
  }
  
  // Check if all components have required fields
  for (const component of architecture.components) {
    if (!component.id || !component.type || !component.label ||
        typeof component.position.x !== 'number' || typeof component.position.y !== 'number') {
      return false
    }
  }
  
  // Check if all connections have required fields and valid component references
  const componentIds = new Set(architecture.components.map(c => c.id))
  for (const connection of architecture.connections) {
    if (!connection.from || !connection.to || !connection.type) {
      return false
    }
    
    // Check if connection references valid components
    if (!componentIds.has(connection.from) || !componentIds.has(connection.to)) {
      return false
    }
  }
  
  return true
}

// Helper function to create a connection with proper validation
export function createConnection(
  from: string,
  to: string,
  type: string = 'custom',
  fromCorner: string = 'auto',
  toCorner: string = 'auto'
): Connection {
  return {
    from,
    to,
    type,
    fromCorner,
    toCorner
  }
}

// Helper function to create a component with proper validation
export function createComponent(
  type: string,
  position: { x: number; y: number },
  label: string,
  color?: string,
  id?: string
): Component {
  return {
    id: id || `component-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    type,
    position,
    label,
    color
  }
}