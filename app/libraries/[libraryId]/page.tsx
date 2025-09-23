import LibraryBooksList from "@/components/library-books-list";
import axios from "@/lib/axios";
import { Book } from "@/services/database/db.interface";
import Link from "next/link";

interface LibraryIdProps {
  books: Book[];
  page: number;
  limit: number;
}

export default async function LibraryId({
  params,
}: {
  params: { libraryId: string };
}) {
  const { libraryId } = await params;
  const { data } = await axios.get<LibraryIdProps>(
    `/api/libraries/${libraryId}/books`
  );

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

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Title */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Library Books
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Browse through your saved books in this library
          </p>
        </div>

        {/* Empty State */}
        {data.books.length === 0 && (
          <div className="text-center py-12">
            <div className="bg-white/60 backdrop-blur-sm rounded-xl p-12 shadow-lg max-w-md mx-auto">
              <div className="text-6xl mb-6">📚</div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                No books found
              </h3>
              <p className="text-gray-600 mb-6">
                This library doesn&apos;t have any books yet. Start by searching
                for books to add.
              </p>
              <Link
                href="/books"
                className="inline-block bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                🔍 Search Books
              </Link>
            </div>
          </div>
        )}

        {/* Books Grid */}
        {data.books.length > 0 && (
          <LibraryBooksList books={data.books} libraryId={Number(libraryId)} />
        )}
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
