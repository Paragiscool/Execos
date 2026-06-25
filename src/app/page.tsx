import Timeline from "@/components/Timeline";
import ReasoningFeed from "@/components/ReasoningFeed";
import MetricsPanel from "@/components/MetricsPanel";

export default function Home() {
  return (
    <main className="h-screen w-screen flex flex-col p-4 gap-4">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-3 glass-panel shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center shadow-[0_0_15px_rgba(59,130,246,0.5)]">
            <span className="font-bold text-white tracking-tighter">EX</span>
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-wider">EXECOS</h1>
            <p className="text-xs text-gray-400 uppercase tracking-widest">Executive Cognitive OS</p>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            <span className="text-sm text-gray-300">System Online</span>
          </div>
        </div>
      </header>

      {/* Main 3-Panel Layout */}
      <div className="flex-1 grid grid-cols-12 gap-4 min-h-0">
        
        {/* Left: Executive Timeline (3 cols) */}
        <section className="col-span-3 glass-panel overflow-hidden flex flex-col">
          <div className="p-4 border-b border-white/5 shrink-0">
            <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Executive Timeline</h2>
          </div>
          <div className="flex-1 overflow-y-auto p-4">
            <Timeline />
          </div>
        </section>

        {/* Center: AI Reasoning Feed & Decision Journal (6 cols) */}
        <section className="col-span-6 glass-panel overflow-hidden flex flex-col">
          <div className="p-4 border-b border-white/5 shrink-0 flex justify-between items-center">
            <h2 className="text-sm font-semibold text-blue-400 uppercase tracking-wider">AI Reasoning Feed</h2>
            <span className="text-xs px-2 py-1 bg-blue-500/20 text-blue-300 rounded-full">Mission Mode Active</span>
          </div>
          <div className="flex-1 overflow-y-auto p-4 bg-black/20">
            <ReasoningFeed />
          </div>
        </section>

        {/* Right: Execution Readiness (3 cols) */}
        <section className="col-span-3 glass-panel overflow-hidden flex flex-col">
          <div className="p-4 border-b border-white/5 shrink-0">
            <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Executive Metrics</h2>
          </div>
          <div className="flex-1 overflow-y-auto p-4">
            <MetricsPanel />
          </div>
        </section>

      </div>
    </main>
  );
}
