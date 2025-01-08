import { FetchQueryOptions, UseQueryOptions } from "@tanstack/react-query";
import {
  UrlData,
  UrlCategories,
  ApiResponse,
  Me,
  SearchMethodParams,
  UrlRedirection,
} from "@interfaces";
import dynamicFetcher from "./dynamicFetcher";
import { fetchUrls, urlRedirection } from "./proxyClient";

export const meQueryOptions = (
  request?: Request
): FetchQueryOptions<Me, Error> => {
  return {
    queryKey: ["me"],
    queryFn: async (): Promise<Me> => {
      const response = await dynamicFetcher<ApiResponse<Me>>({
        method: "GET",
        searchActionParam: "me",
        searchMethodParam: SearchMethodParams.USERS,
        request: request,
      });

      if (!response || !response.data) {
        throw Error("something wrong happend");
      }

      return response.data;
    },
  };
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
