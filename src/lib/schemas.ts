// EXECOS Cognitive Memory Schemas

export type MemoryGraphNode = {
  id: string;
  type: 'goal' | 'project' | 'task' | 'calendar_event';
  title: string;
  status: 'pending' | 'in_progress' | 'completed' | 'missed';
  dependencies: string[]; // IDs of prerequisite nodes
  impacts: string[]; // IDs of nodes this impacts
  estimatedDurationMins?: number;
};

export type DecisionJournalEntry = {
  id: string;
  timestamp: string;
  decision: string;
  reasoning: string;
  confidence: number;
  alternativesConsidered: string[];
  chosen: string;
  policyEnforced?: string; // If a policy engine rule was hit
};

export type SemanticMemory = {
  userId: string;
  preferences: {
    startDelayMins: number;
    maxStudyBlockMins: number;
    preferredBreakMins: number;
  };
  skills: {
    coding: number;
    math: number;
    writing: number;
  };
  momentumTriggers: string[];
};

export type ExecutiveState = {
  missionSuccessProb: number;
  executionReadiness: number;
  timeDebt: number;
  energyLevel: number;
  stressIndex: number;
};
