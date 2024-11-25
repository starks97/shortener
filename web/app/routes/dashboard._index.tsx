import React from "react";
import { LoaderFunctionArgs } from "@remix-run/node";
import { dehydrate } from "@tanstack/react-query";
import { createQueryClient } from "~/utils/queryClient";

import middleware from "../middleware";
import Modal from "@components/Modal";
import QRCodeGenerator from "~/components/qr/QrGenerator";
import DownLoadQR from "~/components/qr/DownloadQr";
import { accessTokenCookie } from "~/cookies.server";
import { UrlCategories } from "~/interfaces";

import { urlsQueryOptions } from "~/utils/queryOptions";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const getCookie = request.headers.get("Cookie") || "";
  const middle = await middleware(request);

  if (middle) {
    return middle;
  }

  const queryClient = createQueryClient();
  const token = await accessTokenCookie.parse(getCookie);

  const options = urlsQueryOptions(10, 0, UrlCategories.All, token);

  await queryClient.prefetchQuery(options);

  return Response.json({ dehydratedState: dehydrate(queryClient) });
};

export default function Dashboard() {
  const dialogRef = React.useRef<HTMLDialogElement>(null);
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const qrModalRef = React.useRef<HTMLDialogElement>(null);

  const openDialog = () => {
    dialogRef.current?.showModal();
  };

  const openQrModal = () => {
    qrModalRef.current?.showModal();
  };

  const test = async () => {
    const res = await fetch("http://localhost:5173/api/proxy?url=view", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      //body: JSON.stringify({ url: "https://google.com" }),
    });

    const data = await res.json();
    return data;
  };

  test()
    .then((data) => console.log(data))
    .catch((error) => console.error(error));

  return (
    <div>
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
  );
}
