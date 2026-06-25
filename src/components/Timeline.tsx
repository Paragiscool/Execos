"use client";

import { CheckCircle2, Clock, CalendarClock } from "lucide-react";

const mockEvents = [
  { id: 1, time: "09:00 AM", title: "Review Algorithm Goals", status: "completed" },
  { id: 2, time: "10:30 AM", title: "Mock Interview Prep", status: "completed" },
  { id: 3, time: "01:00 PM", title: "Finish Assignment A", status: "active" },
  { id: 4, time: "03:30 PM", title: "Meeting with Advisor", status: "pending" },
  { id: 5, time: "05:00 PM", title: "Submit Application", status: "pending" },
];

export default function Timeline() {
  return (
    <div className="relative border-l-2 border-white/10 ml-3 space-y-8 mt-4">
      {mockEvents.map((event) => (
        <div key={event.id} className="relative pl-6">
          {/* Timeline Dot */}
          <div className={`absolute -left-[11px] top-1 p-1 rounded-full ${
            event.status === "completed" ? "bg-green-500/20 text-green-500" :
            event.status === "active" ? "bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.8)] text-white" :
            "bg-gray-800 text-gray-500 border border-gray-600"
          }`}>
            {event.status === "completed" ? <CheckCircle2 size={14} /> :
             event.status === "active" ? <Clock size={14} className="animate-spin-slow" /> :
             <CalendarClock size={14} />}
          </div>
          
          {/* Content */}
          <div>
            <div className={`text-xs font-mono mb-1 ${event.status === 'active' ? 'text-blue-400' : 'text-gray-500'}`}>
              {event.time}
            </div>
            <div className={`text-sm ${event.status === 'completed' ? 'text-gray-400 line-through' : event.status === 'active' ? 'text-white font-medium' : 'text-gray-300'}`}>
              {event.title}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
