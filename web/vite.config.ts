import { vitePlugin as remix } from "@remix-run/dev";
import { defineConfig, loadEnv } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import path from "path";

declare module "@remix-run/node" {
  interface Future {
    v3_singleFetch: true;
  }
}

export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
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
        "@styles": path.resolve(__dirname, "app/styles"),
        "@proxy": path.resolve(__dirname, "app/proxy"),
        "@middleware": path.resolve(__dirname, "app/middleware.ts"),
      },
    },
    define: {
      "process.env.VITE_BASE_URL": JSON.stringify(env.VITE_BASE_URL),
    },
  };
});
