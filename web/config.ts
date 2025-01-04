export const deployment =
  process.env.NODE_ENV === "development"
    ? { path: process.env.BACKEND_DEV_PATH }
    : { path: process.env.BACKEND_PROD_PATH };

export const deploymentFrontend =
  import.meta.env.MODE === "development"
    ? { path: import.meta.env.VITE_BACKEND_DEV_PATH }
    : { path: import.meta.env.VITE_BACKEND_PROD_PATH };

export const test = "test";
