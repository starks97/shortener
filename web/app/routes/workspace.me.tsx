import middleware from "../middleware";
import { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
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

export const meta: MetaFunction = () => {
  return [
    { title: `Workspace - Profile | ByteTrim` },
    { name: "viewport", content: "width=device-width, initial-scale=1" },
    { name: "author", content: "ByteTrim Team" },
    {
      name: "description",
      content: `Manage and organize your profile. ByteTrim offers an efficient way to handle your shortened URLs.`,
    },
    {
      property: "og:title",
      content: `Workspace - Profile | ByteTrim`,
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

export default function Profile() {
  return <Me />;
}
