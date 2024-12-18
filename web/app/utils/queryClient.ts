import { QueryClient } from "@tanstack/react-query";

/**
 * Creates a new instance of a `QueryClient` configured with default options.
 *
 * The `defaultOptions` set for queries ensure that:
 * - `staleTime` is 5 minutes, meaning data will be considered fresh for that duration.
 * - `refetchOnWindowFocus` is disabled, preventing automatic refetching when the browser window regains focus.
 *
 * @returns A configured `QueryClient` instance.
 *
 * @example
 * ```typescript
 * const queryClient = createQueryClient();
 * // Use `queryClient` with React Query's `QueryClientProvider`.
 * ```
 */

export function createQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60 * 5,
        refetchOnWindowFocus: false,
      },
    },
  });
}
