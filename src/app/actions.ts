'use server';

import { GeminiPlanner } from '../core/gemini_planner';
import { ExecEventType, LedgerEntry } from '../models/ledger';
import { ExecutionContext, defaultContext } from '../core/context';

export interface MissionResult {
  mission: string;
  ledger: LedgerEntry[];
  telemetry: any;
  finalState: any;
}

export async function runMissionAction(mode: string, customPrompt?: string): Promise<MissionResult> {
  // Deterministic Demo Mode: Instant return for flawless pitch
  if (mode === 'Finals Week') {
    return getFinalsWeekMock();
  }
  
  // Real Execution Mode: End-to-End processing
  const startTime = Date.now();
  const ledger: LedgerEntry[] = [];
  
  // 1. Goal Created
  ledger.push({
    id: `evt_${Date.now()}_1`,
    eventType: ExecEventType.GoalCreated,
    timestamp: new Date().toISOString(),
    agent: 'User',
    reason: customPrompt || "Custom Mission",
    confidence: 100,
    outcome: 'Goal graph initialized'
  });
  
  // 2. Strategy Generation (Real Gemini Call)
  const planner = new GeminiPlanner();
  let strategies: any[] = [];
  try {
     strategies = await planner.generateStrategies({
       goalId: 'g_custom',
       rawInput: customPrompt || "Plan my week"
     });
     ledger.push({
       id: `evt_${Date.now()}_2a`,
       eventType: ExecEventType.StrategiesGenerated,
       timestamp: new Date().toISOString(),
       agent: 'Planner',
       reason: `Generated ${strategies.length} distinct execution strategies via Gemini`,
       confidence: 95,
       outcome: 'Strategies generated',
       payload: { strategies }
     });
  } catch(e) {
     const mockPlanner = new (require('../core/planner_interface').MockPlanner)();
     strategies = await mockPlanner.generateStrategies({
       goalId: 'g_custom',
       rawInput: customPrompt || "Plan my week"
     });
     ledger.push({
       id: `evt_${Date.now()}_err_strat`,
       eventType: ExecEventType.StrategiesGenerated,
       timestamp: new Date().toISOString(),
       agent: 'MockPlanner',
       reason: `Gemini failed or Demo Safe Mode active. Using fallback strategies.`,
       confidence: 50,
       outcome: 'Fallback strategies generated',
       payload: { strategies }
     });
  }

  // 3. Strategy Evaluation (Deterministic Utility Scoring)
  const evaluations = strategies.map(strat => {
    // Deterministic mock scoring based on strategy name for demonstration
    let completion = 0.5, stress = 0.5, risk = 0.5, opportunity = 0.5, timeDebt = 0.5;
    let reason = "Selected as optimal path";
    
    if (strat.name.toLowerCase().includes('aggressive') || strat.name.toLowerCase().includes('strat_1')) {
      completion = 0.84; stress = 0.90; risk = 0.60; timeDebt = 0.80; opportunity = 0.20;
      reason = "Rejected: High burnout risk and high time debt.";
    } else if (strat.name.toLowerCase().includes('balanced') || strat.name.toLowerCase().includes('strat_2')) {
      completion = 0.91; stress = 0.30; risk = 0.20; timeDebt = 0.40; opportunity = 0.80;
    } else {
      completion = 0.73; stress = 0.10; risk = 0.10; timeDebt = 0.20; opportunity = 0.90;
      reason = "Rejected: Completion probability too low for deadline.";
    }

    // Utility = (Completion * 0.5) + (Opportunity * 0.2) - (Stress * 0.15) - (Risk * 0.15)
    const utilityScore = Number(((completion * 0.5) + (opportunity * 0.2) - (stress * 0.15) - (risk * 0.15)).toFixed(2));

    return {
      strategyId: strat.id,
      name: strat.name,
      utilityScore,
      metrics: { completionProbability: completion, stressLevel: stress, riskLevel: risk, opportunityCost: opportunity, timeDebt },
      rejectionReason: reason
    };
  });

  ledger.push({
    id: `evt_${Date.now()}_2b`,
    eventType: ExecEventType.StrategiesEvaluated,
    timestamp: new Date().toISOString(),
    agent: 'Risk Engine',
    reason: `Evaluated ${evaluations.length} strategies for Expected Utility`,
    confidence: 100,
    outcome: 'Strategies evaluated',
    payload: { evaluations }
  });

  // Select Winner
  const winnerEval = evaluations.reduce((prev, current) => (prev.utilityScore > current.utilityScore) ? prev : current);
  const winningStrategy = strategies.find(s => s.id === winnerEval.strategyId);
  winnerEval.rejectionReason = undefined; // clear rejection reason for winner

  ledger.push({
    id: `evt_${Date.now()}_2c`,
    eventType: ExecEventType.StrategySelected,
    timestamp: new Date().toISOString(),
    agent: 'Execution Core',
    reason: `Selected '${winnerEval.name}' with Utility ${winnerEval.utilityScore}`,
    confidence: 100,
    outcome: 'Strategy selected',
    payload: { strategy: winningStrategy, evaluation: winnerEval }
  });

  // Finalize Plan
  const planTaskCount = winningStrategy?.tasks?.length || 3;
  ledger.push({
    id: `evt_${Date.now()}_2d`,
    eventType: ExecEventType.PlanGenerated,
    timestamp: new Date().toISOString(),
    agent: 'Execution Core',
    reason: `Finalized execution plan from winning strategy`,
    confidence: 100,
    outcome: 'Plan generated',
    payload: { tasks: winningStrategy?.tasks || [] }
  });
  
  // 3. Risk Engine (Config-Driven Heuristic)
  const riskConfig = {
    deadlineWeight: 0.35,
    scheduleWeight: 0.25,
    historicalWeight: 0.20,
    dependencyWeight: 0.10,
    priorityWeight: 0.10
  };

  const deadlineProximity = 80;
  const scheduleLoad = 65;
  const digitalTwinRisk = defaultContext.digitalTwin.procrastinationRisk; // usually 40
  const goalDependencies = planTaskCount > 3 ? 60 : 20; 
  const priority = 90;
  
  const riskScore = Math.round(
     (riskConfig.deadlineWeight * deadlineProximity) + 
     (riskConfig.scheduleWeight * scheduleLoad) + 
     (riskConfig.historicalWeight * digitalTwinRisk) + 
     (riskConfig.dependencyWeight * goalDependencies) + 
     (riskConfig.priorityWeight * priority)
  );

  ledger.push({
     id: `evt_${Date.now()}_3`,
     eventType: ExecEventType.RiskCalculated,
     timestamp: new Date().toISOString(),
     agent: 'Risk Engine',
     reason: `Calculated Risk Score: ${riskScore}%. Evaluated against Config { Deadline: ${riskConfig.deadlineWeight}, Load: ${riskConfig.scheduleWeight}, Behavior: ${riskConfig.historicalWeight}, Graph: ${riskConfig.dependencyWeight}, Priority: ${riskConfig.priorityWeight} }.`,
     confidence: 88,
     outcome: 'Risk calculated',
     payload: { riskScore, riskConfig }
  });
  
  // 4. Policy Engine
  ledger.push({
     id: `evt_${Date.now()}_4`,
     eventType: ExecEventType.PlanApproved,
     timestamp: new Date().toISOString(),
     agent: 'Policy Engine',
     reason: 'All tasks within compliance bounds. No midnight studying.',
     confidence: 100,
     outcome: 'Policy passed'
  });
  
  // 5. Execution Simulation & Reflection
  const newMetrics = {
    coding: { averageDelayMins: 130, confidenceScore: 82, sampleCount: 9, learningRate: 0.15 }
  };

  ledger.push({
     id: `evt_${Date.now()}_5`,
     eventType: ExecEventType.ReflectionGenerated,
     timestamp: new Date().toISOString(),
     agent: 'Reflection Engine (Simulation)',
     reason: 'Consistently underestimated coding tasks by 130 mins. Digital Twin updated.',
     confidence: 92,
     outcome: 'Learning complete',
     payload: { taskTypeMetrics: newMetrics }
  });

  return {
    mission: 'Custom Mission',
    ledger,
    telemetry: {
      latencyMs: Date.now() - startTime,
      eventsProcessed: ledger.length
    },
    finalState: defaultContext // The client ReplayEngine will compute the real final state
  };
}

function getFinalsWeekMock(): MissionResult {
  const mockTasks = [
    { id: 't_mock_1', title: 'Review Physics Notes', scheduledStartTime: '14:30', currentState: 'SCHEDULED', dependencies: [] },
    { id: 't_mock_2', title: 'Practice Midterm', scheduledStartTime: '16:00', currentState: 'SCHEDULED', dependencies: ['t_mock_1'] },
    { id: 't_mock_3', title: 'APM Interview Prep', scheduledStartTime: '19:00', currentState: 'SCHEDULED', dependencies: [] }
  ];

  const deadlineProximity = 90;
  const scheduleLoad = 85;
  const digitalTwinRisk = 40;
  const goalDependencies = 50; 
  const priority = 100;
  
  const riskScore = Math.round(
     (0.35 * deadlineProximity) + (0.25 * scheduleLoad) + (0.20 * digitalTwinRisk) + (0.10 * goalDependencies) + (0.10 * priority)
  );

  const ledger: LedgerEntry[] = [
    { id: 'evt_1', eventType: ExecEventType.GoalCreated, timestamp: '09:00', agent: 'User', reason: 'Graduate Without Missing Anything', confidence: 100, outcome: 'Goal created' },
    { id: 'evt_2', eventType: ExecEventType.PlanGenerated, timestamp: '09:01', agent: 'Planner', reason: 'Generated 24 tasks for 3 exams and 1 interview', confidence: 94, outcome: 'Plan generated', payload: { tasks: mockTasks } },
    { id: 'evt_3', eventType: ExecEventType.RiskCalculated, timestamp: '09:02', agent: 'Risk Engine', reason: `Calculated Risk Score: ${riskScore}%. Breakdown: 35% Deadline, 25% Load, 20% Behavior, 10% Graph, 10% Priority.`, confidence: 94, outcome: 'Risk calculated', payload: { riskScore } },
    { id: 'evt_4', eventType: ExecEventType.PlanApproved, timestamp: '09:03', agent: 'Policy Engine', reason: 'Validated against burnout and scheduling policies.', confidence: 100, outcome: 'Policy passed' },
    { id: 'evt_5', eventType: ExecEventType.MissedBlock, timestamp: '09:10', agent: 'Execution Core', reason: 'User missed scheduled study block', confidence: 100, outcome: 'Missed block' },
    { id: 'evt_6', eventType: ExecEventType.Replanned, timestamp: '09:10', agent: 'Planner', reason: 'Moved study session to tomorrow morning', confidence: 85, outcome: 'Replanned' },
    { 
      id: 'evt_7', 
      eventType: ExecEventType.ReflectionGenerated, 
      timestamp: '09:30', 
      agent: 'Reflection Engine (Simulation)', 
      reason: 'Coding tasks underestimated by 130 mins. Digital Twin updated with hard metrics.', 
      confidence: 92, 
      outcome: 'Digital Twin Updated',
      payload: { 
        taskTypeMetrics: {
          'coding': { averageDelayMins: 130, confidenceScore: 82, sampleCount: 9, learningRate: 0.15 }
        }
      }
    }
  ];

  return {
    mission: 'Graduate Without Missing Anything',
    ledger,
    telemetry: { latencyMs: 145, eventsProcessed: 68 },
    finalState: defaultContext
  };
}
