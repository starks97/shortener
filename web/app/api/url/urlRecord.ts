import { UrlCategories, ApiResponse, UrlData } from "~/interfaces";

export default async function urlRecord(
  token: string,
  limit?: number,
  offset?: number,
  category?: UrlCategories
) {
  const categoryParam = category
    ? `&category=${encodeURIComponent(category)}`
    : "";
  const res = await fetch(
    `http://localhost:8000/api/url?limit=${limit}&offset=${offset}${categoryParam}`,
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
