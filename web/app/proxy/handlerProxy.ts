import { ProxyActions, ActionReturnTypes, SearchType } from "@interfaces";

import { actions } from "./proxyActions";

import { accessTokenCookie } from "~/cookies.server";

export default async function handlerProxy<T extends keyof ProxyActions>(
  req: Request
): Promise<ActionReturnTypes[T]> {
  const url = new URL(req.url);
  const action = (url.searchParams.get("url") as SearchType) ?? "";

  if (!action || !actions[action]) {
    throw new Error(`Invalid or unsupported action: ${action}`);
  }

  const queryParams = Object.fromEntries(url.searchParams.entries());
  const getCookie = req.headers.get("Cookie") || "";
  const accessToken = await accessTokenCookie.parse(getCookie);
  const bodyParams = req.method !== "GET" ? await req.json() : {};
  const params = { ...queryParams, ...bodyParams };

  try {
    const result = (await actions[action](
      params,
      accessToken
    )) as ActionReturnTypes[T];

    if (result.status === "error") {
      throw new Error(result.message || "Backend error occurred");
    }

    return result;
  } catch (error) {
    console.error(`Error in action '${action}':`, error);
    throw new Error(`Failed to execute action: ${action}`);
  }
}
