import React from "react";

import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";
import type { LinksFunction, LoaderFunctionArgs } from "@remix-run/node";
import { QueryClientProvider, HydrationBoundary } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";

import { useDehydratedState } from "use-dehydrated-state";

import { createQueryClient } from "@utils/queryClient";
import { ACookie, RCookie } from "~/cookies.server";

import stylesheet from "~/tailwind.css?url";

import "./styles/global.css";

import Menu from "@components/menu/Menu";

export const links: LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  { rel: "stylesheet", href: stylesheet },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const cookie = request.headers.get("Cookie");
  const AToken = await ACookie.parse(cookie);
  const Rtoken = await RCookie.parse(cookie);

  if (AToken) {
    return Response.json({ isLoggedIn: true, canRefresh: false });
  }

  if (Rtoken) {
    return Response.json({ isLoggedIn: false, canRefresh: true });
  }

  return Response.json({ isLoggedIn: false, canRefresh: false });
};

export default function App() {
  const { isLoggedIn, canRefresh } = useLoaderData<typeof loader>();

  const queryClient = createQueryClient();

  const [queryClientState] = React.useState(() => queryClient);

  const dehydratedState = useDehydratedState();

  return (
    <QueryClientProvider client={queryClientState}>
      <HydrationBoundary state={dehydratedState}>
        <Toaster />
        <Menu isLoggedIn={isLoggedIn} canRefresh={canRefresh} />
        <Outlet />
      </HydrationBoundary>
    </QueryClientProvider>
  );
}
