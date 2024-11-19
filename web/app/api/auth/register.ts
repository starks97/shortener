import { ApiResponse, RegisterData } from "~/interfaces";

export default async function register(
  email: string,
  password: string,
  name: string
) {
  const res = await fetch("http://localhost:8000/api/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password, name }),
  });

  if (!res) {
    throw new Error("Unauthorized");
  }

  const data = (await res.json()) as ApiResponse<RegisterData>;

  return data;
}
