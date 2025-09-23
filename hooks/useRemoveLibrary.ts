import axios from "@/lib/axios";
import { useState } from "react";

export const useRemoveLibrary = () => {
  const [isRemoving, setIsRemoving] = useState(false);

  const remove = async (libraryId: number) => {
    setIsRemoving(true);
    await axios.delete("/api/libraries", {
      data: { libraryId },
    });
    setIsRemoving(false);
  };

  return { isRemoving, remove };
};
