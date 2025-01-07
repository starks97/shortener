import { ProxyActions } from "@interfaces";
import createUrl from "~/api/url/createUrl";
import deleteUrl from "~/api/url/deleteUrl";
import urlRecords from "~/api/url/urlRecords";
import updateUrl from "~/api/url/updateUrl";
import urlRecord from "~/api/url/urlRecord";
import me from "~/api/auth/me";
import urlRedirection from "~/api/url/urlRedirect";

/**
 * A collection of asynchronous functions mapped to their respective proxy actions.
 * Each function accepts a `@params` object and a `@token` string, and returns a promise
 * that resolves to a corresponding `ActionReturnTypes` object.
 */
export const actions: ProxyActions = {
  update: async (params, token) => {
    const { id, original_url, short_url, category } = params;
    if (!id)
      throw new Error(
        "Missing required parameter: id, original_url, short_url, category"
      );
    return await updateUrl(token, id, original_url, short_url, category);
  },

  view: async (params, token) => {
    if (params.id) {
      const { id } = params;
      return await urlRecord(id, token);
    } else {
      const limit = params.limit ? parseInt(params.limit.toString()) : 10;
      const offset = params.offset ? parseInt(params.offset.toString()) : 0;
      return await urlRecords(token, limit, offset, params.category);
    }
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

  me: async (_, token) => {
    return await me(token);
  },
  redirect: async (params) => {
    const { slug } = params;
    if (!slug) {
      throw new Error("Slug not found, please provide a valid Slug");
    }

    return await urlRedirection(slug);
  },
};
