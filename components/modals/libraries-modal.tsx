import {
  Description,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";

export default function LibrariesModal(params: {
  open: boolean;
  onClose: () => void;
}) {
  const { open, onClose } = params;

  return (
    <Dialog open={open} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
        <DialogPanel className="max-w-lg space-y-4 border bg-white p-12">
          <DialogTitle className="font-bold">Deactivate account</DialogTitle>
          <Description>
            This will permanently deactivate your account
          </Description>
          <p>
            Are you sure you want to deactivate your account? All of your data
            will be permanently removed.
          </p>
          <div className="flex gap-4">
            <button onClick={() => onClose()}>Cancel</button>
            <button onClick={() => onClose()}>Deactivate</button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
}
