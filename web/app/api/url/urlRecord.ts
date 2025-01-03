import { ApiResponse, UrlData } from "~/interfaces";
import { deployment } from "config";

export default async function urlRecord(id: string, token: string) {
  const res = await fetch(`${deployment.path}/api/url/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const apiResponse = (await res.json()) as ApiResponse<UrlData>;

  if (apiResponse.status === "error") {
    throw new Error(apiResponse.message || "Unknown error occurred");
  }

  return apiResponse;
}
