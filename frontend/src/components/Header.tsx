export default function Header() {
  return (
    <header className="border-b border-gray-700 bg-gray-900/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">O</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">Omni</h1>
              <p className="text-sm text-gray-400">The Last Stop for All Media</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-400">Investor Dashboard</p>
            <p className="text-xs text-gray-500">v0.1.0 - October 2025</p>
          </div>
        </div>
      </div>
    </header>
  );
}
