import { UrlCategories } from "./interfaces";

export const baseUrl = process.env.BASE_URL ?? "";

export const workspace = `/workspace?offset=1&limit=10&category=All`;
