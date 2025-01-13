import { baseUrl } from "~/consts";

export const loader = () => {
  const base = baseUrl;
  const robotText = `
        User-agent: Googlebot
        Disallow: /nogooglebot/

        User-agent: *
        Allow: /
        Disallow: /workspace

        Sitemap: ${base}/sitemap.xml`;

  return new Response(robotText, {
    status: 200,
    headers: {
      "Content-Type": "text/plain",
    },
  });
};
