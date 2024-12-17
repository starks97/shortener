import {
  UrlData,
  UrlCategories,
  ApiResponse,
  SearchMethodParams,
} from "@interfaces";
import dynamicFetcher from "./dynamicFetcher";

export async function updateUrl<T extends ApiResponse<null>>(
  id: string,
  short_url?: string,
  original_url?: string,
  category?: UrlCategories,
  request?: Request
): Promise<T> {
  if (!id) {
    throw new Error("ID is required for updating a URL.");
  }

  return dynamicFetcher<T>({
    method: "PATCH",
    searchMethodParam: SearchMethodParams.URL,
    searchActionParam: "update",
    queryParams: { id, short_url, original_url, category },
    body: { short_url, original_url, category },
    request,
  });
}

export async function createNewUrl<T extends ApiResponse<UrlData>>(
  original_url: string,
  short_url: string,
  category: UrlCategories,
  request?: Request
): Promise<T> {
  return dynamicFetcher<T>({
    method: "POST",
    searchMethodParam: SearchMethodParams.URL,
    searchActionParam: "create",
    body: { short_url, original_url, category },
    queryParams: { short_url, original_url, category },
    request,
  });
}

export async function fetchUrls<
  T extends ApiResponse<UrlData> | ApiResponse<UrlData[]>
>(
  limit?: string | number,
  offset?: string | number,
  category?: UrlCategories,
  id?: string,
  request?: Request
): Promise<T> {
  if (id) {
    return dynamicFetcher<T>({
      method: "GET",
      searchMethodParam: SearchMethodParams.URL,
      searchActionParam: "view",
      queryParams: { id },
      request,
    });
  }

  return dynamicFetcher<T>({
    method: "GET",
    searchMethodParam: SearchMethodParams.URL,
    searchActionParam: "view",
    queryParams: {
      limit: limit?.toString(),
      offset: offset?.toString(),
      category,
    },
    request,
  });
}
