// EXECOS - Execution State Machine Models

export enum ExecutionState {
  IDEA = 'IDEA',
  GOAL_IDENTIFIED = 'GOAL_IDENTIFIED',
  PLAN_GENERATED = 'PLAN_GENERATED',
  PLAN_APPROVED = 'PLAN_APPROVED',
  SCHEDULED = 'SCHEDULED',
  EXECUTING = 'EXECUTING',
  COMPLETED = 'COMPLETED',
  
  // Failure Paths
  MISSED = 'MISSED',
  REPLAN_REQUIRED = 'REPLAN_REQUIRED',
  REPLANNED = 'REPLANNED'
}

export interface StateTransition {
  from: ExecutionState;
  to: ExecutionState;
  timestamp: string;
  reason?: string;
}
