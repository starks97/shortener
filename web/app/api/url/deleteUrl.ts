import { ApiResponse } from "~/interfaces";

export default async function (token: string) {
  const res = await fetch(`http://localhost:8000/api/url`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const apiResponse = (await res.json()) as ApiResponse<null>;

  if (!res) {
    throw new Error(apiResponse.message || "Error creating url");
  }

  return apiResponse;
}
