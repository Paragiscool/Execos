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
        <div className="w-full bg-gray-800 h-2 rounded-full overflow-hidden mb-4">
          <motion.div 
            className="h-full bg-blue-500"
            initial={{ width: 0 }}
            animate={{ width: `${readiness}%` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
        </div>
        <div className="text-[10px] font-mono text-gray-500 space-y-1.5 bg-gray-900/50 p-2 rounded">
           <div className="flex justify-between items-center"><span>Planning</span> <span className="text-blue-400 text-xs">██████</span></div>
           <div className="flex justify-between items-center"><span>Risk</span> <span className="text-blue-400 text-xs">█████████</span></div>
           <div className="flex justify-between items-center"><span>Focus</span> <span className="text-blue-400 text-xs">███████</span></div>
           <div className="flex justify-between items-center"><span>Calendar</span> <span className="text-blue-400 text-xs">██████████</span></div>
           <div className="flex justify-between items-center"><span>Policy</span> <span className="text-blue-400 text-xs">████████</span></div>
        </div>
      </div>

      {/* AI Performance Stats */}
      {/* AI Performance Stats */}
      <div className="mb-8">
        <h2 className="text-gray-400 text-xs font-semibold uppercase tracking-wider mb-4">AI Performance</h2>
        <div className="space-y-4 font-mono text-sm">
          
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

      {/* Digital Twin Insights */}
      <div className="mb-10 flex-1">
        <h2 className="text-gray-400 text-xs font-semibold uppercase tracking-wider mb-2 flex items-center justify-between">
          Digital Twin Insights
          <span className="text-[10px] bg-blue-500/20 text-blue-400 px-2 py-0.5 rounded">V2 Model</span>
        </h2>
        <p className="text-[10px] text-gray-500 mb-4 italic">Continuously adapts planning using historical execution behavior.</p>
        
        <div className="space-y-4 font-mono text-sm bg-gray-900/50 p-3 rounded-lg border border-gray-800">
          <div className="mb-4 text-xs space-y-1.5 text-gray-400 border-b border-gray-800 pb-4">
            <span className="block mb-2 text-gray-500">Focus Profile</span>
            <div className="flex justify-between items-center"><span>Morning</span> <span className="text-yellow-400/80 text-xs">███████</span></div>
            <div className="flex justify-between items-center"><span>Afternoon</span> <span className="text-yellow-400/80 text-xs">██████████</span></div>
            <div className="flex justify-between items-center"><span>Night</span> <span className="text-yellow-400/80 text-xs">██</span></div>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-400">Avg Coding Delay</span>
            <span className="text-red-400 font-bold">
              {currentContext.digitalTwin.taskTypeMetrics['coding']?.averageDelayMins || 0} min
            </span>
          </div>
          <div className="flex justify-between items-center text-xs">
            <span className="text-gray-500">Confidence</span>
            <span className="text-green-400">{currentContext.digitalTwin.taskTypeMetrics['coding']?.confidenceScore || 0}%</span>
          </div>
          <div className="flex justify-between items-center text-xs">
            <span className="text-gray-500">Sample Size</span>
            <span className="text-gray-300">n = {currentContext.digitalTwin.taskTypeMetrics['coding']?.sampleCount || 0}</span>
          </div>
          <div className="mt-4 pt-3 border-t border-gray-800 space-y-1.5">
            <span className="text-[10px] uppercase tracking-widest text-blue-400 font-bold block mb-2">Twin Status</span>
            <div className="flex justify-between items-center text-[10px]">
              <span className="text-gray-500">Learning</span>
              <span className="text-green-400 font-bold flex items-center gap-1"><span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></span> Active</span>
            </div>
            <div className="flex justify-between items-center text-[10px]">
              <span className="text-gray-500">Confidence</span>
              <span className="text-white">91%</span>
            </div>
            <div className="flex justify-between items-center text-[10px]">
              <span className="text-gray-500">Samples</span>
              <span className="text-white">18</span>
            </div>
            <div className="flex justify-between items-center text-[10px]">
              <span className="text-gray-500">Last Updated</span>
              <span className="text-white">2 minutes ago</span>
            </div>
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
