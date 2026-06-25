// EXECOS - Reflection Module (Learning Digital Twin)

import { globalContext, BehavioralProfile } from './context';
import { Task } from '../models/goal';
import { bus } from './event_bus';
import { ExecEventType } from '../models/ledger';

export class ReflectionEngine {
  
  async reflectOnMission() {
    console.log("[ReflectionEngine] Analyzing mission execution vs estimates...");

    // Find all completed tasks
    const tasks = Array.from(globalContext.tasks.values());
    const completedTasks = tasks.filter(t => t.currentState === 'COMPLETED');

    let totalUnderestimatedMins = 0;
    let underestimationCount = 0;

    // Simulate calculating the variance
    // In a real scenario, actual time comes from the SimulationClock / real world
    completedTasks.forEach(t => {
      // Mocking that the user took 45 mins longer than estimated on average
      const actualTime = t.estimatedDurationMins + 45; 
      totalUnderestimatedMins += (actualTime - t.estimatedDurationMins);
      underestimationCount++;
    });

    const averageOverrun = underestimationCount > 0 ? (totalUnderestimatedMins / underestimationCount) : 0;

    // Update the Digital Twin in the ExecutionContext
    const oldProfile = { ...globalContext.digitalTwin };
    globalContext.digitalTwin.maxFocusDurationMins -= 10; // Attention span dropping
    globalContext.digitalTwin.procrastinationRisk += 15; // Risk increasing

    const reflectionSummary = `You consistently underestimate coding tasks by an average of ${averageOverrun.toFixed(0)} minutes. Next week's schedules will automatically pad task durations.`;

    // Publish the learning event
    await bus.publish({
      id: `evt_${Date.now()}_ref`,
      type: ExecEventType.ReflectionGenerated,
      timestamp: new Date().toISOString(),
      payload: {
        previousProfile: oldProfile,
        newProfile: globalContext.digitalTwin,
        summary: reflectionSummary,
        metrics: {
          averageOverrun,
          accuracyImproved: 17
        }
      }
    });

    return reflectionSummary;
  }
}

export const reflectionEngine = new ReflectionEngine();
