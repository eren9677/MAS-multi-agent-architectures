import { Architecture } from '@/types'

export const architectures: Architecture[] = [
  {
    id: 'multi-agent-reasoning-chain',
    title: 'Multi-Agent Reasoning Chain',
    description: 'Sequential agent collaboration for complex problem solving',
    longDescription: 'A sophisticated multi-agent system where agents work in a sequential chain, each building upon the reasoning and outputs of previous agents. This architecture is particularly effective for complex problems that require multiple stages of analysis, reasoning, and decision-making.',
    author: {
      name: 'Dr. Sarah Chen',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      github: 'sarahchen-ai'
    },
    category: ['Reasoning', 'Sequential'],
    tags: ['chain-of-thought', 'reasoning', 'sequential', 'collaboration'],
    diagram: {
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop',
      alt: 'Multi-Agent Reasoning Chain Diagram'
    },
    implementation: {
      codeExample: `class ReasoningChain {
  constructor(agents) {
    this.agents = agents;
    this.context = {};
  }
  
  async process(input) {
    let result = input;
    for (const agent of this.agents) {
      result = await agent.reason(result, this.context);
      this.context[agent.name] = result;
    }
    return result;
  }
}`,
      language: 'javascript'
    },
    useCases: [
      'Complex problem decomposition',
      'Multi-step reasoning tasks',
      'Scientific research workflows',
      'Financial analysis pipelines'
    ],
    performance: {
      scalability: 8,
      complexity: 6,
      reliability: 9
    },
    createdAt: '2024-01-15',
    updatedAt: '2024-01-20',
    githubUrl: 'https://github.com/example/reasoning-chain',
    documentationUrl: 'https://docs.example.com/reasoning-chain'
  },
  {
    id: 'hierarchical-agent-network',
    title: 'Hierarchical Agent Network',
    description: 'Manager-worker agent structure with centralized coordination',
    longDescription: 'A hierarchical architecture where a manager agent coordinates multiple worker agents, each specializing in specific tasks. The manager agent handles task distribution, result aggregation, and overall workflow coordination while worker agents focus on their specialized domains.',
    author: {
      name: 'Alex Rodriguez',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      github: 'alex-rodriguez-ai'
    },
    category: ['Hierarchical', 'Management'],
    tags: ['hierarchy', 'management', 'coordination', 'specialization'],
    diagram: {
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop',
      alt: 'Hierarchical Agent Network Diagram'
    },
    implementation: {
      codeExample: `class ManagerAgent {
  constructor(workers) {
    this.workers = workers;
    this.taskQueue = [];
  }
  
  async coordinate(task) {
    const subtasks = this.decomposeTask(task);
    const promises = subtasks.map(subtask => 
      this.assignToWorker(subtask)
    );
    const results = await Promise.all(promises);
    return this.aggregateResults(results);
  }
}`,
      language: 'python'
    },
    useCases: [
      'Enterprise workflow management',
      'Resource allocation systems',
      'Project coordination platforms',
      'Service orchestration'
    ],
    performance: {
      scalability: 9,
      complexity: 7,
      reliability: 8
    },
    createdAt: '2024-01-10',
    updatedAt: '2024-01-18',
    githubUrl: 'https://github.com/example/hierarchical-network',
    documentationUrl: 'https://docs.example.com/hierarchical-network'
  },
  {
    id: 'distributed-agent-swarm',
    title: 'Distributed Agent Swarm',
    description: 'Peer-to-peer agent communication for decentralized processing',
    longDescription: 'A decentralized swarm architecture where agents communicate directly with each other in a peer-to-peer network. Each agent operates independently while sharing information and coordinating through direct communication channels, enabling robust and scalable distributed processing.',
    author: {
      name: 'Maya Patel',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      github: 'maya-patel-ai'
    },
    category: ['Distributed', 'Swarm'],
    tags: ['p2p', 'decentralized', 'swarm', 'distributed'],
    diagram: {
      image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=600&h=400&fit=crop',
      alt: 'Distributed Agent Swarm Diagram'
    },
    implementation: {
      codeExample: `class SwarmAgent {
  constructor(peers) {
    this.peers = peers;
    this.knowledge = new Map();
  }
  
  async broadcast(message) {
    const promises = this.peers.map(peer =>
      peer.receiveMessage(message)
    );
    await Promise.all(promises);
  }
  
  async processLocally(data) {
    const result = await this.compute(data);
    await this.broadcast({ type: 'result', data: result });
    return result;
  }
}`,
      language: 'typescript'
    },
    useCases: [
      'Distributed computing networks',
      'IoT device coordination',
      'Blockchain consensus mechanisms',
      'Edge computing systems'
    ],
    performance: {
      scalability: 10,
      complexity: 8,
      reliability: 7
    },
    createdAt: '2024-01-05',
    updatedAt: '2024-01-15',
    githubUrl: 'https://github.com/example/agent-swarm',
    documentationUrl: 'https://docs.example.com/agent-swarm'
  },
  {
    id: 'specialized-agent-pipeline',
    title: 'Specialized Agent Pipeline',
    description: 'Domain-specific agent workflows for targeted processing',
    longDescription: 'A pipeline architecture where specialized agents are designed for specific domains or tasks. Each agent in the pipeline handles a particular aspect of the overall process, allowing for highly optimized and domain-specific processing workflows.',
    author: {
      name: 'David Kim',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      github: 'david-kim-ai'
    },
    category: ['Specialized', 'Pipeline'],
    tags: ['specialization', 'pipeline', 'domain-specific', 'optimization'],
    diagram: {
      image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=600&h=400&fit=crop',
      alt: 'Specialized Agent Pipeline Diagram'
    },
    implementation: {
      codeExample: `class SpecializedPipeline {
  constructor(specialists) {
    this.specialists = specialists;
  }
  
  async process(input) {
    let data = input;
    for (const specialist of this.specialists) {
      data = await specialist.process(data);
    }
    return data;
  }
}

class TextAnalysisSpecialist {
  async process(text) {
    return await this.analyzeSentiment(text);
  }
}`,
      language: 'python'
    },
    useCases: [
      'Natural language processing pipelines',
      'Computer vision workflows',
      'Data preprocessing systems',
      'Quality assurance processes'
    ],
    performance: {
      scalability: 7,
      complexity: 5,
      reliability: 9
    },
    createdAt: '2024-01-12',
    updatedAt: '2024-01-22',
    githubUrl: 'https://github.com/example/specialized-pipeline',
    documentationUrl: 'https://docs.example.com/specialized-pipeline'
  },
  {
    id: 'adaptive-agent-ensemble',
    title: 'Adaptive Agent Ensemble',
    description: 'Dynamic agent selection system for optimal performance',
    longDescription: 'An adaptive ensemble architecture that dynamically selects and combines agents based on the specific requirements of each task. The system learns from performance metrics and adapts its agent selection strategy to optimize for different types of problems and performance criteria.',
    author: {
      name: 'Emma Wilson',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
      github: 'emma-wilson-ai'
    },
    category: ['Adaptive', 'Ensemble'],
    tags: ['adaptive', 'ensemble', 'dynamic', 'optimization'],
    diagram: {
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop',
      alt: 'Adaptive Agent Ensemble Diagram'
    },
    implementation: {
      codeExample: `class AdaptiveEnsemble {
  constructor(agents) {
    this.agents = agents;
    this.performanceHistory = new Map();
  }
  
  async selectAgents(task) {
    const scores = await Promise.all(
      this.agents.map(agent => this.evaluateAgent(agent, task))
    );
    return this.agents.filter((_, i) => scores[i] > threshold);
  }
  
  async process(task) {
    const selectedAgents = await this.selectAgents(task);
    const results = await Promise.all(
      selectedAgents.map(agent => agent.process(task))
    );
    return this.combineResults(results);
  }
}`,
      language: 'javascript'
    },
    useCases: [
      'Dynamic load balancing',
      'Adaptive learning systems',
      'Performance optimization',
      'Resource management'
    ],
    performance: {
      scalability: 8,
      complexity: 9,
      reliability: 8
    },
    createdAt: '2024-01-08',
    updatedAt: '2024-01-25',
    githubUrl: 'https://github.com/example/adaptive-ensemble',
    documentationUrl: 'https://docs.example.com/adaptive-ensemble'
  }
] 