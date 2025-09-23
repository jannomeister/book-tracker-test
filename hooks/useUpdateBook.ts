import axios from "@/lib/axios";
import { useState } from "react";

interface UpdateBookParams {
  libraryId: number;
  bookId: number;
  title: string;
  authorName: string;
  rating?: number;
}

export const useUpdateBook = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateBook = async ({
    libraryId,
    bookId,
    title,
    authorName,
    rating,
  }: UpdateBookParams) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.put(`/api/libraries/${libraryId}/books`, {
        bookId,
        title,
        authorName,
        rating,
      });

      return response.data;
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to update book";
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { updateBook, isLoading, error };
};
