import { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { dehydrate } from "@tanstack/react-query";
import { createQueryClient } from "~/utils/queryClient";
import middleware from "../middleware";
import { urlQueryOptions } from "~/utils/queryOptions";
import UrlModalRenderer from "~/components/dashboard/UrlModalRenderer";

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
  return [
    { title: `ByteTrim Workspace - ${workspaceId}` },
    { name: "viewport", content: "width=device-width, initial-scale=1" },
    { name: "author", content: "ByteTrim Team" },
    {
      name: "description",
      content: `Manage and track your links in Workspace ${workspaceId} on ByteTrim.`,
    },
    {
      property: "og:title",
      content: `ByteTrim Workspace - ${workspaceId}`,
    },
    {
      property: "og:description",
      content: `Easily manage and monitor your links in Workspace ${workspaceId} on ByteTrim.`,
    },
    { property: "og:type", content: "website" },
    {
      property: "og:url",
      content: `https://bytetrim.com/workspace/${workspaceId}`,
    },
    { property: "og:image", content: "https://bytetrim.com/preview-image.jpg" }, // Replace with actual image URL
    { name: "twitter:card", content: "summary" },
    { name: "twitter:title", content: `ByteTrim Workspace - ${workspaceId}` },
    {
      name: "twitter:description",
      content: `Manage and track your links in Workspace ${workspaceId} on ByteTrim.`,
    },
    {
      name: "twitter:image",
      content: "https://bytetrim.com/preview-image.jpg",
    }, // Replace with actual image URL
  ];
};

export default function Url() {
  return <UrlModalRenderer />;
}
