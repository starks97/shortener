import { createCookie } from "@remix-run/node";

export const refreshTokenCookie = createCookie("refresh_token", {
  httpOnly: true,
  secure: false,
  sameSite: "lax",
  path: "/",
  maxAge: 60 * 60 * 24 * 7,
  domain: process.env.DOMAIN,
});

export const accessTokenCookie = createCookie("access_token", {
  secure: false,
  sameSite: "lax",
  path: "/",
  domain: process.env.DOMAIN,
  maxAge: 60 * 30,
  httpOnly: true,
});
