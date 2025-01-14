import React from 'react';
import { roadmapData, SprintSummary } from '../lib/roadmapdata';

const statusStyles = {
  current: {
    dot: 'bg-red-500 shadow-lg shadow-red-500/50',
    card: 'bg-gray-800',
    badge: 'text-red-400',
  },
  upcoming: {
    dot: 'bg-gray-700 border-2 border-red-500/50',
    card: 'bg-gray-800/50',
    badge: 'text-red-400/70',
  },
  planned: {
    dot: 'bg-gray-700 border-2 border-red-500/20',
    card: 'bg-gray-800/30',
    badge: 'text-red-400/50',
  },
};

function TimelineEntry({ summary }: { summary: SprintSummary }) {
  const style = statusStyles[summary.status];

  return (
    <div className="mb-12 relative">
      <div className={`absolute left-0 top-1 w-4 h-4 -translate-x-[18px] rounded-full ${style.dot}`} />
      <div className={`${style.card} rounded-lg p-6`}>
        <span className={`${style.badge} text-sm font-semibold`}>
          Stage {summary.sprintNumber} - {summary.status.charAt(0).toUpperCase() + summary.status.slice(1)}
        </span>
        <h3 className="text-xl font-bold mt-2 mb-3">{summary.title}</h3>
        <p className="text-gray-400 mb-3">
          {summary.description}
        </p>
        <div className="text-sm text-gray-500">{summary.startDate}</div>
      </div>
    </div>
  );
}

export default function RoadmapTimeline() {
  return (
    <div className="min-h-screen w-full bg-gray-900 text-gray-100 p-6">
      <div style={{maxWidth:'1400px'}} className="max-w-3xl mx-auto">
        <div className="mb-12 text-center">
          <h1 className="text-6xl font-bold mb-4">Roadmap</h1>
          <p className="text-gray-400">Our journey to build the ultimate HTTP client and documentation solution</p>
        </div>

        <div className="relative pl-8 border-l border-red-500/20">
          {roadmapData.map((sprint) => (
            <TimelineEntry key={sprint.sprintNumber} summary={sprint} />
          ))}
        </div>
      </div>
    </div>
  );
}

