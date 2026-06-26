'use client';
import React from 'react';

// Hardcoded mock data for the dashboard to demonstrate the verification concept
const recentMissions = [
  { id: '1', name: 'Finals Week', plannedDuration: 8.0, actualDuration: 8.7, deadlineMisses: 0, conflictsPredicted: 2, conflictsObserved: 2, utility: 0.87, strategy: 'Balanced', outcome: 'Successful' },
  { id: '2', name: 'Internship Search', plannedDuration: 12.0, actualDuration: 11.5, deadlineMisses: 0, conflictsPredicted: 1, conflictsObserved: 0, utility: 0.83, strategy: 'Aggressive', outcome: 'Successful' },
  { id: '3', name: 'Research Paper', plannedDuration: 20.0, actualDuration: 26.0, deadlineMisses: 1, conflictsPredicted: 4, conflictsObserved: 5, utility: 0.78, strategy: 'Conservative', outcome: 'Partial' },
];

export default function EvaluationDashboard() {
  return (
    <div className="flex-1 flex flex-col h-full bg-[#0a0a0a] p-8 overflow-y-auto font-mono text-sm">
      <div className="mb-8 border-b border-gray-800 pb-4">
        <h1 className="text-3xl font-bold text-white tracking-widest uppercase">System Evaluation Dashboard</h1>
        <p className="text-gray-400 mt-2 italic max-w-2xl">Quantitatively proves system learning and execution accuracy over time.</p>
      </div>

      <div className="space-y-12">
        {/* System Accuracy Trends */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6 shadow-lg">
            <span className="text-blue-400 text-[10px] tracking-widest font-bold block mb-4 uppercase">Planner Accuracy Trend</span>
            <div className="flex flex-col items-center justify-center h-24 space-y-2">
              <div className="flex gap-4 items-center font-mono">
                <span className="text-gray-500">81%</span>
                <span className="text-gray-600">↑</span>
                <span className="text-gray-400">86%</span>
                <span className="text-gray-600">↑</span>
                <span className="text-gray-300">90%</span>
                <span className="text-gray-600">↑</span>
                <span className="text-green-400 font-bold">92%</span>
              </div>
              <span className="text-[10px] text-gray-500 uppercase tracking-widest">Across Last 4 Missions</span>
            </div>
          </div>
          
          <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6 shadow-lg">
            <span className="text-blue-400 text-[10px] tracking-widest font-bold block mb-4 uppercase">Digital Twin Confidence</span>
            <div className="flex flex-col items-center justify-center h-24 space-y-2">
              <div className="flex gap-4 items-center font-mono">
                <span className="text-gray-500">40%</span>
                <span className="text-gray-600">↑</span>
                <span className="text-gray-400">55%</span>
                <span className="text-gray-600">↑</span>
                <span className="text-gray-300">72%</span>
                <span className="text-gray-600">↑</span>
                <span className="text-green-400 font-bold">91%</span>
              </div>
              <span className="text-[10px] text-gray-500 uppercase tracking-widest">Across Last 4 Missions</span>
            </div>
          </div>
        </div>

        {/* Planned vs Actuals */}
        <div>
          <h2 className="text-blue-400 font-bold mb-4 uppercase tracking-widest text-xs">Planner Evaluation (Planned vs Actual)</h2>
          <div className="bg-gray-900/50 border border-gray-800 rounded-xl overflow-hidden">
            <table className="w-full text-left">
              <thead className="bg-gray-950 border-b border-gray-800 text-gray-500 uppercase text-xs">
                <tr>
                  <th className="p-4">Mission</th>
                  <th className="p-4">Duration (Plan → Actual)</th>
                  <th className="p-4">Deadline Misses</th>
                  <th className="p-4">Conflicts (Pred → Obs)</th>
                  <th className="p-4">Expected Utility</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {recentMissions.map((m) => (
                  <tr key={m.id} className="hover:bg-gray-800/50 transition-colors">
                    <td className="p-4 text-white font-medium">{m.name}</td>
                    <td className="p-4">
                      <span className="text-gray-400">{m.plannedDuration}h</span>
                      <span className="mx-2 text-gray-600">→</span>
                      <span className={m.actualDuration > m.plannedDuration ? 'text-yellow-400' : 'text-green-400'}>
                        {m.actualDuration}h
                      </span>
                    </td>
                    <td className="p-4">
                      <span className={m.deadlineMisses > 0 ? 'text-red-400' : 'text-green-400'}>{m.deadlineMisses}</span>
                    </td>
                    <td className="p-4">
                      <span className="text-gray-400">{m.conflictsPredicted}</span>
                      <span className="mx-2 text-gray-600">→</span>
                      <span className={m.conflictsObserved > m.conflictsPredicted ? 'text-yellow-400' : 'text-white'}>
                        {m.conflictsObserved}
                      </span>
                    </td>
                    <td className="p-4 text-blue-400">{m.utility}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Strategy Evaluation History */}
        <div>
          <h2 className="text-blue-400 font-bold mb-4 uppercase tracking-widest text-xs">Strategy Optimization History</h2>
          <div className="bg-gray-900/50 border border-gray-800 rounded-xl overflow-hidden">
            <table className="w-full text-left">
              <thead className="bg-gray-950 border-b border-gray-800 text-gray-500 uppercase text-xs">
                <tr>
                  <th className="p-4">Mission</th>
                  <th className="p-4">Selected Strategy</th>
                  <th className="p-4">Utility Score</th>
                  <th className="p-4">Final Outcome</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {recentMissions.map((m) => (
                  <tr key={m.id} className="hover:bg-gray-800/50 transition-colors">
                    <td className="p-4 text-gray-300">{m.name}</td>
                    <td className="p-4 text-white font-bold">{m.strategy}</td>
                    <td className="p-4 text-blue-400">{m.utility}</td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded text-xs font-bold ${m.outcome === 'Successful' ? 'bg-green-900/30 text-green-400' : 'bg-yellow-900/30 text-yellow-400'}`}>
                        {m.outcome}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}
