import { FetchQueryOptions } from "@tanstack/react-query";
import { UrlData, UrlCategories, ApiResponse } from "@interfaces";

const urls = async (
  limit?: string | number,
  offset?: string | number,
  category?: UrlCategories,
  request?: Request
) => {
  let url = `/api/proxy?url=view&limit=${limit}&offset=${offset}&category=${category}`;

  // Determine if we're on the server or client
  const isServer = typeof window === "undefined";
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  if (isServer && request) {
    // Construct absolute URL on the server
    const baseUrl = new URL(request.url).origin;
    url = `${baseUrl}${url}`;

    // Forward cookies from the incoming request
    const cookieHeader = request.headers.get("Cookie");
    if (cookieHeader) {
      headers["Cookie"] = cookieHeader;
    }
  }

  const res = await fetch(url, {
    method: "GET",
    headers,
    // 'credentials' option is not effective in server-side fetch
    // It can be included for completeness, but it doesn't impact server-side fetch
    credentials: "same-origin",
  });

  const apiResponse = (await res.json()) as ApiResponse<UrlData[]>;

  const { data } = apiResponse;

  return data;
};

export const urlsQueryOptions = (
  limit: number,
  offset: number,
  category: UrlCategories,
  request?: Request
): FetchQueryOptions<UrlData[], Error> => {
  return {
    queryKey: ["urls", limit, offset, category],
    queryFn: async (): Promise<UrlData[]> => {
      const response = await urls(limit, offset, category, request);

      return response ?? [];
    },
    staleTime: 6000,
  };
};
