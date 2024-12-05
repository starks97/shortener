import { LoaderFunctionArgs } from "@remix-run/node";
import { dehydrate } from "@tanstack/react-query";
import { useParams } from "@remix-run/react";
import { createQueryClient } from "~/utils/queryClient";

import middleware from "../middleware";
import { urlQueryOptions } from "~/utils/queryOptions";

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
  const { id } = useParams();
  console.log(id);
}
