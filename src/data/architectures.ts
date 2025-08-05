import { Architecture } from '@/types'

export const architectures: Architecture[] = [
  {
    id: 'sequential-reasoning-chain',
    title: 'Sequential Reasoning Chain',
    description: 'Agents process information sequentially, each building on previous results',
    longDescription: 'A sophisticated multi-agent system where agents work in a sequential chain, each building upon the reasoning and outputs of previous agents. This architecture is particularly effective for complex problems that require multiple stages of analysis, reasoning, and decision-making.',
    author: {
      name: 'Dr. Sarah Chen',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      github: 'sarahchen-ai'
    },
    category: ['Sequential', 'Reasoning'],
    tags: ['chain-of-thought', 'reasoning', 'sequential', 'analysis'],
    diagram: {
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop',
      alt: 'Sequential Reasoning Chain - Connected nodes A→B→C→D in horizontal line'
    },
    implementation: {
      codeExample: `class SequentialChain {
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
      'Step-by-step analysis',
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
    githubUrl: 'https://github.com/example/sequential-chain',
    documentationUrl: 'https://docs.example.com/sequential-chain'
  },
  {
    id: 'hierarchical-command-structure',
    title: 'Hierarchical Command Structure',
    description: 'Central manager delegates tasks to specialized worker agents',
    longDescription: 'A hierarchical architecture where a manager agent coordinates multiple worker agents, each specializing in specific tasks. The manager agent handles task distribution, result aggregation, and overall workflow coordination while worker agents focus on their specialized domains.',
    author: {
      name: 'Alex Rodriguez',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      github: 'alex-rodriguez-ai'
    },
    category: ['Hierarchical', 'Management'],
    tags: ['hierarchy', 'management', 'delegation', 'coordination'],
    diagram: {
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop',
      alt: 'Hierarchical Command Structure - Tree diagram with manager at top, workers below'
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
      'Task delegation',
      'Resource allocation',
      'Command & control systems',
      'Project coordination'
    ],
    performance: {
      scalability: 9,
      complexity: 7,
      reliability: 8
    },
    createdAt: '2024-01-10',
    updatedAt: '2024-01-18',
    githubUrl: 'https://github.com/example/hierarchical-structure',
    documentationUrl: 'https://docs.example.com/hierarchical-structure'
  },
  {
    id: 'peer-to-peer-swarm-network',
    title: 'Peer-to-Peer Swarm Network',
    description: 'Agents communicate directly with each other, no central authority',
    longDescription: 'A decentralized swarm architecture where agents communicate directly with each other in a peer-to-peer network. Each agent operates independently while sharing information and coordinating through direct communication channels, enabling robust and scalable distributed processing.',
    author: {
      name: 'Maya Patel',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      github: 'maya-patel-ai'
    },
    category: ['Distributed', 'Swarm'],
    tags: ['p2p', 'decentralized', 'swarm', 'consensus'],
    diagram: {
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop',
      alt: 'Peer-to-Peer Swarm Network - Mesh network with interconnected circular nodes'
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
      'Distributed consensus',
      'Swarm intelligence',
      'Collective decision-making',
      'Blockchain networks'
    ],
    performance: {
      scalability: 10,
      complexity: 8,
      reliability: 7
    },
    createdAt: '2024-01-05',
    updatedAt: '2024-01-15',
    githubUrl: 'https://github.com/example/swarm-network',
    documentationUrl: 'https://docs.example.com/swarm-network'
  },
  {
    id: 'pipeline-assembly-line',
    title: 'Pipeline Assembly Line',
    description: 'Agents perform specialized tasks in sequence like assembly line',
    longDescription: 'A pipeline architecture where specialized agents are designed for specific domains or tasks. Each agent in the pipeline handles a particular aspect of the overall process, allowing for highly optimized and domain-specific processing workflows.',
    author: {
      name: 'David Kim',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      github: 'david-kim-ai'
    },
    category: ['Pipeline', 'Specialized'],
    tags: ['pipeline', 'assembly-line', 'specialized', 'workflow'],
    diagram: {
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop',
      alt: 'Pipeline Assembly Line - Horizontal conveyor belt with specialized stations'
    },
    implementation: {
      codeExample: `class Pipeline {
  constructor(stages) {
    this.stages = stages;
  }
  
  async process(input) {
    let data = input;
    for (const stage of this.stages) {
      data = await stage.process(data);
    }
    return data;
  }
}

class AssemblyStage {
  async process(data) {
    return await this.specializedTask(data);
  }
}`,
      language: 'python'
    },
    useCases: [
      'Data processing workflows',
      'Content creation pipelines',
      'Quality assurance processes',
      'Manufacturing automation'
    ],
    performance: {
      scalability: 7,
      complexity: 5,
      reliability: 9
    },
    createdAt: '2024-01-12',
    updatedAt: '2024-01-22',
    githubUrl: 'https://github.com/example/pipeline-assembly',
    documentationUrl: 'https://docs.example.com/pipeline-assembly'
  },
  {
    id: 'hub-and-spoke-coordinator',
    title: 'Hub-and-Spoke Coordinator',
    description: 'Central coordinator manages multiple specialized peripheral agents',
    longDescription: 'A hub-and-spoke architecture where a central coordinator manages multiple specialized peripheral agents. The hub acts as the central point of control and coordination, while the spokes represent specialized agents that handle specific tasks or domains.',
    author: {
      name: 'Emma Wilson',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
      github: 'emma-wilson-ai'
    },
    category: ['Centralized', 'Coordination'],
    tags: ['hub-spoke', 'centralized', 'coordination', 'management'],
    diagram: {
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop',
      alt: 'Hub-and-Spoke Coordinator - Central hub with spokes radiating to peripheral agents'
    },
    implementation: {
      codeExample: `class HubCoordinator {
  constructor(spokes) {
    this.spokes = spokes;
    this.taskQueue = [];
  }
  
  async coordinate(task) {
    const subtasks = this.decomposeTask(task);
    const results = {};
    
    for (const [spokeId, subtask] of subtasks) {
      results[spokeId] = await this.spokes[spokeId].process(subtask);
    }
    
    return this.aggregateResults(results);
  }
}`,
      language: 'javascript'
    },
    useCases: [
      'Centralized coordination',
      'Distributed execution',
      'Resource management',
      'Service orchestration'
    ],
    performance: {
      scalability: 8,
      complexity: 6,
      reliability: 8
    },
    createdAt: '2024-01-08',
    updatedAt: '2024-01-25',
    githubUrl: 'https://github.com/example/hub-spoke',
    documentationUrl: 'https://docs.example.com/hub-spoke'
  },
  {
    id: 'adaptive-dynamic-ensemble',
    title: 'Adaptive Dynamic Ensemble',
    description: 'Agent selection changes based on task requirements and context',
    longDescription: 'An adaptive ensemble architecture that dynamically selects and combines agents based on the specific requirements of each task. The system learns from performance metrics and adapts its agent selection strategy to optimize for different types of problems and performance criteria.',
    author: {
      name: 'James Lee',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
      github: 'james-lee-ai'
    },
    category: ['Adaptive', 'Ensemble'],
    tags: ['adaptive', 'ensemble', 'dynamic', 'context-aware'],
    diagram: {
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop',
      alt: 'Adaptive Dynamic Ensemble - Flexible circle with agents that can connect/disconnect'
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
      'Context-aware systems',
      'Flexible problem solving',
      'Adaptive workflows',
      'Dynamic load balancing'
    ],
    performance: {
      scalability: 8,
      complexity: 9,
      reliability: 8
    },
    createdAt: '2024-01-03',
    updatedAt: '2024-01-28',
    githubUrl: 'https://github.com/example/adaptive-ensemble',
    documentationUrl: 'https://docs.example.com/adaptive-ensemble'
  },
  {
    id: 'layered-multi-tier-architecture',
    title: 'Layered Multi-Tier Architecture',
    description: 'Multiple tiers of agents handling different abstraction levels',
    longDescription: 'A layered architecture with multiple tiers of agents, each handling different abstraction levels. Lower tiers handle detailed, specific tasks while higher tiers manage abstract, strategic decisions. This creates a hierarchical system of increasing abstraction.',
    author: {
      name: 'Lisa Zhang',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face',
      github: 'lisa-zhang-ai'
    },
    category: ['Layered', 'Multi-Tier'],
    tags: ['layered', 'multi-tier', 'abstraction', 'hierarchical'],
    diagram: {
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop',
      alt: 'Layered Multi-Tier Architecture - Stacked horizontal layers with agents at different levels'
    },
    implementation: {
      codeExample: `class MultiTierArchitecture {
  constructor(tiers) {
    this.tiers = tiers;
  }
  
  async process(input) {
    let data = input;
    
    // Process through each tier from bottom to top
    for (let i = 0; i < this.tiers.length; i++) {
      data = await this.tiers[i].process(data);
    }
    
    return data;
  }
}

class Tier {
  constructor(agents) {
    this.agents = agents;
  }
  
  async process(data) {
    const results = await Promise.all(
      this.agents.map(agent => agent.process(data))
    );
    return this.aggregate(results);
  }
}`,
      language: 'python'
    },
    useCases: [
      'Complex system architecture',
      'Hierarchical data processing',
      'Multi-level decision making',
      'Enterprise systems'
    ],
    performance: {
      scalability: 7,
      complexity: 8,
      reliability: 9
    },
    createdAt: '2024-01-20',
    updatedAt: '2024-01-30',
    githubUrl: 'https://github.com/example/multi-tier',
    documentationUrl: 'https://docs.example.com/multi-tier'
  },
  {
    id: 'competitive-market-model',
    title: 'Competitive Market Model',
    description: 'Agents compete for tasks based on capability and availability',
    longDescription: 'A competitive market architecture where agents compete for tasks based on their capabilities, availability, and performance history. This creates a dynamic marketplace where the most suitable agents are selected for each task through competitive bidding or selection processes.',
    author: {
      name: 'Michael Brown',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      github: 'michael-brown-ai'
    },
    category: ['Competitive', 'Market'],
    tags: ['competitive', 'market', 'bidding', 'optimization'],
    diagram: {
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop',
      alt: 'Competitive Market Model - Agents in marketplace with bidding/competition indicators'
    },
    implementation: {
      codeExample: `class MarketModel {
  constructor(agents) {
    this.agents = agents;
    this.taskQueue = [];
  }
  
  async bidForTask(task) {
    const bids = await Promise.all(
      this.agents.map(agent => agent.submitBid(task))
    );
    
    const winner = this.selectWinner(bids);
    return await winner.executeTask(task);
  }
  
  selectWinner(bids) {
    return bids.reduce((best, current) => 
      current.score > best.score ? current : best
    ).agent;
  }
}`,
      language: 'typescript'
    },
    useCases: [
      'Resource optimization',
      'Competitive task allocation',
      'Market dynamics simulation',
      'Load balancing'
    ],
    performance: {
      scalability: 9,
      complexity: 7,
      reliability: 8
    },
    createdAt: '2024-01-18',
    updatedAt: '2024-01-25',
    githubUrl: 'https://github.com/example/market-model',
    documentationUrl: 'https://docs.example.com/market-model'
  },
  {
    id: 'collaborative-circle',
    title: 'Collaborative Circle',
    description: 'All agents contribute equally to collaborative decision-making',
    longDescription: 'A collaborative circle architecture where all agents contribute equally to decision-making processes. This creates a democratic system where each agent has an equal voice and the final decision is reached through consensus or voting mechanisms.',
    author: {
      name: 'Sophie Martin',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      github: 'sophie-martin-ai'
    },
    category: ['Collaborative', 'Democratic'],
    tags: ['collaborative', 'democratic', 'consensus', 'equal-participation'],
    diagram: {
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop',
      alt: 'Collaborative Circle - Agents arranged in circle with bidirectional connections'
    },
    implementation: {
      codeExample: `class CollaborativeCircle {
  constructor(agents) {
    this.agents = agents;
  }
  
  async makeDecision(input) {
    const opinions = await Promise.all(
      this.agents.map(agent => agent.expressOpinion(input))
    );
    
    return this.reachConsensus(opinions);
  }
  
  reachConsensus(opinions) {
    // Implement consensus mechanism (voting, averaging, etc.)
    const votes = opinions.map(op => op.vote);
    return this.countVotes(votes);
  }
}`,
      language: 'python'
    },
    useCases: [
      'Democratic consensus',
      'Collaborative creation',
      'Equal participation systems',
      'Group decision making'
    ],
    performance: {
      scalability: 6,
      complexity: 5,
      reliability: 9
    },
    createdAt: '2024-01-22',
    updatedAt: '2024-01-28',
    githubUrl: 'https://github.com/example/collaborative-circle',
    documentationUrl: 'https://docs.example.com/collaborative-circle'
  },
  {
    id: 'feedback-loop-network',
    title: 'Feedback Loop Network',
    description: 'Agents continuously learn and adapt based on feedback from others',
    longDescription: 'A feedback loop network where agents continuously learn and adapt based on feedback from other agents in the system. This creates a dynamic learning environment where agents improve their performance through continuous interaction and feedback mechanisms.',
    author: {
      name: 'Robert Taylor',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      github: 'robert-taylor-ai'
    },
    category: ['Learning', 'Adaptive'],
    tags: ['feedback-loop', 'learning', 'adaptive', 'continuous-improvement'],
    diagram: {
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop',
      alt: 'Feedback Loop Network - Circular flow with feedback arrows between connected agents'
    },
    implementation: {
      codeExample: `class FeedbackLoopNetwork {
  constructor(agents) {
    this.agents = agents;
    this.feedbackHistory = new Map();
  }
  
  async processWithFeedback(input) {
    const results = await Promise.all(
      this.agents.map(agent => agent.process(input))
    );
    
    // Generate feedback for each agent
    const feedback = await this.generateFeedback(results);
    
    // Apply feedback to improve agents
    await Promise.all(
      this.agents.map((agent, i) => agent.learn(feedback[i]))
    );
    
    return this.aggregateResults(results);
  }
  
  async generateFeedback(results) {
    return results.map(result => ({
      performance: this.evaluatePerformance(result),
      suggestions: this.generateSuggestions(result)
    }));
  }
}`,
      language: 'javascript'
    },
    useCases: [
      'Continuous improvement',
      'Adaptive learning systems',
      'Iterative refinement',
      'Performance optimization'
    ],
    performance: {
      scalability: 7,
      complexity: 8,
      reliability: 8
    },
    createdAt: '2024-01-25',
    updatedAt: '2024-01-30',
    githubUrl: 'https://github.com/example/feedback-loop',
    documentationUrl: 'https://docs.example.com/feedback-loop'
  },
  {
    id: 'supervisor-agent-architecture',
    title: 'Supervisor-Agent Architecture',
    description: 'In a Supervisor-Agent architecture, one agent acts as the central "supervisor" or "orchestrator." This supervisor agent is responsible for receiving a task, breaking it down into smaller sub-tasks, and delegating those sub-tasks to specialized "worker" agents. The supervisor then monitors the progress of the worker agents and synthesizes their outputs to produce the final result. This architecture is easy to start with and is effective for workflows that can be clearly broken down into distinct steps.',
    longDescription: 'The Supervisor-Agent architecture features a central supervisor agent that orchestrates specialized worker agents. The supervisor receives tasks, decomposes them into manageable sub-tasks, and delegates them to appropriate worker agents based on their specializations. As worker agents complete their assignments, the supervisor monitors progress and collects results, ultimately synthesizing outputs to generate the final solution. This architecture is particularly effective for complex workflows that can be clearly partitioned into distinct, specialized steps, making it an excellent starting point for multi-agent systems.',
    author: {
      name: 'Dr. Michael Roberts',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      github: 'michael-roberts-ai'
    },
    category: ['Hierarchical', 'Orchestration'],
    tags: ['supervisor', 'orchestrator', 'delegation', 'task-management', 'workflow'],
    diagram: {
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop',
      alt: 'Supervisor-Agent Architecture - Central supervisor with connections to specialized worker agents'
    },
    implementation: {
      codeExample: `class SupervisorAgent {
  constructor(workers) {
    this.workers = workers;
    this.taskQueue = [];
  }
  
  async processTask(task) {
    // Decompose task into subtasks
    const subtasks = this.decomposeTask(task);
    
    // Delegate subtasks to appropriate workers
    const promises = subtasks.map(subtask => {
      const worker = this.selectWorker(subtask.type);
      return worker.process(subtask);
    });
    
    // Collect and synthesize results
    const results = await Promise.all(promises);
    return this.synthesizeResults(results);
  }
  
  selectWorker(taskType) {
    // Logic to select appropriate worker based on task type
    return this.workers.find(worker => worker.specialties.includes(taskType));
  }
}`,
      language: 'javascript'
    },
    useCases: [
      'Content Creation: A supervisor agent can manage a team of agents including a "researcher" to gather information, a "writer" to draft the content, and an "editor" to proofread and format it.',
      'Customer Support: A supervisor agent can route a customer query to the appropriate specialized agent, such as a "billing inquiries" agent or a "technical support" agent.',
      'Data Analysis: A supervisor can oversee a "data gathering" agent, a "data cleaning" agent, and a "data visualization" agent to generate a report.'
    ],
    performance: {
      scalability: 7,
      complexity: 6,
      reliability: 8
    },
    createdAt: '2024-02-01',
    updatedAt: '2024-02-01',
    githubUrl: 'https://github.com/example/supervisor-agent',
    documentationUrl: 'https://docs.example.com/supervisor-agent',
    visual: {
      name: "Supervisor-Agent Architecture",
      type: "supervisor-agent",
      components: [
        {
          id: "api-gateway",
          type: "input",
          position: {
            x: 301,
            y: 24
          },
          label: "User Request",
          color: "#53d5fd"
        },
        {
          id: "user-service",
          type: "agent",
          position: {
            x: 297,
            y: 154
          },
          label: "Supervisor Agent",
          color: "#e392fe"
        },
        {
          id: "component-1754402084967-sde0h8o5v",
          type: "agent",
          position: {
            x: 21,
            y: 300
          },
          label: "Researcher Agent",
          color: "#ffe4a8"
        },
        {
          id: "component-1754402094901-1kj9kyi2m",
          type: "agent",
          position: {
            x: 427,
            y: 354
          },
          label: "Editor Agent",
          color: "#ffe4a8"
        },
        {
          id: "component-1754402097646-awfvubwit",
          type: "agent",
          position: {
            x: 209,
            y: 356
          },
          label: "Writer Agent",
          color: "#ffe4a8"
        },
        {
          id: "component-1754402315721-iwxuq8hsk",
          type: "output",
          position: {
            x: 582,
            y: 167
          },
          label: "Final Output",
          color: "#94e3fe"
        }
      ],
      connections: [
        {
          id: "conn-1",
          from: "api-gateway",
          to: "user-service",
          type: "http",
          name: "files"
        },
        {
          id: "conn-1754402129993-lle7bh1eh",
          name: "Order",
          from: "user-service",
          to: "component-1754402084967-sde0h8o5v",
          type: "custom",
          fromCorner: "auto",
          toCorner: "auto"
        },
        {
          id: "conn-1754402132303-ahyardjh2",
          name: "Order",
          from: "user-service",
          to: "component-1754402097646-awfvubwit",
          type: "custom",
          fromCorner: "auto",
          toCorner: "auto"
        },
        {
          id: "conn-1754402134812-kqvvukodz",
          name: "Order",
          from: "user-service",
          to: "component-1754402094901-1kj9kyi2m",
          type: "custom",
          fromCorner: "auto",
          toCorner: "auto"
        },
        {
          id: "conn-1754402179140-mvgsqmpah",
          name: "Response",
          from: "component-1754402084967-sde0h8o5v",
          to: "user-service",
          type: "custom",
          fromCorner: "auto",
          toCorner: "auto"
        },
        {
          id: "conn-1754402212514-hzd1li4kb",
          name: "Response",
          from: "component-1754402097646-awfvubwit",
          to: "user-service",
          type: "custom",
          fromCorner: "auto",
          toCorner: "auto"
        },
        {
          id: "conn-1754402223852-arjqdqk05",
          name: "Response",
          from: "component-1754402094901-1kj9kyi2m",
          to: "user-service",
          type: "custom",
          fromCorner: "auto",
          toCorner: "auto"
        },
        {
          id: "conn-1754402323973-h48l5hubg",
          name: "files",
          from: "user-service",
          to: "component-1754402315721-iwxuq8hsk",
          type: "custom",
          fromCorner: "auto",
          toCorner: "auto"
        }
      ]
    }
  }
]