import React from "react";

import "../styles/global.css";

import { ModalProps } from "~/interfaces";

// Use React.forwardRef to handle the `ref` correctly
const Modal = React.forwardRef<HTMLDialogElement, ModalProps>(
  ({ id, title, children, footer }, ref) => {
    const closeDialog = () => {
      (ref as React.RefObject<HTMLDialogElement>).current?.close();
    };

    return (
      <dialog
        id={id}
        ref={ref}
        className="rounded-lg shadow-xl w-full mx-4 md:mx-auto md:max-w-md"
      >
        {/* Modal Head */}
        <header className="flex justify-between items-center">
          <span className="text-2xl font-semibold text-gray-200">{title}</span>
          <button className="p-1" onClick={closeDialog}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="1.5rem"
              viewBox="0 -960 960 960"
              width="1.5rem"
              fill="white"
            >
              <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
            </svg>
          </button>
        </header>

        {/* Modal Body */}
        <div className="my-4">{children}</div>

        {/* Modal Footer (Optional) */}
        {footer && <footer className="mt-4 flex justify-end">{footer}</footer>}
      </dialog>
    );
  }
);

Modal.displayName = "Modal";

export default Modal;
