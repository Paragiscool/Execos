// EXECOS - Real Gemini Planner Adapter

import { GoogleGenAI, Type, Schema } from '@google/genai';
import { IPlanner, PlanGenerationRequest, GeneratedPlan } from './planner_interface';
import { PLANNER_SYSTEM_PROMPT } from '../prompts/planner_prompt';
import { bus } from './event_bus';
import { ExecEventType } from '../models/ledger';
import { globalContext } from './context';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const plannerSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    goalId: { type: Type.STRING },
    tasks: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          id: { type: Type.STRING },
          title: { type: Type.STRING },
          estimatedDurationMins: { type: Type.INTEGER },
          priority: { type: Type.INTEGER },
          dependencies: {
            type: Type.ARRAY,
            items: { type: Type.STRING }
          }
        },
        required: ["id", "title", "estimatedDurationMins", "priority"]
      }
    }
  },
  required: ["goalId", "tasks"]
};

const strategiesSchema: Schema = {
  type: Type.ARRAY,
  items: {
    type: Type.OBJECT,
    properties: {
      id: { type: Type.STRING },
      name: { type: Type.STRING },
      description: { type: Type.STRING },
      focusAreas: { type: Type.ARRAY, items: { type: Type.STRING } },
      tasks: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            id: { type: Type.STRING },
            title: { type: Type.STRING },
            estimatedDurationMins: { type: Type.INTEGER },
            priority: { type: Type.INTEGER },
            dependencies: { type: Type.ARRAY, items: { type: Type.STRING } }
          },
          required: ["id", "title", "estimatedDurationMins", "priority"]
        }
      }
    },
    required: ["id", "name", "description", "focusAreas", "tasks"]
  }
};

export class GeminiPlanner implements IPlanner {
  async generateStrategies(request: PlanGenerationRequest): Promise<any[]> {
    console.log(`[GeminiPlanner] Generating strategies for Goal: ${request.goalId}`);
    
    // Demo Safe Mode
    if (process.env.NEXT_PUBLIC_DEMO_SAFE_MODE === 'true') {
       throw new Error("DEMO_SAFE_MODE_ACTIVE");
    }

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 4000); // 4s timeout for strategy gen

    try {
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: `Input: ${request.rawInput}\nGoal ID: ${request.goalId}\n\nGenerate exactly 3 distinct execution strategies: 1) Aggressive (fast, high priority first), 2) Balanced (even pacing), 3) Conservative (padded durations, safe).`,
        config: {
          systemInstruction: "You are EXECOS Strategy Engine. You generate distinct high-level strategies for completing a goal. You DO NOT compute success probabilities. You only define the tasks and their parameters. Return a JSON array of 3 strategies.",
          responseMimeType: 'application/json',
          responseSchema: strategiesSchema,
          abortSignal: controller.signal,
        }
      });
      clearTimeout(timeout);
      
      const strategies = JSON.parse(response.text || "[]");
      if (!Array.isArray(strategies) || strategies.length !== 3) {
        throw new Error("MALFORMED_STRATEGIES");
      }
      return strategies;
    } catch (e) {
      if (timeout) clearTimeout(timeout);
      throw e;
    }
  }

  async generatePlan(request: PlanGenerationRequest): Promise<GeneratedPlan> {
    console.log(`[GeminiPlanner] Generating plan via Gemini for Goal: ${request.goalId}`);
    const startTime = Date.now();

    let timeout: ReturnType<typeof setTimeout> | null = null;

    try {
      const userProfileContext = `
[Digital Twin Context]
- Average Start Delay: ${globalContext.digitalTwin.startDelayMins} minutes
- Max Focus Duration: ${globalContext.digitalTwin.maxFocusDurationMins} minutes
- Procrastination Risk: ${globalContext.digitalTwin.procrastinationRisk}%
*CRITICAL*: You MUST pad the estimated duration of these tasks based on the user's historical start delay and procrastination risk.
      `;

      // Demo Safe Mode: bypass network entirely for deterministic demos
      const isDemoSafeMode = process.env.NEXT_PUBLIC_DEMO_SAFE_MODE === 'true';
      if (isDemoSafeMode) {
         console.warn("[GeminiPlanner] DEMO SAFE MODE active. Bypassing network.");
         throw new Error("DEMO_SAFE_MODE_ACTIVE");
      }

      // LLM Failure Matrix: hard 2-second timeout
      const controller = new AbortController();
      timeout = setTimeout(() => controller.abort(), 2000);

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: `Input: ${request.rawInput}\nGoal ID: ${request.goalId}\n${userProfileContext}`,
        config: {
          systemInstruction: PLANNER_SYSTEM_PROMPT,
          responseMimeType: 'application/json',
          responseSchema: plannerSchema,
          abortSignal: controller.signal,
        }
      });
      
      clearTimeout(timeout);

      const latency = Date.now() - startTime;
      const plan: GeneratedPlan = JSON.parse(response.text || "{}");

      // Validate required fields (Malformed JSON / Missing Fields fallback)
      if (!plan.goalId || !Array.isArray(plan.tasks)) {
         throw new Error("MALFORMED_JSON_RESPONSE");
      }

      // Deterministic Backend DAG Validation
      this.validateGoalGraph(plan.tasks);

      // Log AI Performance Metrics to Ledger
      await bus.publish({
        id: `evt_${Date.now()}`,
        type: ExecEventType.PlanGenerated,
        timestamp: new Date().toISOString(),
        payload: {
          ...plan,
          _aiMetrics: {
            model: 'gemini-2.5-flash',
            promptVersion: 'planner_prompt_v2.ts',
            latencyMs: latency
          }
        }
      });

      return plan;
    } catch (error) {
      if (timeout) clearTimeout(timeout);
      console.error("[GeminiPlanner] Failed to generate plan. Falling back to Mock.", error);
      throw error; // Execution core will catch and fallback to MockPlanner
    }
  }

  // Phase 2: Deterministic Backend DAG Validation
  private validateGoalGraph(tasks: any[]) {
    const taskIds = new Set(tasks.map(t => t.id));
    
    // 1. Missing node references
    for (const task of tasks) {
      if (task.dependencies) {
        for (const dep of task.dependencies) {
          if (!taskIds.has(dep)) {
            throw new Error(`MISSING_NODE: Task ${task.id} depends on non-existent task ${dep}`);
          }
        }
      }
    }

    // 2. Cycle detection (Directed Acyclic Graph)
    const visiting = new Set<string>();
    const visited = new Set<string>();

    const hasCycle = (taskId: string): boolean => {
      if (visiting.has(taskId)) return true; // Cycle detected
      if (visited.has(taskId)) return false;

      visiting.add(taskId);
      const task = tasks.find(t => t.id === taskId);
      if (task && task.dependencies) {
        for (const dep of task.dependencies) {
          if (hasCycle(dep)) return true;
        }
      }
      visiting.delete(taskId);
      visited.add(taskId);
      return false;
    };

    for (const task of tasks) {
      if (!visited.has(task.id)) {
        if (hasCycle(task.id)) {
          throw new Error(`CIRCULAR_DEPENDENCY: Graph contains a cycle starting at ${task.id}`);
        }
      }
    }
  }
}
