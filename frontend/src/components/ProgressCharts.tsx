import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const progressData = [
  { month: 'Week 1', commits: 12, features: 2 },
  { month: 'Week 2', commits: 25, features: 4 },
  { month: 'Week 3', commits: 38, features: 7 },
  { month: 'Week 4', commits: 45, features: 10 },
];

const costComparison = [
  { service: 'AWS S3', cost: 90 },
  { service: 'Google Cloud', cost: 85 },
  { service: 'Azure', cost: 95 },
  { service: 'Cloudflare R2', cost: 0 },
];

export default function ProgressCharts() {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h3 className="text-3xl font-bold text-white mb-8 text-center">Development Progress</h3>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
            <h4 className="text-xl font-semibold text-white mb-4">Development Velocity</h4>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={progressData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="month" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip
                  contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #374151' }}
                  labelStyle={{ color: '#fff' }}
                />
                <Legend />
                <Line type="monotone" dataKey="commits" stroke="#0ea5e9" strokeWidth={2} />
                <Line type="monotone" dataKey="features" stroke="#8b5cf6" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
            <h4 className="text-xl font-semibold text-white mb-4">Infrastructure Cost Advantage</h4>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={costComparison}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="service" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" label={{ value: '$ / TB Egress', angle: -90, position: 'insideLeft', fill: '#9ca3af' }} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #374151' }}
                  labelStyle={{ color: '#fff' }}
                />
                <Bar dataKey="cost" fill="#0ea5e9" />
              </BarChart>
            </ResponsiveContainer>
            <p className="text-sm text-gray-400 mt-4 text-center">
              💰 Cloudflare R2 = $0 egress fees = Massive cost savings at scale
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
