import { useLibraries } from "@/hooks/useLibraries";
import { useSaveBook } from "@/hooks/useSaveBook";
import { useUnsaveBook } from "@/hooks/useUnsaveBook";
import { SearchBooksResult } from "@/services/openlibrary/openlibrary.interface";
import { useClose } from "@headlessui/react";
import clsx from "clsx";
import { useState } from "react";
import { DotLoader } from "react-spinners";

export interface LibrariesPopoverPanelProps {
  open: boolean;
  book: SearchBooksResult;
}

export default function LibrariesPopoverPanel({
  open,
  book,
}: LibrariesPopoverPanelProps) {
  const { data: libraries, isLoading } = useLibraries(book.key, open);
  const close = useClose();
  const { isSaving, saveBook } = useSaveBook();
  const { unsavingLibraryId, unsaveBook } = useUnsaveBook();
  const [clickedLibraryId, setClickedLibraryId] = useState<number | null>(null);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const isMutating = isSaving || !!unsavingLibraryId;

  return (
    <div>
      {libraries.map((library) => {
        const isLibraryMutating = isMutating && clickedLibraryId === library.id;

        return (
          <div
            key={library.id}
            className={clsx(
              "py-2 px-4 flex items-center justify-center gap-4",
              {
                "cursor-pointer": !isLibraryMutating,
                "opacity-50": isLibraryMutating,
              }
            )}
            onClick={async () => {
              setClickedLibraryId(library.id);

              try {
                if (library.saved) {
                  await unsaveBook(library.id, book.key);
                } else {
                  await saveBook(library.id, book);
                }

                close();
                alert("Success");
              } finally {
                setClickedLibraryId(null);
              }
            }}
          >
            {library.name} {library.saved ? "(Saved)" : ""}
            {isLibraryMutating && <DotLoader color="#000" size={20} />}
          </div>
        );
      })}
    </div>
  );
}
