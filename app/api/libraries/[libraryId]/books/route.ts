import {
  createAndRetrieveBook,
  getBookByKey,
  getBooksByLibrary,
  saveBookToLibrary,
  unSaveBookFromLibrary,
  updateBook,
  updateBookRating,
} from "@/services/database/db";
import { SearchBooksResult } from "@/services/openlibrary/openlibrary.interface";
import { NextResponse } from "next/server";

export async function POST(
  request: Request,
  { params }: { params: { libraryId: string } }
) {
  const body: SearchBooksResult = await request.json();
  const { libraryId } = await params;

  let book = getBookByKey(body.key);

  if (!book) {
    book = createAndRetrieveBook(body);
  }

  saveBookToLibrary(Number(libraryId), book.id);

  return NextResponse.json({ success: true });
}

export async function GET(
  request: Request,
  { params }: { params: { libraryId: string } }
) {
  const { searchParams } = new URL(request.url);
  const page = searchParams.get("page") ?? 1;
  const limit = searchParams.get("limit") ?? 10;

  const { libraryId } = await params;
  const books = getBooksByLibrary(
    Number(libraryId),
    Number(page),
    Number(limit)
  );

  return NextResponse.json({ books, page, limit });
}

export async function PUT(request: Request) {
  const { bookId, title, authorName, rating } = await request.json();

  let updatedBook;
  if (rating !== undefined && title === undefined && authorName === undefined) {
    // Only rating update
    updatedBook = updateBookRating(bookId, rating);
  } else {
    // Full book update
    updatedBook = updateBook(bookId, title, authorName, rating);
  }

  return NextResponse.json({ success: true, book: updatedBook });
}

export async function DELETE(
  request: Request,
  { params }: { params: { libraryId: string } }
) {
  const { libraryId } = await params;
  const { bookKey } = await request.json();
  unSaveBookFromLibrary(Number(libraryId), bookKey);
  return NextResponse.json({ success: true });
}
