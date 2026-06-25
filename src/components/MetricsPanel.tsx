'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { useMission } from './MissionProvider';

export default function MetricsPanel() {
  const { currentContext, telemetry } = useMission();
  const readiness = currentContext.readinessScore;

  return (
    <div className="flex flex-col h-full border-l border-gray-800 bg-[#0B0E14] p-6 pb-24 overflow-y-auto">
      
      {/* Execution Readiness Gauge */}
      <div className="mb-10">
        <h2 className="text-gray-400 text-xs font-semibold uppercase tracking-wider mb-4">Execution Readiness</h2>
        <div className="text-5xl font-bold text-white mb-4 tracking-tighter">
          {readiness}%
        </div>
        <div className="w-full bg-gray-800 h-2 rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-blue-500"
            initial={{ width: 0 }}
            animate={{ width: `${readiness}%` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
        </div>
      </div>

      {/* AI Performance Stats */}
      <div className="mb-10 flex-1">
        <h2 className="text-gray-400 text-xs font-semibold uppercase tracking-wider mb-4">AI Performance</h2>
        <div className="space-y-6 font-mono text-sm">
          
          <div className="flex justify-between items-center">
            <span className="text-gray-500">Gemini Latency</span>
            <span className="text-white">{telemetry?.latencyMs || '--'} ms</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-gray-500">Events Processed</span>
            <span className="text-green-400">{telemetry?.eventsProcessed || '--'}</span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-gray-500">Conflicts Prevented</span>
            <span className="text-gray-200">98%</span>
          </div>
        </div>
      </div>

      <div className="h-px bg-gray-800 w-full" />

      {/* Next Action Box */}
      <div className="bg-blue-900/20 border border-blue-900/50 rounded-xl p-4 shrink-0">
        <span className="text-blue-400 text-xs font-bold uppercase tracking-widest block mb-2">Next AI Action</span>
        <h3 className="text-white font-medium mb-1">Research Company</h3>
        <p className="text-gray-400 text-sm">Starts in 18 min</p>
        <div className="mt-3 text-xs text-green-400 bg-green-400/10 inline-block px-2 py-1 rounded">
          Confidence 94%
        </div>
      </div>

    </div>
  );
}
