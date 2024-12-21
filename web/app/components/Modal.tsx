import React from "react";

import "../styles/global.css";

import { ModalProps } from "~/interfaces";

/**
 * A customizable modal dialog component built with React.
 *
 * This component leverages the native HTML `<dialog>` element to create a modal interface.
 * It includes a header with a title and a close button, a body for displaying content, and an
 * optional footer for additional actions or information. The modal can be controlled
 * programmatically via refs.
 *
 * @param props - The properties passed to the Modal component.
 * @param props.id - A unique identifier for the modal dialog.
 * @param props.title - The title text displayed in the modal header.
 * @param props.children - The content to be rendered inside the modal body.
 * @param props.footer - Optional content to be rendered in the modal footer, typically used for action buttons.
 * @param props.close - A callback function to close the modal.
 *
 * @example
 * ```tsx
 * import React, { useRef } from 'react';
 * import Modal from './Modal';
 *
 * const App = () => {
 *   const modalRef = useRef<HTMLDialogElement>(null);
 *
 *   const openModal = () => {
 *     modalRef.current?.showModal();
 *   };
 *
 *   const closeModal = () => {
 *     modalRef.current?.close();
 *   };
 *
 *   return (
 *     <div>
 *       <button onClick={openModal}>Open Modal</button>
 *       <Modal
 *         id="example-modal"
 *         title="Example Modal"
 *         ref={modalRef}
 *         close={closeModal}
 *         footer={
 *           <button onClick={closeModal} className="btn btn-primary">
 *             Close
 *           </button>
 *         }
 *       >
 *         <p>This is the content of the modal.</p>
 *       </Modal>
 *     </div>
 *   );
 * };
 *
 * export default App;
 * ```
 *
 * @component
 *
 * @returns A React `<dialog>` element representing the modal.
 */

const Modal = React.forwardRef<HTMLDialogElement, ModalProps>(
  ({ id, title, children, footer, close }, ref) => {
    return (
      <dialog
        id={id}
        ref={ref}
        className="rounded-lg shadow-xl w-full mx-4 md:mx-auto md:max-w-md p-5"
      >
        {/* Modal Head */}
        <header className="flex justify-between items-center border-b border-orange-400 px-5 ">
          <span className="text-2xl font-semibold text-gray-200">{title}</span>
          <button className="p-1" onClick={close}>
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
