import { ApiResponse, RefreshTokenData } from "~/interfaces";
import { deployment } from "config";

export default async function refresh(token: string) {
  const res = await fetch(`${deployment.path}/api/auth/refresh`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Cookie: `refresh_token=${token}`,
    },
  });

  if (!res.ok) {
    throw new Error("Unauthorized");
  }

  const data = (await res.json()) as ApiResponse<RefreshTokenData>;

  return data;
}
