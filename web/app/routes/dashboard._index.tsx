import { LoaderFunctionArgs } from "@remix-run/node";
import middleware from "../middleware";

import { useLoaderData } from "@remix-run/react";

export const loader = async ({ context, request }: LoaderFunctionArgs) => {
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

  const data = useLoaderData<LoaderData>();

  return (
    <div>
      <h1>dashboard</h1>
    </div>
  );
}
