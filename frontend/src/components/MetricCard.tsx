interface MetricCardProps {
  label: string;
  value: string;
  description: string;
}

export default function MetricCard({ label, value, description }: MetricCardProps) {
  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
      <p className="text-gray-400 text-sm font-medium">{label}</p>
      <p className="text-3xl font-bold text-white mt-2">{value}</p>
      <p className="text-blue-400 text-sm mt-1">{description}</p>
    </div>
  );
}
