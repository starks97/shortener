import middleware from "../middleware";
import { LoaderFunctionArgs } from "@remix-run/node";

import NewUrl from "~/components/dashboard/NewUrl";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const middle = await middleware(request);

  if (middle !== null) {
    return middle;
  }

  return Response.json({ status: "success" });
};

export default function CreateNewUrl() {
  return <NewUrl />;
}
