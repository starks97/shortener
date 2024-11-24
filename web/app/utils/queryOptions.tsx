import { FetchQueryOptions } from "@tanstack/react-query";
import { UrlData, UrlCategories } from "@interfaces";
import urlRecord from "@api/url/urlRecord";

export const urlsQueryOptions = (
  limit: number,
  offset: number,
  category: UrlCategories,
  token: string
): FetchQueryOptions<UrlData[], Error> => {
  return {
    queryKey: ["urls", { limit, offset, category }],
    queryFn: async (): Promise<UrlData[]> => {
      const response = await urlRecord(token, limit, offset, category);

      if (response.status === "error") {
        throw new Error(response.message || "Failed to fetch URLs");
      }

      return response.data ?? [];
    },
  };
};
