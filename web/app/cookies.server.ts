import { createCookie } from "@remix-run/node";

export const refreshTokenCookie = createCookie("refresh_token", {
  httpOnly: true,
  secure: false,
  sameSite: "lax",
  path: "/",
  maxAge: 60 * 60 * 24 * 7,
  domain: process.env.DOMAIN,
  priority: "high",
});
