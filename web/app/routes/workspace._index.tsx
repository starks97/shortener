import { LoaderFunctionArgs } from "@remix-run/node";
import { dehydrate } from "@tanstack/react-query";
import { createQueryClient } from "~/utils/queryClient";

import middleware from "../middleware";
import { UrlCategories } from "~/interfaces";
import { urlsQueryOptions } from "~/utils/queryOptions";
import Dashboard from "~/components/dashboard/Dashboard";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const middle = await middleware(request);

  if (middle !== null) {
    return middle;
  }
  const queryClient = createQueryClient();

  const options = urlsQueryOptions(10, 0, UrlCategories.All, request);

  await queryClient.prefetchQuery(options);

  return Response.json({ dehydratedState: dehydrate(queryClient) });
};

export default function WorkSpace() {
  return <Dashboard />;
}
