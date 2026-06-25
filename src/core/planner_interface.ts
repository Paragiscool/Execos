// EXECOS - Planner Interface and LLM Adapter Pattern

export interface PlanGenerationRequest {
  goalId: string;
  rawInput: string;
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
  generatePlan(request: PlanGenerationRequest): Promise<GeneratedPlan>;
}

// -----------------------------------------------------------------------------
// MOCK PLANNER (Fallback / Local Testing)
// -----------------------------------------------------------------------------
export class MockPlanner implements IPlanner {
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
