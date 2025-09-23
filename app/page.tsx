import Link from "next/link";
import "./globals.css";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">📚 BookTracker</h1>
            <nav className="hidden md:flex space-x-8">
              <Link
                href="/books"
                className="text-gray-600 hover:text-indigo-600 transition-colors"
              >
                Search Books
              </Link>
              <Link
                href="/libraries"
                className="text-gray-600 hover:text-indigo-600 transition-colors"
              >
                Libraries
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Welcome to{" "}
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              BookTracker
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
            Discover, organize, and track your favorite books. Build your
            personal library and never lose track of what you&apos;ve read or
            want to read next.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Link
              href="/books"
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              🔍 Search Books
            </Link>
            <Link
              href="/libraries"
              className="bg-white hover:bg-gray-50 text-gray-900 px-8 py-4 rounded-lg font-semibold text-lg border-2 border-gray-300 hover:border-indigo-300 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              📚 My Libraries
            </Link>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-white/60 backdrop-blur-sm rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="text-4xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Search & Discover
              </h3>
              <p className="text-gray-600">
                Find books from a vast database and discover new titles based on
                your interests.
              </p>
            </div>

            <div className="bg-white/60 backdrop-blur-sm rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="text-4xl mb-4">📚</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Organize Libraries
              </h3>
              <p className="text-gray-600">
                Create custom libraries to organize your books by genre, reading
                status, or any category you prefer.
              </p>
            </div>

            <div className="bg-white/60 backdrop-blur-sm rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="text-4xl mb-4">📖</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Track Progress
              </h3>
              <p className="text-gray-600">
                Keep track of what you&apos;ve read, what you&apos;re currently
                reading, and what you want to read next.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white/80 backdrop-blur-sm border-t border-gray-200/50 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-600">
            <p>&copy; 2024 BookTracker. Built with Next.js and Tailwind CSS.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
