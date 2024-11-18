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
      return Response.json({ status: "success", data: { user, accessToken } });
    }
    if (refreshToken) {
      return redirect("/auth/refresh", { status: 302 });
    }
    return redirect("/auth/login", { status: 302 });
  } else {
    if (refreshToken) {
      return redirect("/auth/refresh", { status: 302 });
    }
    return redirect("/auth/login", { status: 302 });
  }
}
