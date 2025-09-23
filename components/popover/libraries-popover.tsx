"use client";

import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import LibrariesPopoverPanel, { LibrariesPopoverPanelProps } from "./libraries";

export default function LibraryPopover(
  params: Omit<LibrariesPopoverPanelProps, "open">
) {
  return (
    <Popover className="relative">
      {({ open }) => (
        <>
          <PopoverButton className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Add to Library
          </PopoverButton>

          <PopoverPanel
            anchor="bottom" // ⬅ positions it relative to button, outside parent bounds
            className="z-[9999] mt-2 w-max rounded-lg bg-white shadow-lg ring-1 ring-black/10"
          >
            <LibrariesPopoverPanel open={open} book={params.book} />
          </PopoverPanel>
        </>
      )}
    </Popover>
  );
}
