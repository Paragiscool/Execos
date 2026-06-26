'use client';
import React, { useEffect, useState } from 'react';
import { Strategy, StrategyEvaluation } from '../models/goal';

interface Props {
  strategies: Strategy[];
  evaluations: StrategyEvaluation[];
  onComplete: () => void;
}

export default function DecisionSimulator({ strategies, evaluations, onComplete }: Props) {
  const [visibleState, setVisibleState] = useState<'generating' | 'evaluating' | 'selected'>('generating');

  useEffect(() => {
    // Cinematic flow
    const timer1 = setTimeout(() => setVisibleState('evaluating'), 1500);
    const timer2 = setTimeout(() => setVisibleState('selected'), 3500);
    const timer3 = setTimeout(() => onComplete(), 7500); // 4 seconds to view the selection before handoff

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [onComplete]);

  // Sort so the winner is highlighted easily
  const sortedEvals = [...evaluations].sort((a, b) => b.utilityScore - a.utilityScore);
  const winnerId = sortedEvals[0]?.strategyId;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-6 font-mono text-white">
      <div className="w-full max-w-5xl">
        
        <div className="mb-8 text-center flex flex-col items-center">
          <h1 className="text-3xl font-bold tracking-widest text-blue-400 mb-2">DECISION SIMULATOR</h1>
          <p className="text-gray-400 italic text-sm mb-6 max-w-xl">
            Evaluates multiple execution strategies before committing to a plan.
          </p>
          
          <div className="flex items-center gap-3 text-[10px] uppercase tracking-widest font-bold bg-gray-900/50 px-6 py-2 rounded-full border border-gray-800">
            <span className={visibleState === 'generating' ? 'text-blue-400 animate-pulse' : 'text-green-400'}>Generated 3</span>
            <span className="text-gray-600">→</span>
            <span className={visibleState === 'evaluating' ? 'text-blue-400 animate-pulse' : visibleState === 'selected' ? 'text-green-400' : 'text-gray-500'}>Evaluated</span>
            <span className="text-gray-600">→</span>
            <span className={visibleState === 'evaluating' ? 'text-blue-400 animate-pulse' : visibleState === 'selected' ? 'text-green-400' : 'text-gray-500'}>Scored</span>
            <span className="text-gray-600">→</span>
            <span className={visibleState === 'selected' ? 'text-green-400' : 'text-gray-500'}>Selected</span>
            <span className="text-gray-600">→</span>
            <span className={visibleState === 'selected' ? 'text-blue-400 animate-pulse' : 'text-gray-500'}>Executing</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {sortedEvals.map((evaluation) => {
            const strat = strategies.find(s => s.id === evaluation.strategyId);
            const isWinner = evaluation.strategyId === winnerId;
            const showDetails = visibleState === 'evaluating' || visibleState === 'selected';
            const showWinner = visibleState === 'selected';

            return (
              <div 
                key={evaluation.strategyId}
                className={`border rounded-xl p-6 transition-all duration-1000 ${
                  showWinner && isWinner 
                    ? 'border-blue-500 bg-blue-900/20 shadow-[0_0_30px_rgba(59,130,246,0.3)] scale-105 z-10' 
                    : showWinner && !isWinner 
                      ? 'border-gray-800 bg-gray-900/30 opacity-40 scale-95'
                      : 'border-gray-700 bg-gray-800/50'
                }`}
              >
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-xl font-bold">{strat?.name}</h2>
                  {showWinner && isWinner && (
                    <span className="bg-blue-500 text-black text-xs font-bold px-2 py-1 rounded">OPTIMAL</span>
                  )}
                </div>
                <p className="text-gray-400 text-sm mb-6 h-10">{strat?.description}</p>

                {showDetails && (
                  <div className="space-y-3 border-t border-gray-700 pt-4 opacity-0 animate-[fadeIn_0.5s_ease-out_forwards]">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Mission Success</span>
                      <span className="font-bold text-green-400">{(evaluation.metrics.completionProbability * 100).toFixed(0)}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Time Debt</span>
                      <span>{(evaluation.metrics.timeDebt * 100).toFixed(0)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Stress</span>
                      <span>{(evaluation.metrics.stressLevel * 100).toFixed(0)}</span>
                    </div>
                    
                    <div className="mt-4 pt-4 border-t border-gray-700">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-gray-300 font-bold tracking-wider text-xs">EXPECTED UTILITY</span>
                        <span className={`text-lg font-bold ${isWinner ? 'text-blue-400' : 'text-white'}`}>
                          {evaluation.utilityScore.toFixed(2)}
                        </span>
                      </div>
                    </div>

                    {showWinner && isWinner && (
                      <div className="mt-4 bg-green-900/20 border border-green-900/50 rounded p-3">
                        <span className="text-green-400 text-[10px] font-bold block mb-2 tracking-widest uppercase">Selection Reason</span>
                        <ul className="text-gray-300 text-xs leading-tight list-disc pl-4 space-y-1">
                          <li>Lowest deadline risk</li>
                          <li>Lowest burnout probability</li>
                          <li>Highest execution utility</li>
                        </ul>
                      </div>
                    )}

                    {showWinner && !isWinner && (
                      <div className="mt-4 bg-red-900/20 border border-red-900/50 rounded p-3">
                        <span className="text-red-400 text-[10px] font-bold block mb-2 tracking-widest uppercase">Alternatives Rejected</span>
                        <ul className="text-gray-300 text-xs leading-tight list-disc pl-4 space-y-1">
                          <li>{evaluation.rejectionReason || "Misses policy constraints"}</li>
                        </ul>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}
