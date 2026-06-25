// EXECOS - Policy Engine Validation Layer

import { Task } from '../models/goal';

export enum PolicyViolationLevel {
  WARNING = 'WARNING', // Can be overridden
  BLOCKER = 'BLOCKER'  // Hard fail
}

export interface PolicyResult {
  passed: boolean;
  violations: { rule: string; level: PolicyViolationLevel }[];
}

export class PolicyEngine {
  
  validateExecution(task: Task): PolicyResult {
    const violations: { rule: string; level: PolicyViolationLevel }[] = [];

    // Rule 1: Never move interviews automatically
    if (task.title.toLowerCase().includes('interview') && !task.scheduledStartTime /* mock condition */) {
      violations.push({ rule: 'Cannot auto-reschedule high-stakes interviews', level: PolicyViolationLevel.BLOCKER });
    }

    // Rule 2: Never schedule past midnight
    if (task.scheduledEndTime) {
      const hour = new Date(task.scheduledEndTime).getHours();
      if (hour >= 0 && hour < 5) {
        violations.push({ rule: 'Scheduling past midnight violates deep rest policy', level: PolicyViolationLevel.BLOCKER });
      }
    }

    // Rule 3: Maximum study block is 3 hours
    if (task.estimatedDurationMins > 180) {
      violations.push({ rule: 'Task duration exceeds maximum focus block (3 hours)', level: PolicyViolationLevel.WARNING });
    }

    return {
      passed: violations.filter(v => v.level === PolicyViolationLevel.BLOCKER).length === 0,
      violations
    };
  }
}

export const policyEngine = new PolicyEngine();
