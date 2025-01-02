import { ApiResponse } from "@interfaces";

type AuthTokens = {
  Atoken: string;
  Rtoken: string;
};

export default async function logout({ Atoken, Rtoken }: AuthTokens) {
  const res = await fetch(`http://localhost:8000/api/auth/logout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Cookie: `refresh_token=${Rtoken}`,
      Authorization: `Bearer ${Atoken}`,
    },
  });

  const data = (await res.json()) as ApiResponse<null>;

  console.log("from api", data.message);

  if (!res.ok) {
    throw new Error(data.message);
  }

  return data;
}
