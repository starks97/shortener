import { useQuery } from "@tanstack/react-query";

import { UrlCategories } from "~/interfaces";
import { urlsQueryOptions } from "~/utils/queryOptions";
import UrlCard from "./UrlCard";

export default function Dashboard() {
  const limit = 10;
  const offset = 0;
  const category = UrlCategories.All;

  const { data, error, isLoading } = useQuery(
    urlsQueryOptions(limit, offset, category)
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error instanceof Error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
      <div className="grid gid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 justify-items-center w-full p-10 ">
        {data
          ? data.map((url) => (
              <UrlCard
                id={url.id}
                short_url={url.short_url}
                key={url.id}
                slug={url.slug}
              />
            ))
          : null}
      </div>
    </>
  );
}
