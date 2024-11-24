import { QueryClient } from "@tanstack/react-query";

declare module "@remix-run/node" {
  interface AppLoadContext {
    queryClient: QueryClient;
  }
}
