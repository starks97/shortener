import { ApiResponse, RefreshTokenData } from "~/interfaces";

export default async function refresh(token: string) {
  const res = await fetch(`http://localhost:8000/api/auth/refresh`, {
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
