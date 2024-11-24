import { UrlCategories, ApiResponse, UrlData } from "~/interfaces";

export default async function updateUrl(
  token: string,
  id: string,
  original_url?: string,
  short_url?: string,
  category?: UrlCategories
) {
  const res = await fetch(`http://localhost:8000/api/url/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ original_url, short_url, category }),
  });

  const apiResponse = (await res.json()) as ApiResponse<UrlData>;

  if (!res) {
    throw new Error(apiResponse.message || "Error updating url");
  }

  return apiResponse;
}