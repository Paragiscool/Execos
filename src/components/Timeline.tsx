'use client';
import React from 'react';
import { useMission } from './MissionProvider';

export default function Timeline() {
  const { mode, customPrompt, currentContext } = useMission();
  const goalTitle = mode === 'Custom' && customPrompt ? customPrompt : 'Graduate Without Missing Anything';
  
  const activeTasks = Array.from(currentContext.tasks.values());

  return (
    <div className="p-6 pb-24 h-full overflow-y-auto">
      <h2 className="text-gray-400 text-sm font-semibold uppercase tracking-wider mb-6">Goals & Progress</h2>
      
      {/* Goal Progress Cards */}
      <div className="space-y-6 mb-10">
        <div>
          <div className="flex justify-between items-end mb-2">
            <span className="text-white font-medium flex items-center gap-2 max-w-[80%] truncate">
              <span>🎯</span> {goalTitle}
            </span>
            <span className="text-blue-400 font-bold">71%</span>
          </div>
          <div className="h-1.5 w-full bg-gray-800 rounded-full overflow-hidden">
            <div className="h-full bg-blue-500 w-[71%]"></div>
          </div>
          <div className="text-right mt-1 text-xs text-green-400">Confidence 89%</div>
        </div>

        <div>
          <div className="flex justify-between items-end mb-2">
            <span className="text-white font-medium flex items-center gap-2">
              <span>🎯</span> Secure APM Internship
            </span>
            <span className="text-blue-400 font-bold">84%</span>
          </div>
          <div className="h-1.5 w-full bg-gray-800 rounded-full overflow-hidden">
            <div className="h-full bg-blue-500 w-[84%]"></div>
          </div>
        </div>
      </div>

      <div className="h-px bg-gray-800 w-full mb-6" />

      <h2 className="text-gray-400 text-sm font-semibold uppercase tracking-wider mb-6">Execution Timeline</h2>
      
      <div className="space-y-4 relative before:absolute before:inset-0 before:ml-2 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-gray-800 before:to-transparent">
        {activeTasks.length === 0 && (
          <div className="text-gray-500 italic relative z-10 text-sm">Waiting for planner to generate tasks...</div>
        )}
        
        {/* Timeline Items */}
        {activeTasks.map((task: any) => (
          <div key={task.id} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
            <div className="flex items-center justify-center w-4 h-4 rounded-full border-2 border-blue-500 bg-gray-900 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10"></div>
            <div className="w-[calc(100%-2rem)] md:w-[calc(50%-1.5rem)] p-3 rounded shadow bg-gray-900 border border-gray-800">
              <div className="flex items-center justify-between mb-1">
                <span className="font-bold text-white text-sm">{task.title}</span>
                <time className="font-mono text-xs text-blue-400">{task.scheduledStartTime || '--:--'}</time>
              </div>
              <p className="text-xs text-gray-500 mt-1">Status: {task.currentState}</p>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
