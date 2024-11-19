import { ApiResponse } from "@interfaces";

export default async function logout(token: string) {
  const res = await fetch(`http://localhost:8000/api/auth/logout`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Cookie: `refresh_token=${token}`,
    },
  });

  if (!res.ok) {
    throw new Error("Unauthorized");
  }

  const data = (await res.json()) as ApiResponse<null>;

  return data;
}
