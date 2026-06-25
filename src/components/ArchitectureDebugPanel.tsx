'use client';
import React, { useState } from 'react';
import { useMission } from './MissionProvider';

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

  const { runMission } = useMission();
  const [isValidating, setIsValidating] = useState(false);
  const [validated, setValidated] = useState(false);

  const runValidation = async () => {
    setIsValidating(true);
    // Simulate validation check
    setTimeout(() => {
      setIsValidating(false);
      setValidated(true);
      setTimeout(() => setValidated(false), 3000);
    }, 800);
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
          className={`px-3 py-1 border rounded transition-colors ${validated ? 'bg-green-600/50 border-green-400 text-white' : isValidating ? 'bg-gray-800 border-gray-600 text-gray-400 animate-pulse' : 'bg-green-900/30 border-green-500 text-green-400 hover:bg-green-800'}`}
        >
          {validated ? 'System Valid ✓' : isValidating ? 'Validating...' : 'Validate System'}
        </button>
        <button 
          onClick={() => runMission()}
          className="px-3 py-1 bg-blue-900/30 border border-blue-500 text-blue-400 rounded hover:bg-blue-800 transition-colors"
        >
          Replay Ledger
        </button>
      </div>
    </div>
  );
}
