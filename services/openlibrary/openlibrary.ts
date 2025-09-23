import axios from "axios";
import { BookCoverDetails, SearchBooksResponse } from "./openlibrary.interface";

export const searchBooks = async (
  query: string,
  page: number = 1,
  limit: number = 5
) => {
  const response = await axios.get<SearchBooksResponse>(
    `https://openlibrary.org/search.json?q=${query}`,
    {
      params: {
        page,
        limit,
      },
    }
  );

  return response.data;
};

export const getBookCover = async (
  coverId: string,
  size: "S" | "M" | "L" = "M"
) => {
  const response = await axios.get(
    `https://covers.openlibrary.org/b/id/${coverId}-${size}.jpg`
  );

  return response.data;
};

export const getBookCoverDetails = async (coverId: string) => {
  const response = await axios.get<BookCoverDetails>(
    `https://covers.openlibrary.org/b/id/${coverId}.json`
  );

  return response.data;
};
