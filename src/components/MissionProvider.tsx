'use client';
import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { ReplayEngine } from '../core/replay_engine';
import { ExecutionContext, defaultContext } from '../core/context';
import { LedgerEntry } from '../models/ledger';
import { runMissionAction, MissionResult } from '../app/actions';

interface MissionContextType {
  mode: string;
  setMode: (m: string) => void;
  customPrompt: string;
  setCustomPrompt: (p: string) => void;
  runMission: () => Promise<void>;
  
  // Playback State
  ledger: LedgerEntry[];
  currentContext: ExecutionContext;
  currentIndex: number;
  isPlaying: boolean;
  isMissionComplete: boolean;
  telemetry: any;
  
  // Controls
  play: () => void;
  pause: () => void;
  prev: () => void;
  next: () => void;
  setSpeed: (multiplier: number) => void;
  acknowledge: () => void;
}

const MissionContext = createContext<MissionContextType | undefined>(undefined);

export function MissionProvider({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState('Finals Week');
  const [customPrompt, setCustomPrompt] = useState('');
  
  const [engine, setEngine] = useState<ReplayEngine | null>(null);
  const [ledger, setLedger] = useState<LedgerEntry[]>([]);
  const [currentContext, setCurrentContext] = useState<ExecutionContext>(defaultContext);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [telemetry, setTelemetry] = useState<any>(null);
  const [isAcknowledged, setIsAcknowledged] = useState(false);
  
  const isMissionComplete = ledger.length > 0 && currentIndex === ledger.length - 1 && !isAcknowledged;

  const runMission = async () => {
    setIsAcknowledged(false);
    
    // Always fetch fresh from backend to avoid stale hot-reloads
    const result = await runMissionAction(mode, mode === 'Custom' ? customPrompt : undefined);
    
    setLedger(result.ledger);
    setTelemetry(result.telemetry);
    
    // Initialize Replay Engine
    const newEngine = new ReplayEngine(result.ledger);
    setEngine(newEngine);
    
    // Reset Playback
    setCurrentContext(newEngine.replayToIndex(-1));
    setCurrentIndex(-1);
    
    // Auto-play
    setIsPlaying(true);
  };

  // Playback Loop
  useEffect(() => {
    if (!isPlaying || !engine) return;
    
    const interval = setInterval(() => {
      const nextCtx = engine.nextEvent();
      if (nextCtx) {
        setCurrentContext(nextCtx);
        setCurrentIndex(engine.getCurrentIndex());
      } else {
        setIsPlaying(false);
      }
    }, 1500 / speed); // base delay 1.5s per event
    
    return () => clearInterval(interval);
  }, [isPlaying, engine, speed]);

  const play = () => {
    if (currentIndex < ledger.length - 1) setIsPlaying(true);
  };
  
  const pause = () => setIsPlaying(false);
  
  const prev = () => {
    if (!engine) return;
    setIsPlaying(false);
    setCurrentContext(engine.previousEvent());
    setCurrentIndex(engine.getCurrentIndex());
  };
  
  const next = () => {
    if (!engine) return;
    setIsPlaying(false);
    const nextCtx = engine.nextEvent();
    if (nextCtx) {
      setCurrentContext(nextCtx);
      setCurrentIndex(engine.getCurrentIndex());
    }
  };

  const acknowledge = () => setIsAcknowledged(true);

  return (
    <MissionContext.Provider value={{
      mode, setMode, customPrompt, setCustomPrompt, runMission,
      ledger, currentContext, currentIndex, isPlaying, isMissionComplete, telemetry,
      play, pause, prev, next, setSpeed, acknowledge
    }}>
      {children}
    </MissionContext.Provider>
  );
}

export function useMission() {
  const context = useContext(MissionContext);
  if (context === undefined) {
    throw new Error('useMission must be used within a MissionProvider');
  }
  return context;
}
