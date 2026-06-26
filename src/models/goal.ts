// EXECOS - Goal Models
import { ExecutionState, StateTransition } from './execution_state';

export interface Goal {
  id: string;
  title: string;
  description: string;
  deadline?: string;
  currentState: ExecutionState;
  stateHistory: StateTransition[];
  subTasks: string[]; // IDs of tasks required to complete this goal
  priority: number; // 1-100
  createdAt: string;
  updatedAt: string;
}

export interface Task {
  id: string;
  goalId: string;
  title: string;
  estimatedDurationMins: number;
  currentState: ExecutionState;
  stateHistory: StateTransition[];
  scheduledStartTime?: string;
  scheduledEndTime?: string;
  dependencies?: string[]; // IDs of tasks that must be completed before this one
}

export interface Strategy {
  id: string;
  name: string; // e.g., 'Aggressive', 'Balanced', 'Conservative'
  description: string;
  focusAreas: string[];
  tasks: Task[]; // The proposed schedule for this strategy
}

export interface StrategyEvaluation {
  strategyId: string;
  utilityScore: number; // 0.0 to 1.0
  metrics: {
    completionProbability: number;
    stressLevel: number;
    riskLevel: number;
    opportunityCost: number;
    timeDebt: number;
  };
  rejectionReason?: string; // If not selected, why?
}
