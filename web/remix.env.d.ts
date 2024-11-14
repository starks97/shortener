import type { QueryClient } from "@tanstack/query-core";

declare module "@remix-run/node" {
  interface AppLoadContext {
    queryClient: QueryClient;
  }
}
