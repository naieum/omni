export default function Footer() {
  return (
    <footer className="border-t border-gray-700 bg-gray-900/50 backdrop-blur-sm py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-gray-400">
          Built with ❤️ for users and artists, not corporations.
        </p>
        <p className="text-gray-500 text-sm mt-2">
          Open Source • No Patents • User Ownership First
        </p>
        <div className="mt-4">
          <a
            href="https://github.com/naieum/omni"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-blue-300 transition-colors"
          >
            View on GitHub →
          </a>
        </div>
      </div>
    </footer>
  );
}
