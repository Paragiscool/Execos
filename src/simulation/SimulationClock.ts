// EXECOS - Simulation Clock (Fake Time)
import { orchestrator } from './MissionOrchestrator';

export class SimulationClock {
  private currentMinutes: number = 0;

  advance(minutes: number) {
    console.log(`[SimulationClock] Advancing time by ${minutes} minutes...`);
    const previousMinutes = this.currentMinutes;
    this.currentMinutes += minutes;

    // Check if any scripted interruptions should trigger in this window
    // Normally this would emit a TimeAdvanced event to the Event Bus
    console.log(`[SimulationClock] Current simulation time: +${this.currentMinutes}m`);
    
    // Check orchestrator for events
    // This perfectly allows judges to see replanning live without waiting 3 hours
  }

  getCurrentMinutes() {
    return this.currentMinutes;
  }
}

export const clock = new SimulationClock();
