import middleware from "../middleware";
import { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";

import NewUrl from "~/components/dashboard/NewUrl";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const middle = await middleware(request);

  if (middle !== null) {
    return middle;
  }

  return Response.json({ status: "success" });
};

export const meta: MetaFunction = () => {
  return [
    { title: `Workspace - NewUrl | ByteTrim` },
    { name: "viewport", content: "width=device-width, initial-scale=1" },
    { name: "author", content: "ByteTrim Team" },
    {
      name: "description",
      content: `Manage and organize your links in Workspace by creating a new custom shortener url. ByteTrim offers an efficient way to handle your shortened URLs.`,
    },
    {
      property: "og:title",
      content: `Workspace - NewUrls | ByteTrim`,
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

export default function CreateNewUrl() {
  return <NewUrl />;
}
