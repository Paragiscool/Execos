// EXECOS - Mission Replay Engine (Event Sourcing)

import { LedgerEntry, ExecEventType } from '../models/ledger';
import { ExecutionContext, defaultContext } from './context';

export class ReplayEngine {
  private ledger: LedgerEntry[] = [];
  private currentEventIndex: number = -1;
  private reconstructedContext: ExecutionContext;

  constructor(missionLedger: LedgerEntry[]) {
    this.ledger = missionLedger;
    // We always start with a clean state before replaying events
    // Deep clone — Maps can't be JSON serialized, so we rebuild them
    this.reconstructedContext = this.cloneContext(defaultContext);
  }

  private cloneContext(ctx: ExecutionContext): ExecutionContext {
    return {
      ...ctx,
      goals: new Map(ctx.goals),
      tasks: new Map(ctx.tasks),
      calendar: [...ctx.calendar],
      digitalTwin: { ...ctx.digitalTwin },
      worldState: { ...ctx.worldState },
      ledger: [...ctx.ledger],
      worldLog: [...ctx.worldLog]
    };
  }

  // Event Sourcing: Reconstructs state up to a specific index
  public replayToIndex(targetIndex: number): ExecutionContext {
    if (targetIndex < -1 || targetIndex >= this.ledger.length) return this.reconstructedContext;
    
    // Reset to clean slate
    this.reconstructedContext = this.cloneContext(defaultContext);
    
    // Sequentially apply events
    for (let i = 0; i <= targetIndex; i++) {
      this.applyEvent(this.ledger[i]);
    }
    
    this.currentEventIndex = targetIndex;
    return this.reconstructedContext;
  }

  public nextEvent(): ExecutionContext | null {
    if (this.currentEventIndex < this.ledger.length - 1) {
      this.currentEventIndex++;
      this.applyEvent(this.ledger[this.currentEventIndex]);
      return this.reconstructedContext;
    }
    return null;
  }

  public previousEvent(): ExecutionContext {
    // To go backwards in event sourcing, we must replay from scratch up to current - 1
    if (this.currentEventIndex > -1) {
      return this.replayToIndex(this.currentEventIndex - 1);
    }
    return this.reconstructedContext;
  }

  private applyEvent(entry: LedgerEntry) {
    // State Mutation Logic based on Event Type
    switch (entry.eventType) {
      case ExecEventType.GoalCreated:
        this.reconstructedContext.worldLog.push(`Goal Added: ${entry.reason}`);
        this.reconstructedContext.readinessScore = 43;
        break;
      case ExecEventType.PlanGenerated:
        this.reconstructedContext.readinessScore = 58;
        if (entry.payload?.tasks) {
          entry.payload.tasks.forEach((t: any) => {
            this.reconstructedContext.tasks.set(t.id, t);
          });
        }
        break;
      case ExecEventType.RiskCalculated:
        this.reconstructedContext.readinessScore = 71;
        break;
      case ExecEventType.PlanApproved:
        this.reconstructedContext.readinessScore = 87;
        break;
      case ExecEventType.MissedBlock:
        this.reconstructedContext.readinessScore = 71;
        break;
      case ExecEventType.Replanned:
        this.reconstructedContext.readinessScore = 91;
        break;
      case ExecEventType.ReflectionGenerated:
        // Digital twin learning applied
        this.reconstructedContext.worldLog.push(`Reflection: ${entry.reason}`);
        // Maintain the final readiness
        if (this.reconstructedContext.readinessScore < 91) {
          this.reconstructedContext.readinessScore = 91;
        }
        break;
    }

    // Clamp readiness to 0-100
    this.reconstructedContext.readinessScore = Math.max(0, Math.min(100, this.reconstructedContext.readinessScore));
  }

  public getCurrentIndex() {
    return this.currentEventIndex;
  }

  public getLedgerLength() {
    return this.ledger.length;
  }

  public getCurrentContext() {
    return this.reconstructedContext;
  }
}
