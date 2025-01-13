import type { LoaderFunction } from "@remix-run/node";
import { baseUrl } from "~/consts";

export const loader: LoaderFunction = async () => {
  const lastModifiedDate = new Date().toISOString();
  const base = baseUrl;

  const content = `
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      <!-- Home Page -->
      <url>
        <loc>${base}</loc>
        <lastmod>${lastModifiedDate}</lastmod>
      </url>
      <!-- About Page -->
      <url>
        <loc>${base}/about</loc>
        <lastmod>${lastModifiedDate}</lastmod>
      </url>
      <!-- Login Page -->
      <url>
        <loc>${base}/auth/login</loc>
        <lastmod>${lastModifiedDate}</lastmod>
      </url>
      <!-- Register Page -->
      <url>
        <loc>${base}/auth/register</loc>
        <lastmod>${lastModifiedDate}</lastmod>
      </url>
      <!-- Pricing Page -->
      <url>
        <loc>${base}/pricing</loc>
        <lastmod>${lastModifiedDate}</lastmod>
      </url>
    </urlset>
  `;

  return new Response(content, {
    status: 200,
    headers: {
      "Content-Type": "application/xml",
      "xml-version": "1.0",
      encoding: "UTF-8",
    },
  });
};
