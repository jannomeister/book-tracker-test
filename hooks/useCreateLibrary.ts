import axios from "@/lib/axios";
import { useState } from "react";

export const useCreateLibrary = () => {
  const [isCreating, setIsCreating] = useState(false);

  const create = async (name: string) => {
    setIsCreating(true);
    await axios.post("/api/libraries", { name: name.trim() });
    setIsCreating(false);
  };

  return { isCreating, create };
};
