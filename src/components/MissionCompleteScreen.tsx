'use client';
import React from 'react';

export default function MissionCompleteScreen({ onAcknowledge }: { onAcknowledge?: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="bg-gray-950 border border-gray-800 rounded-2xl p-6 sm:p-10 max-w-2xl w-full shadow-2xl relative max-h-[90vh] overflow-y-auto">
        
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500"></div>

        <h1 className="text-3xl font-bold text-white mb-2 tracking-wide">EXECUTION INTELLIGENCE REPORT</h1>
        <p className="text-gray-400 mb-8 font-mono">Mission: Graduate Without Missing Anything</p>

        {/* Mission Outcome */}
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 mb-8 flex justify-between items-center text-center">
          <div>
            <span className="text-gray-500 text-[10px] uppercase tracking-widest block mb-1">Mission Success</span>
            <span className="text-lg font-bold text-green-400">✓ Completed</span>
          </div>
          <div>
            <span className="text-gray-500 text-[10px] uppercase tracking-widest block mb-1">Expected Utility</span>
            <span className="text-lg font-bold text-blue-400">0.91</span>
          </div>
          <div>
            <span className="text-gray-500 text-[10px] uppercase tracking-widest block mb-1">Execution Confidence</span>
            <span className="text-lg font-bold text-white">94%</span>
          </div>
          <div>
            <span className="text-gray-500 text-[10px] uppercase tracking-widest block mb-1">Decision Quality</span>
            <span className="text-lg font-bold text-green-400">High</span>
          </div>
        </div>

        {/* Execution Intelligence Report */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 mb-10">
          <div>
            <span className="text-gray-500 text-xs uppercase tracking-widest block mb-1">Time Saved</span>
            <span className="text-xl font-bold text-green-400">4h 18m</span>
          </div>
          <div>
            <span className="text-gray-500 text-xs uppercase tracking-widest block mb-1">Conflicts Prevented</span>
            <span className="text-xl font-bold text-white">7</span>
          </div>
          <div>
            <span className="text-gray-500 text-xs uppercase tracking-widest block mb-1">Planner Decisions</span>
            <span className="text-xl font-bold text-white">24</span>
          </div>
          <div>
            <span className="text-gray-500 text-xs uppercase tracking-widest block mb-1">Policies Evaluated</span>
            <span className="text-xl font-bold text-white">18</span>
          </div>
          <div>
            <span className="text-gray-500 text-xs uppercase tracking-widest block mb-1">Replay Verified</span>
            <span className="text-xl font-bold text-blue-400">✓ PASS</span>
          </div>
          <div>
            <span className="text-gray-500 text-xs uppercase tracking-widest block mb-1">Digital Twin Updated</span>
            <span className="text-xl font-bold text-green-400">✓ YES</span>
          </div>
          <div className="col-span-3 border-t border-gray-800 pt-6 mt-2">
            <span className="text-gray-500 text-xs uppercase tracking-widest block mb-1">Execution Readiness Delta</span>
            <span className="text-2xl font-bold text-blue-400">43% <span className="text-gray-600 mx-3">→</span> 91%</span>
          </div>
        </div>

        {/* AI Reflection (The Killer Feature) */}
        <div className="bg-blue-900/10 border border-blue-900/50 rounded-xl p-6 relative">
          <div className="absolute -top-3 left-6 bg-gray-950 px-2 text-blue-400 text-xs font-bold uppercase tracking-widest">
            AI Reflection & Learning
          </div>
          <p className="text-gray-300 leading-relaxed font-mono text-sm mt-2">
            You consistently underestimate coding tasks by an average of <span className="text-red-400">55 minutes</span>. 
            <br/><br/>
            <span className="text-green-400">✓ Digital Twin Updated.</span> Next week's schedules will automatically allocate longer focus blocks for technical tasks.
            <br/><br/>
            Average execution accuracy improved by <span className="text-blue-400 font-bold">17%</span>.
          </p>
        </div>

        <div className="mt-8 flex justify-between items-end pt-6 border-t border-gray-800">
          <div className="text-xs font-mono text-gray-500 leading-tight">
            <div>Mission ID: <span className="text-gray-400">mission_82fd2</span></div>
            <div>Replay Hash: <span className="text-gray-400">A17B9F2C</span></div>
            <div>Ledger Events: <span className="text-gray-400">74</span></div>
            <div>State Hash: <span className="text-green-400">Verified</span></div>
          </div>
          <button 
            onClick={onAcknowledge}
            className="px-6 py-2 bg-white text-black font-bold rounded hover:bg-gray-200 transition-colors"
          >
            Acknowledge
          </button>
        </div>
      </div>
    </div>
  );
}
