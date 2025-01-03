import { ApiResponse, RegisterData } from "~/interfaces";
import { deployment } from "config";

export default async function register(
  email: string,
  password: string,
  name: string
) {
  const res = await fetch(`${deployment.path}/api/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password, name }),
  });

  if (!res) {
    throw new Error("Unauthorized");
  }

  const apiResponse = (await res.json()) as ApiResponse<RegisterData>;

  const { data } = apiResponse;

  return data;
}
