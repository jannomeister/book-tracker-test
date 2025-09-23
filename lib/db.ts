import Database from "better-sqlite3";
import path from "path";

const dbPath = path.join(process.cwd(), "..", "booktracker.db");
const db = new Database(dbPath);

// Create tables if they don't exist
db.prepare(
  `CREATE TABLE IF NOT EXISTS libraries (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL UNIQUE
  )`
).run();

db.prepare(
  `CREATE TABLE IF NOT EXISTS books (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    book_key TEXT NOT NULL UNIQUE,
    cover_id TEXT,
    cover_edition_key TEXT,
    author_name TEXT,
    author_key TEXT,
    title TEXT,
    description TEXT,
    first_publish_year INTEGER,
    edition_count INTEGER,
    language TEXT,
    rating INTEGER
  )`
).run();

db.prepare(
  `CREATE TABLE IF NOT EXISTS library_books (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    library_id INTEGER NOT NULL,
    book_id INTEGER NOT NULL,
    FOREIGN KEY (library_id) REFERENCES libraries(id) ON DELETE CASCADE,
    FOREIGN KEY (book_id) REFERENCES books(id) ON DELETE CASCADE,
    UNIQUE(library_id, book_id)
  )`
).run();

export default db;
