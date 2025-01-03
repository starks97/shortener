import { UrlCategories, ApiResponse, UrlData } from "~/interfaces";
import { deployment } from "config";

export default async function urlRecords(
  token: string,
  limit?: number,
  offset?: number,
  category?: UrlCategories
) {
  const categoryParam = category
    ? `&category=${encodeURIComponent(category)}`
    : "";
  const res = await fetch(
    `${deployment.path}/api/url?limit=${limit}&offset=${offset}${categoryParam}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const apiResponse = (await res.json()) as ApiResponse<UrlData[]>;

  if (apiResponse.status === "error") {
    throw new Error(apiResponse.message || "Unknown error occurred");
  }

  return apiResponse;
}
