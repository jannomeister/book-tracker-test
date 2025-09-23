import { searchBooks } from "@/services/openlibrary/openlibrary";
import { SearchBooksResult } from "@/services/openlibrary/openlibrary.interface";
import { NextResponse } from "next/server";

export async function GET(request: Request): Promise<
  NextResponse<{
    books: SearchBooksResult[];
    total: number;
    page: number;
    limit: number;
  }>
> {
  const { searchParams } = new URL(request.url);
  const searchKey = searchParams.get("searchKey") ?? "";
  const page = Number(searchParams.get("page")) ?? 1;
  const limit = Number(searchParams.get("limit")) ?? 5;
  const { docs } = await searchBooks(searchKey, page, limit);

  return NextResponse.json({
    books: docs,
    total: docs.length,
    page,
    limit,
  });
}
