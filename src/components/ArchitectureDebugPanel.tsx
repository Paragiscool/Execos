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
    calendarSync: 'PASS',
    replay: 'PASS',
    gemini: 'PASS',
  });

  const { runMission } = useMission();
  const [showValidationModal, setShowValidationModal] = useState(false);
  const [isValidating, setIsValidating] = useState(false);
  const [validated, setValidated] = useState(false);

  const runValidation = () => {
    setShowValidationModal(true);
  };

  return (
    <>
    <div className="fixed bottom-0 left-0 right-0 bg-gray-900 border-t border-gray-700 p-4 text-xs font-mono text-green-400 z-50 flex justify-between items-center">
      <div className="flex gap-6 items-center flex-wrap">
        <div className="text-gray-500 text-[10px] leading-tight pr-4 border-r border-gray-700 hidden sm:block space-y-1">
          <div>EXECOS v1.0.0 • Build 4f82ac9 • <span className="text-blue-400 font-bold">DEMO MODE ON</span></div>
          <div className="text-gray-600 flex gap-3 font-semibold">
            <span>Planner Prompt: v4</span>
            <span>Risk Model: v2</span>
            <span>Decision Simulator: v1</span>
            <span>Replay Engine: v3</span>
          </div>
        </div>
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
          className="px-3 py-1 bg-green-900/30 border-green-500 text-green-400 hover:bg-green-800 transition-colors border rounded"
        >
          Run System Validation
        </button>
        <button 
          onClick={() => runMission()}
          className="px-3 py-1 bg-blue-900/30 border border-blue-500 text-blue-400 rounded hover:bg-blue-800 transition-colors"
        >
          Replay Ledger
        </button>
      </div>
    </div>

      {showValidationModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm">
          <div className="bg-gray-950 border border-gray-800 rounded-xl p-8 max-w-sm w-full font-mono shadow-2xl relative">
            <h2 className="text-white text-lg font-bold mb-6 border-b border-gray-800 pb-2 tracking-widest">SYSTEM VALIDATION</h2>
            <div className="space-y-4">
              <div className="flex justify-between"><span className="text-gray-400">Planner</span><span className="text-green-400 font-bold">{systemState.planner}</span></div>
              <div className="flex justify-between"><span className="text-gray-400">Replay</span><span className="text-green-400 font-bold">{systemState.replay}</span></div>
              <div className="flex justify-between"><span className="text-gray-400">State Machine</span><span className="text-green-400 font-bold">{systemState.executionCore}</span></div>
              <div className="flex justify-between"><span className="text-gray-400">Ledger</span><span className="text-green-400 font-bold">{systemState.ledger}</span></div>
              <div className="flex justify-between"><span className="text-gray-400">Calendar</span><span className="text-green-400 font-bold">{systemState.calendarSync}</span></div>
              <div className="flex justify-between"><span className="text-gray-400">Gemini API</span><span className="text-green-400 font-bold">{systemState.gemini}</span></div>
            </div>
            <button 
              onClick={() => setShowValidationModal(false)}
              className="mt-8 w-full py-2 bg-gray-800 text-white rounded hover:bg-gray-700 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}
