import axios from "@/lib/axios";
import { SearchBooksResult } from "@/services/openlibrary/openlibrary.interface";
import { useState } from "react";

export const useSearchBooks = (params: {
  searchKey: string;
  page: number;
  limit: number;
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<{
    books: SearchBooksResult[];
    total: number;
    page: number;
    limit: number;
  }>({ books: [], total: 0, page: params.page, limit: params.limit });

  const handleSearch = async () => {
    setIsLoading(true);
    const res = await axios.get(`/api/books/search`, {
      params,
    });

    setResults(res.data);
    setIsLoading(false);
  };

  return { data: results, handleSearch, isLoading };
};
