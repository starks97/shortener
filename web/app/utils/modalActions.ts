import { ModalActions } from "@interfaces";

export const modalActions: ModalActions = {
  view: (dialogRef, qrModalRef) => {
    dialogRef.current?.showModal();
    qrModalRef!.current?.close();
  },
  qr: (dialogRef, qrModalRef) => {
    qrModalRef!.current?.showModal();
    dialogRef.current?.close();
  },
  create: (dialogRef) => {
    dialogRef.current?.showModal();
  },
};
