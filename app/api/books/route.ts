import { getBookCoverDetails } from "@/services/openlibrary/openlibrary";
import { NextResponse } from "next/server";

export async function GET() {
  const bookCover = await getBookCoverDetails("14425084");
  return NextResponse.json(bookCover);
}
