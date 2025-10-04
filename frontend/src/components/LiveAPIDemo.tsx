export default function LiveAPIDemo() {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h3 className="text-3xl font-bold text-white mb-8 text-center">Live API Demo</h3>

        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 border border-gray-700">
          <div className="text-center mb-6">
            <p className="text-gray-300 mb-4">
              Our MusicBrainz integration is live! Try searching for any artist, album, or track.
            </p>
            <div className="inline-flex items-center space-x-2 bg-green-500/10 border border-green-500/30 rounded-lg px-4 py-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-green-400 font-medium">API Status: Online</span>
            </div>
          </div>

          <div className="bg-gray-900/50 rounded-lg p-4 font-mono text-sm text-gray-300 overflow-x-auto">
            <div className="text-blue-400">GET</div>
            <div className="mt-2">/api/music/search?q=radiohead&type=artist</div>
            <div className="mt-4 text-gray-500">// Returns comprehensive artist data from MusicBrainz</div>
            <div className="mt-2 text-gray-500">// Cached in KV for 15 minutes</div>
            <div className="mt-2 text-gray-500">// Album art cached in R2 (zero egress!)</div>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold text-white">~50ms</p>
              <p className="text-sm text-gray-400">Avg Response Time</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-white">99.9%</p>
              <p className="text-sm text-gray-400">Uptime (Cloudflare)</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-white">Global</p>
              <p className="text-sm text-gray-400">Edge Network</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
