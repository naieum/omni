interface RoadmapItemProps {
  phase: string;
  title: string;
  status: string;
  progress: number;
}

function RoadmapItem({ phase, title, status, progress }: RoadmapItemProps) {
  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
      <div className="flex items-center justify-between mb-3">
        <div>
          <span className="text-blue-400 font-semibold">{phase}</span>
          <h4 className="text-lg font-semibold text-white">{title}</h4>
        </div>
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
          status === 'In Progress' ? 'bg-blue-500/20 text-blue-400' :
          status === 'Upcoming' ? 'bg-purple-500/20 text-purple-400' :
          'bg-gray-600/20 text-gray-400'
        }`}>
          {status}
        </span>
      </div>
      <div className="w-full bg-gray-700 rounded-full h-2">
        <div
          className="bg-blue-500 h-2 rounded-full transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}

export default function RoadmapTimeline() {
  const roadmapItems = [
    { phase: 'Phase 1', title: 'Foundation + Music MVP', status: 'In Progress', progress: 60 },
    { phase: 'Phase 2', title: 'Timestamp Comments & Social', status: 'Upcoming', progress: 0 },
    { phase: 'Phase 3', title: 'Artist Upload Platform', status: 'Planned', progress: 0 },
    { phase: 'Phase 4', title: 'Movies & TV (TMDb + Stream)', status: 'Planned', progress: 0 },
    { phase: 'Phase 5', title: 'AI Features & Recommendations', status: 'Planned', progress: 0 },
    { phase: 'Phase 6', title: 'Thin Clients (iOS, Android, TV)', status: 'Planned', progress: 0 },
  ];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-800/30">
      <div className="max-w-7xl mx-auto">
        <h3 className="text-3xl font-bold text-white mb-8 text-center">Product Roadmap</h3>
        <div className="space-y-6">
          {roadmapItems.map((item, index) => (
            <RoadmapItem key={index} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
}
