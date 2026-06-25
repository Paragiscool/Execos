// EXECOS - Executive Intelligence Core
// Orchestrates the Decision and Action layers

import { Goal, Task } from '../models/goal';
import { ExecutionState } from '../models/execution_state';
import { globalContext } from './context';
import { bus } from './event_bus';

export class ExecutionIntelligenceCore {
  
  /**
   * Deterministic State Machine Enforcement
   */
  async advanceTaskState(task: Task, nextState: ExecutionState, reason: string): Promise<void> {
    const validTransitions: Record<ExecutionState, ExecutionState[]> = {
      [ExecutionState.IDEA]: [ExecutionState.GOAL_IDENTIFIED],
      [ExecutionState.GOAL_IDENTIFIED]: [ExecutionState.PLAN_GENERATED],
      [ExecutionState.PLAN_GENERATED]: [ExecutionState.PLAN_APPROVED],
      [ExecutionState.PLAN_APPROVED]: [ExecutionState.SCHEDULED],
      [ExecutionState.SCHEDULED]: [ExecutionState.EXECUTING, ExecutionState.MISSED],
      [ExecutionState.EXECUTING]: [ExecutionState.COMPLETED, ExecutionState.MISSED],
      [ExecutionState.MISSED]: [ExecutionState.REPLAN_REQUIRED],
      [ExecutionState.REPLAN_REQUIRED]: [ExecutionState.REPLANNED],
      [ExecutionState.REPLANNED]: [ExecutionState.SCHEDULED],
      [ExecutionState.COMPLETED]: []
    };

    const allowedNext = validTransitions[task.currentState] || [];
    if (!allowedNext.includes(nextState)) {
      throw new Error(`[State Machine Error] Illegal transition from ${task.currentState} to ${nextState} for Task ${task.id}`);
    }

    const prevState = task.currentState;
    task.currentState = nextState;
    task.stateHistory.push({
      from: prevState,
      to: nextState,
      timestamp: new Date().toISOString(),
      reason
    });

    console.log(`[Core] Task ${task.id} advanced: ${prevState} -> ${nextState}`);
    // Update Context
    globalContext.tasks.set(task.id, task);
  }
}

export const execCore = new ExecutionIntelligenceCore();
