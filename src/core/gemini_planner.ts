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
          title: { type: Type.STRING },
          estimatedDurationMins: { type: Type.INTEGER },
          priority: { type: Type.INTEGER }
        },
        required: ["title", "estimatedDurationMins", "priority"]
      }
    }
  },
  required: ["goalId", "tasks"]
};

export class GeminiPlanner implements IPlanner {
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

      // Log AI Performance Metrics to Ledger
      await bus.publish({
        id: `evt_${Date.now()}`,
        type: ExecEventType.PlanGenerated,
        timestamp: new Date().toISOString(),
        payload: {
          ...plan,
          _aiMetrics: {
            model: 'gemini-2.5-flash',
            promptVersion: 'planner_prompt_v1.ts',
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
}
