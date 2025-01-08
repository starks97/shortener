import { createCookie } from "@remix-run/node";

export const RCookie = createCookie("refresh_token", {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  path: "/",
  maxAge: 60 * 60 * 24 * 7,
  ...(process.env.NODE_ENV === "production" && { domain: process.env.DOMAIN }),
});

export const ACookie = createCookie("access_token", {
  secure: process.env.NODE_ENV === "production",
  sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  path: "/",
  maxAge: 60 * 30,
  httpOnly: true,
  ...(process.env.NODE_ENV === "production" && { domain: process.env.DOMAIN }),
});

export const logoutRtoken = createCookie("refresh_token", {
  maxAge: 0,
  path: "/",
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  ...(process.env.NODE_ENV === "production" && { domain: process.env.DOMAIN }),
});

export const logoutAtoken = createCookie("access_token", {
  maxAge: 0,
  path: "/",
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  ...(process.env.NODE_ENV === "production" && { domain: process.env.DOMAIN }),
});
