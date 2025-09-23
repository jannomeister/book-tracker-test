import axios from "@/lib/axios";
import { useState } from "react";

interface UpdateBookRatingParams {
  libraryId: number;
  bookId: number;
  rating: number;
}

export const useUpdateBookRating = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateBookRating = async ({
    libraryId,
    bookId,
    rating,
  }: UpdateBookRatingParams) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.put(`/api/libraries/${libraryId}/books`, {
        bookId,
        rating,
      });

      return response.data;
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to update book rating";
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { updateBookRating, isLoading, error };
};
