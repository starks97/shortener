import { ApiResponse, LoginData } from "@interfaces";

export default async function login(
  email: string,
  password: string
): Promise<{ data: ApiResponse<LoginData>; refreshToken?: string }> {
  const res = await fetch("http://localhost:8000/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  const data = (await res.json()) as ApiResponse<LoginData>;

  if (!res.ok) {
    throw new Error(data.message || "Login failed");
  }

  const setCookieHeader = res.headers.get("set-cookie");
  let refreshToken: string | undefined;

  if (setCookieHeader) {
    const match = setCookieHeader.match(/refresh_token=([^;]+)/);
    if (match) {
      refreshToken = match[1];
    }
  }

  return { data, refreshToken };
}
