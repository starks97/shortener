import React, { useEffect } from "react";
import { useParams, useNavigate, useSearchParams } from "@remix-run/react";
import { useQuery } from "@tanstack/react-query";
import { urlQueryOptions } from "~/utils/queryOptions";
import { DateConverter } from "~/utils/dateConverter";

import { ModalRefs } from "@interfaces";

import Modal from "@components/Modal";
import QRCodeGenerator from "@components/qr/QrGenerator";
import DownLoadQR from "@components/qr/DownloadQr";

import { createModalActions } from "~/utils/modalActions";

import UrlUpdater from "./UrlUpdater";
import DeleteRecordBtn from "./DeleteRecordBtn";

import { baseUrl } from "~/consts";

export default function UrlModalRenderer() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [searchParams] = useSearchParams();

  const dialogRef = React.useRef<HTMLDialogElement>(null);
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const qrModalRef = React.useRef<HTMLDialogElement>(null);

  const modalQueries = searchParams.get("modal") as keyof ModalRefs | null;

  const modalActions = createModalActions({
    view: dialogRef,
    qr: qrModalRef,
  });

  useEffect(() => {
    if (!modalQueries) {
      modalActions.closeAll();
    } else {
      modalActions.show(modalQueries);
    }
  }, [modalQueries, modalActions]);

  const closeModal = () => {
    navigate(-1);
  };

  const { data, error, isLoading } = useQuery(urlQueryOptions(id!));

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error instanceof Error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
      {data && (
        <>
          <Modal
            id={`modal-${id!}`}
            title={data.short_url}
            ref={dialogRef}
            footer={<DeleteRecordBtn id={id!} />}
            close={closeModal}
          >
            <UrlUpdater
              category={data.category}
              id={data.id}
              original_url={data.original_url}
              short_url={data.short_url}
            />
            <div className="flex flex-row space-x-3 w-full mt-4">
              <span className="text-orange-500 w-1/4">Views</span>
              <p className="text-gray-300">{data.views}</p>
            </div>
            <div className="flex flex-row space-x-3 w-full mt-4">
              <span className="text-orange-500 w-1/4">{`Created `}</span>
              <p className="text-gray-300">
                {DateConverter.formatDateFromString(data.createdAt)}
              </p>
            </div>
            <div className="flex flex-row space-x-3 w-full mt-4">
              <span className="text-orange-500 w-1/4">Updated</span>
              <p className="text-gray-300">
                {DateConverter.formatDateFromString(data.updatedAt)}
              </p>
            </div>
          </Modal>
          <Modal
            id={`qr_modal-${id!}`}
            title={`${data.short_url}`}
            ref={qrModalRef}
            close={closeModal}
          >
            <QRCodeGenerator
              canvasRef={canvasRef}
              url={`${baseUrl}/workspace/qr-redirection/${data.slug}`}
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
            <DownLoadQR canvasRef={canvasRef} fileName={data.slug} />
          </Modal>
        </>
      )}
    </>
  );
}
