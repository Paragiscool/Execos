'use client';
import React from 'react';
import Link from 'next/link';
import { useMission } from './MissionProvider';

export default function MissionControlBar() {
  const { mode, setMode, customPrompt, setCustomPrompt, runMission, play, pause, prev, next, isPlaying, currentIndex, ledger } = useMission();

  return (
    <div className="bg-gray-900 border-b border-gray-800 p-3 px-6 flex justify-between items-center font-mono text-sm z-20 relative">
      <div className="flex items-center gap-6">
        <div className="flex flex-col">
          <span className="text-gray-500 text-xs">MODE</span>
          <div className="flex gap-4 font-bold tracking-widest mt-1">
            <span 
              onClick={() => setMode('Finals Week')} 
              className={`cursor-pointer ${mode === 'Finals Week' ? 'text-blue-400' : 'text-gray-600 hover:text-gray-400'}`}
            >
              FINALS_WEEK
            </span>
            <span 
              onClick={() => setMode('Custom')} 
              className={`cursor-pointer flex items-center gap-1 ${mode === 'Custom' ? 'text-blue-400' : 'text-gray-600 hover:text-gray-400'}`}
            >
              CUSTOM
              {mode === 'Custom' && <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>}
            </span>
          </div>
        </div>
        <div className="h-8 w-px bg-gray-700"></div>
        <div className="flex flex-col">
          <span className="text-gray-500 text-xs">MISSION</span>
          {mode === 'Custom' ? (
            <input 
              type="text" 
              value={customPrompt} 
              onChange={(e) => setCustomPrompt(e.target.value)}
              placeholder="E.g. Study for physics while handling interview..."
              className="bg-black border border-gray-700 rounded px-2 py-1 mt-1 text-white text-xs w-64 focus:outline-none focus:border-blue-500"
            />
          ) : (
            <span className="text-white font-semibold mt-1">Graduate Without Missing Anything</span>
          )}
        </div>
      </div>

      {/* REPLAY CONTROLS */}
      {ledger.length > 0 && (
        <div className="flex items-center gap-3 bg-black border border-gray-700 rounded-lg px-4 py-1.5">
          <button onClick={prev} className="text-gray-400 hover:text-white transition-colors disabled:opacity-50" disabled={currentIndex < 0}>◀ Prev</button>
          {isPlaying ? (
            <button onClick={pause} className="text-yellow-400 font-bold hover:text-yellow-300 transition-colors mx-2">⏸ Pause</button>
          ) : (
            <button onClick={play} className="text-blue-400 font-bold hover:text-blue-300 transition-colors mx-2 disabled:opacity-50" disabled={currentIndex >= ledger.length - 1}>▶ Play</button>
          )}
          <button onClick={next} className="text-gray-400 hover:text-white transition-colors disabled:opacity-50" disabled={currentIndex >= ledger.length - 1}>▶ Next</button>
          <div className="h-4 w-px bg-gray-700 mx-2"></div>
          <span className="text-gray-500 text-xs">Event {currentIndex + 1} / {ledger.length}</span>
        </div>
      )}

      <div className="flex gap-4">
        <Link 
          href="/benchmarks"
          className="border border-gray-700 text-gray-400 px-4 py-2 rounded font-bold uppercase tracking-wide hover:bg-gray-800 transition-colors flex items-center"
        >
          Benchmarks
        </Link>
        <button 
          onClick={() => runMission()}
          className="bg-white text-black px-6 py-2 rounded font-bold uppercase tracking-wide hover:bg-blue-100 transition-colors"
        >
          Run Mission
        </button>
      </div>
    </div>
  );
}
