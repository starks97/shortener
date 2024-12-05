import React, { useEffect } from "react";
import { LoaderFunctionArgs } from "@remix-run/node";
import { dehydrate } from "@tanstack/react-query";
import { useParams, useNavigate, useSearchParams } from "@remix-run/react";
import { createQueryClient } from "~/utils/queryClient";

import middleware from "../middleware";
import { urlQueryOptions } from "~/utils/queryOptions";
import Modal from "@components/Modal";
import QRCodeGenerator from "@components/qr/QrGenerator";
import DownLoadQR from "@components/qr/DownloadQr";
import { SearchModalType } from "@interfaces";

import { modalActions } from "~/utils/modalActions";

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  const middle = await middleware(request);

  if (middle !== null) {
    return middle;
  }

  const queryClient = createQueryClient();

  const options = urlQueryOptions(params.id!, request);

  await queryClient.prefetchQuery(options);

  return Response.json({ dehydratedState: dehydrate(queryClient) });
};

export default function Url() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [searchParams] = useSearchParams();

  const dialogRef = React.useRef<HTMLDialogElement>(null);
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const qrModalRef = React.useRef<HTMLDialogElement>(null);

  const modalQueries = searchParams.get("modal") as SearchModalType | null;

  useEffect(() => {
    if (!modalQueries) {
      dialogRef.current?.close();
      qrModalRef.current?.close();
      return;
    }

    modalActions[modalQueries](dialogRef, qrModalRef);
  }, [modalQueries]);

  const closeModal = () => {
    navigate("/workspace", { replace: true });
  };

  return (
    <>
      <Modal
        id={`modal-${id!}`}
        title="Simple Dialog"
        ref={dialogRef}
        footer={<button onClick={closeModal}>Close</button>}
        close={closeModal}
      >
        <p className="text-gray-300">
          This is the body content of the dialog. Add whatever you want here.
        </p>
      </Modal>
      <Modal
        id={`qr_modal-${id!}`}
        title="QR Generator"
        ref={qrModalRef}
        footer={<button onClick={closeModal}>Close</button>}
        close={closeModal}
      >
        <QRCodeGenerator
          canvasRef={canvasRef}
          url="https://google.com"
          size={200}
        />
        <div className="flex justify-center items-center ">
          <canvas
            ref={canvasRef}
            width={200}
            height={200}
            style={{ border: "2px solid orange" }}
          />
        </div>
        <DownLoadQR canvasRef={canvasRef} />
      </Modal>
    </>
  );
}
