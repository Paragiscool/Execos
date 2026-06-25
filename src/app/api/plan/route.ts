import { NextResponse } from 'next/server';
import { bus } from '@/core/event_bus';
import { ExecEventType } from '@/models/ledger';

export async function POST(req: Request) {
  try {
    const { goalId } = await req.json();

    // 1. Planner Agent (Mocked for Day 1 slice)
    // Normally this calls Gemini using the planner_prompt.ts JSON schema
    const plan = {
      goalId,
      tasks: [
        { title: "Research company", estimatedDurationMins: 60, priority: 100 },
        { title: "Review Resume", estimatedDurationMins: 30, priority: 80 }
      ]
    };

    // 2. Publish PlanGenerated Event
    await bus.publish({
      id: `evt_${Date.now()}`,
      type: ExecEventType.PlanGenerated,
      timestamp: new Date().toISOString(),
      payload: plan
    });

    return NextResponse.json({ success: true, plan });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to generate plan' }, { status: 500 });
  }
}
