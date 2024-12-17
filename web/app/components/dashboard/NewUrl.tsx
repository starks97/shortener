import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "@remix-run/react";
import { useMutation } from "@tanstack/react-query";

import DynamicForm from "../DynamicForm";
import formDefinitions from "~/formDefinitions";
import { validationAction } from "~/utils/validationAction";

import { modalActions } from "~/utils/modalActions";
import { SearchModalType } from "@interfaces";
import Modal from "@components/Modal";

export default function NewUrl() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const dialogRef = React.useRef<HTMLDialogElement>(null);

  const modalQueries = searchParams.get("modal") as SearchModalType | null;

  useEffect(() => {
    if (!modalQueries) {
      dialogRef.current?.close();
      return;
    }

    modalActions[modalQueries](dialogRef, undefined);
  }, [modalQueries]);

  const [inputValue, setInputValue] = useState<Record<string, string>>({
    original_url: "",
    short_url: "",
    category: "",
  });

  const closeModal = () => {
    navigate("/workspace", { replace: true });
  };

  return (
    <Modal
      id={`modal-create_url`}
      title={"Create new Url"}
      ref={dialogRef}
      footer={<button onClick={closeModal}>Close</button>}
      close={closeModal}
    >
      <h1>Hello</h1>
    </Modal>
  );
}
