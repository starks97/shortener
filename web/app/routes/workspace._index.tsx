import { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { dehydrate } from "@tanstack/react-query";
import { createQueryClient } from "~/utils/queryClient";
import { useLoaderData } from "@remix-run/react";

import middleware from "../middleware";
import { UrlCategories } from "~/interfaces";
import { urlsQueryOptions } from "~/utils/queryOptions";
import Dashboard from "~/components/dashboard/Dashboard";

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
export const meta: MetaFunction = () => {
  return [
    { title: `Workspace | ByteTrim` },
    { name: "viewport", content: "width=device-width, initial-scale=1" },
    { name: "author", content: "ByteTrim Team" },
    {
      name: "description",
      content: `Manage and organize your links in Workspace. ByteTrim offers an efficient way to handle your shortened URLs.`,
    },
    {
      property: "og:title",
      content: `Workspace | ByteTrim`,
    },
    {
      property: "og:description",
      content: `Take control of your links in Workspace. Organize and monitor your shortened URLs with ease.`,
    },
    { property: "og:type", content: "website" },
    {
      property: "og:url",
      content: `https://bytetrim.com/workspace`,
    },
    { property: "og:image", content: "https://bytetrim.com/preview-image.jpg" }, // Replace with the correct preview image URL
  ];
};

export default function WorkSpace() {
  const { offset, limit, category } = useLoaderData<LoaderData>();
  return <Dashboard category={category} limit={limit} offset={offset} />;
}
