import { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { dehydrate } from "@tanstack/react-query";
import { createQueryClient } from "~/utils/queryClient";
import { useLoaderData } from "@remix-run/react";

import middleware from "../middleware";
import { UrlCategories } from "~/interfaces";
import { urlsQueryOptions } from "~/utils/queryOptions";
import Dashboard from "~/components/dashboard/Dashboard";
import getMetaTags from "~/utils/metaTags";

type LoaderData = {
  offset: number;
  limit: number;
  category: UrlCategories;
};

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const middle = await middleware(request);

  if (middle !== null) {
    return middle;
  }

  const url = new URL(request.url);

  const offset = parseInt(url.searchParams.get("offset") || "1", 10);
  const limit = parseInt(url.searchParams.get("limit") || "10", 10);
  const category =
    (url.searchParams.get("category") as UrlCategories) || UrlCategories.All;

  const queryClient = createQueryClient();

  const options = urlsQueryOptions(10, 0, UrlCategories.All, request);

  await queryClient.prefetchQuery(options);

  return Response.json({
    dehydratedState: dehydrate(queryClient),
    offset,
    limit,
    category,
  });
};
export const meta: MetaFunction = () => getMetaTags("workspace");

export default function WorkSpace() {
  const { offset, limit, category } = useLoaderData<LoaderData>();
  return <Dashboard category={category} limit={limit} offset={offset} />;
}
