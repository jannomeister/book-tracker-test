import db from "@/lib/db";
import { SearchBooksResult } from "../openlibrary/openlibrary.interface";
import { Book, Library, SavedBook } from "./db.interface";

export const createLibrary = (name: string): number => {
  const result = db
    .prepare(`INSERT INTO libraries (name) VALUES (?)`)
    .run(name);

  return Number(result.lastInsertRowid);
};

export const getLibraries = (): Library[] => {
  const result = db.prepare(`SELECT * FROM libraries`).all();
  return result as Library[];
};

export const getLibrariesWithPagination = (
  page: number,
  limit: number
): Library[] => {
  const result = db
    .prepare(
      `
      SELECT 
        l.id, 
        l.name, 
        COUNT(lb.book_id) as bookCount
      FROM libraries l
      LEFT JOIN library_books lb ON l.id = lb.library_id
      GROUP BY l.id, l.name
      LIMIT ? OFFSET ?
    `
    )
    .all(limit, (page - 1) * limit);
  return result as Library[];
};

export const createAndRetrieveBook = (book: SearchBooksResult): Book => {
  db.prepare(
    `INSERT INTO books (book_key, cover_id, cover_edition_key, author_name, author_key, title, description, first_publish_year, edition_count, language) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
  ).run(
    book.key,
    book.cover_i.toString(),
    book.cover_edition_key ?? "",
    book.author_name.join(", "),
    book.author_key.join(", "),
    book.title,
    "", // TODO: Add description
    book.first_publish_year,
    book.edition_count,
    book.language.join(", ")
  );

  return getBookByKey(book.key);
};

export const getBookByKey = (bookKey: string): Book => {
  const result = db
    .prepare(`SELECT * FROM books WHERE book_key = ?`)
    .get(bookKey);
  return result as Book;
};

export const getSavedBook = (libraryId: number, bookId: number): SavedBook => {
  const result = db
    .prepare(`SELECT * FROM library_books WHERE library_id = ? AND book_id = ?`)
    .get(libraryId, bookId);

  return result as SavedBook;
};

export const unSaveBookFromLibrary = (libraryId: number, bookKey: string) => {
  const book = getBookByKey(bookKey);

  if (book) {
    db.prepare(
      `DELETE FROM library_books WHERE library_id = ? AND book_id = ?`
    ).run(libraryId, book.id);
  }
};

export const saveBookToLibrary = (libraryId: number, bookId: number) => {
  const savedBook = getSavedBook(libraryId, bookId);

  if (!savedBook) {
    db.prepare(
      `INSERT INTO library_books (library_id, book_id) VALUES (?, ?)`
    ).run(libraryId, bookId);
  }
};

export const getBooksByLibrary = (
  libraryId: number,
  page: number,
  limit: number
): Book[] => {
  const result = db
    .prepare(
      `SELECT b.* FROM books b 
       INNER JOIN library_books lb ON b.id = lb.book_id 
       WHERE lb.library_id = ? 
       LIMIT ? OFFSET ?`
    )
    .all(libraryId, limit, (page - 1) * limit);
  return result as Book[];
};

export const updateBook = (
  bookId: number,
  title: string,
  authorName: string,
  rating?: number
): Book => {
  if (rating !== undefined) {
    db.prepare(
      `UPDATE books SET title = ?, author_name = ?, rating = ? WHERE id = ?`
    ).run(title, authorName, rating, bookId);
  } else {
    db.prepare(`UPDATE books SET title = ?, author_name = ? WHERE id = ?`).run(
      title,
      authorName,
      bookId
    );
  }

  const result = db.prepare(`SELECT * FROM books WHERE id = ?`).get(bookId);
  return result as Book;
};

export const updateBookRating = (bookId: number, rating: number): Book => {
  db.prepare(`UPDATE books SET rating = ? WHERE id = ?`).run(rating, bookId);

  const result = db.prepare(`SELECT * FROM books WHERE id = ?`).get(bookId);
  return result as Book;
};

export const deleteLibrary = (libraryId: number) => {
  db.prepare(`DELETE FROM libraries WHERE id = ?`).run(libraryId);
};
