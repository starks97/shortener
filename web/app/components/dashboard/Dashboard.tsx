import React from "react";
import { useQuery } from "@tanstack/react-query";

import Modal from "../Modal";
import QRCodeGenerator from "../qr/QrGenerator";
import DownLoadQR from "../qr/DownloadQr";
import { UrlCategories } from "~/interfaces";
import { urlsQueryOptions } from "~/utils/queryOptions";
import UrlCard from "./UrlCard";

export default function Dashboard() {
  const dialogRef = React.useRef<HTMLDialogElement>(null);
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const qrModalRef = React.useRef<HTMLDialogElement>(null);
  const limit = 10;
  const offset = 0;
  const category = UrlCategories.All;

  const { data, error, isLoading } = useQuery(
    urlsQueryOptions(limit, offset, category)
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error instanceof Error) {
    return <div>Error: {error.message}</div>;
  }

  const openDialog = () => {
    dialogRef.current?.showModal();
  };

  const openQrModal = () => {
    qrModalRef.current?.showModal();
  };
  return (
    <>
      <h1>Dashboard</h1>
      <div className="grid gid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 justify-items-center w-full ">
        {data
          ? data.map((url) => (
              <UrlCard id={url.id} short_url={url.short_url} key={url.id} />
            ))
          : null}

        <div className="flex flex-col gap-10 w-full justify-center items-center my-10">
          <button
            onClick={openDialog}
            className="px-4 py-2 bg-orange-600 text-white rounded"
          >
            Open Url
          </button>

          <button
            onClick={openQrModal}
            className="px-4 py-2 bg-orange-600 text-white rounded"
          >
            Open QrGenerator
          </button>
        </div>

        <Modal
          id="my-dialog"
          title="Simple Dialog"
          ref={dialogRef}
          footer={
            <button onClick={() => dialogRef.current?.close()}>Close</button>
          }
        >
          <p className="text-gray-300">
            This is the body content of the dialog. Add whatever you want here.
          </p>
        </Modal>
        <Modal
          id="qr_modal"
          title="QR Generator"
          ref={qrModalRef}
          footer={
            <button onClick={() => qrModalRef.current?.close()}>Close</button>
          }
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
      </div>
    </>
  );
}
