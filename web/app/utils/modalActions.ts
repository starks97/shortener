import { ModalActions } from "@interfaces";

/**
 * A collection of actions to control the visibility of modal dialogs.
 *
 * Each action is a function that operates on references to one or more dialog elements.
 * By calling these actions, you can open or close specific dialogs based on the
 * intended behavior within your UI.
 */
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
