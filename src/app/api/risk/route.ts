import { NextResponse } from 'next/server';
import { bus } from '@/core/event_bus';
import { ExecEventType } from '@/models/ledger';

export async function POST(req: Request) {
  try {
    const { planId } = await req.json();

    // 1. Risk Engine (Mocked for Day 1 slice)
    // Normally uses Risk Prompt to evaluate plan constraints
    const riskAssessment = {
      planId,
      executionReadiness: 87,
      deadlineRisk: 12,
      timeDebt: 25,
      recommendations: ["Shift 3 PM block to morning to reduce time debt."]
    };

    // 2. Publish RiskCalculated Event
    await bus.publish({
      id: `evt_${Date.now()}`,
      type: ExecEventType.RiskCalculated,
      timestamp: new Date().toISOString(),
      payload: riskAssessment
    });

    return NextResponse.json({ success: true, riskAssessment });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to assess risk' }, { status: 500 });
  }
}
