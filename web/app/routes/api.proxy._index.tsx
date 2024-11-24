import { ApiResponse, UrlCategories, UrlData } from "~/interfaces";
import createUrl from "~/api/url/createUrl";
import deleteUrl from "~/api/url/deleteUrl";
import urlRecord from "~/api/url/urlRecord";
import updateUrl from "~/api/url/updateUrl";

import { LoaderFunctionArgs, ActionFunctionArgs } from "@remix-run/node";

import { accessTokenCookie } from "~/cookies.server";

export type SearchType = "view" | "update" | "delete" | "create";

export type ParamRecord = {
  id?: string;
  original_url?: string;
  short_url?: string;
  category?: UrlCategories;
  limit?: string | number;
  offset?: string | number;
};

export type ActionReturnTypes = {
  update: ApiResponse<UrlData>;
  view: ApiResponse<UrlData[]>;
  delete: ApiResponse<null>;
  create: ApiResponse<UrlData>;
};

type ProxyActions = {
  [K in keyof ActionReturnTypes]: (
    params: ParamRecord,
    token: string
  ) => Promise<ActionReturnTypes[K]>;
};

const actions: ProxyActions = {
  update: async (params, token) => {
    const { id, original_url, short_url, category } = params;
    if (!id)
      throw new Error(
        "Missing required parameter: id, original_url, short_url, category"
      );
    return await updateUrl(token, id, original_url, short_url, category);
  },
  view: async (params, token) => {
    const limit = params.limit ? parseInt(params.limit.toString()) : 10;
    const offset = params.offset ? parseInt(params.offset.toString()) : 0;
    return await urlRecord(token, limit, offset, params.category);
  },
  delete: async (params, token) => {
    const { id } = params;
    if (!id) throw new Error("Missing required parameter: id");
    return await deleteUrl(token, id);
  },
  create: async (params, token) => {
    const { original_url, short_url, category } = params;
    if (!original_url || !short_url || !category) {
      throw new Error(
        "Missing required parameters: original_url, short_url, category"
      );
    }
    return await createUrl(token, original_url, short_url, category);
  },
};

async function handlerProxy<T extends keyof ProxyActions>(
  req: Request
): Promise<ActionReturnTypes[T]> {
  const url = new URL(req.url);
  const action = (url.searchParams.get("url") as SearchType) ?? "";

  if (!action || !actions[action]) {
    throw new Error(`Invalid or unsupported action: ${action}`);
  }

  const queryParams = Object.fromEntries(url.searchParams.entries());
  const getCookie = req.headers.get("Cookie") || "";
  const accessToken = await accessTokenCookie.parse(getCookie);
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

export const loader = async ({ request }: LoaderFunctionArgs) => {
  try {
    const result = await handlerProxy(request);
    return Response.json(result, { status: 200 });
  } catch (error) {
    console.error(error);
    return Response.json(
      {
        status: "error",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 400 }
    );
  }
};

export const action = async ({ request }: ActionFunctionArgs) => {
  try {
    const result = await handlerProxy(request);
    return result;
  } catch (error) {
    console.error(error);
    return Response.json(
      {
        status: "error",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 400 }
    );
  }
};
