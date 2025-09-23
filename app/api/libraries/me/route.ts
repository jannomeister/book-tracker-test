import { getLibrariesWithPagination } from "@/services/database/db";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = searchParams.get("page") ?? 1;
  const limit = searchParams.get("limit") ?? 10;

  const libraries = getLibrariesWithPagination(Number(page), Number(limit));

  return NextResponse.json({ libraries, page, limit });
}
