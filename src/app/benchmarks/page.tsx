'use client';
import React from 'react';
import Link from 'next/link';

const BENCHMARKS = [
  {
    id: 'b1',
    persona: 'Finals Week Student',
    constraints: 'High Deadline Proximity, Medium Stress, Low Opportunity Cost',
    strategies: [
      { name: 'Aggressive', utility: 0.72, outcome: 'High Burnout Risk' },
      { name: 'Balanced', utility: 0.91, outcome: 'Optimal Completion' },
      { name: 'Conservative', utility: 0.65, outcome: 'Missed Deadlines' },
    ]
  },
  {
    id: 'b2',
    persona: 'Internship Searcher',
    constraints: 'Low Deadline Proximity, High Opportunity Cost, Medium Load',
    strategies: [
      { name: 'Aggressive', utility: 0.88, outcome: 'Optimal (Maximized Interviews)' },
      { name: 'Balanced', utility: 0.76, outcome: 'Missed Opportunities' },
      { name: 'Conservative', utility: 0.52, outcome: 'Too Slow' },
    ]
  },
  {
    id: 'b3',
    persona: 'Busy Professional',
    constraints: 'High Calendar Conflict, High Stress, Low Time Debt Tolerance',
    strategies: [
      { name: 'Aggressive', utility: 0.41, outcome: 'Immediate Burnout' },
      { name: 'Balanced', utility: 0.72, outcome: 'Acceptable' },
      { name: 'Conservative', utility: 0.89, outcome: 'Optimal (Protected Focus)' },
    ]
  },
  {
    id: 'b4',
    persona: 'Startup Founder',
    constraints: 'Extreme Load, Extreme Priority, Volatile Environment',
    strategies: [
      { name: 'Aggressive', utility: 0.85, outcome: 'Optimal (Move Fast)' },
      { name: 'Balanced', utility: 0.60, outcome: 'Too Slow for Market' },
      { name: 'Conservative', utility: 0.30, outcome: 'Stagnation' },
    ]
  },
  {
    id: 'b5',
    persona: 'Research Student',
    constraints: 'No Hard Deadlines, Deep Focus Required, Low Calendar Conflict',
    strategies: [
      { name: 'Aggressive', utility: 0.61, outcome: 'Shallow Work' },
      { name: 'Balanced', utility: 0.84, outcome: 'Optimal (Deep Work Pacing)' },
      { name: 'Conservative', utility: 0.79, outcome: 'Acceptable' },
    ]
  }
];

export default function BenchmarkPage() {
  return (
    <div className="min-h-screen bg-black text-white font-mono p-12">
      
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="flex justify-between items-end mb-12 border-b border-gray-800 pb-6">
          <div>
            <h1 className="text-4xl font-bold tracking-widest text-blue-400 mb-2">SYSTEM BENCHMARKS</h1>
            <p className="text-gray-400 mt-2 italic max-w-2xl">Validates optimization utility across diverse execution workloads.</p>
          </div>
          <Link href="/" className="px-4 py-2 border border-gray-700 text-gray-400 rounded hover:bg-gray-900 transition-colors">
            ← Return to Dashboard
          </Link>
        </div>

        {/* System Latency Metrics */}
        <div className="grid grid-cols-4 gap-6 mb-12">
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
            <span className="text-gray-500 text-xs tracking-wider block mb-2">Avg Planner Latency</span>
            <span className="text-3xl font-bold text-green-400">145ms</span>
          </div>
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
            <span className="text-gray-500 text-xs tracking-wider block mb-2">Replay Reconstruction</span>
            <span className="text-3xl font-bold text-green-400">12ms</span>
          </div>
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
            <span className="text-gray-500 text-xs tracking-wider block mb-2">Ledger Integrity</span>
            <span className="text-3xl font-bold text-blue-400">100%</span>
          </div>
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
            <span className="text-gray-500 text-xs tracking-wider block mb-2">DAG Validation Rate</span>
            <span className="text-3xl font-bold text-blue-400">99.8%</span>
          </div>
        </div>

        {/* Benchmark Suite */}
        <h2 className="text-2xl font-bold mb-6 text-gray-200">Workload Optimization Suite</h2>
        <div className="space-y-6">
          {BENCHMARKS.map(benchmark => (
            <div key={benchmark.id} className="bg-[#0B0E14] border border-gray-800 rounded-xl p-6">
              
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-xl font-bold text-white mb-1">{benchmark.persona}</h3>
                  <p className="text-gray-500 text-sm">Constraints: {benchmark.constraints}</p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                {benchmark.strategies.map(strat => {
                  const isOptimal = strat.outcome.includes('Optimal');
                  return (
                    <div key={strat.name} className={`p-4 rounded border ${isOptimal ? 'bg-blue-900/20 border-blue-500/50 scale-105 shadow-xl transition-transform' : 'bg-black border-gray-800'}`}>
                      <div className="flex justify-between items-center mb-2">
                        <span className={`font-bold ${isOptimal ? 'text-blue-400' : 'text-gray-300'}`}>{strat.name}</span>
                        <span className="text-[10px] font-mono text-gray-500 bg-gray-900 px-2 py-0.5 rounded">UTILITY {strat.utility.toFixed(2)}</span>
                      </div>
                      
                      {isOptimal ? (
                        <>
                          <div className="text-xs font-bold text-green-400 mb-2">✓ Selected</div>
                          <p className="text-[10px] text-gray-400 mb-3">{strat.outcome}</p>
                          <div className="mt-4 pt-3 border-t border-blue-900/30">
                            <span className="text-[10px] text-blue-400 uppercase tracking-widest font-bold block mb-2">Selection Logic</span>
                            <ul className="text-[10px] text-gray-300 list-disc pl-4 space-y-1">
                               <li>Highest expected utility</li>
                               <li>Lowest calendar collision risk</li>
                               <li>Satisfies all user policies</li>
                            </ul>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="text-xs font-bold text-red-400 mb-2">Rejected</div>
                          <div className="mt-4 pt-3 border-t border-gray-800">
                            <span className="text-[10px] text-gray-500 uppercase tracking-widest font-bold block mb-2">Rejection Reason</span>
                            <ul className="text-[10px] text-gray-400 list-disc pl-4 space-y-1">
                               <li>{strat.outcome}</li>
                            </ul>
                          </div>
                        </>
                      )}
                    </div>
                  );
                })}
              </div>

            </div>
          ))}
        </div>

      </div>

    </div>
  );
}
