import { NextResponse } from 'next/server';
import { bus } from '@/core/event_bus';
import { ExecEventType } from '@/models/ledger';
import { policyEngine } from '@/core/policy';

export async function POST(req: Request) {
  try {
    const { taskId, action } = await req.json();

    // 1. Policy Engine Validation (Crucial step)
    const mockTask = {
      id: taskId,
      goalId: 'g_1',
      title: 'Mock Interview Prep',
      estimatedDurationMins: 60,
      currentState: 'SCHEDULED' as any,
      stateHistory: []
    };
    
    const policyResult = policyEngine.validateExecution(mockTask);
    
    if (!policyResult.passed) {
      return NextResponse.json({ 
        error: 'Execution blocked by Policy Engine', 
        violations: policyResult.violations 
      }, { status: 403 });
    }

    // 2. Execution State Machine -> Mock Calendar
    console.log("[Mock Calendar] Event scheduled successfully.");

    // 3. Publish to Ledger
    await bus.publish({
      id: `evt_${Date.now()}`,
      type: ExecEventType.CalendarUpdated,
      timestamp: new Date().toISOString(),
      payload: { taskId, status: "SUCCESS" }
    });

    return NextResponse.json({ success: true, message: 'Executed to Mock Calendar' });
  } catch (error) {
    return NextResponse.json({ error: 'Execution failed' }, { status: 500 });
  }
}
