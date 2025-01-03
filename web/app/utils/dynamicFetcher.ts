import { DynamicFetcherProps } from "~/interfaces";

/**
 * Dynamically fetches data from the `/api/proxy` endpoint using the provided parameters, request method, and optional body.
 *
 * This function constructs a URL with the specified action parameters and optional query parameters, and then issues a fetch
 * request to the server. It is designed to be used both on the server and client side:
 * - On the server, it will build an absolute URL based on the request's origin, and include any cookies present in the request headers.
 * - On the client, it will use a relative URL and rely on browser-based cookies.
 *
 * @template T - The expected return type of the API response.
 *
 * @param props - The properties required to perform a dynamic fetch.
 * @param props.searchMethodParam - A string representing the method parameter used to determine which service/action group is being called. Example: "url", "auth", or "users".
 * @param props.searchActionParam - A string representing the specific action to be performed within the chosen method group.
 * @param props.method - The HTTP method to be used for the request (e.g., "GET", "POST", "PATCH").
 * @param props.body - An optional request body object, included only if the method is "POST" or "PATCH".
 * @param props.queryParams - An optional object of query parameters to append to the request URL. All parameters will be stringified and appended to the query string.
 * @param props.request - The `Request` object from server-side environments (e.g., Next.js), used to extract server-side cookies and build an absolute URL.
 *
 * @returns A promise that resolves to the parsed JSON response as type `T`.
 *
 * @throws Will throw if the fetch request fails or the response cannot be parsed as JSON.
 *
 * @example
 * ```typescript
 * const result = await dynamicFetcher({
 *   searchMethodParam: "url",
 *   searchActionParam: "view",
 *   method: "GET",
 *   queryParams: { limit: 10 },
 * });
 * console.log(result); // The expected data from the API response.
 * ```
 */

export default async function dynamicFetcher<T>({
  searchMethodParam,
  searchActionParam,
  method,
  body,
  queryParams,
  request,
}: DynamicFetcherProps): Promise<T> {
  const isServer = typeof window === "undefined";

  // Construct query string
  const urlParams = new URLSearchParams();
  if (queryParams) {
    for (const [key, value] of Object.entries(queryParams)) {
      if (value !== undefined) {
        urlParams.append(key, String(value));
      }
    }
  }
  let url = `/api/proxy?${searchMethodParam}=${searchActionParam}`;
  if (urlParams.toString()) {
    url += `&${urlParams.toString()}`;
  }

  console.log("from dynamic fetcher", url);

  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  if (isServer && request) {
    const baseUrl = new URL(request.url).origin;
    url = `${baseUrl}${url}`;
    const cookieHeader = request.headers.get("Cookie");
    if (cookieHeader) {
      headers["Cookie"] = cookieHeader;
    }
  }

  const fetchOptions: RequestInit = {
    method,
    headers,
    credentials: "same-origin",
  };

  if (body && (method === "POST" || method === "PATCH")) {
    fetchOptions.body = JSON.stringify(body);
  }

  const res = await fetch(url, fetchOptions);

  if (!res.ok) {
    console.error(`Fetch failed: ${res.status} ${res.statusText}`);
    throw new Error(`HTTP error! Status: ${res.status}`);
  }

  try {
    const apiResponse = res.headers
      .get("Content-Type")
      ?.includes("application/json")
      ? await res.json()
      : null;

    if (!apiResponse) {
      console.warn("Response is empty or not JSON:", await res.text());
      throw new Error("Invalid or empty response from server.");
    }

    return apiResponse;
  } catch (err) {
    console.error("Failed to parse response as JSON:", err);
    throw new Error("An error occurred while processing the response.");
  }
}
