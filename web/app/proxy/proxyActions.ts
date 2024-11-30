import { ProxyActions } from "@interfaces";
import createUrl from "~/api/url/createUrl";
import deleteUrl from "~/api/url/deleteUrl";
import urlRecords from "~/api/url/urlRecords";
import updateUrl from "~/api/url/updateUrl";
import urlRecord from "~/api/url/urlRecord";

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
};
