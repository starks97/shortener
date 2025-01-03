import { UrlCategories, ApiResponse, UrlData } from "~/interfaces";
import { deployment } from "config";

export default async function createUrl(
  token: string,
  original_url: string,
  short_url: string,
  category: UrlCategories
) {
  const res = await fetch(`${deployment.path}/api/url`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ original_url, short_url, category }),
  });

  const apiResponse = (await res.json()) as ApiResponse<UrlData>;

  if (!res) {
    throw new Error(apiResponse.message || "Error creating url");
  }

  return apiResponse;
}
