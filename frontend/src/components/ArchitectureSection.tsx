interface ArchitectureCardProps {
  icon: string;
  title: string;
  items: string[];
  color: string;
}

function ArchitectureCard({ icon, title, items, color }: ArchitectureCardProps) {
  return (
    <div className="text-center">
      <div className={`w-16 h-16 ${color} rounded-lg mx-auto mb-4 flex items-center justify-center`}>
        <span className="text-white text-2xl">{icon}</span>
      </div>
      <h4 className="text-xl font-semibold text-white mb-2">{title}</h4>
      <ul className="text-gray-300 space-y-1">
        {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

export default function ArchitectureSection() {
  const architectureData = [
    {
      icon: '🎨',
      title: 'Frontend',
      items: ['React + TypeScript', 'Cloudflare Pages', 'Progressive Web App', 'ADA Compliant'],
      color: 'bg-blue-500',
    },
    {
      icon: '⚡',
      title: 'Backend',
      items: ['Cloudflare Workers', 'D1 Database (SQLite)', 'R2 Object Storage', 'Workers KV Cache'],
      color: 'bg-purple-500',
    },
    {
      icon: '📡',
      title: 'Streaming',
      items: ['Cloudflare Stream', 'Global CDN', 'Adaptive Bitrate', 'Zero Egress Fees'],
      color: 'bg-pink-500',
    },
  ];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-800/30">
      <div className="max-w-7xl mx-auto">
        <h3 className="text-3xl font-bold text-white mb-8 text-center">Technology Architecture</h3>
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 border border-gray-700">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {architectureData.map((arch, index) => (
              <ArchitectureCard key={index} {...arch} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
