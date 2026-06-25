// EXECOS - Mission Orchestrator
import { bus } from '../core/event_bus';
import { ExecEventType } from '../models/ledger';

export interface MissionEvent {
  atMinutes: number; // e.g., at minute 30 of the simulation
  type: 'MISSED_TASK' | 'MEETING_CANCELLED' | 'NEW_GOAL';
  payload: any;
}

export interface MissionScenario {
  missionId: string;
  title: string;
  initialGoals: any[];
  scriptedInterruptions: MissionEvent[];
}

export class MissionOrchestrator {
  private activeMission: MissionScenario | null = null;
  
  loadScenario(scenario: MissionScenario) {
    this.activeMission = scenario;
    console.log(`[Orchestrator] Loaded Mission: ${scenario.title}`);
  }

  async runScenario() {
    if (!this.activeMission) return;
    
    // Inject initial goals to trigger the Planner -> Risk -> Execution pipeline
    for (const goal of this.activeMission.initialGoals) {
      await bus.publish({
        id: `evt_${Date.now()}_${Math.random()}`,
        type: ExecEventType.GoalCreated,
        timestamp: new Date().toISOString(),
        payload: goal
      });
    }

    // (The SimulationClock will handle triggering the scriptedInterruptions later)
  }
}

export const orchestrator = new MissionOrchestrator();
