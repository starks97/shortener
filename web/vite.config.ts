import { vitePlugin as remix } from "@remix-run/dev";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import path from "path";

declare module "@remix-run/node" {
  interface Future {
    v3_singleFetch: true;
  }
}

export default defineConfig({
  plugins: [
    remix({
      future: {
        v3_fetcherPersist: true,
        v3_relativeSplatPath: true,
        v3_throwAbortReason: true,
        v3_singleFetch: true,
        v3_lazyRouteDiscovery: true,
      },
    }),
    tsconfigPaths(),
  ],
  resolve: {
    alias: {
      "@components": path.resolve(__dirname, "app/components"),
      "@utils": path.resolve(__dirname, "app/utils"),
      "@interfaces": path.resolve(__dirname, "app/interfaces.ts"),
      "@models": path.resolve(__dirname, "app/models"),
      "@api": path.resolve(__dirname, "app/api"),
      "@cookies": path.resolve(__dirname, "app/cookies.server.ts"),
    },
  },
});
