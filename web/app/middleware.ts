import { accessTokenCookie, refreshTokenCookie } from "~/cookies.server";

import { redirect } from "@remix-run/node";
import me from "@api/auth/me";

export default async function middleware(req: Request) {
  const getCookie = req.headers.get("Cookie") || "";

  const accessToken = await accessTokenCookie.parse(getCookie);
  const refreshToken = await refreshTokenCookie.parse(getCookie);

  if (accessToken) {
    const user = await me(accessToken);
    if (user) {
      //return {accesToken}
      return null;
    }
  }

  if (refreshToken) {
    throw redirect("/auth/refresh", { status: 302 });
  }

  throw redirect("/auth/login", { status: 302 });
}
