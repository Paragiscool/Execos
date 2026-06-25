"use client";

export default function MetricsPanel() {
  const readiness = 87;

  return (
    <div className="flex flex-col gap-6">
      
      {/* Master Score */}
      <div className="flex flex-col items-center justify-center p-6 bg-black/30 rounded-xl border border-white/5 relative overflow-hidden">
        <div className="absolute inset-0 bg-blue-500/10 blur-xl"></div>
        <div className="relative z-10 text-center">
          <div className="text-5xl font-bold text-white glow-text mb-2">{readiness}%</div>
          <div className="text-xs font-semibold text-blue-400 uppercase tracking-widest">Execution Readiness</div>
        </div>
      </div>

      {/* Breakdowns */}
      <div className="space-y-4">
        <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">Why?</h3>
        
        <MetricBar label="Time Debt" value={25} color="bg-green-500" inverse />
        <MetricBar label="Energy" value={80} color="bg-blue-500" />
        <MetricBar label="Risk" value={12} color="bg-green-500" inverse />
        <MetricBar label="Momentum" value={95} color="bg-purple-500" />
        <MetricBar label="Focus Span" value={65} color="bg-blue-400" />
      </div>

    </div>
  );
}

function MetricBar({ label, value, color, inverse = false }: { label: string, value: number, color: string, inverse?: boolean }) {
  // If inverse, a low value is "good" visually (we just keep it simple here)
  return (
    <div>
      <div className="flex justify-between text-xs mb-1">
        <span className="text-gray-300">{label}</span>
        <span className="text-gray-400">{value}%</span>
      </div>
      <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
        <div className={`h-full ${color}`} style={{ width: `${value}%` }}></div>
      </div>
    </div>
  );
}
