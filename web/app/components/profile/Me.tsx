import { useQuery } from "@tanstack/react-query";
import { meQueryOptions } from "~/utils/queryOptions";

export function Me() {
  const { data, isLoading, error } = useQuery(meQueryOptions());

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error instanceof Error) {
    return <div>Error: {error.message}</div>;
  }
  return (
    <div>
      {data && (
        <div>
          <p className="text-xl text-white">{data.user.name}</p>
          <p className="text-xl text-white">{data.user.email}</p>
          <p className="text-xl text-white">{data.user.id}</p>
        </div>
      )}
    </div>
  );
}
