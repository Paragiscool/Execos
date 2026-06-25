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

export interface BehavioralProfile {
  startDelayMins: number;
  maxFocusDurationMins: number;
  procrastinationRisk: number; // 0-100
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
}

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
    procrastinationRisk: 40
  },
  worldState: {
    currentTime: new Date().toISOString(),
    environment: 'Finals Week'
  },
  ledger: []
};
