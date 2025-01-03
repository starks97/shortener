import { ApiResponse, Me } from "~/interfaces";
import { deployment } from "config";

export default async function me(token: string) {
  const res = await fetch(`${deployment.path}/api/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error("Unauthorized");
  }

  const data = (await res.json()) as ApiResponse<Me>;

  return data;
}
