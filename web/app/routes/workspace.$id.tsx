import { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { dehydrate } from "@tanstack/react-query";
import { createQueryClient } from "~/utils/queryClient";
import middleware from "../middleware";
import { urlQueryOptions } from "~/utils/queryOptions";
import UrlModalRenderer from "~/components/dashboard/UrlModalRenderer";
import getMetaTags from "~/utils/metaTags";

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

export const meta: MetaFunction = ({ params }) => {
  const workspaceId = params.id;
  return getMetaTags("workspace_id", workspaceId!);
};

export default function Url() {
  return <UrlModalRenderer />;
}
