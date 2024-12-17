import {
  ProxyActions,
  ActionReturnTypes,
  SearchActionParamType,
  SearchMethodParams,
} from "@interfaces";

import { actions } from "./proxyActions";

import { ACookie } from "~/cookies.server";

export default async function handlerProxy<T extends keyof ProxyActions>(
  req: Request
): Promise<ActionReturnTypes[T]> {
  const incomingUrl = new URL(req.url);

  const actionParamName = [
    SearchMethodParams.AUTH,
    SearchMethodParams.URL,
    SearchMethodParams.USERS,
  ].find((param) => incomingUrl.searchParams.has(param));

  if (!actionParamName) {
    throw new Error(
      "No supported action parameter found. Use 'url', 'auth' or 'users'."
    );
  }

  const action =
    (incomingUrl.searchParams.get(actionParamName) as SearchActionParamType) ??
    "";

  if (!action || !actions[action]) {
    throw new Error(`Invalid or unsupported action: ${action}`);
  }

  const queryParams = Object.fromEntries(incomingUrl.searchParams.entries());
  const getCookie = req.headers.get("Cookie") || "";
  const accessToken = await ACookie.parse(getCookie);
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
