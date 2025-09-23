import axios from "@/lib/axios";
import { SearchBooksResult } from "@/services/openlibrary/openlibrary.interface";
import { useState } from "react";

export const useSaveBook = () => {
  const [isSaving, setIsSaving] = useState(false);

  const saveBook = async (libraryId: number, book: SearchBooksResult) => {
    setIsSaving(true);
    await axios.post(`/api/libraries/${libraryId}/books`, book);
    setIsSaving(false);
  };

  return { isSaving, saveBook };
};
