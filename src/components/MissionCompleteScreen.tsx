'use client';
import React from 'react';

export default function MissionCompleteScreen({ onAcknowledge }: { onAcknowledge?: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="bg-gray-950 border border-gray-800 rounded-2xl p-6 sm:p-10 max-w-2xl w-full shadow-2xl relative max-h-[90vh] overflow-y-auto">
        
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500"></div>

        <h1 className="text-3xl font-bold text-white mb-2 tracking-wide">MISSION COMPLETE</h1>
        <p className="text-gray-400 mb-8 font-mono">Mission: Graduate Without Missing Anything</p>

        {/* Demo Telemetry */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-10">
          <div>
            <span className="text-gray-500 text-xs uppercase tracking-widest block mb-1">Mission Completed</span>
            <span className="text-xl font-bold text-white">17.3 sec</span>
          </div>
          <div>
            <span className="text-gray-500 text-xs uppercase tracking-widest block mb-1">Planner Decisions</span>
            <span className="text-xl font-bold text-white">24</span>
          </div>
          <div>
            <span className="text-gray-500 text-xs uppercase tracking-widest block mb-1">Events Processed</span>
            <span className="text-xl font-bold text-white">68</span>
          </div>
          <div>
            <span className="text-gray-500 text-xs uppercase tracking-widest block mb-1">Policies Evaluated</span>
            <span className="text-xl font-bold text-white">14</span>
          </div>
          <div>
            <span className="text-gray-500 text-xs uppercase tracking-widest block mb-1">Fallbacks</span>
            <span className="text-xl font-bold text-gray-500">0</span>
          </div>
          <div>
            <span className="text-gray-500 text-xs uppercase tracking-widest block mb-1">Replay Verified</span>
            <span className="text-xl font-bold text-green-400">✓ Yes</span>
          </div>
          <div className="col-span-2">
            <span className="text-gray-500 text-xs uppercase tracking-widest block mb-1">Execution Readiness</span>
            <span className="text-xl font-bold text-blue-400">43% <span className="text-gray-500 mx-2">→</span> 91%</span>
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

        <div className="mt-10 flex justify-end">
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
