import { FetchQueryOptions } from "@tanstack/react-query";
import { UrlData, UrlCategories, ApiResponse } from "@interfaces";

const fetchUrls = async <
  T extends ApiResponse<UrlData> | ApiResponse<UrlData[]>
>(
  limit?: string | number,
  offset?: string | number,
  category?: UrlCategories,
  id?: string,
  request?: Request
): Promise<T> => {
  let url: string;
  if (id) {
    url = `/api/proxy?url=view&id=${id}`;
  } else {
    const queryParams = new URLSearchParams();
    if (limit) queryParams.append("limit", String(limit));
    if (offset) queryParams.append("offset", String(offset));
    if (category) queryParams.append("category", category);

    url = `/api/proxy?url=view&${queryParams.toString()}`;
  }

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
    credentials: "same-origin",
  });

  const apiResponse = (await res.json()) as T;

  return apiResponse;
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
      const response = await fetchUrls<ApiResponse<UrlData[]>>(
        limit,
        offset,
        category,
        undefined,
        request
      );

      return response.data ?? [];
    },
    staleTime: 6000,
  };
};

export const urlQueryOptions = (
  id: string,
  request?: Request
): FetchQueryOptions<UrlData, Error> => {
  return {
    queryKey: ["url", id],
    queryFn: async (): Promise<UrlData> => {
      const response = await fetchUrls<ApiResponse<UrlData>>(
        undefined,
        undefined,
        undefined,
        id,
        request
      );

      if (!response || !response.data) {
        throw new Error("No data found for the specified URL ID.");
      }

      return response.data;
    },
    staleTime: 6000,
  };
};
