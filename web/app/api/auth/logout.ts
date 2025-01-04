import { ApiResponse } from "@interfaces";
import { deployment } from "config";

type AuthTokens = {
  Atoken: string;
  Rtoken: string;
};

export default async function logout({ Atoken, Rtoken }: AuthTokens) {
  const res = await fetch(`${deployment.path}/api/auth/logout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Cookie: `refresh_token=${Rtoken}`,
      Authorization: `Bearer ${Atoken}`,
    },
  });

  const data = (await res.json()) as ApiResponse<null>;

  if (!res.ok) {
    throw new Error(data.message);
  }

  return data;
}
