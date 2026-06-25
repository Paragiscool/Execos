'use client';
import React from 'react';
import { useMission } from './MissionProvider';

type AgentState = 'WAITING' | 'THINKING' | 'COMPLETE';

export default function LiveAgentStatus() {
  const { currentContext, isPlaying } = useMission();
  const readiness = currentContext.readinessScore;

  // Mathematically derive agent state from readiness score
  let planner: AgentState = 'WAITING';
  let risk: AgentState = 'WAITING';
  let execution: AgentState = 'WAITING';

  if (readiness > 50) planner = 'COMPLETE';
  else if (isPlaying) planner = 'THINKING';

  if (readiness > 70) risk = 'COMPLETE';
  else if (readiness > 50 && isPlaying) risk = 'THINKING';

  if (readiness >= 87) execution = 'COMPLETE';
  else if (readiness > 70 && isPlaying) execution = 'THINKING';

  const getStatusIcon = (state: AgentState) => {
    if (state === 'WAITING') return <span className="text-gray-500">○ Waiting</span>;
    if (state === 'THINKING') return <span className="text-blue-400 animate-pulse">● Thinking</span>;
    return <span className="text-green-400">✓ Complete</span>;
  };

  return (
    <div className="bg-gray-800/50 backdrop-blur-md border border-gray-700 rounded-xl p-4 mb-4">
      <h3 className="text-xs uppercase tracking-wider text-gray-400 mb-3 font-semibold">Execution Core Status</h3>
      <div className="space-y-3 font-mono text-sm">
        <div className="flex justify-between items-center">
          <span className="text-gray-200">Planner Module</span>
          {getStatusIcon(planner)}
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-200">Risk Module</span>
          {getStatusIcon(risk)}
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-200">Execution Layer</span>
          {getStatusIcon(execution)}
        </div>
      </div>
    </div>
  );
}
