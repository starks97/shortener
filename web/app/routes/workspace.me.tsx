import middleware from "../middleware";
import { LoaderFunctionArgs } from "@remix-run/node";
import { meQueryOptions } from "~/utils/queryOptions";

import { dehydrate } from "@tanstack/react-query";
import { createQueryClient } from "~/utils/queryClient";
import { Me } from "~/components/profile/Me";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const middle = await middleware(request);

  if (middle !== null) {
    return middle;
  }

  const queryClient = createQueryClient();

  const options = meQueryOptions(request);

  await queryClient.prefetchQuery(options);

  return Response.json({ dehydratedState: dehydrate(queryClient) });
};

export default function Profile() {
  return <Me />;
}
