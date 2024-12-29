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
        <div className="flex flex-col items-center justify-center py-16 w-auto">
          <div className="user_card rounded-lg shadow-xl w-full mx-4 md:mx-auto md:max-w-md p-5 ">
            <h1 className="text-3xl font-semibold text-gray-200">User Info</h1>
            <div className="flex flex-row w-full mt-4">
              <span className="text-gray-200 w-1/4">Name</span>
              <p className="text-gray-200 ">{data.user.name}</p>
            </div>
            <div className="flex flex-row w-full mt-4">
              <span className="text-gray-200 w-1/4">E-mail</span>
              <p className="text-gray-200 text-left">{data.user.email}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
