import { DynamicFetcherProps } from "~/interfaces";

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
  const apiResponse = (await res.json()) as T;
  return apiResponse;
}
