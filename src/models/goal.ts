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
}
