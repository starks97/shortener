import metaDictionary from "./metaDictionary";

const getMetaTags = (routeKey: keyof typeof metaDictionary, id?: string) => {
  const metaGenerator = metaDictionary[routeKey];
  if (!metaGenerator) {
    throw new Error(
      `Meta information for route "${String(routeKey)}" is not defined.`
    );
  }
  if (routeKey === "workspace_id" && !id) {
    throw new Error(
      `Meta information for route "${String(
        routeKey
      )}" requires an "id" parameter.`
    );
  }

  const metaData = metaGenerator(id);

  return [
    { title: metaData.title },
    { name: "description", content: metaData.description },
    { name: "keywords", content: metaData.keywords },
    { name: "author", content: metaData.author },
    { name: "viewport", content: metaData.viewport },
    { property: "og:title", content: metaData.ogTitle },
    { property: "og:description", content: metaData.ogDescription },
    { property: "og:url", content: metaData.ogUrl },
    { property: "og:type", content: metaData.ogType },
    { property: "og:image", content: metaData.ogImage },
    { name: "twitter:card", content: metaData.twitterCard },
    { name: "twitter:title", content: metaData.twitterTitle },
    { name: "twitter:description", content: metaData.twitterDescription },
    { name: "twitter:image", content: metaData.twitterImage },
  ];
};

export default getMetaTags;
