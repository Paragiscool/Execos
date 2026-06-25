import { NextResponse } from 'next/server';
import { bus } from '@/core/event_bus';
import { ExecEventType } from '@/models/ledger';

export async function POST(req: Request) {
  try {
    const { input } = await req.json();

    // 1. Goal Intelligence Layer (Mocked for Day 1 slice)
    // Normally this would call Gemini with structured outputs
    const extractedGoal = {
      id: `goal_${Date.now()}`,
      title: "Prepare for Interview",
      rawInput: input
    };

    // 2. Publish to Event Bus (Deterministic Execution)
    await bus.publish({
      id: `evt_${Date.now()}`,
      type: ExecEventType.GoalCreated,
      timestamp: new Date().toISOString(),
      payload: extractedGoal
    });

    return NextResponse.json({ success: true, goal: extractedGoal });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to process intent' }, { status: 500 });
  }
}
