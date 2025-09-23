"use client";

import LibraryPopover from "@/components/popover/libraries-popover";
import { useSearchBooks } from "@/hooks/useSearchBooks";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Books() {
  const [query, setQuery] = useState("");
  const [page] = useState(1);
  const [limit] = useState(5);
  const { data, handleSearch, isLoading } = useSearchBooks({
    searchKey: query,
    page,
    limit,
  });

  async function onSearch(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    handleSearch();
  }

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
              <Link href="/books" className="text-indigo-600 font-medium">
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

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Title */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Search Books
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover your next favorite book from our vast collection
          </p>
        </div>

        {/* Search Form */}
        <div className="flex justify-center mb-12">
          <form onSubmit={onSearch} className="w-full max-w-2xl">
            <div className="flex items-center gap-4 bg-white/60 backdrop-blur-sm rounded-xl p-2 shadow-lg">
              <input
                id="search"
                name="search"
                type="text"
                className="flex-1 border-0 bg-transparent px-4 py-3 text-lg placeholder-gray-500 focus:outline-none focus:ring-0"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search for books, authors, or topics..."
              />
              <button
                type="submit"
                disabled={isLoading}
                className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg text-lg font-semibold hover:from-indigo-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                {isLoading ? "Searching..." : "🔍 Search"}
              </button>
            </div>
          </form>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
            <p className="mt-4 text-gray-600 text-lg">Searching for books...</p>
          </div>
        )}

        {/* No Results */}
        {!isLoading && data && data.books.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📚</div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-2">
              No books found
            </h3>
            <p className="text-gray-600">
              Try searching with different keywords
            </p>
          </div>
        )}

        {/* Books Grid */}
        {!isLoading && data && data.books.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {data.books.map((book) => (
              <div
                key={book.key}
                className="bg-white/60 backdrop-blur-sm rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6"
              >
                <div className="flex justify-center mb-6">
                  {book.cover_i ? (
                    <Image
                      src={`https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`}
                      width={300}
                      height={192}
                      alt={book.title}
                      className="w-40 h-56 object-cover rounded-lg shadow-md"
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                        e.currentTarget.nextElementSibling?.classList.remove(
                          "hidden"
                        );
                      }}
                    />
                  ) : null}
                  <div
                    className={`w-40 h-56 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center text-gray-500 text-sm font-medium ${
                      book.cover_i ? "hidden" : ""
                    }`}
                  >
                    📖 No Cover
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="font-bold text-lg text-gray-900 line-clamp-2 leading-tight">
                    {book.title}
                  </h3>

                  {book.author_name && book.author_name.length > 0 && (
                    <p className="text-indigo-600 text-sm font-medium">
                      by {book.author_name.join(", ")}
                    </p>
                  )}

                  <div className="space-y-1">
                    {book.first_publish_year && (
                      <p className="text-gray-500 text-xs">
                        📅 Published: {book.first_publish_year}
                      </p>
                    )}

                    {book.edition_count && (
                      <p className="text-gray-500 text-xs">
                        📚 {book.edition_count} edition
                        {book.edition_count !== 1 ? "s" : ""}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex justify-end mt-6">
                  <LibraryPopover book={book} />
                </div>
              </div>
            ))}
          </div>
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
