// EXECOS - Typed Event Bus

import { ExecEvent, ExecEventType } from '../models/ledger';

type EventHandler = (event: ExecEvent) => Promise<void>;

export class EventBus {
  private listeners: Map<ExecEventType, EventHandler[]> = new Map();

  subscribe(type: ExecEventType, handler: EventHandler) {
    if (!this.listeners.has(type)) {
      this.listeners.set(type, []);
    }
    this.listeners.get(type)!.push(handler);
  }

  async publish(event: ExecEvent) {
    console.log(`[EventBus] ${event.timestamp} | ${event.type}`, event.payload);
    
    // In a real app, this is where we also append to the immutable Execution Ledger
    // appendToLedger(event)
    
    const handlers = this.listeners.get(event.type) || [];
    for (const handler of handlers) {
      // Execute deterministically
      await handler(event);
    }
  }
}

export const bus = new EventBus();
