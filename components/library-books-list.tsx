"use client";

import { useUpdateBook } from "@/hooks/useUpdateBook";
import { useUpdateBookRating } from "@/hooks/useUpdateBookRating";
import { Book } from "@/services/database/db.interface";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import StarRating from "./star-rating";

interface BookCardProps {
  book: Book;
  libraryId: number;
  onBookUpdate: (updatedBook: Book) => void;
}

function BookCard({ book, libraryId, onBookUpdate }: BookCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(book.title);
  const [editAuthor, setEditAuthor] = useState(book.author_name);
  const { updateBook, isLoading } = useUpdateBook();
  const { updateBookRating } = useUpdateBookRating();

  const handleSave = async () => {
    try {
      const updatedBook = await updateBook({
        libraryId,
        bookId: book.id,
        title: editTitle,
        authorName: editAuthor,
      });
      onBookUpdate(updatedBook.book);
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to update book:", error);
    }
  };

  const handleCancel = () => {
    setEditTitle(book.title);
    setEditAuthor(book.author_name);
    setIsEditing(false);
  };

  const handleRatingChange = async (newRating: number) => {
    try {
      const response = await updateBookRating({
        libraryId,
        bookId: book.id,
        rating: newRating,
      });
      onBookUpdate(response.book);
    } catch (error) {
      console.error("Failed to update book rating:", error);
    }
  };

  return (
    <div className="bg-white/60 backdrop-blur-sm rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 p-6">
      <div className="flex justify-center mb-6">
        {book.cover_id ? (
          <Image
            src={`https://covers.openlibrary.org/b/id/${book.cover_id}-M.jpg`}
            width={300}
            height={192}
            alt={book.title}
            className="w-40 h-56 object-cover rounded-lg shadow-md"
          />
        ) : null}
        <div
          className={`w-40 h-56 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center text-gray-500 text-sm font-medium ${
            book.cover_id ? "hidden" : ""
          }`}
        >
          📖 No Cover
        </div>
      </div>

      <div className="space-y-3">
        {isEditing ? (
          <div className="space-y-3">
            <input
              type="text"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder="Book title"
            />
            <input
              type="text"
              value={editAuthor}
              onChange={(e) => setEditAuthor(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder="Author name"
            />
          </div>
        ) : (
          <>
            <h3 className="font-bold text-lg text-gray-900 line-clamp-2 leading-tight">
              {book.title}
            </h3>

            {book.author_name && (
              <p className="text-indigo-600 text-sm font-medium">
                by {book.author_name}
              </p>
            )}

            <div className="mt-2">
              <StarRating
                rating={book.rating || 0}
                interactive={true}
                onRatingChange={handleRatingChange}
                size="sm"
              />
            </div>
          </>
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

          {book.language && (
            <p className="text-gray-500 text-xs">
              🌐 Language: {book.language}
            </p>
          )}
        </div>

        {book.description && (
          <p className="text-gray-600 text-sm line-clamp-3 mt-3">
            {book.description}
          </p>
        )}
      </div>

      <div className="flex justify-between items-center mt-6">
        {isEditing ? (
          <div className="flex space-x-2">
            <button
              onClick={handleSave}
              disabled={isLoading}
              className="px-3 py-1 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 disabled:opacity-50 transition-colors"
            >
              {isLoading ? "Saving..." : "Save"}
            </button>
            <button
              onClick={handleCancel}
              className="px-3 py-1 bg-gray-600 text-white text-sm rounded-lg hover:bg-gray-700 transition-colors"
            >
              Cancel
            </button>
          </div>
        ) : (
          <>
            <Link
              href={`https://openlibrary.org${book.book_key}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-600 hover:text-indigo-800 text-sm font-medium transition-colors"
            >
              View on OpenLibrary →
            </Link>
            <button
              onClick={() => setIsEditing(true)}
              className="text-gray-500 hover:text-gray-700 transition-colors"
              title="Edit book"
            >
              ✏️
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default function LibraryBooksList(props: {
  books: Book[];
  libraryId: number;
}) {
  const [books, setBooks] = useState(props.books);

  const handleBookUpdate = (updatedBook: Book) => {
    setBooks(
      books.map((book) => (book.id === updatedBook.id ? updatedBook : book))
    );
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
      {books.map((book) => (
        <BookCard
          key={book.id}
          book={book}
          libraryId={props.libraryId}
          onBookUpdate={handleBookUpdate}
        />
      ))}
    </div>
  );
}
