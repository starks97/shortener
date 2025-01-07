import { deployment } from "config";
import { ApiResponse, UrlRedirection } from "~/interfaces";

export default async function urlRedirection(
  slug: string
): Promise<ApiResponse<UrlRedirection>> {
  const res = await fetch(`${deployment.path}/api/url/redirect/${slug}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const apiResponse = (await res.json()) as ApiResponse<UrlRedirection>;

  if (!res) {
    throw new Error(apiResponse.message);
  }

  return apiResponse;
}
