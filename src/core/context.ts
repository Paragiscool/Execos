// EXECOS - Execution Context (Single Source of Truth)

import { Goal, Task } from '../models/goal';
import { LedgerEntry } from '../models/ledger';

export interface WorldState {
  currentTime: string;
  environment: string; // e.g., 'Finals Week', 'Normal'
}

export interface UserProfile {
  id: string;
  name: string;
}

export interface TaskTypeMetrics {
  averageDelayMins: number;
  confidenceScore: number;
  sampleCount: number;
  learningRate: number;
}

export interface BehavioralProfile {
  startDelayMins: number;
  maxFocusDurationMins: number;
  procrastinationRisk: number; // 0-100
  taskTypeMetrics: Record<string, TaskTypeMetrics>;
}

export interface ExecutionContext {
  missionId: string;
  currentTime: string;
  goals: Map<string, Goal>;
  tasks: Map<string, Task>;
  calendar: any[]; // Mock calendar events
  user: UserProfile;
  digitalTwin: BehavioralProfile;
  worldState: WorldState;
  ledger: LedgerEntry[];
  readinessScore: number; // 0-100, drives the animated readiness gauge
  worldLog: string[];     // Human-readable log of what happened
}

// Default state used by the Replay Engine to reconstruct from scratch
export const defaultContext: ExecutionContext = {
  missionId: '',
  currentTime: new Date().toISOString(),
  goals: new Map(),
  tasks: new Map(),
  calendar: [],
  user: { id: 'u_1', name: 'Demo User' },
  digitalTwin: {
    startDelayMins: 20,
    maxFocusDurationMins: 90,
    procrastinationRisk: 40,
    taskTypeMetrics: {
      'coding': { averageDelayMins: 45, confidenceScore: 60, sampleCount: 8, learningRate: 0.1 }
    }
  },
  worldState: {
    currentTime: new Date().toISOString(),
    environment: 'Finals Week'
  },
  ledger: [],
  readinessScore: 43,
  worldLog: []
};

// Live global context (the single source of truth during execution)
export const globalContext: ExecutionContext = {
  missionId: 'm_graduate_finals',
  currentTime: new Date().toISOString(),
  goals: new Map(),
  tasks: new Map(),
  calendar: [],
  user: { id: 'u_1', name: 'Demo User' },
  digitalTwin: {
    startDelayMins: 20,
    maxFocusDurationMins: 90,
    procrastinationRisk: 40,
    taskTypeMetrics: {
      'coding': { averageDelayMins: 45, confidenceScore: 60, sampleCount: 8, learningRate: 0.1 }
    }
  },
  worldState: {
    currentTime: new Date().toISOString(),
    environment: 'Finals Week'
  },
  ledger: [],
  readinessScore: 43,
  worldLog: []
};
