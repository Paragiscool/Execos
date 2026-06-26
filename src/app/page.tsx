'use client';
import Timeline from '@/components/Timeline';
import ReasoningFeed from '@/components/ReasoningFeed';
import MetricsPanel from '@/components/MetricsPanel';
import ArchitectureDebugPanel from '@/components/ArchitectureDebugPanel';
import MissionControlBar from '@/components/MissionControlBar';
import MissionCompleteScreen from '@/components/MissionCompleteScreen';
import DecisionSimulator from '@/components/DecisionSimulator';
import EvaluationDashboard from '@/components/EvaluationDashboard';
import { MissionProvider, useMission } from '@/components/MissionProvider';
import { ExecEventType } from '@/models/ledger';

function MainDashboard() {
  const { isMissionComplete, acknowledge, currentContext, currentIndex, play } = useMission();
  const [activeTab, setActiveTab] = React.useState<'feed' | 'evaluation'>('feed');
  
  const currentEvent = currentContext.ledger[currentIndex];
  const isEvaluating = currentEvent?.eventType === ExecEventType.StrategiesEvaluated;
  
  const strategies = currentContext.ledger.find(e => e.eventType === ExecEventType.StrategiesGenerated)?.payload?.strategies || [];
  const evaluations = currentContext.ledger.find(e => e.eventType === ExecEventType.StrategiesEvaluated)?.payload?.evaluations || [];
  
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
          {/* Tab Selector */}
          <div className="flex flex-col bg-black border-b border-gray-800 p-3 gap-2">
            <div className="flex gap-2">
              <button 
                onClick={() => setActiveTab('feed')}
                className={`px-4 py-2 text-xs font-bold uppercase tracking-widest rounded transition-colors ${activeTab === 'feed' ? 'bg-blue-900/30 text-blue-400' : 'text-gray-500 hover:text-gray-300'}`}
              >
                Execution Feed
              </button>
              <button 
                onClick={() => setActiveTab('evaluation')}
                className={`px-4 py-2 text-xs font-bold uppercase tracking-widest rounded transition-colors ${activeTab === 'evaluation' ? 'bg-blue-900/30 text-blue-400' : 'text-gray-500 hover:text-gray-300'}`}
              >
                System Evaluation
              </button>
            </div>
            <p className="text-[10px] text-gray-500 italic px-2">
              {activeTab === 'feed' 
                ? "Deterministically reconstructs every decision from the immutable execution ledger."
                : "Quantitatively proves system learning and execution accuracy over time."}
            </p>
          </div>
          
          {activeTab === 'feed' ? <ReasoningFeed /> : <EvaluationDashboard />}
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

      {/* Decision Simulator Overlay */}
      {isEvaluating && strategies.length > 0 && evaluations.length > 0 && (
        <DecisionSimulator 
          strategies={strategies} 
          evaluations={evaluations} 
          onComplete={play} 
        />
      )}

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
