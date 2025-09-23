import LibraryList from "@/components/library-list";
import axios from "@/lib/axios";
import { Library } from "@/services/database/db.interface";
import Link from "next/link";

interface LibraryListProps {
  libraries: Library[];
  page: number;
  limit: number;
}

export default async function Libraries() {
  const { data } = await axios.get<LibraryListProps>("/api/libraries/me");

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link
              href="/"
              className="text-2xl font-bold text-gray-900 hover:text-indigo-600 transition-colors"
            >
              📚 BookTracker
            </Link>
            <nav className="hidden md:flex space-x-8">
              <Link
                href="/books"
                className="text-gray-600 hover:text-indigo-600 transition-colors"
              >
                Search Books
              </Link>
              <Link href="/libraries" className="text-indigo-600 font-medium">
                Libraries
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              My Libraries
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Organize your books into custom collections and track your reading
            journey
          </p>
        </div>

        {/* Libraries Content */}
        <div className="space-y-8">
          {/* Create New Library Section */}
          {data.libraries.length === 0 && (
            <div className="bg-white/60 backdrop-blur-sm rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="text-center">
                <div className="text-6xl mb-6">📚</div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Create Your First Library
                </h2>
                <p className="text-gray-600 mb-6 max-w-md mx-auto">
                  Start organizing your books by creating custom libraries for
                  different genres, reading goals, or any category you prefer.
                </p>
                <button className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-3 rounded-lg font-semibold text-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl">
                  + Create Library
                </button>
              </div>
            </div>
          )}

          {/* Custom Libraries Section */}
          <div className="bg-white/60 backdrop-blur-sm rounded-xl p-8 shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Custom Libraries
            </h2>

            <LibraryList libraries={data.libraries} />
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
