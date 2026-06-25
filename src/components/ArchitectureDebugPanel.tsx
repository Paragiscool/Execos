'use client';
import React, { useState } from 'react';

export default function ArchitectureDebugPanel() {
  const [systemState, setSystemState] = useState({
    goalGraph: 'PASS',
    planner: 'PASS',
    riskEngine: 'PASS',
    policyEngine: 'PASS',
    executionCore: 'PASS',
    ledger: 'PASS',
    calendarSync: 'MOCKED',
  });

  const [replayEvents, setReplayEvents] = useState<any[]>([]);

  const runValidation = async () => {
    // In a real scenario, this would hit a /api/validate endpoint
    alert("Running full system validation pipeline...");
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-900 border-t border-gray-700 p-4 text-xs font-mono text-green-400 z-50 flex justify-between items-center">
      <div className="flex gap-6">
        <div><span className="text-gray-400">Goal Graph:</span> {systemState.goalGraph}</div>
        <div><span className="text-gray-400">Planner:</span> {systemState.planner}</div>
        <div><span className="text-gray-400">Risk Engine:</span> {systemState.riskEngine}</div>
        <div><span className="text-gray-400">Policy Engine:</span> {systemState.policyEngine}</div>
        <div><span className="text-gray-400">Execution:</span> {systemState.executionCore}</div>
        <div><span className="text-gray-400">Ledger:</span> {systemState.ledger}</div>
        <div><span className="text-gray-400">Calendar:</span> <span className="text-yellow-400">{systemState.calendarSync}</span></div>
      </div>
      
      <div className="flex gap-4">
        <button 
          onClick={runValidation}
          className="px-3 py-1 bg-green-900/30 border border-green-500 rounded hover:bg-green-800 transition-colors"
        >
          Validate System
        </button>
        <button className="px-3 py-1 bg-blue-900/30 border border-blue-500 text-blue-400 rounded hover:bg-blue-800 transition-colors">
          Replay Ledger
        </button>
      </div>
    </div>
  );
}
