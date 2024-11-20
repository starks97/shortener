import { LoaderFunctionArgs } from "@remix-run/node";
import middleware from "../middleware";
import Modal from "@components/Modal";
import React from "react";

import { useLoaderData } from "@remix-run/react";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const response = await middleware(request);
  return response;
};

export default function Dashboard() {
  type LoaderData = {
    status: string;
    data: {
      user: {
        name: string;
        // Other fields as needed
      };
      accessToken: string;
    };
  };

  const dialogRef = React.useRef<HTMLDialogElement>(null);

  const openDialog = () => {
    dialogRef.current?.showModal();
  };

  //const data = useLoaderData<LoaderData>();

  return (
    <div>
      <h1 className="text-3xl text-white flex justify-center mt-10 uppercase">
        dashboard
      </h1>
      <button
        onClick={openDialog}
        className="px-4 py-2 bg-orange-600 text-white rounded"
      >
        Open Dialog
      </button>

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
    </div>
  );
}
