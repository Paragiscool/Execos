'use client';
import React, { useState } from 'react';
import LiveAgentStatus from './LiveAgentStatus';
import { useMission } from './MissionProvider';

export default function ReasoningFeed() {
  const { ledger, currentIndex } = useMission();
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null);

  // Get active events up to current index
  const activeEvents = ledger.slice(0, currentIndex + 1);

  return (
    <div className="flex flex-col h-full p-6 pb-24">
      
      {/* Top: Live Agent Status */}
      <LiveAgentStatus />

      {/* Middle: Event Timeline */}
      <div className="flex-1 overflow-y-auto mt-4 mb-6 pr-4">
        <h2 className="text-gray-400 text-sm font-semibold uppercase tracking-wider mb-4">Event Ledger</h2>
        <div className="space-y-2 font-mono text-sm">
          {activeEvents.length === 0 && (
            <div className="text-gray-500 italic p-2">Waiting for mission to start...</div>
          )}
          {activeEvents.map((evt) => (
            <div 
              key={evt.id} 
              onClick={() => setSelectedEvent(evt.id)}
              className={`flex items-center gap-4 p-2 rounded cursor-pointer transition-colors ${selectedEvent === evt.id ? 'bg-blue-900/30 border border-blue-800' : 'hover:bg-gray-800'}`}
            >
              <span className="text-gray-500 min-w-[130px] truncate text-xs">{evt.eventType}</span>
              <span className="text-green-500 font-bold shrink-0">✓</span>
              <span className={`truncate ${selectedEvent === evt.id ? 'text-blue-400 font-bold' : 'text-gray-300'}`}>{evt.outcome}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom: Explainability Panel */}
      {selectedEvent && (() => {
        const evt = ledger.find(e => e.id === selectedEvent);
        if (!evt) return null;
        return (
          <div className="bg-black border border-gray-700 rounded-xl p-5 shadow-2xl relative shrink-0 mb-16 overflow-y-auto max-h-64">
            <div className="absolute top-0 left-0 w-1 h-full bg-blue-500"></div>
            <h2 className="text-gray-400 text-xs font-semibold uppercase tracking-wider mb-4">Explainability Inspector</h2>
            
            <div className="grid grid-cols-2 gap-x-8 gap-y-4 text-sm font-mono">
              <div>
                <span className="text-gray-500 block text-xs mb-1">Decision / Event</span>
                <span className="text-white">{evt.eventType}</span>
              </div>
              <div>
                <span className="text-gray-500 block text-xs mb-1">Confidence</span>
                <span className="text-green-400 font-bold">{evt.confidence}%</span>
              </div>
              <div className="col-span-2">
                <span className="text-gray-500 block text-xs mb-1">Reasoning</span>
                <span className="text-gray-300">{evt.reason}</span>
              </div>
              
              {/* Special View for AI Decision Audit */}
              {evt.eventType === 'StrategySelected' && evt.payload?.evaluation && (
                <div className="col-span-2 mt-2 pt-4 border-t border-gray-800 bg-gray-900/50 p-4 rounded-lg">
                  <h3 className="text-blue-400 font-bold mb-3 uppercase text-[10px] tracking-widest">AI Decision Audit</h3>
                  
                  <div className="mb-4">
                    <span className="text-gray-500 block text-xs mb-1">Chosen</span>
                    <span className="text-white font-bold">{evt.payload.evaluation.name}</span>
                    <span className="text-blue-400 text-xs ml-2">(Utility: {evt.payload.evaluation.utilityScore})</span>
                  </div>

                  <div>
                    <span className="text-gray-500 block text-xs mb-2">Rejection Log</span>
                    <div className="space-y-2">
                      {/* We expect payload.strategyEvaluations to contain the full list from previous event, but for simplicity we rely on the previous StrategiesEvaluated event or pass it in payload */}
                      <div className="text-gray-400 text-xs italic">See previous StrategiesEvaluated event for full rejection breakdowns. Policy: Passed.</div>
                    </div>
                  </div>
                </div>
              )}

              <div>
                <span className="text-gray-500 block text-xs mb-1">Origin Agent</span>
                <span className="text-blue-400">{evt.agent}</span>
              </div>
            </div>
          </div>
        );
      })()}

    </div>
  );
}
