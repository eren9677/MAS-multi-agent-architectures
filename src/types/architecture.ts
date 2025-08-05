export interface Component {
  id: string
  type: string
  position: { x: number; y: number }
  label: string
  color?: string
}

export interface Connection {
  id: string
  name: string
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
    console.error("Validation Error: Architecture missing name or type.");
    return false
  }
  
  // Check if all components have required fields
  const componentIds = new Set<string>();
  for (const component of architecture.components) {
    if (!component.id || !component.type || !component.label ||
        typeof component.position.x !== 'number' || typeof component.position.y !== 'number') {
      console.error("Validation Error: Component missing required fields.", component);
      return false
    }
    if (componentIds.has(component.id)) {
      console.error("Validation Error: Duplicate component ID found.", component.id);
      return false;
    }
    componentIds.add(component.id);
  }
  
  // Check if all connections have required fields and valid component references
  const connectionIds = new Set<string>();
  for (const connection of architecture.connections) {
    if (!connection.id || !connection.name || !connection.from || !connection.to || !connection.type) {
      console.error("Validation Error: Connection missing required fields.", connection);
      return false
    }

    if (connectionIds.has(connection.id)) {
      console.error("Validation Error: Duplicate connection ID found.", connection.id);
      return false;
    }
    connectionIds.add(connection.id);
    
    // Check if connection references valid components
    if (!componentIds.has(connection.from) || !componentIds.has(connection.to)) {
      console.error("Validation Error: Connection references non-existent component.", connection);
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
  name: string,
  fromCorner: string = 'auto',
  toCorner: string = 'auto'
): Connection {
  return {
    id: `conn-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    name,
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