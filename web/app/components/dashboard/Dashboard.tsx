import { useQuery } from "@tanstack/react-query";

import { UrlCategories } from "~/interfaces";
import { urlsQueryOptions } from "~/utils/queryOptions";
import UrlCard from "./UrlCard";
import SkeletonUrlCard from "./UrlSkeleton";
import FilterAndPag from "./Filter&Pag";
import NoData from "../NoData";

export default function Dashboard({
  offset,
  limit,
  category,
}: {
  offset: number;
  limit: number;
  category: UrlCategories;
}) {
  const page = (offset - 1) * limit;

  const { data, error, isLoading } = useQuery(
    urlsQueryOptions(limit, page, category)
  );

  if (error instanceof Error) {
    return <div>Error: {error.message}</div>;
  }

  const dataLength = data?.length;

  return (
    <>
      {data && (
        <FilterAndPag
          category={category}
          limit={limit}
          offset={offset}
          dataLength={dataLength!}
        />
      )}
      <div
        className={
          data && data.length
            ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 justify-items-center w-full p-10"
            : "flex w-full p-10"
        }
      >
        {isLoading ? (
          Array.from({ length: limit }).map((_, index) => (
            <SkeletonUrlCard key={index} />
          ))
        ) : data && data.length ? (
          data.map((url) => (
            <UrlCard
              id={url.id}
              short_url={url.short_url}
              key={url.id}
              slug={url.slug}
            />
          ))
        ) : (
          <NoData />
        )}
      </div>
    </>
  );
}
