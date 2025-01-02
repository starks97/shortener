import {
  ProxyActions,
  ActionReturnTypes,
  SearchActionParamType,
  SearchMethodParams,
} from "@interfaces";

import { actions } from "./proxyActions";

import { ACookie, RCookie } from "~/cookies.server";

/**
 * A proxy handler function that routes the incoming request to a corresponding action based on URL search parameters.
 *
 * This function performs the following steps:
 * 1. Parses the incoming request URL and identifies which action parameter is present:
 *    - `auth`: For authentication-related actions.
 *    - `url`: For URL-related actions.
 *    - `users`: For user-related actions.
 *
 *    If no supported action parameter is found, an error is thrown.
 *
 * 2. Extracts the specified action from the query parameters. If the action is invalid or not recognized
 *    by the `actions` object, an error is thrown.
 *
 * 3. Retrieves all query parameters and merges them with any body parameters (if the request is not a GET request).
 *
 * 4. Extracts the access token from the request cookies.
 *
 * 5. Invokes the corresponding action function from `actions` with the aggregated parameters and the access token.
 *
 * 6. Ensures that the returned result does not contain an error status. If it does, an error is thrown.
 *
 * On successful completion, the function returns a promise that resolves to the appropriate `ActionReturnTypes` for the invoked action.
 *
 * @template T - A key of `ProxyActions` specifying which action is being executed.
 *
 * @param req - The incoming `Request` object.
 *
 * @returns A promise resolving to the result of the invoked action, conforming to `ActionReturnTypes[T]`.
 *
 * @throws Will throw an error if:
 * - No supported action parameter (`auth`, `url`, or `users`) is found.
 * - The found action parameter is invalid or unsupported.
 * - The backend returns a result with `status: "error"`.
 * - Any other error occurs during the action's execution.
 */

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
  const token = await ACookie.parse(getCookie);

  const bodyParams = req.method !== "GET" ? await req.json() : {};
  const params = { ...queryParams, ...bodyParams };

  try {
    const result = (await actions[action](
      params,
      token
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
