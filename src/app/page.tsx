'use client';
import Timeline from '@/components/Timeline';
import ReasoningFeed from '@/components/ReasoningFeed';
import MetricsPanel from '@/components/MetricsPanel';
import ArchitectureDebugPanel from '@/components/ArchitectureDebugPanel';
import MissionControlBar from '@/components/MissionControlBar';
import MissionCompleteScreen from '@/components/MissionCompleteScreen';
import { MissionProvider, useMission } from '@/components/MissionProvider';

function MainDashboard() {
  const { isMissionComplete, acknowledge } = useMission();
  
  return (
    <main className="flex flex-col h-screen bg-black text-gray-200 overflow-hidden font-sans">
      
      {/* Top Bar: Mission Control */}
      <MissionControlBar />

      <div className="flex flex-1 overflow-hidden">
        {/* Left Panel: Goals Progress & Execution Timeline */}
        <div className="w-1/4 border-r border-gray-800 bg-gray-950 flex flex-col h-full">
          <Timeline />
        </div>
        
        {/* Center Panel: Event Timeline, Agent Status, Explainability */}
        <div className="flex-1 flex flex-col h-full bg-[#0a0a0a]">
          <ReasoningFeed />
        </div>

        {/* Right Panel: Readiness, AI Performance */}
        <div className="w-80 flex flex-col h-full bg-gray-950">
          <MetricsPanel />
        </div>
      </div>

      {/* Architecture Debug Panel Overlay */}
      <ArchitectureDebugPanel />

      {/* Mission Complete Overlay */}
      {isMissionComplete && <MissionCompleteScreen onAcknowledge={acknowledge} />}

    </main>
  );
}

export default function Home() {
  return (
    <MissionProvider>
      <MainDashboard />
    </MissionProvider>
  );
}
