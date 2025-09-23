import {
  createLibrary,
  deleteLibrary,
  getBookByKey,
  getLibraries,
  getSavedBook,
} from "@/services/database/db";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { name } = await request.json();
  const libraryId = createLibrary(name);

  return NextResponse.json({ id: libraryId });
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const bookKey = searchParams.get("bookKey");

  const libraries = getLibraries();

  if (!bookKey) {
    return NextResponse.json(libraries);
  }

  const processedLibraries = [];

  for (const library of libraries) {
    const book = getBookByKey(bookKey);

    if (!book) {
      processedLibraries.push({
        ...library,
        saved: false,
      });
    } else {
      const savedBook = getSavedBook(library.id, book.id);

      processedLibraries.push({
        ...library,
        saved: !!savedBook,
      });
    }
  }

  return NextResponse.json(processedLibraries);
}

export async function DELETE(request: Request) {
  const { libraryId } = await request.json();
  deleteLibrary(libraryId);
  return NextResponse.json({ success: true });
}
