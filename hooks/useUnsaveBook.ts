import axios from "@/lib/axios";
import { useState } from "react";

export const useUnsaveBook = () => {
  const [unsavingLibraryId, setUnsavingLibraryId] = useState<number | null>(
    null
  );

  const unsaveBook = async (libraryId: number, bookKey: string) => {
    setUnsavingLibraryId(libraryId);
    await axios.delete(`/api/libraries/${libraryId}/books`, {
      data: {
        bookKey,
      },
    });
    setUnsavingLibraryId(null);
  };

  return { unsavingLibraryId, unsaveBook };
};
