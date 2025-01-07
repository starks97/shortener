import { ModalActions, ModalRefs } from "@interfaces";

/**
 * A collection of actions to control the visibility of modal dialogs.
 *
 * Each action is a function that operates on references to one or more dialog elements.
 * By calling these actions, you can open or close specific dialogs based on the
 * intended behavior within your UI.
 */

export const createModalActions = (refs: ModalRefs) => {
  return {
    show: (modalType: keyof ModalRefs) => {
      Object.entries(refs).forEach(([key, ref]) => {
        if (key === modalType) ref.current?.showModal();
        else ref.current?.close();
      });
    },
    closeAll: () => {
      Object.values(refs).forEach((ref) => ref.current?.close());
    },
  };
};
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
