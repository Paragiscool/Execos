// EXECOS - Planner Interface and LLM Adapter Pattern

export interface PlanGenerationRequest {
  goalId: string;
  rawInput: string;
}

export interface GeneratedStrategy {
  id: string;
  name: string;
  description: string;
  focusAreas: string[];
  tasks: {
    id: string;
    title: string;
    estimatedDurationMins: number;
    priority: number;
    dependencies?: string[];
  }[];
}

export interface GeneratedPlan {
  goalId: string;
  tasks: {
    title: string;
    estimatedDurationMins: number;
    priority: number;
  }[];
}

// The core interface that both the Mock and Real Gemini implementations will share.
export interface IPlanner {
  generateStrategies(request: PlanGenerationRequest): Promise<GeneratedStrategy[]>;
  generatePlan(request: PlanGenerationRequest): Promise<GeneratedPlan>;
}

// -----------------------------------------------------------------------------
// MOCK PLANNER (Fallback / Local Testing)
// -----------------------------------------------------------------------------
export class MockPlanner implements IPlanner {
  async generateStrategies(request: PlanGenerationRequest): Promise<GeneratedStrategy[]> {
    console.log(`[MockPlanner] Generating strategies for Goal: ${request.goalId}`);
    await new Promise(resolve => setTimeout(resolve, 800));
    
    return [
      {
        id: "strat_1",
        name: "Aggressive",
        description: "Front-load all difficult tasks with tight deadlines.",
        focusAreas: ["Speed", "High Intensity"],
        tasks: [
          { id: "t1", title: "Complete full draft", estimatedDurationMins: 120, priority: 100 }
        ]
      },
      {
        id: "strat_2",
        name: "Balanced",
        description: "Evenly distribute tasks over available time slots.",
        focusAreas: ["Consistency", "Stress Reduction"],
        tasks: [
          { id: "t2", title: "Write introduction", estimatedDurationMins: 45, priority: 90 },
          { id: "t3", title: "Write main body", estimatedDurationMins: 90, priority: 90, dependencies: ["t2"] }
        ]
      },
      {
        id: "strat_3",
        name: "Conservative",
        description: "Pad all task durations to guarantee completion.",
        focusAreas: ["Safety", "Low Risk"],
        tasks: [
          { id: "t4", title: "Gather resources", estimatedDurationMins: 60, priority: 80 }
        ]
      }
    ];
  }

  async generatePlan(request: PlanGenerationRequest): Promise<GeneratedPlan> {
    console.log(`[MockPlanner] Generating plan for Goal: ${request.goalId}`);
    
    // Simulate latency
    await new Promise(resolve => setTimeout(resolve, 800));

    return {
      goalId: request.goalId,
      tasks: [
        { title: "Research company history", estimatedDurationMins: 45, priority: 90 },
        { title: "Review Resume and STAR stories", estimatedDurationMins: 60, priority: 100 },
        { title: "Mock interview with peer", estimatedDurationMins: 45, priority: 80 }
      ]
    };
  }
}
