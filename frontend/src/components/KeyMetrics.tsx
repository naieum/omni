import MetricCard from './MetricCard';

export default function KeyMetrics() {
  const metrics = [
    {
      label: 'Media Types',
      value: '6+',
      description: 'Music, Video, Books, News, Podcasts, Magazines',
    },
    {
      label: 'API Integrations',
      value: '8+',
      description: 'MusicBrainz, TMDb, Open Library, Spotify & more',
    },
    {
      label: 'Infrastructure Cost',
      value: '$0',
      description: 'Cloudflare free tier + zero egress',
    },
    {
      label: 'Artist Royalties',
      value: '100%',
      description: 'No platform fees, ever',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {metrics.map((metric, index) => (
        <MetricCard key={index} {...metric} />
      ))}
    </div>
  );
}
