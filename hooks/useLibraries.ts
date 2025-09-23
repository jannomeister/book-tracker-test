import { useEffect, useState } from "react";

import axios from "@/lib/axios";

type Library = {
  id: number;
  name: string;
  saved: boolean;
};

export const useLibraries = (bookId: string, enabled: boolean) => {
  const [libraries, setLibraries] = useState<Library[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchLibraries = async () => {
    setIsLoading(true);
    const res = await axios.get("/api/libraries", {
      params: {
        bookKey: bookId,
      },
    });
    setLibraries(res.data);
    setIsLoading(false);
  };

  useEffect(() => {
    if (enabled) {
      fetchLibraries();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled]);

  return { data: libraries, isLoading };
};
