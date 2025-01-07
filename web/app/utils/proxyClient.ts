import {
  UrlData,
  UrlCategories,
  ApiResponse,
  SearchMethodParams,
  UrlRedirection,
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

export async function deleteUrlRecord<T extends ApiResponse<null>>(
  id: string,
  request?: Request
): Promise<T> {
  if (!id) {
    throw new Error("ID is required for updating a URL.");
  }

  return dynamicFetcher<T>({
    method: "DELETE",
    searchMethodParam: SearchMethodParams.URL,
    searchActionParam: "delete",
    queryParams: { id: id },
    body: {},
    request,
  });
}

export async function deleteRecord(id: string): Promise<ApiResponse<null>> {
  const res = await fetch(`/api/proxy?url=delete&id=${id}`, {
    headers: {
      method: "DELETE",
      "Content-Type": "application/json",
    },
  });

  const data = (await res.json()) as ApiResponse<null>;

  if (!res || data.status === "error") {
    throw new Error(data.message);
  }

  return data;
}

export async function urlRedirection(
  slug: string
): Promise<ApiResponse<UrlRedirection>> {
  const res = await fetch(`/api/proxy?url=redirect&slug=${slug}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const apiResponse = (await res.json()) as ApiResponse<UrlRedirection>;

  if (!res || apiResponse.status === "error") {
    throw new Error(apiResponse.message);
  }

  return apiResponse;
}
