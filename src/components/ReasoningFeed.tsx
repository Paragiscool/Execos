"use client";

import { Brain, Activity, ShieldAlert, GitCommit } from "lucide-react";

const feedItems = [
  {
    type: "intent",
    icon: <Brain size={16} className="text-purple-400" />,
    title: "Intent Engine",
    message: "Inferred intent: 'Prepare for Finals' based on user chaos input.",
    time: "2 mins ago"
  },
  {
    type: "simulate",
    icon: <Activity size={16} className="text-yellow-400" />,
    title: "Execution Simulator",
    message: "Evaluated 3 schedule permutations. Selected Plan B (Utility Score: 93).",
    time: "1 min ago"
  },
  {
    type: "policy",
    icon: <ShieldAlert size={16} className="text-green-400" />,
    title: "Policy Engine",
    message: "Constraint verified: No events scheduled past midnight. Cleared for execution.",
    time: "45 sec ago"
  },
  {
    type: "decision",
    icon: <GitCommit size={16} className="text-blue-400" />,
    title: "Decision Journal #42",
    message: "Moved 'Assignment A' to 1:00 PM.",
    reasoning: "High execution readiness. Clears time debt before 4 PM deadline.",
    confidence: "94% (Completed similar tasks 12 times)",
    time: "Just now",
    highlight: true
  }
];

export default function ReasoningFeed() {
  return (
    <div className="flex flex-col gap-4">
      {feedItems.map((item, i) => (
        <div key={i} className={`p-4 rounded-lg border ${
          item.highlight ? 'border-blue-500/50 bg-blue-500/10' : 'border-white/5 bg-white/5'
        }`}>
          <div className="flex items-center gap-2 mb-2">
            {item.icon}
            <span className="text-sm font-medium text-gray-200">{item.title}</span>
            <span className="text-xs text-gray-500 ml-auto">{item.time}</span>
          </div>
          <p className="text-sm text-gray-300 mb-2">{item.message}</p>
          
          {item.reasoning && (
            <div className="mt-3 pt-3 border-t border-white/10 text-xs flex flex-col gap-1">
              <div className="flex text-gray-400"><span className="w-20 font-medium">Reasoning:</span> <span className="text-gray-300">{item.reasoning}</span></div>
              <div className="flex text-gray-400"><span className="w-20 font-medium">Confidence:</span> <span className="text-blue-400">{item.confidence}</span></div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
