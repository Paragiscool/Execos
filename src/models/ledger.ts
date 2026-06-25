// EXECOS - Immutable Execution Ledger & Event Types

import { ExecutionState } from './execution_state';

// 1. Typed Events
export enum ExecEventType {
  GoalCreated = 'GoalCreated',
  PlanningRequested = 'PlanningRequested',
  PlanGenerated = 'PlanGenerated',
  RiskCalculated = 'RiskCalculated',
  PlanApproved = 'PlanApproved',
  CalendarUpdated = 'CalendarUpdated',
  MissedBlock = 'MissedBlock',
  ReplanRequired = 'ReplanRequired',
  Replanned = 'Replanned',
  ExecutionCompleted = 'ExecutionCompleted',
  ReflectionGenerated = 'ReflectionGenerated',
  DigitalTwinUpdated = 'DigitalTwinUpdated'
}

export interface ExecEvent {
  id: string;
  type: ExecEventType;
  timestamp: string;
  payload: any;
}

// 2. Immutable Execution Ledger
export interface LedgerEntry {
  id: string; // EventID
  timestamp: string;
  eventType: ExecEventType;
  agent: string; // 'Planner', 'Risk', 'ExecutionCore', 'User'
  promptVersion?: string; // e.g. 'planner_v1.ts'
  reason: string;
  confidence: number;
  outcome: string;
  missionId?: string; // Correlation ID
  goalId?: string;
  taskId?: string;
  previousState?: ExecutionState;
  nextState?: ExecutionState;
}
