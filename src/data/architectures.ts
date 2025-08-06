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
    createdAt: '2024-02-01',
    updatedAt: '2024-02-01',
    githubUrl: 'https://github.com/example/supervisor-agent',
    documentationUrl: 'https://langchain-ai.github.io/langgraph/tutorials/multi_agent/agent_supervisor/',
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
  },
  {
    id: 'basic-sequential',
    title: 'Basic Sequential',
    description: 'Agents operate in a linear pipeline; each agent’s output is the next agent’s input.',
    longDescription: 'In a sequential architecture, agents work in a pipeline where the output of one agent becomes the input for the next in the sequence. This creates a linear workflow, with each agent performing a specific transformation on the data it receives. This architecture is ideal for processes with clearly defined, ordered stages.',
    author: {
      name: 'Community',
      avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&h=150&fit=crop&crop=face',
      github: 'madebyagents-community'
    },
    category: ['Sequential', 'Pipeline'],
    tags: ['sequential', 'pipeline', 'linear', 'staged-processing'],
    diagram: {
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop',
      alt: 'Basic Sequential - Linear pipeline A → B → C'
    },
    implementation: {
      codeExample: `class BasicSequential {
  constructor(stages) {
    this.stages = stages;
  }

  async run(input) {
    let data = input;
    for (const stage of this.stages) {
      data = await stage.process(data);
    }
    return data;
  }
}

/* Example stages
class FetchData { async process(_) { return await fetchData(); } }
class CleanData { async process(d) { return clean(d); } }
class EnrichData { async process(d) { return enrich(d); } }
class ReportGen { async process(d) { return generateReport(d); } }
*/`,
      language: 'javascript'
    },
    useCases: [
      'Data Processing Pipeline: retrieve raw data → clean/format → enrich → generate report',
      'Email Campaign: draft → personalize → schedule and send',
      'Document Translation and Summarization: translate → summarize'
    ],
    performance: {
      scalability: 7,
      complexity: 3,
      reliability: 9
    },
    createdAt: '2025-08-06',
    updatedAt: '2025-08-06',
    githubUrl: 'https://github.com/example/basic-sequential',
    documentationUrl: 'https://www.madebyagents.com/blog/multi-agent-architectures',
    visual: {
      name: "My Architecture",
      type: "microservices",
      components: [
        {
          id: "api-gateway",
          type: "input",
          position: {
            x: 132.33333333333334,
            y: 206
          },
          label: "User Input",
          color: "#53d5fd"
        },
        {
          id: "user-service",
          type: "agent",
          position: {
            x: 412.66666666666663,
            y: 208
          },
          label: "Agent 1",
          color: "#fffbb9"
        },
        {
          id: "database",
          type: "agent",
          position: {
            x: 663.3333333333333,
            y: 208
          },
          label: "Agent 2",
          color: "#fffbb9"
        }
      ],
      connections: [
        {
          id: "conn-1",
          from: "api-gateway",
          to: "user-service",
          type: "http",
          name: "Request"
        },
        {
          id: "conn-2",
          from: "user-service",
          to: "database",
          type: "query",
          name: "files"
        }
      ]
    }
  },
  {
    id: 'network-decentralized',
    title: 'Network (Decentralized) Architecture',
    description: 'Agents communicate directly without a central coordinator for flexible, dynamic collaboration.',
    longDescription: 'In a network or decentralized architecture, agents communicate directly with each other without a central coordinator. This enables flexible and dynamic collaboration, as any agent can interact with any other agent in the network. It is well-suited for complex problems where workflows are not predictable and require dynamic information sharing.',
    author: {
      name: 'Community',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      github: 'madebyagents-community'
    },
    category: ['Distributed', 'Decentralized'],
    tags: ['p2p', 'decentralized', 'network', 'collaboration'],
    diagram: {
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop',
      alt: 'Network/Decentralized - Mesh-like peer-to-peer agent connections'
    },
    implementation: {
      codeExample: `class P2PNetwork {
  constructor(agents) {
    this.agents = agents;
  }

  async broadcast(senderId, message) {
    const others = this.agents.filter(a => a.id !== senderId);
    await Promise.all(others.map(a => a.receive(message)));
  }

  async send(fromId, toId, message) {
    const target = this.agents.find(a => a.id === toId);
    if (target) await target.receive({ from: fromId, ...message });
  }
}`,
      language: 'javascript'
    },
    useCases: [
      'Supply Chain Management: suppliers ↔ manufacturers ↔ distributors ↔ retailers coordinate directly',
      'Smart Home Systems: thermostats ↔ lights ↔ cameras interact for automation',
      'Collaborative Design: UI, backend, and database agents share updates directly'
    ],
    performance: {
      scalability: 9,
      complexity: 7,
      reliability: 7
    },
    createdAt: '2025-08-06',
    updatedAt: '2025-08-06',
    githubUrl: 'https://github.com/example/network-decentralized',
    documentationUrl: 'https://www.madebyagents.com/blog/multi-agent-architectures',
    visual: {
      name: "My Architecture",
      type: "microservices",
      components: [
        {
          id: "api-gateway",
          type: "agent",
          position: { x: 573.9999999999999, y: 101.16666666666669 },
          label: "Agent 1",
          color: "#ffe4a8"
        },
        {
          id: "user-service",
          type: "agent",
          position: { x: 567.9999999999999, y: 385.3333333333333 },
          label: "Agent 3",
          color: "#ffe4a8"
        },
        {
          id: "component-1754477351230-pojquwej0",
          type: "agent",
          position: { x: 242.99999999999994, y: 383.16666666666663 },
          label: "Agent 4",
          color: "#ffe4a8"
        },
        {
          id: "component-1754477352919-cbv8kme0s",
          type: "agent",
          position: { x: 231.25, y: 100.58333333333334 },
          label: "Agent 2",
          color: "#ffe4a8"
        }
      ],
      connections: [
        { id: "conn-1", from: "api-gateway", to: "user-service", type: "http", name: "" },
        { id: "conn-1754477435796-8f55bmvzx", name: "", from: "api-gateway", to: "component-1754477352919-cbv8kme0s", type: "custom", fromCorner: "auto", toCorner: "auto" },
        { id: "conn-1754477441239-lpobqfg2q", name: "", from: "api-gateway", to: "component-1754477351230-pojquwej0", type: "custom", fromCorner: "auto", toCorner: "auto" },
        { id: "conn-1754477471096-32o5nyg1g", name: "", from: "component-1754477352919-cbv8kme0s", to: "component-1754477351230-pojquwej0", type: "custom", fromCorner: "auto", toCorner: "auto" },
        { id: "conn-1754477473708-o96ajmat6", name: "", from: "component-1754477352919-cbv8kme0s", to: "api-gateway", type: "custom", fromCorner: "auto", toCorner: "auto" },
        { id: "conn-1754477481023-3hxz8hgb7", name: "", from: "component-1754477352919-cbv8kme0s", to: "user-service", type: "custom", fromCorner: "auto", toCorner: "auto" },
        { id: "conn-1754477492126-fd48xisih", name: "", from: "component-1754477351230-pojquwej0", to: "component-1754477352919-cbv8kme0s", type: "custom", fromCorner: "auto", toCorner: "auto" },
        { id: "conn-1754477496023-t53i61gx2", name: "", from: "component-1754477351230-pojquwej0", to: "api-gateway", type: "custom", fromCorner: "auto", toCorner: "auto" },
        { id: "conn-1754477498767-r7v7wz3mi", name: "", from: "component-1754477351230-pojquwej0", to: "user-service", type: "custom", fromCorner: "auto", toCorner: "auto" },
        { id: "conn-1754477504656-slq8mofc2", name: "", from: "user-service", to: "api-gateway", type: "custom", fromCorner: "auto", toCorner: "auto" },
        { id: "conn-1754477508893-3dqwky3wq", name: "", from: "user-service", to: "component-1754477352919-cbv8kme0s", type: "custom", fromCorner: "auto", toCorner: "auto" },
        { id: "conn-1754477514817-d9pxutvhw", name: "", from: "user-service", to: "component-1754477351230-pojquwej0", type: "custom", fromCorner: "auto", toCorner: "auto" }
      ]
    }
  },
  {
    id: 'market-based-bidding',
    title: 'Market-Based (Bidding) Architecture',
    description: 'Auctioneer broadcasts tasks; contractor agents bid; best bid wins based on predefined criteria.',
    longDescription: 'In a market-based architecture, tasks are not assigned directly. A Client or Auctioneer agent broadcasts a task to a network of Contractor agents, which then bid on the task with capability, confidence, or cost. The Auctioneer selects the best bid based on criteria such as lowest cost, highest confidence, or fastest completion time, and awards the task to the winning agent.',
    author: {
      name: 'Community',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      github: 'madebyagents-community'
    },
    category: ['Competitive', 'Market'],
    tags: ['bidding', 'auction', 'market-based', 'allocation', 'contract-net'],
    diagram: {
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop',
      alt: 'Market-Based Bidding - Auctioneer broadcasting, contractors bidding, winner awarded'
    },
    implementation: {
      codeExample: `class Auctioneer {
  constructor(contractors, chooser = (bids) => bids.sort((a,b) => a.cost - b.cost)[0]) {
    this.contractors = contractors;
    this.chooseWinner = chooser;
  }
  async run(task) {
    await Promise.all(this.contractors.map(c => c.notifyTask(task)));
    const bids = (await Promise.all(this.contractors.map(c => c.submitBid(task)))).filter(Boolean);
    const winner = this.chooseWinner(bids);
    return await winner.agent.execute(task);
  }
}`,
      language: 'javascript'
    },
    useCases: [
      'Dynamic Resource Allocation: VMs bid to run a task based on current load/capabilities',
      'Decentralized Task Routing: travel planning sub-tasks bid by specialized agents',
      'E-commerce and Supply Chains: shippers bid for delivery with cheapest/fastest selection'
    ],
    performance: {
      scalability: 9,
      complexity: 6,
      reliability: 8
    },
    createdAt: '2025-08-06',
    updatedAt: '2025-08-06',
    githubUrl: 'https://github.com/example/market-based-bidding',
    documentationUrl: 'https://www.madebyagents.com/blog/multi-agent-architectures',
    visual: {
      name: "Market-Based (Bidding) Architecture",
      type: "bidding",
      components: [
        {
          id: "client-agent",
          type: "agent",
          position: { x: 68.5, y: 191.5 },
          label: "Client Agent",
          color: "#53d5fd"
        },
        {
          id: "auctioneer-agent",
          type: "agent",
          position: { x: 317.5, y: 318.25 },
          label: "Auctioneer Agent",
          color: "#fffbb9"
        },
        {
          id: "contractor-a",
          type: "agent",
          position: { x: 302, y: 48 },
          label: "Contractor A",
          color: "#fffbb9"
        },
        {
          id: "contractor-b",
          type: "agent",
          position: { x: 821, y: 186.5 },
          label: "Contractor B (Winner)",
          color: "#c4ffc4"
        },
        {
          id: "contractor-c",
          type: "agent",
          position: { x: 297, y: 493 },
          label: "Contractor C",
          color: "#fffbb9"
        }
      ],
      connections: [
        { id: "conn-1", from: "client-agent", to: "auctioneer-agent", type: "request", name: "Announce Task" },
        { id: "conn-2", from: "auctioneer-agent", to: "contractor-a", type: "broadcast", name: "Call for Bids" },
        { id: "conn-3", from: "auctioneer-agent", to: "contractor-b", type: "broadcast", name: "Call for Bids" },
        { id: "conn-4", from: "auctioneer-agent", to: "contractor-c", type: "broadcast", name: "Call for Bids" },
        { id: "conn-5", from: "contractor-a", to: "auctioneer-agent", type: "bid", name: "Submit Bid" },
        { id: "conn-6", from: "contractor-b", to: "auctioneer-agent", type: "bid", name: "Submit Bid" },
        { id: "conn-7", from: "contractor-c", to: "auctioneer-agent", type: "bid", name: "Submit Bid" },
        { id: "conn-8", from: "auctioneer-agent", to: "contractor-b", type: "award", name: "Award Task" },
        { id: "conn-9", from: "contractor-b", to: "client-agent", type: "result", name: "Task Result" }
      ]
    }
  },
  {
    id: 'hierarchical-architecture',
    title: 'Hierarchical Architecture',
    description: 'Multi-level supervision where top-level supervisors manage lower-level supervisors who manage worker agents.',
    longDescription: 'A hierarchical architecture is an extension of the supervisor model, featuring multiple levels of supervision. A top-level supervisor oversees lower-level supervisors, each managing their own team of worker agents. This structure enables handling complex tasks by decomposing them into smaller, manageable sub-problems that specialized teams can address.',
    author: {
      name: 'Community',
      avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=150&h=150&fit=crop&crop=face',
      github: 'madebyagents-community'
    },
    category: ['Hierarchical', 'Orchestration'],
    tags: ['hierarchical', 'supervisor', 'multi-level', 'orchestration'],
    diagram: {
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop',
      alt: 'Hierarchical Architecture - Top supervisor overseeing sub-supervisors, each with worker agents'
    },
    implementation: {
      codeExample: `class HierarchySupervisor {
  constructor(children) {
    this.children = children; // can be supervisors or workers
  }
  async process(task) {
    const subtasks = this.decompose(task);
    const results = [];
    for (let i = 0; i < this.children.length; i++) {
      results.push(await this.children[i].process(subtasks[i]));
    }
    return this.aggregate(results);
  }
}`,
      language: 'javascript'
    },
    useCases: [
      'Large-Scale Project Management: top manager → department leads → team agents',
      'Complex Research Tasks: primary research → sub-topic supervisors → specialized teams',
      'Running a Virtual Company: CEO → executives (CTO/CPO/...) → department teams'
    ],
    performance: {
      scalability: 8,
      complexity: 8,
      reliability: 9
    },
    createdAt: '2025-08-06',
    updatedAt: '2025-08-06',
    githubUrl: 'https://github.com/example/hierarchical-architecture',
    documentationUrl: 'https://www.madebyagents.com/blog/multi-agent-architectures',
    visual: {
      name: "My Architecture",
      type: "microservices",
      components: [
        {
          id: "component-1754478515905-x7kmhpjrr",
          type: "supervisor",
          position: { x: 473, y: 163 },
          label: "Agent Supervisor",
          color: "#e392fe"
        },
        {
          id: "component-1754478568308-mpewau0fu",
          type: "supervisor",
          position: { x: 606, y: 311 },
          label: "Sub-Supervisor 2",
          color: "#a8c6fe"
        },
        {
          id: "component-1754478569850-9bca171r7",
          type: "supervisor",
          position: { x: 348, y: 305 },
          label: "Sub-Supervisor 1",
          color: "#a8c6fe"
        },
        {
          id: "component-1754478632540-26d27ye8m",
          type: "agent",
          position: { x: 179, y: 485 },
          label: "Agent 1a",
          color: "#fffbb9"
        },
        {
          id: "component-1754478637259-uxvouazwt",
          type: "agent",
          position: { x: 784, y: 493 },
          label: "Agent 2b",
          color: "#fffbb9"
        },
        {
          id: "component-1754478639394-xiyyfzbuq",
          type: "agent",
          position: { x: 600, y: 490 },
          label: "Agent 2a",
          color: "#fffbb9"
        },
        {
          id: "component-1754478640661-cjcbkddb9",
          type: "agent",
          position: { x: 372, y: 488 },
          label: "Agent 1b",
          color: "#fffbb9"
        }
      ],
      connections: [
        {
          id: "conn-1754478587717-sknyz25m9",
          name: "Supervises",
          from: "component-1754478515905-x7kmhpjrr",
          to: "component-1754478569850-9bca171r7",
          type: "custom",
          fromCorner: "auto",
          toCorner: "auto"
        },
        {
          id: "conn-1754478601462-bxianbwjj",
          name: "Supervises",
          from: "component-1754478515905-x7kmhpjrr",
          to: "component-1754478568308-mpewau0fu",
          type: "custom",
          fromCorner: "auto",
          toCorner: "auto"
        },
        {
          id: "conn-1754478688837-wqqo3mwgx",
          name: "Delegates",
          from: "component-1754478569850-9bca171r7",
          to: "component-1754478640661-cjcbkddb9",
          type: "custom",
          fromCorner: "auto",
          toCorner: "auto"
        },
        {
          id: "conn-1754478727436-4h8i8ji4v",
          name: "Delegates",
          from: "component-1754478569850-9bca171r7",
          to: "component-1754478632540-26d27ye8m",
          type: "custom",
          fromCorner: "auto",
          toCorner: "auto"
        },
        {
          id: "conn-1754478737288-b3n25r73o",
          name: "Delegates",
          from: "component-1754478568308-mpewau0fu",
          to: "component-1754478639394-xiyyfzbuq",
          type: "custom",
          fromCorner: "auto",
          toCorner: "auto"
        },
        {
          id: "conn-1754478756704-mcdtbdj6o",
          name: "Delegates",
          from: "component-1754478568308-mpewau0fu",
          to: "component-1754478637259-uxvouazwt",
          type: "custom",
          fromCorner: "auto",
          toCorner: "auto"
        }
      ]
    }
  }
  ,
  {
    id: 'tool-augmented-agent-network',
    title: 'Tool-Augmented Agent Network',
    description: 'Agents are designed to interact with external tools (APIs, databases, code interpreters) to ground reasoning and perform real-world actions.',
    longDescription: 'In a Tool-Augmented architecture, agents are not limited to communicating with each other; they are explicitly designed to interact with a set of external, non-agentive "tools." These tools can be anything from code interpreters and calculators to databases and third-party APIs (e.g., Google Search, weather services). An orchestrating agent, or the agents themselves, can reason about which tool is required to accomplish a specific sub-task. This dramatically extends the agent system\'s capabilities beyond its inherent knowledge, allowing it to ground its reasoning in real-world data and perform complex actions. This is a foundational architecture for most modern, practical AI agent systems.',
    author: {
      name: 'Community',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      github: 'madebyagents-community'
    },
    category: ['Tool-Augmented', 'Orchestration'],
    tags: ['tools', 'apis', 'databases', 'react', 'toolformer', 'grounding'],
    diagram: {
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop',
      alt: 'Tool-Augmented Agent Network - Orchestrator agent invoking external tools and producing final result'
    },
    implementation: {
      codeExample: `class ToolAugmentedAgent {
  constructor(tools) {
    this.tools = tools; // e.g., { webSearch, codeInterpreter, database }
  }
  async decideAndAct(task) {
    // Simple ReAct-style loop (pseudo)
    const plan = await this.reason(task);
    for (const step of plan) {
      if (step.tool && this.tools[step.tool]) {
        step.result = await this.tools[step.tool].execute(step.input);
      } else {
        step.result = await this.internalReason(step.input);
      }
    }
    return this.summarize(plan);
  }
}`,
      language: 'javascript'
    },
    useCases: [
      'Advanced Research and Analysis: Use Web Search to find sources, Web Scraper to extract data, and Code Interpreter with pandas to analyze.',
      'Automated Software Development: Use File System to write code, Terminal to run tests, and Git to commit changes.',
      'Intelligent Personal Assistants: Use Calendar API to schedule, Maps API for directions, and Email API to send invites.'
    ],
    performance: {
      scalability: 8,
      complexity: 6,
      reliability: 9
    },
    createdAt: '2025-08-06',
    updatedAt: '2025-08-06',
    githubUrl: 'https://github.com/example/tool-augmented-agent-network',
    documentationUrl: 'https://www.madebyagents.com/blog/multi-agent-architectures',
    visual: {
      name: "Tool-Augmented Agent Network",
      type: "tool-augmented",
      components: [
        {
          id: "user-goal",
          type: "input",
          position: { "x": 50, "y": 250 },
          label: "User Goal",
          color: "#53d5fd"
        },
        {
          id: "orchestrator-agent",
          type: "agent",
          position: { "x": 250, "y": 250 },
          label: "Orchestrator Agent",
          color: "#fffbb9"
        },
        {
          id: "web-search-tool",
          type: "tool",
          position: { "x": 500, "y": 100 },
          label: "Web Search API",
          color: "#d1b3ff"
        },
        {
          id: "code-interpreter-tool",
          type: "tool",
          position: { "x": 500, "y": 250 },
          label: "Code Interpreter",
          color: "#d1b3ff"
        },
        {
          id: "database-tool",
          type: "tool",
          position: { "x": 500, "y": 400 },
          label: "Database",
          color: "#d1b3ff"
        },
        {
          id: "final-result",
          type: "output",
          position: { "x": 750, "y": 250 },
          label: "Final Result",
          color: "#96fdb2"
        }
      ],
      connections: [
        { id: "conn-1", from: "user-goal", to: "orchestrator-agent", type: "request", name: "Goal" },
        { id: "conn-2", from: "orchestrator-agent", to: "web-search-tool", type: "api-call", name: "Uses Tool" },
        { id: "conn-3", from: "orchestrator-agent", to: "code-interpreter-tool", type: "api-call", name: "Uses Tool" },
        { id: "conn-4", from: "orchestrator-agent", to: "database-tool", type: "api-call", name: "Uses Tool" },
        { id: "conn-5", from: "orchestrator-agent", to: "final-result", type: "result", name: "Output" }
      ]
    }
  },
  {
    id: 'critic-refinement-loop',
    title: 'Critic & Refinement Loop Architecture',
    description: 'Creator agent produces output; Critic reviews and provides feedback; loop continues until approval or iteration limit.',
    longDescription: 'This architecture introduces a "Critic" agent whose sole purpose is to review the output of a "Creator" agent and provide constructive feedback. The Creator agent then takes this feedback and refines its work in a loop until the output meets a certain quality standard, is approved by the Critic, or a maximum number of iterations is reached. This pattern is fundamental for improving the quality and accuracy of generated content or plans.',
    author: {
      name: 'Community',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      github: 'madebyagents-community'
    },
    category: ['Iterative', 'Quality'],
    tags: ['critic', 'refinement', 'feedback-loop', 'review'],
    diagram: {
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop',
      alt: 'Critic & Refinement Loop - Creator and Critic in a feedback loop until approval'
    },
    implementation: {
      codeExample: `class CriticRefinementLoop {
  constructor(creator, critic, maxIters = 3, accept = (r) => r?.approved === true) {
    this.creator = creator;
    this.critic = critic;
    this.maxIters = maxIters;
    this.accept = accept;
  }

  async run(task) {
    let draft = await this.creator.generate(task);
    for (let i = 0; i < this.maxIters; i++) {
      const review = await this.critic.review(draft, task);
      if (this.accept(review)) {
        return { output: draft, review, iterations: i + 1, approved: true };
      }
      draft = await this.creator.refine(draft, review, task);
    }
    const finalReview = await this.critic.review(draft, task);
    return { output: draft, review: finalReview, iterations: this.maxIters, approved: this.accept(finalReview) };
  }
}`,
      language: 'javascript'
    },
    useCases: [
      'Code Generation: A "Developer" agent writes code, and a "Code Reviewer" agent checks for bugs, style violations, and inefficiencies. The Developer agent then refixes the code based on the feedback.',
      'High-Quality Content Creation: A "Writer" agent drafts an article, and an "Editor" agent checks for factual accuracy, tone, and grammatical errors. The writer then revises the draft.',
      'Automated Scientific Discovery: A "Hypothesis" agent proposes a theory, and a "Validator" agent designs an experiment to test it, providing feedback that refines the hypothesis.'
    ],
    performance: {
      scalability: 7,
      complexity: 5,
      reliability: 9
    },
    createdAt: '2025-08-06',
    updatedAt: '2025-08-06',
    githubUrl: 'https://github.com/example/critic-refinement-loop',
    documentationUrl: 'https://www.madebyagents.com/blog/multi-agent-architectures',
    visual: {
      name: "Critic & Refinement Loop Architecture",
      type: "refinement-loop",
      components: [
        {
          id: "initial-task",
          type: "input",
          position: { x: 103, y: 152 },
          label: "Initial Task",
          color: "#53d5fd"
        },
        {
          id: "creator-agent",
          type: "agent",
          position: { x: 338, y: 152 },
          label: "Creator Agent",
          color: "#fffbb9"
        },
        {
          id: "critic-agent",
          type: "agent",
          position: { x: 320, y: 340 },
          label: "Critic Agent",
          color: "#fffbb9"
        },
        {
          id: "final-output",
          type: "output",
          position: { x: 600, y: 340 },
          label: "Final Output",
          color: "#96fdb2"
        }
      ],
      connections: [
        { id: "conn-1", from: "initial-task", to: "creator-agent", type: "request", name: "Generate" },
        { id: "conn-2", from: "creator-agent", to: "critic-agent", type: "dataflow", name: "Initial Draft" },
        { id: "conn-3", from: "critic-agent", to: "creator-agent", type: "feedback", name: "Feedback & Refinements" },
        { id: "conn-4", from: "critic-agent", to: "final-output", type: "approval", name: "Final Approval" }
      ]
    }
  }
 ,
 {
   id: 'human-in-the-loop',
   title: 'Human-in-the-Loop (HITL) Architecture',
   description: 'Autonomous agents collaborate with humans at critical checkpoints for approval, judgment, or handling sensitive actions.',
   longDescription: 'Human-in-the-Loop (HITL) is a design pattern that strategically combines human intelligence with AI automation. The multi-agent system operates autonomously but pauses and consults a human at critical junctures. Triggers for intervention include low confidence, subjective judgment, sensitive data handling, or final approval for irreversible actions. HITL leverages human common sense, ethics, and creativity together with machine speed and data processing to produce robust, safe, and trustworthy outcomes.',
   author: {
     name: 'Community',
     avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
     github: 'madebyagents-community'
   },
   category: ['Safety', 'Governance', 'Workflow'],
   tags: ['human-in-the-loop', 'approval', 'review', 'oversight', 'safety'],
   diagram: {
     image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop',
     alt: 'HITL - Autonomous agent requests human approval before final action'
   },
   implementation: {
     codeExample: `class HITLPipeline {
  constructor(agent, { approve, onReview, confidenceThreshold = 0.7 }) {
    this.agent = agent;
    this.approve = approve;         // async (context) => boolean
    this.onReview = onReview;       // async (draft, context) => { approved: boolean, notes?: string, edits?: any }
    this.confidenceThreshold = confidenceThreshold;
  }
  async run(task) {
    const draft = await this.agent.process(task);
    const needsReview = (draft.confidence ?? 0) < this.confidenceThreshold || draft.requiresApproval === true;
    if (!needsReview) {
      return { output: draft, approved: true, via: 'auto' };
    }
    const review = await this.onReview?.(draft, task) ?? { approved: false };
    if (!review.approved) {
      // allow human to request changes and agent to refine
      const refined = await this.agent.refine?.(draft, review, task) ?? draft;
      const finalApproval = await this.approve({ draft: refined, task, review });
      if (!finalApproval) return { output: refined, approved: false, via: 'rejected' };
      return { output: refined, approved: true, via: 'manual-approve' };
    }
    const finalApproval = await this.approve({ draft, task, review });
    return { output: draft, approved: !!finalApproval, via: 'manual-approve' };
  }
}`,
     language: 'javascript'
   },
   useCases: [
     'Medical Diagnosis: AI suggests diagnosis; clinician reviews and confirms before treatment.',
     'High-Stakes Financial Transactions: System proposes significant trade; human analyst must approve to execute.',
     'Content Moderation: Agents flag content; human moderator makes final decision to reduce false positives.'
   ],
   performance: {
     scalability: 7,
     complexity: 5,
     reliability: 10
   },
   createdAt: '2025-08-06',
   updatedAt: '2025-08-06',
   githubUrl: 'https://github.com/example/hitl-architecture',
   documentationUrl: 'https://www.ibm.com/think/topics/human-in-the-loop',
   visual: {
     name: "Human-in-the-Loop Architecture",
     type: "human-in-the-loop",
     components: [
       {
         id: "start-task",
         type: "input",
         position: { "x": 50, "y": 250 },
         label: "Start Task",
         color: "#53d5fd"
       },
       {
         id: "agent-1",
         type: "agent",
         position: { "x": 250, "y": 250 },
         label: "Automated Agent",
         color: "#fffbb9"
       },
       {
         id: "human-review",
         type: "human",
         position: { "x": 500, "y": 250 },
         label: "Human Review",
         color: "#ffb3ba"
       },
       {
         id: "final-action",
         type: "output",
         position: { "x": 750, "y": 250 },
         label: "Final Action",
         color: "#96fdb2"
       }
     ],
     connections: [
       { id: "conn-1", from: "start-task", to: "agent-1", type: "dataflow", name: "Process" },
       { id: "conn-2", from: "agent-1", to: "human-review", type: "request", name: "Needs Approval / Low Confidence" },
       { id: "conn-3", from: "human-review", to: "agent-1", type: "feedback", name: "Reject / Modify" },
       { id: "conn-4", from: "human-review", to: "final-action", type: "approval", name: "Approve & Execute" }
     ]
   }
 }
,
{
  id: 'foraging-architecture',
  title: 'Foraging Architecture',
  description: 'Decentralized swarm of forager agents explore broadly; discoveries attract others to exploit rich areas.',
  longDescription: 'The Foraging Architecture is a decentralized pattern inspired by the natural behavior of social insects like ants or bees. Multiple independent agents ("foragers") explore a large search space (e.g., the internet, a database, a file system) in parallel to find specific information or resources. When a forager agent finds a valuable resource, it communicates this discovery back to the swarm—often including the "scent" or location—attracting other agents to exploit it more thoroughly. This creates an efficient, self-organizing search-and-exploitation mechanism that excels at finding needles in a haystack.',
  author: {
    name: 'Community',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    github: 'madebyagents-community'
  },
  category: ['Distributed', 'Swarm'],
  tags: ['foraging', 'swarm-intelligence', 'ant-colony', 'explore-exploit', 'decentralized'],
  diagram: {
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop',
    alt: 'Foraging Architecture - Multiple forager agents exploring and converging on a rich resource'
  },
  implementation: {
    codeExample: `class ForagingSwarm {
 constructor(agents, pheromones = new Map(), evaporation = 0.05) {
   this.agents = agents;            // array of forager agents
   this.pheromones = pheromones;    // key: location/resourceId, value: intensity
   this.evaporation = evaporation;  // pheromone evaporation rate
 }

 stepEvaporation() {
   for (const [k, v] of this.pheromones.entries()) {
     const nv = v * (1 - this.evaporation);
     if (nv < 0.001) this.pheromones.delete(k);
     else this.pheromones.set(k, nv);
   }
 }

 pheromoneWeightedChoice(options) {
   // options: [{ id, scoreHint }]
   const weights = options.map(o => (this.pheromones.get(o.id) ?? 0.01) + (o.scoreHint ?? 0));
   const total = weights.reduce((a, b) => a + b, 0);
   const r = Math.random() * total;
   let acc = 0;
   for (let i = 0; i < options.length; i++) {
     acc += weights[i];
     if (r <= acc) return options[i];
   }
   return options[options.length - 1];
 }

 async runStep(searchSpace) {
   // Each agent explores; upon discovery, deposit pheromone to attract others
   const discoveries = await Promise.all(this.agents.map(a => a.explore(searchSpace)));
   for (const d of discoveries.filter(Boolean)) {
     const key = d.location ?? d.id ?? JSON.stringify(d);
     const boost = d.value ?? 1;
     this.pheromones.set(key, (this.pheromones.get(key) ?? 0) + boost);
   }
   this.stepEvaporation();
   return discoveries.filter(Boolean);
 }
}`,
    language: 'javascript'
  },
  useCases: [
    'Distributed Web Scraping: Many agents crawl; rich sources attract more crawlers.',
    'Cybersecurity Threat Hunting: Agents search for IOCs; detections attract focused analysis.',
    'Scientific Discovery: Agents scan massive datasets; significant anomalies get swarmed for validation.'
  ],
  performance: {
    scalability: 10,
    complexity: 6,
    reliability: 8
  },
  createdAt: '2025-08-06',
  updatedAt: '2025-08-06',
  githubUrl: 'https://github.com/example/foraging-architecture',
  documentationUrl: 'https://www.sciencedirect.com/book/9781558605954/swarm-intelligence',
  visual: {
    name: "Foraging Architecture",
    type: "foraging",
    components: [
      {
        id: "search-space",
        type: "input",
        position: { "x": 50, "y": 250 },
        label: "Large Search Space (e.g., Web)",
        color: "#53d5fd"
      },
      {
        id: "forager-1",
        type: "agent",
        position: { "x": 300, "y": 100 },
        label: "Forager Agent 1",
        color: "#fffbb9"
      },
      {
        id: "forager-2",
        type: "agent",
        position: { "x": 300, "y": 250 },
        label: "Forager Agent 2",
        color: "#fffbb9"
      },
      {
        id: "forager-3",
        type: "agent",
        position: { "x": 300, "y": 400 },
        label: "Forager Agent 3",
        color: "#fffbb9"
      },
      {
        id: "resource-found",
        type: "tool",
        position: { "x": 550, "y": 175 },
        label: "Valuable Resource Found",
        color: "#d1b3ff"
      },
      {
        id: "results-pool",
        type: "output",
        position: { "x": 800, "y": 250 },
        label: "Aggregated Results",
        color: "#96fdb2"
      }
    ],
    connections: [
      { id: "conn-1", from: "search-space", to: "forager-1", type: "search", name: "Explore" },
      { id: "conn-2", from: "search-space", to: "forager-2", type: "search", name: "Explore" },
      { id: "conn-3", from: "search-space", to: "forager-3", type: "search", name: "Explore" },
      { id: "conn-4", from: "forager-1", to: "resource-found", type: "discovery", name: "Finds Resource" },
      { id: "conn-5", from: "resource-found", to: "forager-2", type: "signal", name: "Signal Scent" },
      { id: "conn-6", from: "resource-found", to: "forager-3", type: "signal", name: "Signal Scent" },
      { id: "conn-7", from: "forager-1", to: "results-pool", type: "report", name: "Report Data" },
      { id: "conn-8", from: "forager-2", to: "results-pool", type: "report", name: "Report Data" },
      { id: "conn-9", from: "forager-3", to: "results-pool", type: "report", name: "Report Data" }
    ]
  }
},
{
  id: 'group-architecture',
  title: 'Group Architecture',
  description: 'Agents organized into teams with rich intra-group communication and structured inter-group coordination via liaisons.',
  longDescription: 'A Group Architecture (also called Team-based or Coalition) organizes agents into subgroups. Within a group, communication is fluid and context-rich (all-to-all or local broadcast). Between groups, communication is structured and less frequent, typically handled by designated liaison/leader agents. This enables specialization per group while reducing system-wide communication overhead and information overload.',
  author: {
    name: 'Community',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    github: 'madebyagents-community'
  },
  category: ['Collaborative', 'Structured'],
  tags: ['group', 'team', 'coalition', 'liaison', 'coordination'],
  diagram: {
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop',
    alt: 'Group Architecture - Teams with internal dense communication and inter-team liaison links'
  },
  implementation: {
    codeExample: `class GroupCoordinator {
  constructor(groups) {
    // groups: { name, lead, members: Agent[] }
    this.groups = groups;
  }
  async disseminate(task) {
    // Send task to each group's lead; leads coordinate internally
    return Promise.all(this.groups.map(async (g) => {
      const plan = await g.lead.plan(task, g.members);
      const results = await Promise.all(g.members.map(m => m.execute(plan[m.id] ?? task)));
      return { group: g.name, results };
    }));
  }
  async synchronize(leadsMessage) {
    // Structured inter-group sync via leads only
    await Promise.all(this.groups.map(g => g.lead.sync(leadsMessage)));
  }
}`,
    language: 'javascript'
  },
  useCases: [
    'Software Engineering (Virtual Company): Frontend, Backend, and QA teams collaborate internally; team leads integrate across teams.',
    'Complex Research Reports: Data Collection, Analysis, and Report Writing teams work in parallel; leaders synthesize the final report.',
    'Robotics Control: Mapping team and Retrieval team coordinate via liaisons for mission objectives.'
  ],
  performance: {
    scalability: 8,
    complexity: 6,
    reliability: 9
  },
  createdAt: '2025-08-06',
  updatedAt: '2025-08-06',
  githubUrl: 'https://github.com/example/group-architecture',
  documentationUrl: 'https://docs.swarms.world/en/latest/swarms/concept/swarm_architectures/#group-chat',
  visual: {
    name: "Group Architecture",
    type: "group",
    components: [
      {
        id: "main-task",
        type: "input",
        position: { "x": 450, "y": 50 },
        label: "Complex Problem",
        color: "#53d5fd"
      },
      {
        id: "frontend-agent-1",
        type: "agent",
        position: { "x": 100, "y": 200 },
        label: "Frontend Agent 1",
        color: "#add8e6"
      },
      {
        id: "frontend-agent-2",
        type: "agent",
        position: { "x": 100, "y": 300 },
        label: "Frontend Agent 2",
        color: "#add8e6"
      },
      {
        id: "backend-agent-1",
        type: "agent",
        position: { "x": 800, "y": 200 },
        label: "Backend Agent 1",
        color: "#f08080"
      },
      {
        id: "backend-agent-2",
        type: "agent",
        position: { "x": 800, "y": 300 },
        label: "Backend Agent 2",
        color: "#f08080"
      },
      {
        id: "liaison-frontend",
        type: "agent",
        position: { "x": 350, "y": 250 },
        label: "Frontend Lead",
        color: "#add8e6"
      },
      {
        id: "liaison-backend",
        type: "agent",
        position: { "x": 550, "y": 250 },
        label: "Backend Lead",
        color: "#f08080"
      }
    ],
    connections: [
      { id: "conn-1", from: "main-task", to: "liaison-frontend", type: "delegation", name: "Task" },
      { id: "conn-2", from: "main-task", to: "liaison-backend", type: "delegation", name: "Task" },
      { id: "conn-3", from: "liaison-frontend", to: "frontend-agent-1", type: "communication", name: "Group Chat" },
      { id: "conn-4", from: "liaison-frontend", to: "frontend-agent-2", type: "communication", name: "Group Chat" },
      { id: "conn-5", from: "frontend-agent-1", to: "frontend-agent-2", type: "communication", name: "Peer Talk" },
      { id: "conn-6", from: "liaison-backend", to: "backend-agent-1", type: "communication", name: "Group Chat" },
      { id: "conn-7", from: "liaison-backend", to: "backend-agent-2", type: "communication", name: "Group Chat" },
      { id: "conn-8", from: "backend-agent-1", to: "backend-agent-2", type: "communication", name: "Peer Talk" },
      { id: "conn-9", from: "liaison-frontend", to: "liaison-backend", type: "coordination", name: "API Sync" }
    ]
  }
},
{
  id: 'mixture-of-agents',
  title: 'Mixture of Agents',
  description: 'Heterogeneous agents with different specializations collaborate via an orchestrator to solve complex problems.',
  longDescription: 'A Mixture of Agents architecture is fundamentally about heterogeneity. It involves creating a system where agents with different specializations, capabilities, underlying models, or even programming languages are combined to solve a complex problem. Instead of relying on a team of identical agents, this model leverages the idea that diverse expertise leads to a more robust and powerful solution. The core challenge lies in creating a communication and coordination protocol that allows these disparate agents to work together effectively.',
  author: {
    name: 'Community',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    github: 'madebyagents-community'
  },
  category: ['Heterogeneous', 'Orchestration', 'Ensemble'],
  tags: ['mixture-of-agents', 'heterogeneous', 'specialization', 'coordination', 'orchestrator'],
  diagram: {
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop',
    alt: 'Mixture of Agents - Orchestrator coordinating heterogeneous specialist agents'
  },
  implementation: {
    codeExample: `class OrchestratedMixture {
  constructor(agents, router = (task, agents) => agents) {
    // agents: { id, name, specialties: string[], process: (task, ctx) => Promise<any> }[]
    this.agents = agents;
    this.router = router; // decides which subset of agents to consult per subtask
  }

  async solve(problem) {
    const context = { traces: [] };
    // Decompose problem into modality-specific subtasks (simplified)
    const subtasks = this.decompose(problem);

    const results = await Promise.all(subtasks.map(async (st) => {
      const chosen = await this.router(st, this.agents);
      const partials = await Promise.all(
        chosen.map(a => a.process(st, context).then(out => ({ agent: a.name, out })))
      );
      context.traces.push({ subtask: st, partials });
      return { subtask: st, partials };
    }));

    return this.synthesize(results, context);
  }

  decompose(problem) {
    // Example: break into text/image/data analysis based on fields present
    const tasks = [];
    if (problem.text) tasks.push({ type: 'nlp', input: problem.text });
    if (problem.image) tasks.push({ type: 'vision', input: problem.image });
    if (problem.data) tasks.push({ type: 'data', input: problem.data });
    if (tasks.length === 0) tasks.push({ type: 'generic', input: problem });
    return tasks;
  }

  synthesize(results, context) {
    // Simple synthesis: merge insights
    const insights = {};
    for (const r of results) {
      insights[r.subtask.type] = r.partials.map(p => ({ agent: p.agent, insight: p.out }));
    }
    return { insights, traces: context.traces };
  }
}`,
    language: 'javascript'
  },
  useCases: [
    'Financial Forecasting: Quantitative Analyst + News Analyst (NLP) + Risk Assessment combine signals.',
    'Complex Problem-Solving: Creative Brainstormer + Logical Validator + Planner iterate to a plan.',
    'Product Design: User Researcher analyzes feedback + UI/UX Designer proposes mockups + Technical Architect assesses feasibility.'
  ],
  performance: {
    scalability: 8,
    complexity: 7,
    reliability: 9
  },
  createdAt: '2025-08-06',
  updatedAt: '2025-08-06',
  githubUrl: 'https://github.com/example/mixture-of-agents',
  documentationUrl: 'https://huggingface.co/blog/moe',
  visual: {
    name: 'Mixture of Agents',
    type: 'heterogeneous',
    components: [
      {
        id: 'problem-input',
        type: 'input',
        position: { x: 50, y: 250 },
        label: 'Complex Problem',
        color: '#53d5fd'
      },
      {
        id: 'orchestrator',
        type: 'agent',
        position: { x: 300, y: 250 },
        label: 'Orchestrator',
        color: '#fffbb9'
      },
      {
        id: 'nlp-agent',
        type: 'agent',
        position: { x: 550, y: 100 },
        label: 'NLP Specialist Agent',
        color: '#c1ffc1'
      },
      {
        id: 'vision-agent',
        type: 'agent',
        position: { x: 550, y: 250 },
        label: 'Computer Vision Agent',
        color: '#add8e6'
      },
      {
        id: 'data-agent',
        type: 'agent',
        position: { x: 550, y: 400 },
        label: 'Data Analyst Agent',
        color: '#f08080'
      },
      {
        id: 'final-solution',
        type: 'output',
        position: { x: 800, y: 250 },
        label: 'Synthesized Solution',
        color: '#96fdb2'
      }
    ],
    connections: [
      { id: 'conn-1', from: 'problem-input', to: 'orchestrator', type: 'request', name: 'Solve' },
      { id: 'conn-2', from: 'orchestrator', to: 'nlp-agent', type: 'query', name: 'Analyze text' },
      { id: 'conn-3', from: 'orchestrator', to: 'vision-agent', type: 'query', name: 'Analyze image' },
      { id: 'conn-4', from: 'orchestrator', to: 'data-agent', type: 'query', name: 'Analyze data' },
      { id: 'conn-5', from: 'nlp-agent', to: 'orchestrator', type: 'response', name: 'Text insights' },
      { id: 'conn-6', from: 'vision-agent', to: 'orchestrator', type: 'response', name: 'Image insights' },
      { id: 'conn-7', from: 'data-agent', to: 'orchestrator', type: 'response', name: 'Data insights' },
      { id: 'conn-8', from: 'orchestrator', to: 'final-solution', type: 'result', name: 'Finalize' }
    ]
  }
}
,
{
  id: 'concurrent-workflows',
  title: 'Concurrent Workflows',
  description: 'Multiple agents work on the same task in parallel, coordinating while processing independently to reduce total time.',
  longDescription: 'The concurrent pattern enables multiple agents to work on the same task in parallel. Each agent processes the input independently, allowing for simultaneous execution of different aspects of a complex task. This architecture maximizes efficiency by leveraging parallelism, where agents coordinate their efforts while working concurrently to achieve a common goal, significantly reducing overall processing time.',
  author: {
    name: 'Community',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    github: 'madebyagents-community'
  },
  category: ['Concurrent', 'Parallel'],
  tags: ['parallelism', 'concurrency', 'coordinator', 'aggregation'],
  diagram: {
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop',
    alt: 'Concurrent Workflows - Coordinator dispatches to parallel agents, aggregator collects results'
  },
  implementation: {
    codeExample: `class ConcurrentWorkflow {
  constructor(agents, { aggregator } = {}) {
    this.agents = agents; // array of worker agents
    this.aggregator = aggregator || ((results) => results);
  }

  async run(task) {
    // Dispatch the same task to all agents concurrently
    const promises = this.agents.map(agent => agent.process(task));
    const results = await Promise.all(promises);
    return this.aggregator(results);
  }
}`,
    language: 'javascript'
  },
  useCases: [
    'Parallel Content Generation: multiple writers produce sections simultaneously and merge results',
    'Data Enrichment: run different enrichment models in parallel (NER, sentiment, categorization)',
    'Multimodal Analysis: parallel agents analyze text, image, and structured data concurrently'
  ],
  performance: {
    scalability: 9,
    complexity: 4,
    reliability: 8
  },
  createdAt: '2025-08-06',
  updatedAt: '2025-08-06',
  githubUrl: 'https://github.com/example/concurrent-workflows',
  documentationUrl: 'https://devblogs.microsoft.com/semantic-kernel/semantic-kernel-multi-agent-orchestration/',
  visual: {
    name: 'Concurrent Workflows',
    type: 'concurrent',
    components: [
      {
        id: 'coordinator',
        type: 'coordinator',
        position: { x: 300, y: 100 },
        label: 'Task Coordinator',
        color: '#ef4444'
      },
      {
        id: 'agent-a',
        type: 'worker',
        position: { x: 100, y: 250 },
        label: 'Agent A',
        color: '#22c55e'
      },
      {
        id: 'agent-b',
        type: 'worker',
        position: { x: 250, y: 250 },
        label: 'Agent B',
        color: '#22c55e'
      },
      {
        id: 'agent-c',
        type: 'worker',
        position: { x: 400, y: 250 },
        label: 'Agent C',
        color: '#22c55e'
      },
      {
        id: 'agent-d',
        type: 'worker',
        position: { x: 550, y: 250 },
        label: 'Agent D',
        color: '#22c55e'
      },
      {
        id: 'aggregator',
        type: 'aggregator',
        position: { x: 300, y: 400 },
        label: 'Result Aggregator',
        color: '#3b82f6'
      }
    ],
    connections: [
      { id: 'conn-1', from: 'coordinator', to: 'agent-a', type: 'parallel', name: 'Task A' },
      { id: 'conn-2', from: 'coordinator', to: 'agent-b', type: 'parallel', name: 'Task B' },
      { id: 'conn-3', from: 'coordinator', to: 'agent-c', type: 'parallel', name: 'Task C' },
      { id: 'conn-4', from: 'coordinator', to: 'agent-d', type: 'parallel', name: 'Task D' },
      { id: 'conn-5', from: 'agent-a', to: 'aggregator', type: 'result', name: 'Result A' },
      { id: 'conn-6', from: 'agent-b', to: 'aggregator', type: 'result', name: 'Result B' },
      { id: 'conn-7', from: 'agent-c', to: 'aggregator', type: 'result', name: 'Result C' },
      { id: 'conn-8', from: 'agent-d', to: 'aggregator', type: 'result', name: 'Result D' }
    ]
  }
}
,
{
  id: 'agent-rearrange',
  title: 'Agent Rearrange',
  description: 'Agents dynamically add, remove, or adapt based on changing tasks and performance signals while preserving overall system integrity.',
  longDescription: 'Multi-agent systems can adjust to varying environments by adding, removing or adapting agents in dynamic configurations. In this architecture, agents continuously rearrange themselves based on changing task requirements, environmental conditions, and system performance metrics. Prioritize modular components that can be reconfigured independently without compromising system integrity. This approach enables individual agents to evolve while preserving collective functionality.',
  author: {
    name: 'Community',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    github: 'madebyagents-community'
  },
  category: ['Dynamic', 'Adaptive'],
  tags: ['dynamic', 'rearrange', 'orchestrator', 'monitoring', 'agent-pool'],
  diagram: {
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop',
    alt: 'Agent Rearrange - Orchestrator dynamically provisions agents from a pool based on monitoring feedback'
  },
  implementation: {
    codeExample: `class DynamicOrchestrator {
  constructor({ pool, monitor, policy }) {
    this.pool = pool;       // provides acquire/release of agents
    this.monitor = monitor; // reports metrics and status
    this.policy = policy;   // decides reconfiguration actions
    this.active = new Set(); // active agents
  }

  async assign(task) {
    // Decide reconfiguration based on current metrics
    const snapshot = await this.monitor.snapshot();
    const action = await this.policy.decide({ task, active: [...this.active], metrics: snapshot });

    if (action?.type === 'scaleUp') {
      const agent = await this.pool.acquire(action.capability);
      if (agent) this.active.add(agent);
    } else if (action?.type === 'scaleDown') {
      const victim = [...this.active].find(a => a.id === action.agentId);
      if (victim) { this.active.delete(victim); await this.pool.release(victim); }
    } else if (action?.type === 'replace') {
      const victim = [...this.active].find(a => a.id === action.agentId);
      if (victim) { this.active.delete(victim); await this.pool.release(victim); }
      const agent = await this.pool.acquire(action.capability);
      if (agent) this.active.add(agent);
    }

    // Dispatch task to active agents concurrently
    const results = await Promise.all(
      [...this.active].map(a => a.process(task).catch(err => ({ agent: a.id, error: String(err?.message || err) })))
    );

    await this.monitor.report({ task, results, active: [...this.active].map(a => a.id) });
    return this.aggregate(results);
  }

  aggregate(results) {
    // Example aggregation (can be majority vote, weighted merge, etc.)
    return { results, meta: { activeCount: [...this.active].length } };
  }
}`,
    language: 'javascript'
  },
  useCases: [
    'Variable Load Production: scale agents up/down from a pool based on throughput/latency targets',
    'Self-Healing Pipelines: replace underperforming or failing agents on the fly',
    'Context-Sensitive Tasks: dynamically introduce specialists when signals indicate new requirements'
  ],
  performance: {
    scalability: 9,
    complexity: 6,
    reliability: 9
  },
  createdAt: '2025-08-06',
  updatedAt: '2025-08-06',
  githubUrl: 'https://github.com/example/agent-rearrange',
  documentationUrl: 'https://galileo.ai/blog/stability-strategies-dynamic-multi-agents',
  visual: {
    name: 'Agent Rearrange',
    type: 'dynamic',
    components: [
      { id: 'orchestrator', type: 'orchestrator', position: { x: 300, y: 100 }, label: 'Dynamic Orchestrator', color: '#ef4444' },
      { id: 'agent-pool', type: 'pool', position: { x: 150, y: 250 }, label: 'Agent Pool', color: '#64748b' },
      { id: 'active-agent-1', type: 'active', position: { x: 300, y: 250 }, label: 'Active Agent 1', color: '#22c55e' },
      { id: 'active-agent-2', type: 'active', position: { x: 450, y: 250 }, label: 'Active Agent 2', color: '#22c55e' },
      { id: 'monitor', type: 'monitor', position: { x: 300, y: 400 }, label: 'Performance Monitor', color: '#3b82f6' }
    ],
    connections: [
      { id: 'conn-1', from: 'orchestrator', to: 'active-agent-1', type: 'assignment', name: 'Task Assignment' },
      { id: 'conn-2', from: 'orchestrator', to: 'active-agent-2', type: 'assignment', name: 'Task Assignment' },
      { id: 'conn-3', from: 'agent-pool', to: 'orchestrator', type: 'dynamic', name: 'Agent Provisioning' },
      { id: 'conn-4', from: 'monitor', to: 'orchestrator', type: 'feedback', name: 'Performance Data' },
      { id: 'conn-5', from: 'active-agent-1', to: 'monitor', type: 'reporting', name: 'Status Report' },
      { id: 'conn-6', from: 'active-agent-2', to: 'monitor', type: 'reporting', name: 'Status Report' }
    ]
  }
}
,
{
  id: 'graph-workflow',
  title: 'Graph Workflow (DAG)',
  description: 'Agents are nodes and connections are edges; control flow is managed by edges and agents communicate by updating shared graph state.',
  longDescription: 'In this approach, each agent is a node in the graph, and their connections are represented as an edge. The control flow is managed by edges, and they communicate by adding to the graph\'s state. This architecture represents complex workflows as directed acyclic graphs (DAG) where agents can have multiple dependencies and parallel execution paths, enabling sophisticated coordination patterns that go beyond simple sequential or hierarchical structures.',
  author: {
    name: 'Community',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    github: 'madebyagents-community'
  },
  category: ['Graph', 'Workflow', 'DAG'],
  tags: ['graph', 'dag', 'control-flow', 'dependencies', 'parallel'],
  diagram: {
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop',
    alt: 'Graph Workflow - DAG of agents with converging and parallel paths'
  },
  implementation: {
    codeExample: `class GraphWorkflowEngine {
  constructor(nodes, edges) {
    // nodes: { id, process: (state) => Promise<void> }[]
    // edges: { from, to }[] forming a DAG
    this.nodes = new Map(nodes.map(n => [n.id, n]));
    this.edges = edges;
    this.inDegree = new Map();
    for (const n of nodes) this.inDegree.set(n.id, 0);
    for (const e of edges) this.inDegree.set(e.to, (this.inDegree.get(e.to) ?? 0) + 1);
  }

  async run(initialState = {}) {
    const state = { ...initialState, graph: { log: [] } };
    const ready = [];
    for (const [id, deg] of this.inDegree.entries()) if (deg === 0) ready.push(id);

    // Kahn-style topological traversal with parallel execution of ready nodes
    const visited = new Set();
    while (ready.length) {
      const batch = [...ready];
      ready.length = 0;

      await Promise.all(batch.map(async id => {
        if (visited.has(id)) return;
        const node = this.nodes.get(id);
        await node.process(state); // nodes can append to state.graph.log etc.
        visited.add(id);
        for (const e of this.edges.filter(x => x.from === id)) {
          const deg = this.inDegree.get(e.to) - 1;
          this.inDegree.set(e.to, deg);
          if (deg === 0) ready.push(e.to);
        }
      }));
    }
    return state;
  }
}`,
    language: 'javascript'
  },
  useCases: [
    'Complex CI/CD Pipelines: validation and security checks gate business logic; branches join later nodes',
    'Data Processing DAGs: multiple preprocessing paths converge into transformation and formatting nodes',
    'Enterprise Workflows: approval chains and logging run in parallel and merge to finalization'
  ],
  performance: {
    scalability: 9,
    complexity: 7,
    reliability: 9
  },
  createdAt: '2025-08-06',
  updatedAt: '2025-08-06',
  githubUrl: 'https://github.com/example/graph-workflow',
  documentationUrl: 'https://blog.langchain.com/langgraph-multi-agent-workflows/',
  visual: {
    name: 'Graph Workflow',
    type: 'graph',
    components: [
      { id: 'start-node', type: 'start', position: { x: 100, y: 200 }, label: 'Start', color: '#10b981' },
      { id: 'agent-1', type: 'processor', position: { x: 250, y: 100 }, label: 'Data Validator', color: '#3b82f6' },
      { id: 'agent-2', type: 'processor', position: { x: 250, y: 300 }, label: 'Security Checker', color: '#8b5cf6' },
      { id: 'agent-3', type: 'processor', position: { x: 400, y: 200 }, label: 'Business Logic', color: '#06b6d4' },
      { id: 'agent-4', type: 'processor', position: { x: 550, y: 150 }, label: 'Formatter', color: '#f59e0b' },
      { id: 'agent-5', type: 'processor', position: { x: 550, y: 250 }, label: 'Logger', color: '#ef4444' },
      { id: 'end-node', type: 'end', position: { x: 700, y: 200 }, label: 'End', color: '#dc2626' }
    ],
    connections: [
      { id: 'conn-1', from: 'start-node', to: 'agent-1', type: 'flow', name: 'Input Data' },
      { id: 'conn-2', from: 'start-node', to: 'agent-2', type: 'flow', name: 'Security Check' },
      { id: 'conn-3', from: 'agent-1', to: 'agent-3', type: 'flow', name: 'Valid Data' },
      { id: 'conn-4', from: 'agent-2', to: 'agent-3', type: 'flow', name: 'Security OK' },
      { id: 'conn-5', from: 'agent-3', to: 'agent-4', type: 'flow', name: 'Processed Data' },
      { id: 'conn-6', from: 'agent-3', to: 'agent-5', type: 'flow', name: 'Log Data' },
      { id: 'conn-7', from: 'agent-4', to: 'end-node', type: 'flow', name: 'Formatted Output' },
      { id: 'conn-8', from: 'agent-5', to: 'end-node', type: 'flow', name: 'Log Complete' }
    ]
  }
}
,
{
 id: 'interactive-group-chat',
 title: 'Interactive Group Chat',
 description: 'Enhanced group chat with dynamic speaker selection, context-aware agent routing, and adaptive interaction management.',
 longDescription: 'Enhanced version of the group chat pattern with dynamic speaker selection and sophisticated interaction management. This architecture implements advanced conversation flow control, context-aware agent selection, and adaptive interaction patterns that respond to the evolving discussion. The system intelligently determines which agent should contribute next based on the conversation state, expertise requirements, and collaborative dynamics.',
 author: {
   name: 'Community',
   avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
   github: 'madebyagents-community'
 },
 category: ['Collaborative', 'Adaptive'],
 tags: ['group-chat', 'dynamic-speaker-selection', 'context-aware', 'moderation', 'autogen'],
 diagram: {
   image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop',
   alt: 'Interactive Group Chat - Intelligent moderator with context analyzer and dynamic speaker selection'
 },
 implementation: {
   codeExample: `class InteractiveGroupChat {
 constructor({ moderator, analyzer, selector, participants }) {
   this.moderator = moderator;      // decides when to analyze/select
   this.analyzer = analyzer;        // updates conversation state
   this.selector = selector;        // picks next speaker based on state and expertise
   this.participants = participants; // id -> agent
   this.state = { turns: [], context: {} };
 }
 async step(message) {
   // moderator triggers context analysis
   const analysis = await this.analyzer.update(this.state, message);
   Object.assign(this.state.context, analysis?.context ?? {});
   this.state.turns.push(message);

   // selector chooses best next speaker
   const nextId = await this.selector.choose(this.state, Object.keys(this.participants));
   const agent = this.participants[nextId];
   const reply = await agent.respond(message, this.state);
   return { speaker: nextId, reply };
 }
}`,
   language: 'javascript'
 },
 useCases: [
   'Technical Discussions: route to Domain Expert, then Critic for review, Synthesizer to summarize',
   'Product Brainstorms: facilitator guides flow; selector invites most relevant voice per turn',
   'Customer Support Escalations: analyzer detects intent; selector picks best specialized agent to answer'
 ],
 performance: {
   scalability: 8,
   complexity: 6,
   reliability: 9
 },
 createdAt: '2025-08-06',
 updatedAt: '2025-08-06',
 githubUrl: null,
 documentationUrl: 'https://microsoft.github.io/autogen/0.2/docs/Use-Cases/agent_chat/',
 visual: {
   name: 'Interactive Group Chat',
   type: 'adaptive-collaborative',
   components: [
     {
       id: 'intelligent-moderator',
       type: 'moderator',
       position: { x: 300, y: 50 },
       label: 'Intelligent Moderator',
       color: '#ef4444'
     },
     {
       id: 'context-analyzer',
       type: 'analyzer',
       position: { x: 150, y: 150 },
       label: 'Context Analyzer',
       color: '#f59e0b'
     },
     {
       id: 'speaker-selector',
       type: 'selector',
       position: { x: 450, y: 150 },
       label: 'Dynamic Speaker Selector',
       color: '#f59e0b'
     },
     {
       id: 'conversation-state',
       type: 'state',
       position: { x: 300, y: 200 },
       label: 'Conversation State',
       color: '#64748b'
     },
     {
       id: 'expert-agent',
       type: 'participant',
       position: { x: 100, y: 350 },
       label: 'Domain Expert',
       color: '#22c55e'
     },
     {
       id: 'critic-agent',
       type: 'participant',
       position: { x: 250, y: 350 },
       label: 'Critical Reviewer',
       color: '#dc2626'
     },
     {
       id: 'synthesizer-agent',
       type: 'participant',
       position: { x: 400, y: 350 },
       label: 'Synthesizer',
       color: '#3b82f6'
     },
     {
       id: 'facilitator-agent',
       type: 'participant',
       position: { x: 550, y: 350 },
       label: 'Facilitator',
       color: '#8b5cf6'
     }
   ],
   connections: [
     { id: 'conn-1', from: 'intelligent-moderator', to: 'context-analyzer', type: 'analysis-request', name: 'Analyze Context' },
     { id: 'conn-2', from: 'intelligent-moderator', to: 'speaker-selector', type: 'selection-request', name: 'Select Speaker' },
     { id: 'conn-3', from: 'context-analyzer', to: 'conversation-state', type: 'update', name: 'Context Update' },
     { id: 'conn-4', from: 'speaker-selector', to: 'conversation-state', type: 'selection', name: 'Speaker Selection' },
     { id: 'conn-5', from: 'conversation-state', to: 'expert-agent', type: 'dynamic', name: 'Contextual Interaction' },
     { id: 'conn-6', from: 'conversation-state', to: 'critic-agent', type: 'dynamic', name: 'Contextual Interaction' },
     { id: 'conn-7', from: 'conversation-state', to: 'synthesizer-agent', type: 'dynamic', name: 'Contextual Interaction' },
     { id: 'conn-8', from: 'conversation-state', to: 'facilitator-agent', type: 'dynamic', name: 'Contextual Interaction' }
   ]
 }
}
,
{
 id: 'agent-registry',
 title: 'Agent Registry',
 description: 'Centralized repository pattern to catalog, manage, and dynamically invoke agents based on system needs.',
 longDescription: 'A centralized repository pattern where agents are cataloged, managed, and dynamically invoked based on current system needs. This architecture provides a service discovery mechanism that maintains metadata about available agents, their capabilities, current status, and performance metrics. The registry enables dynamic agent lifecycle management, allowing systems to discover, instantiate, and coordinate agents on-demand while maintaining scalability and flexibility.',
 author: {
   name: 'Community',
   avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
   github: 'madebyagents-community'
 },
 category: ['Orchestration', 'Infrastructure'],
 tags: ['registry', 'service-discovery', 'lifecycle', 'capabilities', 'dynamic-invocation'],
 diagram: {
   image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop',
   alt: 'Agent Registry - Central registry core with discovery, lifecycle manager, and registered agents'
 },
 implementation: {
   codeExample: `class AgentRegistry {
 constructor() {
   this.agents = new Map(); // id -> { capabilities: string[], status, metrics, factory? }
   this.heartbeats = new Map(); // id -> lastSeen
 }
 register({ id, capabilities = [], metadata = {} }) {
   this.agents.set(id, { capabilities, status: 'idle', metrics: {}, ...metadata });
   this.heartbeats.set(id, Date.now());
 }
 heartbeat(id, status) {
   if (this.agents.has(id)) {
     this.heartbeats.set(id, Date.now());
     if (status) this.agents.get(id).status = status;
   }
 }
 discover({ requires = [] } = {}) {
   // simple filter by capabilities
   return [...this.agents.entries()]
     .filter(([_, a]) => requires.every(r => (a.capabilities || []).includes(r)))
     .map(([id, a]) => ({ id, ...a }));
 }
 async invoke(id, payload) {
   const agent = this.agents.get(id);
   if (!agent?.factory) throw new Error('No factory/handle for agent ' + id);
   const instance = await agent.factory();
   return instance.process(payload);
 }
}`,
   language: 'javascript'
 },
 useCases: [
   'Service Discovery: clients query registry to find NLP/Data/Vision agents by capability',
   'Dynamic Provisioning: lifecycle manager spins agents up/down based on demand',
   'Observability: track agent health, status, and performance metrics centrally'
 ],
 performance: {
   scalability: 9,
   complexity: 5,
   reliability: 9
 },
 createdAt: '2025-08-06',
 updatedAt: '2025-08-06',
 githubUrl: null,
 documentationUrl: 'https://google.github.io/adk-docs/agents/multi-agents/',
 visual: {
   name: 'Agent Registry',
   type: 'registry',
   components: [
     {
       id: 'registry-core',
       type: 'registry',
       position: { x: 300, y: 100 },
       label: 'Agent Registry Core',
       color: '#ef4444'
     },
     {
       id: 'discovery-service',
       type: 'discovery',
       position: { x: 150, y: 200 },
       label: 'Discovery Service',
       color: '#f59e0b'
     },
     {
       id: 'lifecycle-manager',
       type: 'manager',
       position: { x: 450, y: 200 },
       label: 'Lifecycle Manager',
       color: '#f59e0b'
     },
     {
       id: 'metadata-store',
       type: 'database',
       position: { x: 300, y: 250 },
       label: 'Agent Metadata Store',
       color: '#64748b'
     },
     {
       id: 'registered-agent-1',
       type: 'registered',
       position: { x: 100, y: 400 },
       label: 'NLP Agent',
       color: '#22c55e'
     },
     {
       id: 'registered-agent-2',
       type: 'registered',
       position: { x: 250, y: 400 },
       label: 'Data Agent',
       color: '#22c55e'
     },
     {
       id: 'registered-agent-3',
       type: 'registered',
       position: { x: 400, y: 400 },
       label: 'Vision Agent',
       color: '#22c55e'
     },
     {
       id: 'client-system',
       type: 'client',
       position: { x: 550, y: 400 },
       label: 'Client System',
       color: '#3b82f6'
     }
   ],
 connections: [
     { id: 'conn-1', from: 'registry-core', to: 'discovery-service', type: 'service', name: 'Discovery Request' },
     { id: 'conn-2', from: 'registry-core', to: 'lifecycle-manager', type: 'management', name: 'Lifecycle Control' },
     { id: 'conn-3', from: 'registry-core', to: 'metadata-store', type: 'data', name: 'Metadata Query' },
     { id: 'conn-4', from: 'registered-agent-1', to: 'registry-core', type: 'registration', name: 'Register/Heartbeat' },
     { id: 'conn-5', from: 'registered-agent-2', to: 'registry-core', type: 'registration', name: 'Register/Heartbeat' },
     { id: 'conn-6', from: 'registered-agent-3', to: 'registry-core', type: 'registration', name: 'Register/Heartbeat' },
     { id: 'conn-7', from: 'client-system', to: 'discovery-service', type: 'query', name: 'Agent Discovery' },
     { id: 'conn-8', from: 'lifecycle-manager', to: 'registered-agent-1', type: 'invocation', name: 'Dynamic Invocation' }
   ]
 }
}
,
{
 id: 'spreadsheet',
 title: 'SpreadSheet',
 description: 'A tabular data management architecture that organizes and tracks agent outputs in structured formats similar to spreadsheet applications.',
 longDescription: 'A tabular data management architecture that organizes and tracks agent outputs in structured formats similar to spreadsheet applications. This pattern is designed for handling large-scale operations where systematic data collection, processing, and analysis are required. Agents contribute data that gets organized into rows and columns, enabling bulk operations, data validation, reporting, and comprehensive tracking of multi-agent system outputs across various dimensions and metrics.',
 author: {
   name: 'Community',
   avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
   github: 'madebyagents-community'
 },
 category: ['Tabular', 'Data Management'],
 tags: ['spreadsheet', 'tabular', 'data-validation', 'reporting', 'tracking'],
 diagram: {
   image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop',
   alt: 'Spreadsheet-like architecture with coordinator, schema, validator, tabular store and agents'
 },
 implementation: {
   codeExample: `class TabularCoordinator {
 constructor({ schema, validator, store }) {
   this.schema = schema;       // defines columns, types, constraints
   this.validator = validator; // validates rows/bulk updates
   this.store = store;         // CRUD over rows
 }

 async insertRow(row) {
   const normalized = this.schema.applyDefaults(row);
   const errors = this.validator.validate(normalized, this.schema.definition);
   if (errors.length) throw new Error('Validation failed: ' + JSON.stringify(errors));
   return this.store.insert(normalized);
 }

 async bulkUpdate(filter, patch) {
   // validate patch against schema (partial)
   const errors = this.validator.validatePatch(patch, this.schema.definition);
   if (errors.length) throw new Error('Patch invalid: ' + JSON.stringify(errors));
   return this.store.updateMany(filter, patch);
 }

 async query(where, options = {}) {
   return this.store.query(where, options);
 }

 async report(aggregationSpec) {
   // e.g., groupBy, sum, avg, count on columns
   return this.store.aggregate(aggregationSpec);
 }
}`,
   language: 'javascript'
 },
 useCases: [
   'Batch result collection and curation for multi-agent runs across prompts, datasets, or tasks',
   'Operational dashboards: track agent outputs with statuses, owners, timestamps, and metrics',
   'Quality pipelines: validate and correct data at scale with auditable changes',
   'Reporting and analytics: aggregations over large tabular agent outputs'
 ],
 performance: {
   scalability: 9,
   complexity: 5,
   reliability: 9
 },
 createdAt: '2025-08-06',
 updatedAt: '2025-08-06',
 githubUrl: null,
 documentationUrl: 'https://www.aalpha.net/blog/how-to-build-multi-agent-ai-system/',
 visual: {
   name: 'SpreadSheet',
   type: 'tabular',
   components: [
     {
       id: 'data-coordinator',
       type: 'coordinator',
       position: { x: 300, y: 50 },
       label: 'Data Coordinator',
       color: '#ef4444'
     },
     {
       id: 'schema-manager',
       type: 'schema',
       position: { x: 150, y: 150 },
       label: 'Schema Manager',
       color: '#f59e0b'
     },
     {
       id: 'data-validator',
       type: 'validator',
       position: { x: 450, y: 150 },
       label: 'Data Validator',
       color: '#f59e0b'
     },
     {
       id: 'tabular-store',
       type: 'database',
       position: { x: 300, y: 250 },
       label: 'Tabular Data Store',
       color: '#64748b'
     },
     {
       id: 'collector-agent-1',
       type: 'collector',
       position: { x: 100, y: 400 },
       label: 'Data Collector 1',
       color: '#22c55e'
     },
     {
       id: 'collector-agent-2',
       type: 'collector',
       position: { x: 200, y: 400 },
       label: 'Data Collector 2',
       color: '#22c55e'
     },
     {
       id: 'processor-agent',
       type: 'processor',
       position: { x: 300, y: 400 },
       label: 'Data Processor',
       color: '#3b82f6'
     },
     {
       id: 'analyzer-agent',
       type: 'analyzer',
       position: { x: 400, y: 400 },
       label: 'Data Analyzer',
       color: '#8b5cf6'
     },
     {
       id: 'reporter-agent',
       type: 'reporter',
       position: { x: 500, y: 400 },
       label: 'Report Generator',
       color: '#06b6d4'
     }
   ],
   connections: [
     {
       id: 'conn-1',
       from: 'data-coordinator',
       to: 'schema-manager',
       type: 'schema-request',
       name: 'Schema Definition'
     },
     {
       id: 'conn-2',
       from: 'data-coordinator',
       to: 'data-validator',
       type: 'validation-request',
       name: 'Data Validation'
     },
     {
       id: 'conn-3',
       from: 'data-coordinator',
       to: 'tabular-store',
       type: 'data-operation',
       name: 'CRUD Operations'
     },
     {
       id: 'conn-4',
       from: 'collector-agent-1',
       to: 'tabular-store',
       type: 'row-insert',
       name: 'Insert Row Data'
     },
     {
       id: 'conn-5',
       from: 'collector-agent-2',
       to: 'tabular-store',
       type: 'row-insert',
       name: 'Insert Row Data'
     },
     {
       id: 'conn-6',
       from: 'processor-agent',
       to: 'tabular-store',
       type: 'bulk-update',
       name: 'Bulk Processing'
     },
     {
       id: 'conn-7',
       from: 'analyzer-agent',
       to: 'tabular-store',
       type: 'query',
       name: 'Data Analysis'
     },
     {
       id: 'conn-8',
       from: 'reporter-agent',
       to: 'tabular-store',
       type: 'aggregation',
       name: 'Generate Reports'
     }
   ]
 }
}
,
{
 id: 'heavy',
 title: 'Heavy',
 description: 'A high-performance architecture for computationally intensive, large-scale workloads with coordinated multi-agent execution.',
 longDescription: 'A high-performance architecture designed for computationally intensive tasks that require significant processing power and coordination among multiple agents. This pattern focuses on handling large-scale data processing, complex simulations, and resource-intensive workflows by distributing computational load across multiple specialized agents with robust coordination mechanisms, fault tolerance, and performance optimization strategies.',
 author: {
   name: 'Community',
   avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
   github: 'madebyagents-community'
 },
 category: ['High-Performance', 'Parallel', 'Orchestration'],
 tags: ['high-performance', 'compute', 'partitioning', 'monitoring', 'aggregation', 'fault-tolerance'],
 diagram: {
   image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop',
   alt: 'Heavy compute architecture with master controller, resource manager, performance monitor, partitioner, compute clusters, and aggregator'
 },
 implementation: {
   codeExample: `class HeavyOrchestrator {
 constructor({ resourceManager, monitor, partitioner, clusters, aggregator, retry = 1 }) {
   this.resourceManager = resourceManager;
   this.monitor = monitor;
   this.partitioner = partitioner;
   this.clusters = clusters;      // { id: { execute(chunk) } }
   this.aggregator = aggregator;  // { combine(partials) }
   this.retry = retry;
 }

 async run(task) {
   // Allocate resources and partition work
   await this.resourceManager.allocate(task);
   const chunks = await this.partitioner.split(task);

   // Dispatch chunks in parallel across clusters with basic retry
   const execOne = async (chunk, attempt = 0) => {
     const target = this.selectCluster(chunk);
     const start = Date.now();
     try {
       const res = await target.execute(chunk);
       await this.monitor.report({ cluster: target.id, ok: true, durMs: Date.now() - start });
       return res;
     } catch (e) {
       await this.monitor.report({ cluster: target.id, ok: false, error: String(e), attempt });
       if (attempt < this.retry) return execOne(chunk, attempt + 1);
       // fallback: try another cluster once
       const alt = this.selectAlternate(target.id);
       if (alt) return alt.execute(chunk);
       throw e;
     }
   };

   const partials = await Promise.all(chunks.map(execOne));
   const result = await this.aggregator.combine(partials);
   await this.resourceManager.release(task);
   return result;
 }

 selectCluster(chunk) {
   // naive: choose least loaded cluster
   const ranked = Object.values(this.clusters).sort((a, b) => (a.load ?? 0) - (b.load ?? 0));
   return ranked[0] || Object.values(this.clusters)[0];
 }

 selectAlternate(excludeId) {
   return Object.values(this.clusters).find(c => c.id !== excludeId);
 }
}`,
   language: 'javascript'
 },
 useCases: [
   'Large-scale data processing (ETL, distributed transformations, feature computation)',
   'Complex simulations and scientific computing with partitioned workloads',
   'Batch inference over massive datasets using distributed compute clusters',
   'High-throughput pipelines requiring monitoring, retries, and aggregation'
 ],
 performance: {
   scalability: 10,
   complexity: 7,
   reliability: 9
 },
 createdAt: '2025-08-06',
 updatedAt: '2025-08-06',
 githubUrl: null,
 documentationUrl: 'https://www.aalpha.net/blog/how-to-build-multi-agent-ai-system/',
 visual: {
   name: 'Heavy',
   type: 'high-performance',
   components: [
     {
       id: 'master-controller',
       type: 'controller',
       position: { x: 300, y: 50 },
       label: 'Master Controller',
       color: '#ef4444'
     },
     {
       id: 'resource-manager',
       type: 'resource',
       position: { x: 150, y: 150 },
       label: 'Resource Manager',
       color: '#f59e0b'
     },
     {
       id: 'performance-monitor',
       type: 'monitor',
       position: { x: 450, y: 150 },
       label: 'Performance Monitor',
       color: '#f59e0b'
     },
     {
       id: 'task-partitioner',
       type: 'partitioner',
       position: { x: 300, y: 200 },
       label: 'Task Partitioner',
       color: '#64748b'
     },
     {
       id: 'compute-cluster-1',
       type: 'cluster',
       position: { x: 100, y: 350 },
       label: 'Compute Cluster 1',
       color: '#22c55e'
     },
     {
       id: 'compute-cluster-2',
       type: 'cluster',
       position: { x: 250, y: 350 },
       label: 'Compute Cluster 2',
       color: '#22c55e'
     },
     {
       id: 'compute-cluster-3',
       type: 'cluster',
       position: { x: 400, y: 350 },
       label: 'Compute Cluster 3',
       color: '#22c55e'
     },
     {
       id: 'result-aggregator',
       type: 'aggregator',
       position: { x: 550, y: 350 },
       label: 'Result Aggregator',
       color: '#3b82f6'
     }
   ],
   connections: [
     {
       id: 'conn-1',
       from: 'master-controller',
       to: 'resource-manager',
       type: 'resource-allocation',
       name: 'Resource Allocation'
     },
     {
       id: 'conn-2',
       from: 'master-controller',
       to: 'performance-monitor',
       type: 'monitoring',
       name: 'Performance Tracking'
     },
     {
       id: 'conn-3',
       from: 'master-controller',
       to: 'task-partitioner',
       type: 'task-division',
       name: 'Task Partitioning'
     },
     {
       id: 'conn-4',
       from: 'task-partitioner',
       to: 'compute-cluster-1',
       type: 'workload',
       name: 'Heavy Computation'
     },
     {
       id: 'conn-5',
       from: 'task-partitioner',
       to: 'compute-cluster-2',
       type: 'workload',
       name: 'Heavy Computation'
     },
     {
       id: 'conn-6',
       from: 'task-partitioner',
       to: 'compute-cluster-3',
       type: 'workload',
       name: 'Heavy Computation'
     },
     {
       id: 'conn-7',
       from: 'compute-cluster-1',
       to: 'result-aggregator',
       type: 'results',
       name: 'Partial Results'
     },
     {
       id: 'conn-8',
       from: 'compute-cluster-2',
       to: 'result-aggregator',
       type: 'results',
       name: 'Partial Results'
     },
     {
       id: 'conn-9',
       from: 'compute-cluster-3',
       to: 'result-aggregator',
       type: 'results',
       name: 'Partial Results'
     }
   ]
 }
}
,
{
 id: 'router',
 title: 'Router',
 description: 'Priority Rules and LangGraph-style routing: analyzes tasks and routes to optimal agents/architectures based on rules, load, availability, and performance.',
 longDescription: 'Priority Rules: Pre-established rules or logic are used to settle disagreements. LangGraph: Multi-Agent Workflows and route tasks to appropriate agents. The Router architecture acts as an intelligent traffic director that analyzes incoming tasks and dynamically selects the most suitable architecture pattern or specific agents based on task characteristics, current system load, agent availability, and performance metrics. This pattern enables adaptive system behavior by choosing optimal processing paths.',
 author: {
   name: 'Community',
   avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
   github: 'madebyagents-community'
 },
 category: ['Routing', 'Orchestration', 'Adaptive'],
 tags: ['router', 'priority-rules', 'load-balancing', 'dynamic-routing', 'langgraph'],
 diagram: {
   image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop',
   alt: 'Router architecture with Intelligent Router, Analyzer, Load Balancer, Rules Engine, and target clusters'
 },
 implementation: {
   codeExample: `class IntelligentRouter {
 constructor({ analyzer, balancer, rules, targets }) {
   this.analyzer = analyzer;    // inspects task to infer domain/intents
   this.balancer = balancer;    // queries system load/availability
   this.rules = rules;          // priority rules / policy engine
   this.targets = targets;      // map clusterName -> { execute(task) }
 }

 async route(task) {
   const features = await this.analyzer.inspect(task);
   const load = await this.balancer.snapshot();
   const decision = await this.rules.decide({ task, features, load });

   // decision might be { target: 'nlp', reason: 'text:sentiment', priority: 0.9 }
   const target = this.targets[decision.target];
   if (!target) throw new Error('No target cluster for ' + decision.target);

   return target.execute(task, { decision, features, load });
 }
}`,
   language: 'javascript'
 },
 useCases: [
   'Front-door routing for multi-capability agent platforms (text vs. vision vs. analytics)',
   'Policy-based arbitration where priority rules resolve conflicts between candidate handlers',
   'Load-aware dispatch to balance throughput and latency across agent clusters',
   'Meta-routing between entire architectures (e.g., send DAG-like tasks to Graph Workflow, content tasks to Pipeline)'
 ],
 performance: {
   scalability: 9,
   complexity: 6,
   reliability: 9
 },
 createdAt: '2025-08-06',
 updatedAt: '2025-08-06',
 githubUrl: null,
 documentationUrl: 'https://medium.com/@iamanraghuvanshi/agentic-ai-7-multi-agent-architectures-explained-how-ai-agents-collaborate-141c23e9117f',
 visual: {
   name: 'Router',
   type: 'routing',
   components: [
     {
       id: 'intelligent-router',
       type: 'router',
       position: { x: 300, y: 100 },
       label: 'Intelligent Router',
       color: '#ef4444'
     },
     {
       id: 'task-analyzer',
       type: 'analyzer',
       position: { x: 150, y: 200 },
       label: 'Task Analyzer',
       color: '#f59e0b'
     },
     {
       id: 'load-balancer',
       type: 'balancer',
       position: { x: 450, y: 200 },
       label: 'Load Balancer',
       color: '#f59e0b'
     },
     {
       id: 'routing-rules',
       type: 'rules',
       position: { x: 300, y: 250 },
       label: 'Routing Rules Engine',
       color: '#64748b'
     },
     {
       id: 'nlp-cluster',
       type: 'cluster',
       position: { x: 100, y: 400 },
       label: 'NLP Agent Cluster',
       color: '#22c55e'
     },
     {
       id: 'vision-cluster',
       type: 'cluster',
       position: { x: 250, y: 400 },
       label: 'Vision Agent Cluster',
       color: '#3b82f6'
     },
     {
       id: 'analytics-cluster',
       type: 'cluster',
       position: { x: 400, y: 400 },
       label: 'Analytics Cluster',
       color: '#8b5cf6'
     },
     {
       id: 'workflow-cluster',
       type: 'cluster',
       position: { x: 550, y: 400 },
       label: 'Workflow Cluster',
       color: '#06b6d4'
     }
   ],
   connections: [
     {
       id: 'conn-1',
       from: 'intelligent-router',
       to: 'task-analyzer',
       type: 'analysis',
       name: 'Task Analysis'
     },
     {
       id: 'conn-2',
       from: 'intelligent-router',
       to: 'load-balancer',
       type: 'load-query',
       name: 'Load Check'
     },
     {
       id: 'conn-3',
       from: 'intelligent-router',
       to: 'routing-rules',
       type: 'rule-query',
       name: 'Rule Evaluation'
     },
     {
       id: 'conn-4',
       from: 'intelligent-router',
       to: 'nlp-cluster',
       type: 'conditional',
       name: 'NLP Tasks'
     },
     {
       id: 'conn-5',
       from: 'intelligent-router',
       to: 'vision-cluster',
       type: 'conditional',
       name: 'Vision Tasks'
     },
     {
       id: 'conn-6',
       from: 'intelligent-router',
       to: 'analytics-cluster',
       type: 'conditional',
       name: 'Analytics Tasks'
     },
     {
       id: 'conn-7',
       from: 'intelligent-router',
       to: 'workflow-cluster',
       type: 'conditional',
       name: 'Complex Workflows'
     }
   ]
 }
}
]