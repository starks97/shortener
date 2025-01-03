import { jsx, Fragment, jsxs } from "react/jsx-runtime";
import { PassThrough } from "node:stream";
import { createReadableStreamFromReadable, createCookie, redirect } from "@remix-run/node";
import { RemixServer, useLocation, Link, useNavigate, useLoaderData, Outlet, Meta, Links, ScrollRestoration, Scripts, useSearchParams, useActionData, useParams, Form } from "@remix-run/react";
import { isbot } from "isbot";
import { renderToPipeableStream } from "react-dom/server";
import React, { useState, useEffect, useRef, useMemo } from "react";
import { QueryClient, QueryClientProvider, HydrationBoundary, useQueryClient, useMutation, useQuery, dehydrate } from "@tanstack/react-query";
import toast, { Toaster } from "react-hot-toast";
import { useDehydratedState } from "use-dehydrated-state";
import { ZodError, z } from "zod";
import Skeleton from "react-loading-skeleton";
import QRCode from "qrcode";
const ABORT_DELAY = 5e3;
function handleRequest(request, responseStatusCode, responseHeaders, remixContext, loadContext) {
  return isbot(request.headers.get("user-agent") || "") ? handleBotRequest(
    request,
    responseStatusCode,
    responseHeaders,
    remixContext
  ) : handleBrowserRequest(
    request,
    responseStatusCode,
    responseHeaders,
    remixContext
  );
}
function handleBotRequest(request, responseStatusCode, responseHeaders, remixContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    const { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(
        RemixServer,
        {
          context: remixContext,
          url: request.url,
          abortDelay: ABORT_DELAY
        }
      ),
      {
        onAllReady() {
          shellRendered = true;
          const body = new PassThrough();
          const stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html");
          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          );
          pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500;
          if (shellRendered) {
            console.error(error);
          }
        }
      }
    );
    setTimeout(abort, ABORT_DELAY);
  });
}
function handleBrowserRequest(request, responseStatusCode, responseHeaders, remixContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    const { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(
        RemixServer,
        {
          context: remixContext,
          url: request.url,
          abortDelay: ABORT_DELAY
        }
      ),
      {
        onShellReady() {
          shellRendered = true;
          const body = new PassThrough();
          const stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html");
          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          );
          pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500;
          if (shellRendered) {
            console.error(error);
          }
        }
      }
    );
    setTimeout(abort, ABORT_DELAY);
  });
}
const entryServer = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: handleRequest
}, Symbol.toStringTag, { value: "Module" }));
function createQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1e3 * 60 * 5,
        refetchOnWindowFocus: false
      }
    }
  });
}
const RCookie = createCookie("refresh_token", {
  httpOnly: true,
  secure: false,
  sameSite: "lax",
  path: "/",
  maxAge: 60 * 60 * 24 * 7,
  ...process.env.NODE_ENV === "production" && { domain: process.env.DOMAIN }
});
const ACookie = createCookie("access_token", {
  secure: false,
  sameSite: "lax",
  path: "/",
  maxAge: 60 * 30,
  httpOnly: true,
  ...process.env.NODE_ENV === "production" && { domain: process.env.DOMAIN }
});
const logoutRtoken = createCookie("refresh_token", {
  maxAge: 0
});
const logoutAtoken = createCookie("access_token", {
  maxAge: 0
});
const stylesheet = "/assets/tailwind-Ca0oTEos.css";
const workspace = `/workspace?offset=1&limit=10&category=All`;
const navigateWorkSpace = {
  pathname: "/workspace",
  search: "?offset=1&limit=10&category=All"
};
const modalNavigateActions = {
  view: (id) => {
    return {
      pathname: `/workspace/${id}`,
      search: "?modal=view"
    };
  },
  qr: (id) => {
    return {
      pathname: `/workspace/${id}`,
      search: "?modal=qr"
    };
  }
};
function parseNavLink(link) {
  if (typeof link === "string") {
    if (link === "/workspace/new_url") {
      return { pathname: "/workspace/new_url", search: "?modal=create" };
    }
    return { pathname: link, search: "" };
  }
  return {
    pathname: link.pathname,
    search: link.search ?? ""
  };
}
function baseNavItems() {
  return [
    { label: "Home", link: "/" },
    { label: "Workspace", link: navigateWorkSpace }
  ];
}
function CustomMenuBtn({
  isLoggedIn,
  canRefresh
}) {
  const location = useLocation();
  const currentPath = location.pathname;
  const publicRoutes = ["/", "/auth/login"];
  const items = baseNavItems();
  if ((isLoggedIn || canRefresh) && currentPath.startsWith("/workspace")) {
    items.push({ label: "Profile", link: "/workspace/me" });
    items.push({ label: "New Url", link: "/workspace/new_url" });
  }
  if (!isLoggedIn && !canRefresh && publicRoutes.includes(currentPath)) {
    items.splice(1, 1, { label: "Login", link: "/auth/login" });
  }
  const sortedItems = items.sort(
    (a, b) => a.label.toLowerCase().localeCompare(b.label.toLowerCase())
  );
  return /* @__PURE__ */ jsx(Fragment, { children: sortedItems.map(({ label, link }) => {
    const { pathname, search } = parseNavLink(link);
    return /* @__PURE__ */ jsx("li", { children: label.toLowerCase() === "workspace" && currentPath === "/workspace" ? /* @__PURE__ */ jsx("form", { method: "post", action: "/auth/logout", children: /* @__PURE__ */ jsx("button", { className: "menu_btn__a", children: "Logout" }) }) : label.toLowerCase() === "login" || label.toLowerCase() === "workspace" ? /* @__PURE__ */ jsx(
      Link,
      {
        to: {
          pathname,
          search
        },
        children: /* @__PURE__ */ jsx("button", { className: "menu_btn__a", children: label })
      }
    ) : /* @__PURE__ */ jsx(
      Link,
      {
        to: {
          pathname,
          search
        },
        className: "text-white hover:text-orange-600 font-medium py-2 px-3 transition duration-200",
        children: label
      }
    ) }, label);
  }) });
}
function OverWriteIcon() {
  return /* @__PURE__ */ jsxs(
    "svg",
    {
      className: "w-6 h-6 text-gray-200 dark:text-white",
      "aria-hidden": "true",
      xmlns: "http://www.w3.org/2000/svg",
      fill: "currentColor",
      viewBox: "0 0 24 24",
      children: [
        /* @__PURE__ */ jsx(
          "path",
          {
            fillRule: "evenodd",
            d: "M11.3 6.2H5a2 2 0 0 0-2 2V19a2 2 0 0 0 2 2h11c1.1 0 2-1 2-2.1V11l-4 4.2c-.3.3-.7.6-1.2.7l-2.7.6c-1.7.3-3.3-1.3-3-3.1l.6-2.9c.1-.5.4-1 .7-1.3l3-3.1Z",
            clipRule: "evenodd"
          }
        ),
        /* @__PURE__ */ jsx(
          "path",
          {
            fillRule: "evenodd",
            d: "M19.8 4.3a2.1 2.1 0 0 0-1-1.1 2 2 0 0 0-2.2.4l-.6.6 2.9 3 .5-.6a2.1 2.1 0 0 0 .6-1.5c0-.2 0-.5-.2-.8Zm-2.4 4.4-2.8-3-4.8 5-.1.3-.7 3c0 .3.3.7.6.6l2.7-.6.3-.1 4.7-5Z",
            clipRule: "evenodd"
          }
        )
      ]
    }
  );
}
function CheckIcon() {
  return /* @__PURE__ */ jsx(
    "svg",
    {
      className: "w-6 h-6 text-gray-200 ",
      "aria-hidden": "true",
      xmlns: "http://www.w3.org/2000/svg",
      width: "24",
      height: "24",
      fill: "none",
      viewBox: "0 0 24 24",
      children: /* @__PURE__ */ jsx(
        "path",
        {
          stroke: "currentColor",
          strokeLinecap: "round",
          strokeLinejoin: "round",
          strokeWidth: "2",
          d: "M5 11.917 9.724 16.5 19 7.5"
        }
      )
    }
  );
}
function CloseIcon() {
  return /* @__PURE__ */ jsx(
    "svg",
    {
      className: "w-6 h-6 text-gray-200 ",
      xmlns: "http://www.w3.org/2000/svg",
      x: "0px",
      y: "0px",
      width: "100",
      height: "100",
      viewBox: "0 0 50 50",
      children: /* @__PURE__ */ jsx("path", { d: "M 7.71875 6.28125 L 6.28125 7.71875 L 23.5625 25 L 6.28125 42.28125 L 7.71875 43.71875 L 25 26.4375 L 42.28125 43.71875 L 43.71875 42.28125 L 26.4375 25 L 43.71875 7.71875 L 42.28125 6.28125 L 25 23.5625 Z" })
    }
  );
}
function QRIcon() {
  return /* @__PURE__ */ jsx(
    "svg",
    {
      version: "1.0",
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 512.000000 512.000000",
      preserveAspectRatio: "xMidYMid meet",
      className: "w-6 h-6 text-orange-400 hover:text-white",
      fill: "currentColor",
      children: /* @__PURE__ */ jsxs(
        "g",
        {
          transform: "translate(0.000000,512.000000) scale(0.100000,-0.100000)",
          fill: "currentColor",
          stroke: "none",
          children: [
            /* @__PURE__ */ jsx(
              "path",
              {
                d: "M545 5104 c-38 -8 -113 -35 -165 -61 -78 -38 -109 -60 -176 -127 -67\n  -67 -89 -98 -127 -176 -75 -154 -77 -172 -77 -767 0 -316 4 -532 10 -554 34\n  -122 166 -186 303 -148 47 13 102 60 130 113 22 40 22 49 27 581 l5 540 25 43\n  c15 27 42 54 70 70 l45 27 535 5 c515 5 537 6 580 26 188 87 169 379 -29 434\n  -22 6 -238 10 -561 9 -416 0 -540 -4 -595 -15z"
              }
            ),
            /* @__PURE__ */ jsx(
              "path",
              {
                d: "M3420 5111 c-103 -32 -160 -110 -160 -220 0 -98 42 -170 124 -214 40\n  -22 49 -22 581 -27 l540 -5 43 -25 c27 -15 54 -42 70 -70 l27 -45 5 -540 c5\n  -532 5 -541 27 -581 98 -182 379 -160 433 35 6 22 10 238 10 554 0 594 -2 613\n  -76 765 -94 192 -263 322 -476 366 -65 14 -159 16 -600 15 -288 0 -534 -4\n  -548 -8z"
              }
            ),
            /* @__PURE__ */ jsx(
              "path",
              {
                d: "M1074 4174 c-23 -8 -58 -31 -77 -51 -67 -66 -67 -69 -67 -625 0 -327\n  4 -514 11 -542 14 -55 59 -110 112 -139 42 -22 43 -22 577 -22 529 0 535 0\n  575 22 46 24 75 54 101 103 18 33 19 67 19 570 0 534 0 535 -22 577 -29 53\n  -84 98 -139 112 -28 7 -214 11 -546 10 -414 0 -510 -3 -544 -15z m786 -684\n  l0 -230 -230 0 -230 0 0 230 0 230 230 0 230 0 0 -230z"
              }
            ),
            /* @__PURE__ */ jsx(
              "path",
              {
                d: "M2941 4175 c-51 -16 -94 -54 -124 -110 -22 -40 -22 -46 -22 -575 0\n  -529 0 -535 22 -575 24 -46 54 -75 103 -101 33 -18 67 -19 570 -19 534 0 535\n  0 577 22 53 29 98 84 112 139 7 28 11 214 11 537 0 554 -1 561 -67 629 -66 67\n  -72 68 -637 67 -394 0 -510 -3 -545 -14z m779 -685 l0 -230 -230 0 -230 0 0\n  230 0 230 230 0 230 0 0 -230z"
              }
            ),
            /* @__PURE__ */ jsx(
              "path",
              {
                d: "M1105 2321 c-43 -11 -76 -29 -113 -64 -60 -58 -62 -75 -62 -633 0\n  -560 0 -557 68 -627 64 -66 73 -67 629 -67 323 0 509 4 537 11 55 14 110 59\n  139 112 22 42 22 43 22 577 0 503 -1 537 -19 570 -26 49 -55 79 -101 103 -39\n  22 -48 22 -555 24 -283 1 -528 -2 -545 -6z m755 -691 l0 -230 -230 0 -230 0\n  0 230 0 230 230 0 230 0 0 -230z"
              }
            ),
            /* @__PURE__ */ jsx(
              "path",
              {
                d: "M2965 2321 c-70 -18 -117 -56 -151 -121 -15 -28 -19 -65 -22 -186 -5\n  -203 5 -254 67 -315 54 -55 109 -74 193 -66 103 9 174 69 198 168 7 29 10 107\n  8 205 -3 168 -10 196 -62 252 -47 52 -158 82 -231 63z"
              }
            ),
            /* @__PURE__ */ jsx(
              "path",
              {
                d: "M3665 2321 c-105 -27 -175 -117 -175 -226 0 -100 66 -194 154 -220\n  61 -18 316 -20 383 -3 32 8 61 25 94 57 39 38 49 56 60 105 25 113 -17 212\n  -112 266 -41 24 -53 25 -209 27 -91 1 -178 -2 -195 -6z"
              }
            ),
            /* @__PURE__ */ jsx(
              "path",
              {
                d: "M119 1833 c-57 -30 -92 -71 -109 -132 -6 -22 -10 -238 -10 -554 0\n  -595 2 -613 77 -767 38 -78 60 -109 127 -176 67 -67 98 -89 176 -127 154 -75\n  172 -77 767 -77 316 0 532 4 554 10 122 34 186 166 148 303 -13 47 -60 102\n  -113 130 -40 22 -49 22 -581 27 l-540 5 -43 25 c-27 15 -54 42 -70 70 l-27 45\n  -5 540 c-5 532 -5 541 -27 581 -62 117 -202 158 -324 97z"
              }
            ),
            /* @__PURE__ */ jsx(
              "path",
              {
                d: "M4796 1845 c-47 -17 -91 -57 -119 -110 -22 -39 -22 -51 -27 -580 l-5\n  -540 -27 -45 c-16 -28 -43 -55 -70 -70 l-43 -25 -540 -5 c-532 -5 -541 -5\n  -581 -27 -182 -98 -160 -379 35 -433 22 -6 238 -10 554 -10 434 0 530 3 595\n  16 213 44 382 174 476 366 74 152 76 171 76 765 0 316 -4 532 -10 554 -17 61\n  -52 102 -109 132 -62 31 -139 36 -205 12z"
              }
            ),
            /* @__PURE__ */ jsx(
              "path",
              {
                d: "M3188 1386 c-104 -28 -158 -104 -158 -219 0 -106 33 -167 115 -210\n  39 -21 53 -22 438 -25 463 -3 477 -1 545 72 102 111 73 291 -59 366 l-44 25\n  -395 2 c-298 2 -407 -1 -442 -11z"
              }
            )
          ]
        }
      )
    }
  );
}
function DownloadIcon() {
  return /* @__PURE__ */ jsx(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 -960 960 960",
      fill: "currentColor",
      className: "w-10 h-8 text-white",
      children: /* @__PURE__ */ jsx("path", { d: "M480-320 280-520l56-58 104 104v-326h80v326l104-104 56 58-200 200ZM240-160q-33 0-56.5-23.5T160-240v-120h80v120h480v-120h80v120q0 33-23.5 56.5T720-160H240Z" })
    }
  );
}
function ViewMore() {
  return /* @__PURE__ */ jsx(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 -960 960 960",
      className: "w-10 h-8 text-orange-400 hover:text-white",
      fill: "currentColor",
      children: /* @__PURE__ */ jsx("path", { d: "M120-160v-80h480v80H120Zm520-280q-83 0-141.5-58.5T440-640q0-83 58.5-141.5T640-840q83 0 141.5 58.5T840-640q0 83-58.5 141.5T640-440Zm-520-40v-80h252q7 22 16 42t22 38H120Zm0 160v-80h376q23 14 49 23.5t55 13.5v43H120Zm500-200h40v-160h-40v160Zm20-200q8 0 14-6t6-14q0-8-6-14t-14-6q-8 0-14 6t-6 14q0 8 6 14t14 6Z" })
    }
  );
}
function LinkIcon() {
  return /* @__PURE__ */ jsxs(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      width: "24",
      height: "24",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: "lucide lucide-link mr-2",
      children: [
        /* @__PURE__ */ jsx("path", { d: "M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" }),
        /* @__PURE__ */ jsx("path", { d: "M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" })
      ]
    }
  );
}
function ByteTrimLogo() {
  return /* @__PURE__ */ jsx(
    "svg",
    {
      version: "1.0",
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 500.000000 500.000000",
      preserveAspectRatio: "xMidYMid meet",
      fill: "currentColor",
      className: "w-20 h-15 text-orange-400 hover:text-white",
      children: /* @__PURE__ */ jsxs(
        "g",
        {
          transform: "translate(0.000000,500.000000) scale(0.100000,-0.100000)",
          fill: "currentColor",
          stroke: "none",
          children: [
            /* @__PURE__ */ jsx(
              "path",
              {
                d: "M1552 3969 c-124 -21 -257 -94 -347 -190 -70 -75 -113 -146 -149\n    -247 l-31 -87 -3 -840 c-2 -560 1 -855 8 -888 29 -135 98 -256 204 -355 81\n    -76 159 -116 284 -148 l95 -24 872 0 c838 0 875 1 950 20 241 62 413 228 470\n    455 15 59 18 118 19 368 l1 298 -25 19 c-31 24 -63 25 -95 4 l-25 -16 0 -302\n    c0 -315 -3 -337 -47 -435 -31 -68 -135 -174 -209 -213 -121 -65 -91 -63 -1039\n    -63 -782 1 -866 2 -924 18 -207 56 -334 180 -387 379 -21 80 -20 1612 1 1712\n    42 197 171 335 367 390 49 14 159 16 935 16 707 0 888 -3 928 -14 143 -39 253\n    -124 310 -239 59 -121 65 -159 65 -437 0 -246 0 -249 22 -264 30 -21 71 -20\n    97 2 19 15 22 30 27 157 9 213 -8 413 -44 512 -69 188 -196 317 -390 392 l-67\n    26 -910 1 c-503 1 -934 -2 -963 -7z"
              }
            ),
            /* @__PURE__ */ jsx(
              "path",
              {
                d: "M3216 3620 c-44 -22 -79 -59 -107 -112 -17 -32 -19 -58 -19 -200 0\n    -137 3 -169 19 -203 23 -50 58 -83 108 -100 34 -12 38 -17 41 -50 3 -28 10\n    -40 35 -56 18 -11 43 -18 57 -17 23 3 25 7 25 58 0 52 1 55 26 58 35 4 108 67\n    125 109 10 23 14 80 14 195 0 136 -3 170 -19 203 -21 47 -76 99 -128 120 -49\n    21 -130 18 -177 -5z m138 -104 c64 -27 73 -53 70 -211 -3 -182 -1 -169 -23\n    -194 -16 -18 -20 -19 -25 -5 -3 8 -6 34 -6 56 0 45 -19 67 -59 68 -42 0 -61\n    -27 -61 -89 l0 -55 -22 22 c-22 21 -23 31 -25 176 -2 169 3 187 56 223 40 27\n    50 28 95 9z"
              }
            ),
            /* @__PURE__ */ jsx(
              "path",
              {
                d: "M1597 3596 c-74 -31 -136 -82 -179 -148 -54 -81 -58 -104 -58 -296 0\n    -155 2 -173 16 -168 9 3 34 6 57 6 l42 0 0 147 c1 175 11 218 67 279 77 84 32\n    79 745 79 347 0 634 3 638 7 4 3 4 31 0 62 l-7 56 -632 0 -631 0 -58 -24z"
              }
            ),
            /* @__PURE__ */ jsx(
              "path",
              {
                d: "M2750 3242 c-8 -2 -25 -14 -37 -25 -22 -20 -23 -27 -23 -188 l0 -168\n    -597 -3 c-683 -3 -637 3 -721 -95 -53 -61 -70 -99 -71 -159 -2 -87 42 -160\n    136 -225 l42 -29 605 0 606 0 0 -190 c0 -177 1 -191 20 -210 26 -26 85 -26\n    125 0 17 10 55 39 85 64 30 25 69 53 85 62 28 16 111 84 200 165 22 21 67 59\n    100 85 145 117 244 212 252 242 11 45 -14 98 -65 135 -26 19 -78 60 -117 91\n    -251 200 -375 295 -439 338 -33 23 -74 54 -91 70 -33 31 -72 47 -95 40z m106\n    -199 c42 -27 549 -433 551 -441 4 -13 -552 -482 -572 -482 -7 0 -12 13 -12 33\n    1 17 0 100 -1 182 l-2 150 -607 -3 c-335 -2 -627 -1 -651 3 -30 4 -54 17 -82\n    44 -34 32 -40 44 -40 78 0 26 8 50 21 67 46 58 21 56 723 56 l646 0 -7 165\n    c-3 91 -3 165 1 165 4 0 18 -8 32 -17z"
              }
            ),
            /* @__PURE__ */ jsx(
              "path",
              {
                d: "M3757 2700 c-50 -40 -55 -119 -10 -165 30 -29 56 -31 107 -10 70 29\n    84 137 23 180 -31 21 -89 19 -120 -5z"
              }
            ),
            /* @__PURE__ */ jsx(
              "path",
              {
                d: "M3278 2254 c-23 -12 -28 -21 -28 -54 0 -29 -4 -40 -15 -40 -29 0 -96\n    -54 -121 -96 -25 -43 -26 -46 -22 -221 3 -168 4 -180 28 -223 14 -24 45 -58\n    68 -75 40 -27 51 -30 122 -30 71 0 82 3 121 30 24 17 57 50 74 74 l30 43 0\n    181 0 182 -32 47 c-21 29 -49 54 -78 68 -43 21 -45 24 -45 64 0 23 -5 47 -12\n    54 -16 16 -57 14 -90 -4z m-18 -258 c0 -29 7 -52 21 -70 25 -32 36 -32 66 -4\n    18 17 23 32 23 70 0 55 10 60 39 19 23 -32 26 -89 12 -250 -6 -74 -9 -86 -34\n    -107 -41 -35 -107 -33 -146 4 l-30 27 -3 162 c-2 152 -1 164 17 178 30 22 35\n    19 35 -29z"
              }
            ),
            /* @__PURE__ */ jsx(
              "path",
              {
                d: "M1360 2047 c0 -235 9 -284 64 -364 46 -67 138 -128 212 -140 55 -10\n    1283 -7 1293 3 2 2 0 27 -5 56 l-9 52 -630 3 c-704 3 -684 1 -749 73 -52 57\n    -59 93 -63 310 l-4 196 -55 10 -54 10 0 -209z"
              }
            )
          ]
        }
      )
    }
  );
}
function Menu({
  isLoggedIn,
  canRefresh
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  useNavigate();
  return /* @__PURE__ */ jsxs("nav", { className: "bg-transparent border-b border-gray-200 px-5 py-3 mb-5", children: [
    /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-4 flex items-center justify-between h-16", children: [
      /* @__PURE__ */ jsx("div", { className: "flex-shrink-0 group-hover:text-white", children: /* @__PURE__ */ jsxs(
        Link,
        {
          to: "/",
          className: "text-xl font-bold text-orange-400 flex items-center ",
          children: [
            /* @__PURE__ */ jsx(ByteTrimLogo, {}),
            "ByteTrim"
          ]
        }
      ) }),
      /* @__PURE__ */ jsx("div", { className: "flex md:hidden", children: /* @__PURE__ */ jsx(
        "button",
        {
          type: "button",
          className: "text-white hover:text-gray-300 focus:outline-none",
          onClick: () => setMenuOpen(!menuOpen),
          "aria-label": menuOpen ? "Close menu" : "Open menu",
          children: /* @__PURE__ */ jsx("svg", { className: "h-6 w-6 fill-current", viewBox: "0 0 24 24", children: menuOpen ? (
            // Close (X) Icon
            /* @__PURE__ */ jsx(
              "path",
              {
                fillRule: "evenodd",
                clipRule: "evenodd",
                d: "M6 18L18 6M6 6l12 12",
                stroke: "currentColor",
                strokeWidth: "2",
                strokeLinecap: "round"
              }
            )
          ) : (
            // Hamburger Icon
            /* @__PURE__ */ jsx(
              "path",
              {
                fillRule: "evenodd",
                clipRule: "evenodd",
                d: "M4 6h16M4 12h16M4 18h16",
                stroke: "currentColor",
                strokeWidth: "2",
                strokeLinecap: "round"
              }
            )
          ) })
        }
      ) }),
      /* @__PURE__ */ jsx("ul", { className: "hidden md:flex md:space-x-8 items-center", children: /* @__PURE__ */ jsx(CustomMenuBtn, { isLoggedIn, canRefresh }) })
    ] }),
    menuOpen && /* @__PURE__ */ jsx("div", { className: "md:hidden border-t border-gray-200", children: /* @__PURE__ */ jsx("ul", { className: "flex flex-col space-y-1 py-2 px-4", children: /* @__PURE__ */ jsx(CustomMenuBtn, { isLoggedIn, canRefresh }) }) })
  ] });
}
const links = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  { rel: "stylesheet", href: stylesheet },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous"
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap"
  }
];
function Layout({ children }) {
  return /* @__PURE__ */ jsxs("html", { lang: "en", children: [
    /* @__PURE__ */ jsxs("head", { children: [
      /* @__PURE__ */ jsx("meta", { charSet: "utf-8" }),
      /* @__PURE__ */ jsx("meta", { name: "viewport", content: "width=device-width, initial-scale=1" }),
      /* @__PURE__ */ jsx(Meta, {}),
      /* @__PURE__ */ jsx(Links, {})
    ] }),
    /* @__PURE__ */ jsxs("body", { children: [
      children,
      /* @__PURE__ */ jsx(ScrollRestoration, {}),
      /* @__PURE__ */ jsx(Scripts, {})
    ] })
  ] });
}
const loader$5 = async ({ request }) => {
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
function App() {
  const { isLoggedIn, canRefresh } = useLoaderData();
  const queryClient = createQueryClient();
  const [queryClientState] = React.useState(() => queryClient);
  const dehydratedState = useDehydratedState();
  return /* @__PURE__ */ jsx(QueryClientProvider, { client: queryClientState, children: /* @__PURE__ */ jsxs(HydrationBoundary, { state: dehydratedState, children: [
    /* @__PURE__ */ jsx(Toaster, {}),
    /* @__PURE__ */ jsx(Menu, { isLoggedIn, canRefresh }),
    /* @__PURE__ */ jsx(Outlet, {})
  ] }) });
}
const route0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Layout,
  default: App,
  links,
  loader: loader$5
}, Symbol.toStringTag, { value: "Module" }));
async function me(token) {
  const res = await fetch(`http://localhost:8000/api/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  });
  if (!res.ok) {
    throw new Error("Unauthorized");
  }
  const data = await res.json();
  return data;
}
async function middleware(req) {
  const getCookie = req.headers.get("Cookie") || "";
  const accessToken = await ACookie.parse(getCookie);
  const refreshToken = await RCookie.parse(getCookie);
  if (accessToken) {
    const user = await me(accessToken);
    if (user) {
      return null;
    }
  }
  if (refreshToken) {
    throw redirect("/auth/refresh", { status: 302 });
  }
  throw redirect("/auth/login", { status: 302 });
}
const formDefinitions = {
  login: [
    {
      name: "email",
      type: "email",
      label: "Email",
      placeholder: "Enter your email",
      required: true
    },
    {
      name: "password",
      type: "password",
      label: "Password",
      placeholder: "Enter your password",
      required: true
    }
  ],
  register: [
    {
      name: "name",
      type: "text",
      label: "Name",
      placeholder: "Enter your name",
      required: true
    },
    {
      name: "email",
      type: "email",
      label: "Email",
      placeholder: "Enter your email",
      required: true
    },
    {
      name: "password",
      type: "password",
      label: "Password",
      placeholder: "Enter your password",
      required: true
    }
  ],
  url: [
    {
      name: "original_url",
      type: "text",
      label: "Original url",
      placeholder: "https://company.com",
      required: true
    },
    {
      name: "short_url",
      type: "text",
      label: "Custom short url",
      placeholder: "custom short url",
      required: true
    },
    {
      name: "category",
      type: "select",
      label: "Category",
      placeholder: "Select a category",
      required: true,
      options: [
        { value: "Tech", label: "Tech" },
        { value: "News", label: "News" },
        { value: "Music", label: "Music" },
        { value: "Sports", label: "Sports" },
        { value: "Movies", label: "Movies" },
        { value: "Education", label: "Education" },
        { value: "Science", label: "Science" },
        { value: "Gaming", label: "Gaming" }
      ]
    }
  ]
};
function parsedZodError(error) {
  const fieldErrors = {};
  error.errors.forEach((err) => {
    if (err.path.length > 0) {
      const field = err.path[0];
      fieldErrors[field] = err.message;
    }
  });
  return fieldErrors;
}
async function validationAction({
  formData,
  schema
}) {
  try {
    const data = schema.parse(formData);
    return { data, errors: void 0 };
  } catch (error) {
    if (error instanceof ZodError) {
      const errors = parsedZodError(error);
      return { errors };
    }
    return {
      errors: { general: "An unexpected error occurred" }
    };
  }
}
var UrlCategories = /* @__PURE__ */ ((UrlCategories2) => {
  UrlCategories2["All"] = "All";
  UrlCategories2["Tech"] = "Tech";
  UrlCategories2["News"] = "News";
  UrlCategories2["Music"] = "Music";
  UrlCategories2["Sports"] = "Sports";
  UrlCategories2["Gaming"] = "Gaming";
  UrlCategories2["Movies"] = "Movies";
  UrlCategories2["Education"] = "Education";
  UrlCategories2["Science"] = "Science";
  return UrlCategories2;
})(UrlCategories || {});
var SearchMethodParams = /* @__PURE__ */ ((SearchMethodParams2) => {
  SearchMethodParams2["URL"] = "url";
  SearchMethodParams2["AUTH"] = "auth";
  SearchMethodParams2["USERS"] = "users";
  return SearchMethodParams2;
})(SearchMethodParams || {});
const CreateUrlSchema = z.object({
  original_url: z.string().url(),
  short_url: z.string({
    description: "short url must be provide, please provide at lease a name"
  }).min(5, { message: "Custom Short Url must contain at least 5 characters." }).max(30, { message: "Custom Short Url must contain max 5 characters." }),
  category: z.nativeEnum(UrlCategories)
});
const UpdateUrlSchema = CreateUrlSchema.partial();
z.object({
  delete: z.string().default("CONFIRM").superRefine((val, ctx) => {
    if (val !== "CONFIRM") {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Has to match with CONFIRM",
        path: ["delete"]
      });
    }
  })
});
const modalActions = {
  view: (dialogRef, qrModalRef) => {
    var _a, _b;
    (_a = dialogRef.current) == null ? void 0 : _a.showModal();
    (_b = qrModalRef.current) == null ? void 0 : _b.close();
  },
  qr: (dialogRef, qrModalRef) => {
    var _a, _b;
    (_a = qrModalRef.current) == null ? void 0 : _a.showModal();
    (_b = dialogRef.current) == null ? void 0 : _b.close();
  },
  create: (dialogRef) => {
    var _a;
    (_a = dialogRef.current) == null ? void 0 : _a.showModal();
  }
};
const Modal = React.forwardRef(
  ({ id, title, children, footer, close }, ref) => {
    return /* @__PURE__ */ jsxs(
      "dialog",
      {
        id,
        ref,
        className: "rounded-lg shadow-xl w-full mx-4 md:mx-auto md:max-w-md p-5",
        children: [
          /* @__PURE__ */ jsxs("header", { className: "flex justify-between items-center border-b border-orange-400 px-5", children: [
            /* @__PURE__ */ jsx("span", { className: "text-2xl font-semibold text-gray-200", children: title }),
            /* @__PURE__ */ jsx("button", { className: "p-1", onClick: close, children: /* @__PURE__ */ jsx(
              "svg",
              {
                xmlns: "http://www.w3.org/2000/svg",
                height: "1.5rem",
                viewBox: "0 -960 960 960",
                width: "1.5rem",
                fill: "white",
                children: /* @__PURE__ */ jsx("path", { d: "m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" })
              }
            ) })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "my-4", children }),
          footer && /* @__PURE__ */ jsx("footer", { className: "mt-4 flex justify-end", children: footer })
        ]
      }
    );
  }
);
Modal.displayName = "Modal";
async function dynamicFetcher({
  searchMethodParam,
  searchActionParam,
  method,
  body,
  queryParams,
  request
}) {
  var _a;
  const isServer = typeof window === "undefined";
  const urlParams = new URLSearchParams();
  if (queryParams) {
    for (const [key, value] of Object.entries(queryParams)) {
      if (value !== void 0) {
        urlParams.append(key, String(value));
      }
    }
  }
  let url = `/api/proxy?${searchMethodParam}=${searchActionParam}`;
  if (urlParams.toString()) {
    url += `&${urlParams.toString()}`;
  }
  const headers = {
    "Content-Type": "application/json"
  };
  if (isServer && request) {
    const baseUrl = new URL(request.url).origin;
    url = `${baseUrl}${url}`;
    const cookieHeader = request.headers.get("Cookie");
    if (cookieHeader) {
      headers["Cookie"] = cookieHeader;
    }
  }
  const fetchOptions = {
    method,
    headers,
    credentials: "same-origin"
  };
  if (body && (method === "POST" || method === "PATCH")) {
    fetchOptions.body = JSON.stringify(body);
  }
  const res = await fetch(url, fetchOptions);
  if (!res.ok) {
    console.error(`Fetch failed: ${res.status} ${res.statusText}`);
    throw new Error(`HTTP error! Status: ${res.status}`);
  }
  try {
    const apiResponse = ((_a = res.headers.get("Content-Type")) == null ? void 0 : _a.includes("application/json")) ? await res.json() : null;
    if (!apiResponse) {
      console.warn("Response is empty or not JSON:", await res.text());
      throw new Error("Invalid or empty response from server.");
    }
    return apiResponse;
  } catch (err) {
    console.error("Failed to parse response as JSON:", err);
    throw new Error("An error occurred while processing the response.");
  }
}
async function updateUrl$1(id, short_url, original_url, category, request) {
  if (!id) {
    throw new Error("ID is required for updating a URL.");
  }
  return dynamicFetcher({
    method: "PATCH",
    searchMethodParam: SearchMethodParams.URL,
    searchActionParam: "update",
    queryParams: { id, short_url, original_url, category },
    body: { short_url, original_url, category },
    request
  });
}
async function createNewUrl(original_url, short_url, category, request) {
  return dynamicFetcher({
    method: "POST",
    searchMethodParam: SearchMethodParams.URL,
    searchActionParam: "create",
    body: { short_url, original_url, category },
    queryParams: { short_url, original_url, category },
    request
  });
}
async function fetchUrls(limit, offset, category, id, request) {
  if (id) {
    return dynamicFetcher({
      method: "GET",
      searchMethodParam: SearchMethodParams.URL,
      searchActionParam: "view",
      queryParams: { id },
      request
    });
  }
  return dynamicFetcher({
    method: "GET",
    searchMethodParam: SearchMethodParams.URL,
    searchActionParam: "view",
    queryParams: {
      limit: limit == null ? void 0 : limit.toString(),
      offset: offset == null ? void 0 : offset.toString(),
      category
    },
    request
  });
}
function NewUrl() {
  const query = useQueryClient();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const dialogRef = React.useRef(null);
  const modalQueries = searchParams.get("modal");
  useEffect(() => {
    var _a;
    if (!modalQueries) {
      (_a = dialogRef.current) == null ? void 0 : _a.close();
      return;
    }
    modalActions[modalQueries](dialogRef, void 0);
  }, [modalQueries]);
  const [inputValue, setInputValue] = useState({
    original_url: "",
    short_url: "",
    category: ""
  });
  const urlFormDefinitions = formDefinitions["url"];
  const [validationErrors, setValidationErrors] = useState({});
  const closeModal = () => {
    navigate(-1);
  };
  const mutation = useMutation({
    mutationFn: async ({
      original_url,
      short_url,
      category
    }) => {
      try {
        const response = await createNewUrl(original_url, short_url, category);
        if (response.status === "error") {
          throw Error(response.message);
        }
        return response;
      } catch (error) {
        if (error instanceof Error) {
          throw error.message;
        }
        throw "An error occurred during creating the url.";
      }
    },
    onMutate: async (variables) => {
      setInputValue((prev) => ({ ...prev, ...variables }));
      setValidationErrors({});
    },
    onSuccess: () => {
      toast.success("Custom URL created!");
    },
    onError: (error) => {
      error ? toast.error(error) : toast.error("An error ocurred while updating the URL.");
    },
    onSettled: () => {
      query.invalidateQueries({ queryKey: ["urls"] });
    }
  });
  const handleInputChange = (fieldName, value) => {
    setInputValue((prev) => ({
      ...prev,
      [fieldName]: value
    }));
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    const { data, errors } = await validationAction({
      formData: inputValue,
      schema: CreateUrlSchema
    });
    if (errors) {
      setValidationErrors(errors);
      return;
    }
    mutation.mutate(data);
    navigate(navigateWorkSpace, { replace: true });
  };
  return /* @__PURE__ */ jsx(
    Modal,
    {
      id: `modal-create_url`,
      title: "Create new Url",
      ref: dialogRef,
      close: closeModal,
      children: /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "space-y-8", method: "POST", children: [
        urlFormDefinitions.map((field) => {
          var _a;
          return /* @__PURE__ */ jsxs("div", { className: "form-group", children: [
            /* @__PURE__ */ jsx("label", { htmlFor: field.name, children: field.label }),
            field.type !== "select" ? /* @__PURE__ */ jsx(
              "input",
              {
                id: field.name,
                name: field.name,
                type: field.type,
                placeholder: field.placeholder,
                required: field.required,
                value: inputValue[field.name] || "",
                onChange: (e) => handleInputChange(field.name, e.target.value),
                className: `bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ${validationErrors ? "border-red-500 " : "border-gray-300"}`,
                "aria-invalid": !!validationErrors,
                "aria-describedby": validationErrors ? `${field.name}-error` : void 0
              }
            ) : /* @__PURE__ */ jsxs(
              "select",
              {
                id: field.name,
                name: field.name,
                required: field.required,
                value: inputValue[field.name] || "",
                onChange: (e) => handleInputChange(field.name, e.target.value),
                className: `bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ${validationErrors ? "border-red-500" : "border-gray-300"}`,
                "aria-invalid": !!validationErrors,
                "aria-describedby": validationErrors ? `${field.name}-error` : void 0,
                children: [
                  /* @__PURE__ */ jsx("option", { value: "", disabled: true, children: field.placeholder }),
                  (_a = field.options) == null ? void 0 : _a.map((option) => /* @__PURE__ */ jsx("option", { value: option.value, children: option.label }, option.value))
                ]
              }
            ),
            validationErrors[field.name] && /* @__PURE__ */ jsx("p", { className: "error-message", children: validationErrors[field.name] })
          ] }, field.name);
        }),
        /* @__PURE__ */ jsx(
          "button",
          {
            type: "submit",
            disabled: mutation.isPending,
            className: "w-full bg-transparent border-2 border-orange-500 hover:bg-orange-400 hover:text-black py-2 px-4 rounded ",
            children: mutation.isPending ? "Creating..." : "Create URL"
          }
        )
      ] })
    }
  );
}
const loader$4 = async ({ request }) => {
  const middle = await middleware(request);
  if (middle !== null) {
    return middle;
  }
  return Response.json({ status: "success" });
};
function CreateNewUrl() {
  return /* @__PURE__ */ jsx(NewUrl, {});
}
const route1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: CreateNewUrl,
  loader: loader$4
}, Symbol.toStringTag, { value: "Module" }));
const meQueryOptions = (request) => {
  return {
    queryKey: ["me"],
    queryFn: async () => {
      const response = await dynamicFetcher({
        method: "GET",
        searchActionParam: "me",
        searchMethodParam: SearchMethodParams.USERS,
        request
      });
      if (!response || !response.data) {
        throw Error("something wrong happend");
      }
      return response.data;
    }
  };
};
const urlsQueryOptions = (limit, offset, category, request) => {
  return {
    queryKey: ["urls", limit, offset, category],
    queryFn: async () => {
      const response = await fetchUrls(
        limit,
        offset,
        category,
        void 0,
        request
      );
      return response.data ?? [];
    },
    staleTime: 6e3
  };
};
const urlQueryOptions = (id, request) => {
  return {
    queryKey: ["url", id],
    queryFn: async () => {
      const response = await fetchUrls(
        void 0,
        void 0,
        void 0,
        id,
        request
      );
      if (!response || !response.data) {
        throw new Error("No data found for the specified URL ID.");
      }
      return response.data;
    },
    staleTime: 6e3
  };
};
function ToolTip({
  children,
  label
}) {
  return /* @__PURE__ */ jsxs("div", { className: "relative inline-block group", children: [
    children,
    /* @__PURE__ */ jsx(
      "div",
      {
        id: "tooltip",
        role: "tooltip",
        className: "absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2\n                       hidden group-hover:block\n                       bg-black text-white text-sm rounded-lg py-1 px-3\n                       whitespace-normal break-words z-50\n                       after:absolute after:top-full after:left-1/2 after:transform after:-translate-x-1/2\n                       after:border-8 after:border-transparent after:border-t-black\n                       transition-opacity duration-300",
        children: label
      }
    )
  ] });
}
function UrlCard({ short_url, id, slug }) {
  const redirection = `http://localhost:8000/api/url/redirect/${slug}`;
  const handleRedirect = () => {
    window.open(`${redirection}`, "_blank");
  };
  return /* @__PURE__ */ jsxs("div", { className: "max-w-sm p-6 border-y border-orange-400 rounded-2xl flex items-center space-x-4 flex-col w-full h-auto", children: [
    /* @__PURE__ */ jsx("div", { className: "inline-flex font-medium items-center gap-2", children: /* @__PURE__ */ jsxs(
      "button",
      {
        onClick: () => handleRedirect(),
        className: `w-full text-white py-2 px-5 rounded-xl transition flex items-center justify-center bg-transparent border-2 border-orange-500 hover:bg-orange-400 hover:text-black focus:outline-none focus:ring-2 focus:ring-blue-300 }`,
        "aria-label": "Shorten URL",
        children: [
          /* @__PURE__ */ jsx(LinkIcon, {}),
          short_url
        ]
      }
    ) }),
    /* @__PURE__ */ jsxs("div", { className: "mt-5 w-full flex items-center justify-between", children: [
      /* @__PURE__ */ jsx(Link, { to: modalNavigateActions["view"](id), className: "btn-grad", children: /* @__PURE__ */ jsx(ToolTip, { label: "info", children: /* @__PURE__ */ jsx(ViewMore, {}) }) }),
      /* @__PURE__ */ jsx(Link, { to: modalNavigateActions["qr"](id), className: "btn-grad", children: /* @__PURE__ */ jsx(ToolTip, { label: "qr code", children: /* @__PURE__ */ jsx(QRIcon, {}) }) })
    ] })
  ] });
}
function SkeletonUrlCard() {
  return /* @__PURE__ */ jsxs("div", { className: "max-w-sm p-6 border-y border-gray-400 rounded-2xl flex items-center space-x-4 flex-col w-full h-auto", children: [
    /* @__PURE__ */ jsx("div", { className: "inline-flex font-medium items-center gap-2", children: /* @__PURE__ */ jsxs(
      "button",
      {
        className: `w-full text-white py-2 px-5 rounded-xl transition flex items-center justify-center bg-transparent border-2 border-gray-400 `,
        "aria-label": "Shorten URL",
        children: [
          /* @__PURE__ */ jsx(Skeleton, { circle: true, height: 24, width: 24 }),
          /* @__PURE__ */ jsx(
            Skeleton,
            {
              width: `60%`,
              height: 20,
              style: { marginLeft: "0.5rem" }
            }
          )
        ]
      }
    ) }),
    /* @__PURE__ */ jsxs("div", { className: "mt-5 w-full flex items-center justify-between", children: [
      /* @__PURE__ */ jsx("div", { className: "btn-grad flex items-center justify-center w-10 h-10", children: /* @__PURE__ */ jsx(Skeleton, { circle: true, height: 24, width: 24 }) }),
      /* @__PURE__ */ jsx("div", { className: "btn-grad flex items-center justify-center w-10 h-10", children: /* @__PURE__ */ jsx(Skeleton, { circle: true, height: 24, width: 24 }) })
    ] })
  ] });
}
const CustomDropdown = ({
  label,
  selectedCategory,
  onSelectCategory
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);
  const optionsRef = useRef([]);
  const categories = Object.values(UrlCategories);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
        setHighlightedIndex(-1);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const handleButtonKeyDown = (event) => {
    switch (event.key) {
      case "ArrowDown":
        event.preventDefault();
        setIsOpen(true);
        setHighlightedIndex(0);
        break;
      case "ArrowUp":
        event.preventDefault();
        setIsOpen(true);
        setHighlightedIndex(categories.length - 1);
        break;
      case "Escape":
        if (isOpen) {
          event.preventDefault();
          setIsOpen(false);
          setHighlightedIndex(-1);
        }
        break;
    }
  };
  const handleOptionKeyDown = (event, index) => {
    var _a, _b;
    switch (event.key) {
      case "ArrowDown":
        event.preventDefault();
        setHighlightedIndex(
          (prev) => prev < categories.length - 1 ? prev + 1 : 0
        );
        break;
      case "ArrowUp":
        event.preventDefault();
        setHighlightedIndex(
          (prev) => prev > 0 ? prev - 1 : categories.length - 1
        );
        break;
      case "Enter":
      case " ":
        event.preventDefault();
        onSelectCategory(categories[index]);
        setIsOpen(false);
        (_a = buttonRef.current) == null ? void 0 : _a.focus();
        break;
      case "Escape":
        event.preventDefault();
        setIsOpen(false);
        setHighlightedIndex(-1);
        (_b = buttonRef.current) == null ? void 0 : _b.focus();
        break;
    }
  };
  useEffect(() => {
    if (highlightedIndex >= 0 && optionsRef.current[highlightedIndex]) {
      optionsRef.current[highlightedIndex].scrollIntoView({
        block: "nearest"
      });
    }
  }, [highlightedIndex]);
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: "flex justify-center items-center space-x-5",
      ref: dropdownRef,
      children: [
        /* @__PURE__ */ jsx(
          "label",
          {
            id: "dropdown-label",
            htmlFor: "custom-dropdown",
            className: "block text-lg font-medium text-gray-200 mb-1",
            children: label
          }
        ),
        /* @__PURE__ */ jsxs(
          "button",
          {
            type: "button",
            className: "inline-flex justify-between w-48 rounded-md border border-orange-400 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500",
            "aria-haspopup": "listbox",
            "aria-expanded": isOpen,
            "aria-labelledby": "dropdown-label",
            onClick: () => setIsOpen((prev) => !prev),
            onKeyDown: handleButtonKeyDown,
            ref: buttonRef,
            children: [
              /* @__PURE__ */ jsx("span", { className: "block truncate", children: selectedCategory }),
              /* @__PURE__ */ jsx(
                "svg",
                {
                  className: `-mr-1 ml-2 h-5 w-5 transform transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`,
                  xmlns: "http://www.w3.org/2000/svg",
                  viewBox: "0 0 20 20",
                  fill: "currentColor",
                  "aria-hidden": "true",
                  children: /* @__PURE__ */ jsx(
                    "path",
                    {
                      fillRule: "evenodd",
                      d: "M5.23 7.21a.75.75 0 011.06.02L10 11.584l3.71-4.353a.75.75 0 111.14.976l-4.25 5a.75.75 0 01-1.14 0l-4.25-5a.75.75 0 01.02-1.06z",
                      clipRule: "evenodd"
                    }
                  )
                }
              )
            ]
          }
        ),
        isOpen && /* @__PURE__ */ jsx(
          "ul",
          {
            role: "listbox",
            "aria-labelledby": "dropdown-label",
            tabIndex: -1,
            className: "absolute z-10 mt-1 w-48 bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm border border-orange-400",
            children: categories.map((category, index) => /* @__PURE__ */ jsxs(
              "li",
              {
                id: `listbox-option-${category}`,
                role: "option",
                "aria-selected": selectedCategory === category,
                tabIndex: -1,
                ref: (el) => {
                  if (el) optionsRef.current[index] = el;
                },
                className: `cursor-default select-none relative py-2 pl-10 pr-4 ${highlightedIndex === index ? "text-white bg-indigo-600" : "text-gray-900"}`,
                onClick: () => {
                  onSelectCategory(category);
                  setIsOpen(false);
                },
                onMouseEnter: () => setHighlightedIndex(index),
                onKeyDown: (e) => handleOptionKeyDown(e, index),
                children: [
                  /* @__PURE__ */ jsx(
                    "span",
                    {
                      className: `block truncate ${selectedCategory === category ? "font-medium" : "font-normal"}`,
                      children: category
                    }
                  ),
                  selectedCategory === category && /* @__PURE__ */ jsx(
                    "span",
                    {
                      className: `absolute inset-y-0 left-0 flex items-center pl-3 ${highlightedIndex === index ? "text-white" : "text-indigo-600"}`,
                      children: /* @__PURE__ */ jsx(
                        "svg",
                        {
                          className: "h-5 w-5 text-orange-300",
                          xmlns: "http://www.w3.org/2000/svg",
                          viewBox: "0 0 20 20",
                          fill: "currentColor",
                          "aria-hidden": "true",
                          children: /* @__PURE__ */ jsx(
                            "path",
                            {
                              fillRule: "evenodd",
                              d: "M16.704 4.153a.75.75 0 011.05.143l-8 10.5a.75.75 0 01-1.14.075l-4.5-4.5a.75.75 0 111.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z",
                              clipRule: "evenodd"
                            }
                          )
                        }
                      )
                    }
                  )
                ]
              },
              category
            ))
          }
        )
      ]
    }
  );
};
function FilterAndPag({
  offset,
  limit,
  category,
  dataLength
}) {
  const [searchParams, setSearchParams] = useSearchParams();
  const handlePageChange = (newPage) => {
    setSearchParams((prev) => {
      const params = new URLSearchParams(prev.toString());
      params.set("offset", newPage.toString());
      params.set("limit", limit.toString());
      params.set("category", category);
      return params;
    });
  };
  const handleCtgChange = (selectedCategory) => {
    setSearchParams({
      offset: "1",
      limit: limit.toString(),
      category: selectedCategory
    });
  };
  return /* @__PURE__ */ jsxs("div", { className: "container mx-auto flex justify-center flex-col md:flex-row md:justify-between items-center space-y-5", children: [
    /* @__PURE__ */ jsxs("div", { className: "space-x-8", children: [
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => handlePageChange(offset - 1),
          disabled: offset <= 1,
          className: "px-5 py-3 border border-orange-400 rounded-lg",
          children: "Prev"
        }
      ),
      /* @__PURE__ */ jsx("span", { className: "border-b border-orange-400", children: offset }),
      dataLength < limit ? /* @__PURE__ */ jsx(ToolTip, { label: "no data", children: /* @__PURE__ */ jsx(
        "button",
        {
          disabled: dataLength < limit,
          onClick: () => handlePageChange(offset + 1),
          className: "px-5 py-3 border border-orange-400 rounded-lg",
          children: "Next"
        }
      ) }) : /* @__PURE__ */ jsx(
        "button",
        {
          disabled: dataLength < limit,
          onClick: () => handlePageChange(offset + 1),
          className: "px-5 py-3 border border-orange-400 rounded-lg",
          children: "Next"
        }
      )
    ] }),
    /* @__PURE__ */ jsx("div", { className: "", children: /* @__PURE__ */ jsx(
      CustomDropdown,
      {
        label: "Category",
        selectedCategory: category,
        onSelectCategory: handleCtgChange
      }
    ) })
  ] });
}
function NoData() {
  return /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center justify-center py-16 w-full", children: [
    /* @__PURE__ */ jsx("div", { className: "w-16 h-16 mb-4 flex items-center justify-center text-gray-400", children: /* @__PURE__ */ jsx(
      "svg",
      {
        className: "w-16 h-16",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: "1.5",
        viewBox: "0 0 24 24",
        children: /* @__PURE__ */ jsx(
          "path",
          {
            strokeLinecap: "round",
            strokeLinejoin: "round",
            d: "M3 10h18M3 6h18M3 14h18M3 18h18"
          }
        )
      }
    ) }),
    /* @__PURE__ */ jsx("h2", { className: "text-2xl font-semibold text-gray-800 mb-2", children: "No More Data" }),
    /* @__PURE__ */ jsx("p", { className: "text-gray-500 text-center max-w-md", children: "You have reached the end! There are no more items to load at this time." })
  ] });
}
function Dashboard({
  offset,
  limit,
  category
}) {
  const page = (offset - 1) * limit;
  const { data, error, isLoading } = useQuery(
    urlsQueryOptions(limit, page, category)
  );
  if (error instanceof Error) {
    return /* @__PURE__ */ jsxs("div", { children: [
      "Error: ",
      error.message
    ] });
  }
  const dataLength = data == null ? void 0 : data.length;
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    data && /* @__PURE__ */ jsx(
      FilterAndPag,
      {
        category,
        limit,
        offset,
        dataLength
      }
    ),
    /* @__PURE__ */ jsx(
      "div",
      {
        className: data && data.length ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 justify-items-center w-full p-10" : "flex w-full p-10",
        children: isLoading ? Array.from({ length: limit }).map((_, index) => /* @__PURE__ */ jsx(SkeletonUrlCard, {}, index)) : data && data.length ? data.map((url) => /* @__PURE__ */ jsx(
          UrlCard,
          {
            id: url.id,
            short_url: url.short_url,
            slug: url.slug
          },
          url.id
        )) : /* @__PURE__ */ jsx(NoData, {})
      }
    )
  ] });
}
const loader$3 = async ({ request }) => {
  const middle = await middleware(request);
  if (middle !== null) {
    return middle;
  }
  const url = new URL(request.url);
  const offset = parseInt(url.searchParams.get("offset") || "1", 10);
  const limit = parseInt(url.searchParams.get("limit") || "10", 10);
  const category = url.searchParams.get("category") || UrlCategories.All;
  const queryClient = createQueryClient();
  const options = urlsQueryOptions(10, 0, UrlCategories.All, request);
  await queryClient.prefetchQuery(options);
  return Response.json({
    dehydratedState: dehydrate(queryClient),
    offset,
    limit,
    category
  });
};
function WorkSpace() {
  const { offset, limit, category } = useLoaderData();
  return /* @__PURE__ */ jsx(Dashboard, { category, limit, offset });
}
const route2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: WorkSpace,
  loader: loader$3
}, Symbol.toStringTag, { value: "Module" }));
async function register(email, password, name) {
  const res = await fetch("http://localhost:8000/api/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email, password, name })
  });
  if (!res) {
    throw new Error("Unauthorized");
  }
  const apiResponse = await res.json();
  const { data } = apiResponse;
  return data;
}
const passwordValidation = new RegExp("^.*?[@$!%*?&].*$");
const RegisterUserSchema = z.object({
  name: z.string().min(3, { message: "Name must be at least 3 characters long." }).describe("A valid name is required. Please provide a name."),
  email: z.string().email({ message: "Please provide a valid email address." }).describe("An email is required. Please provide an email address."),
  password: z.string().regex(passwordValidation, {
    message: "Password must contain at least one special character (@$!%*?&)."
  }).regex(/(?!.* )(?=.*\d)/, {
    message: "Password must include at least one digit and have no spaces."
  }).describe("A secure password is required. Please provide a password.")
});
const LoginUserSchema = z.object({
  email: z.string().email({ message: "Please provide a valid email address." }).min(2, {
    message: "Email is required and must be at least 2 characters long."
  }).describe(
    "An email is required for login. Please provide your email address."
  ),
  password: z.string().min(2, {
    message: "Password is required and must be at least 2 characters long."
  }).describe(
    "A password is required for login. Please provide your password."
  )
});
function DynamicForm({
  formSchema,
  actionData,
  method,
  action: action2,
  submitLabel,
  className
}) {
  var _a;
  return /* @__PURE__ */ jsxs(
    "form",
    {
      method,
      action: action2,
      className: `space-y-4 ${className || ""}`,
      children: [
        ((_a = actionData.errors) == null ? void 0 : _a.general) && /* @__PURE__ */ jsx("div", { className: "text-red-500 text-sm mb-4", children: actionData.errors.general }),
        formSchema.map((field) => {
          var _a2, _b;
          const fieldError = (_a2 = actionData.errors) == null ? void 0 : _a2[field.name];
          return /* @__PURE__ */ jsxs("div", { className: "flex flex-col mb-4", children: [
            /* @__PURE__ */ jsx(
              "label",
              {
                htmlFor: field.name,
                className: "block text-sm font-medium text-gray-700",
                children: field.label
              }
            ),
            field.type === "select" ? /* @__PURE__ */ jsxs(
              "select",
              {
                name: field.name,
                id: field.name,
                required: field.required,
                className: `mt-1 block w-full rounded-md border ${fieldError ? "border-red-500" : "border-gray-300"} shadow-sm focus:border-blue-500 focus:ring-blue-500`,
                "aria-invalid": !!fieldError,
                "aria-describedby": fieldError ? `${field.name}-error` : void 0,
                children: [
                  /* @__PURE__ */ jsx("option", { value: field.placeholder, disabled: true, children: field.placeholder || "Select an option" }),
                  (_b = field.options) == null ? void 0 : _b.map((option) => /* @__PURE__ */ jsx("option", { value: option.value, children: option.label }, option.value))
                ]
              }
            ) : /* @__PURE__ */ jsx(
              "input",
              {
                type: field.type,
                name: field.name,
                id: field.name,
                required: field.required,
                placeholder: field.placeholder,
                autoComplete: field.name,
                className: `mt-1 block w-full rounded-md border ${fieldError ? "border-red-500" : "border-gray-300"} shadow-sm focus:border-blue-500 focus:ring-blue-500`,
                "aria-invalid": !!fieldError,
                "aria-describedby": fieldError ? `${field.name}-error` : void 0
              }
            ),
            fieldError && /* @__PURE__ */ jsx(
              "p",
              {
                id: `${field.name}-error`,
                className: "text-red-500 text-sm mt-1",
                children: fieldError
              }
            )
          ] }, field.name);
        }),
        /* @__PURE__ */ jsx(
          "button",
          {
            type: "submit",
            className: "w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600",
            children: submitLabel
          }
        )
      ]
    }
  );
}
async function action$4({ request }) {
  const formData = Object.fromEntries(await request.formData());
  const { data, errors } = await validationAction({
    formData,
    schema: RegisterUserSchema
  });
  if (errors) {
    console.log("Validation errors:", errors);
    return Response.json({ errors }, { status: 400 });
  }
  if (!data) {
    console.log("No data received");
    return Response.json(
      { errors: { general: "Invalid data" } },
      { status: 400 }
    );
  }
  const { email, password, name } = data;
  try {
    const response = await register(email, password, name);
    if (!response) return redirect("/auth/register", { status: 400 });
    return redirect("/auth/login");
  } catch (err) {
    if (err instanceof Error) {
      console.log("Error caught:", err.message);
      return Response.json(
        { errors: { general: err.message } },
        { status: 400 }
      );
    }
  }
}
function Register() {
  const actionData = useActionData() || {
    errors: {}
  };
  return /* @__PURE__ */ jsx("div", { className: "min-h-screen flex items-center justify-center ", children: /* @__PURE__ */ jsxs("div", { className: "bg-white p-8 rounded shadow-md w-full max-w-md", children: [
    /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold mb-6 text-center text-black", children: "Register" }),
    /* @__PURE__ */ jsx(
      DynamicForm,
      {
        actionData,
        formSchema: formDefinitions["register"],
        method: "POST",
        submitLabel: "Register"
      }
    )
  ] }) });
}
const route3 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  action: action$4,
  default: Register
}, Symbol.toStringTag, { value: "Module" }));
class DateConverter {
  /**
   * Converts a date string into a human-readable date format.
   *
   * @param dateString - A string representing a date (e.g., "2024-12-17T10:00:00Z").
   *
   * @returns A formatted date string based on the user's default locale settings.
   * By default, this includes the full year, the full month name, and the numeric day.
   *
   * @example
   * ```typescript
   * const formattedDate = DateConverter.formatDateFromString("2024-12-17T10:00:00Z");
   * console.log(formattedDate); // "December 17, 2024" (format may vary by locale)
   * ```
   */
  static formatDateFromString(dateString) {
    const date = new Date(dateString);
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric"
    };
    return date.toLocaleDateString(void 0, options);
  }
}
const colorToHex = {
  black: "#000000",
  white: "#FFFFFF",
  red: "#FF0000",
  green: "#00FF00",
  blue: "#0000FF",
  yellow: "#FFFF00"
};
function getHexColor(color) {
  try {
    return colorToHex[color.toLowerCase()];
  } catch (e) {
    console.log(e);
  }
}
const QRCodeGenerator = ({
  url,
  canvasRef,
  size = 200,
  color = "black",
  bg = "white"
}) => {
  const qrColors = useMemo(
    () => ({
      dark: getHexColor(color),
      light: getHexColor(bg)
    }),
    [color, bg]
  );
  useEffect(() => {
    const generateQRCode = async () => {
      if (!url || !canvasRef.current) return;
      try {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;
        const qrOptions = {
          width: size,
          margin: 1,
          color: qrColors
        };
        const qrDataUrl = await QRCode.toDataURL(url, qrOptions);
        const image = new Image();
        image.onload = () => {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
        };
        image.src = qrDataUrl;
      } catch (error) {
        console.error("Error generating QR code:", error);
      }
    };
    generateQRCode();
  }, [url, canvasRef, size, qrColors]);
  return null;
};
function downloadStringAsFile(data, filename) {
  const a = document.createElement("a");
  a.download = filename;
  a.href = data;
  a.click();
  window.URL.revokeObjectURL(data);
}
function DownLoadQR({
  canvasRef,
  fileName
}) {
  const onCanvasBtn = () => {
    const node = canvasRef.current;
    if (!node) {
      return;
    }
    const dataURI = node.toDataURL("image/png");
    const byteString = atob(dataURI.split(",")[1]);
    const mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([ab], { type: mimeString });
    const blobURL = URL.createObjectURL(blob);
    downloadStringAsFile(blobURL, `${fileName}.png`);
  };
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx(ToolTip, { label: "download ", children: /* @__PURE__ */ jsx(
    "button",
    {
      onClick: onCanvasBtn,
      style: { color: "white", fontSize: "2rem" },
      children: /* @__PURE__ */ jsx(DownloadIcon, {})
    }
  ) }) });
}
function UrlUpdater({
  category,
  id,
  original_url,
  short_url
}) {
  const query = useQueryClient();
  const [fieldBeingEdited, setFieldBeingEdited] = useState(null);
  const [inputValue, setInputValue] = useState({
    original_url,
    short_url,
    category
  });
  const [validationErrors, setValidationErrors] = useState({});
  const mutation = useMutation({
    mutationFn: async ({
      original_url: original_url2,
      short_url: short_url2,
      category: category2
    }) => {
      try {
        const update = await updateUrl$1(
          id,
          short_url2,
          original_url2,
          category2
        );
        if (update.status === "error") {
          throw Error(update.message);
        }
        return update;
      } catch (error) {
        if (error instanceof Error) {
          throw error.message;
        }
        throw "An error occurred during updating the url.";
      }
    },
    onMutate: async (variables) => {
      setFieldBeingEdited(null);
      setInputValue((prev) => ({ ...prev, ...variables }));
      setValidationErrors({});
    },
    onSuccess: (data) => {
      toast.success(data.message);
      setFieldBeingEdited(null);
    },
    onError: (error) => {
      error ? toast.error(error) : toast.error("An error ocurred while updating the URL.");
    },
    onSettled: () => {
      query.invalidateQueries({ queryKey: ["url", id] });
      query.invalidateQueries({ queryKey: ["urls"] });
    }
  });
  const handleEdit = (fieldName) => {
    setFieldBeingEdited(fieldName);
  };
  const handleCancel = (e) => {
    e.preventDefault();
    setInputValue({
      original_url,
      short_url,
      category
    });
    setFieldBeingEdited(null);
  };
  const handleCtgChange = (selectedCategory) => {
    setInputValue((prev) => ({ ...prev, category: selectedCategory }));
  };
  const handleInputChange = (event, fieldName) => {
    setInputValue((prev) => ({ ...prev, [fieldName]: event.target.value }));
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    const { data, errors } = await validationAction({
      formData: inputValue,
      schema: UpdateUrlSchema
    });
    if (errors) {
      setValidationErrors(errors);
      return;
    }
    if (data) {
      const updateData = {};
      if (fieldBeingEdited === "original_url") {
        updateData.original_url = data.original_url;
      } else if (fieldBeingEdited === "short_url") {
        updateData.short_url = data.short_url;
      } else if (fieldBeingEdited === "category") {
        updateData.category = data.category;
      }
      mutation.mutate(updateData);
    }
  };
  return /* @__PURE__ */ jsx("div", { className: "container mx-auto", children: /* @__PURE__ */ jsx("div", { className: "mt-4", children: /* @__PURE__ */ jsx("div", { className: "flex flex-col align-start", children: formDefinitions["url"].map((field) => {
    const fieldValue = inputValue[field.name];
    const displayValue = fieldValue.length > 30 ? `${fieldValue.slice(0, 20)}...` : fieldValue;
    return /* @__PURE__ */ jsxs("div", { className: "mb-4", children: [
      fieldBeingEdited !== field.name && /* @__PURE__ */ jsxs("div", { className: "flex w-full flex-col md:flex-row", children: [
        /* @__PURE__ */ jsx("span", { className: "text-gray-200 w-1/4", children: field.name }),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-row align-start", children: [
          /* @__PURE__ */ jsx(
            "button",
            {
              className: "text-blue-500 hover:underline",
              onClick: () => handleEdit(field.name),
              children: /* @__PURE__ */ jsx(OverWriteIcon, {})
            }
          ),
          /* @__PURE__ */ jsx("span", { className: "text-gray-600 text-lg line-clamp-1", children: displayValue })
        ] })
      ] }),
      fieldBeingEdited === field.name && /* @__PURE__ */ jsxs(
        "form",
        {
          className: "mb-4 flex items-center justify-start w-full",
          onSubmit: handleSubmit,
          method: "PATCH",
          action: `/workspace/${id}`,
          children: [
            (validationErrors == null ? void 0 : validationErrors.general) && /* @__PURE__ */ jsx("div", { className: "text-red-500 text-sm mb-4", children: validationErrors == null ? void 0 : validationErrors.genera }),
            field.name !== "category" && /* @__PURE__ */ jsx(
              "input",
              {
                type: "text",
                className: `bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5 ${validationErrors ? "border-red-500" : "border-gray-300"}`,
                value: inputValue[field.name],
                onChange: (e) => handleInputChange(e, field.name),
                "aria-invalid": !!validationErrors,
                "aria-describedby": validationErrors ? `${field.name}-error` : void 0
              }
            ),
            field.name === "category" && /* @__PURE__ */ jsx(
              CustomDropdown,
              {
                label: "Category",
                selectedCategory: inputValue["category"],
                onSelectCategory: handleCtgChange
              }
            ),
            validationErrors.fieldError && /* @__PURE__ */ jsx("div", { className: "text-red-500 text-sm mb-4", children: validationErrors.fieldError }),
            /* @__PURE__ */ jsx(
              "button",
              {
                className: "ml-2 bg-orange-400 text-white px-2 py-2 rounded",
                type: "submit",
                children: /* @__PURE__ */ jsx(CheckIcon, {})
              }
            ),
            /* @__PURE__ */ jsx(
              "button",
              {
                className: "ml-2 bg-orange-400 text-white px-2 py-2 rounded",
                onClick: handleCancel,
                children: /* @__PURE__ */ jsx(CloseIcon, {})
              }
            )
          ]
        }
      )
    ] }, field.name);
  }) }) }) });
}
function DeleteRecordBtn({ id }) {
  const query = useQueryClient();
  const navigate = useNavigate();
  const mutation = useMutation({
    mutationFn: async ({ id: id2 }) => {
      try {
        const deleteRecord = await fetch(`/api/proxy?url=delete&id=${id2}`, {
          headers: {
            method: "DELETE",
            "Content-Type": "application/json"
          }
        });
        const res = await deleteRecord.json();
        if (res.status === "error") {
          throw new Error("something happend");
        }
        return res;
      } catch (error) {
        if (error instanceof Error) {
          throw error.message;
        }
        throw "An error occurred during deleting the url.";
      }
    },
    onMutate: async ({ id: id2 }) => {
      await query.cancelQueries({ queryKey: ["url", id2] });
    },
    onSuccess: (res) => {
      toast.success(res.message);
    },
    onError: (error) => {
      error ? toast.error(error) : toast.error("An error ocurred while updating the URL.");
    },
    onSettled: async () => {
      await query.invalidateQueries({ queryKey: ["urls"] });
      query.removeQueries({ queryKey: ["url", id] });
    }
  });
  const handleDeleteUrlRecord = async (event) => {
    event.preventDefault();
    mutation.mutate({ id });
    navigate(workspace, { replace: true });
  };
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx(
    "button",
    {
      className: "border-2 border-red-600 px-5 py-2 text-red-500",
      onClick: handleDeleteUrlRecord,
      children: "Delete Record"
    }
  ) });
}
function UrlModalRenderer() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const dialogRef = React.useRef(null);
  const canvasRef = React.useRef(null);
  const qrModalRef = React.useRef(null);
  const modalQueries = searchParams.get("modal");
  useEffect(() => {
    var _a, _b;
    if (!modalQueries) {
      (_a = dialogRef.current) == null ? void 0 : _a.close();
      (_b = qrModalRef.current) == null ? void 0 : _b.close();
      return;
    }
    modalActions[modalQueries](dialogRef, qrModalRef);
  }, [modalQueries]);
  const closeModal = () => {
    navigate(-1);
  };
  const { data, error, isLoading } = useQuery(urlQueryOptions(id));
  if (isLoading) {
    return /* @__PURE__ */ jsx("div", { children: "Loading..." });
  }
  if (error instanceof Error) {
    return /* @__PURE__ */ jsxs("div", { children: [
      "Error: ",
      error.message
    ] });
  }
  return /* @__PURE__ */ jsx(Fragment, { children: data && /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs(
      Modal,
      {
        id: `modal-${id}`,
        title: data.short_url,
        ref: dialogRef,
        footer: /* @__PURE__ */ jsx(DeleteRecordBtn, { id }),
        close: closeModal,
        children: [
          /* @__PURE__ */ jsx(
            UrlUpdater,
            {
              category: data.category,
              id: data.id,
              original_url: data.original_url,
              short_url: data.short_url
            }
          ),
          /* @__PURE__ */ jsxs("div", { className: "flex flex-row w-full mt-4", children: [
            /* @__PURE__ */ jsx("span", { className: "text-gray-200 w-1/4", children: "Views" }),
            /* @__PURE__ */ jsx("p", { className: "text-gray-200", children: data.views })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex flex-row w-full mt-4", children: [
            /* @__PURE__ */ jsx("span", { className: "text-gray-200 w-1/4", children: "Created:" }),
            /* @__PURE__ */ jsx("p", { className: "text-gray-200", children: DateConverter.formatDateFromString(data.createdAt) })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex flex-row w-full mt-4", children: [
            /* @__PURE__ */ jsx("span", { className: "text-gray-200 w-1/4", children: "Updated" }),
            /* @__PURE__ */ jsx("p", { className: "text-gray-200", children: DateConverter.formatDateFromString(data.updatedAt) })
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsxs(
      Modal,
      {
        id: `qr_modal-${id}`,
        title: "QR Generator",
        ref: qrModalRef,
        close: closeModal,
        children: [
          /* @__PURE__ */ jsx(
            QRCodeGenerator,
            {
              canvasRef,
              url: `http://localhost:8000/api/url/redirect/${data.slug}`,
              size: 200
            }
          ),
          /* @__PURE__ */ jsx("div", { className: "flex justify-center items-center ", children: /* @__PURE__ */ jsx(
            "canvas",
            {
              ref: canvasRef,
              width: 200,
              height: 200,
              style: { border: "2px solid orange" }
            }
          ) }),
          /* @__PURE__ */ jsx(DownLoadQR, { canvasRef, fileName: data.slug })
        ]
      }
    )
  ] }) });
}
const loader$2 = async ({ request, params }) => {
  const middle = await middleware(request);
  if (middle !== null) {
    return middle;
  }
  const queryClient = createQueryClient();
  const options = urlQueryOptions(params.id, request);
  await queryClient.prefetchQuery(options);
  return Response.json({ dehydratedState: dehydrate(queryClient) });
};
function Url() {
  return /* @__PURE__ */ jsx(UrlModalRenderer, {});
}
const route4 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Url,
  loader: loader$2
}, Symbol.toStringTag, { value: "Module" }));
async function refresh(token) {
  const res = await fetch(`http://localhost:8000/api/auth/refresh`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Cookie: `refresh_token=${token}`
    }
  });
  if (!res.ok) {
    throw new Error("Unauthorized");
  }
  const data = await res.json();
  return data;
}
async function action$3({ request }) {
  var _a;
  const getCookie = request.headers.get("Cookie") || "";
  const refreshToken = await RCookie.parse(getCookie);
  try {
    if (refreshToken) {
      const response = await refresh(refreshToken);
      if (!response) return redirect("/auth/login", { status: 400 });
      const headers = new Headers();
      if ((_a = response.data) == null ? void 0 : _a.access_token) {
        headers.append(
          "Set-Cookie",
          await ACookie.serialize(response.data.access_token, {
            sameSite: "lax"
          })
        );
      }
      if (headers.has("Set-Cookie")) {
        return redirect(workspace, {
          headers
        });
      }
      return Response.json(response.data);
    }
  } catch (err) {
    if (err instanceof Error) {
      return Response.json({ status: "err", message: err.message });
    }
  }
}
function Refresh() {
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx("h5", { className: "text-2xl font-bold tracking-tight text-gray-900 dark:text-white", children: "Refresh your token" }),
    /* @__PURE__ */ jsx("p", { className: "font-normal text-gray-700 dark:text-gray-400", children: "You can refresh your token by clicking the button below." }),
    /* @__PURE__ */ jsx(Form, { method: "post", children: /* @__PURE__ */ jsx(
      "button",
      {
        type: "submit",
        className: "px-4 py-2 font-medium text-white bg-blue-500 rounded hover:bg-blue-600",
        children: "Refresh Token"
      }
    ) })
  ] });
}
const route5 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  action: action$3,
  default: Refresh
}, Symbol.toStringTag, { value: "Module" }));
function Me() {
  const { data, isLoading, error } = useQuery(meQueryOptions());
  if (isLoading) {
    return /* @__PURE__ */ jsx("div", { children: "Loading..." });
  }
  if (error instanceof Error) {
    return /* @__PURE__ */ jsxs("div", { children: [
      "Error: ",
      error.message
    ] });
  }
  return /* @__PURE__ */ jsx("div", { children: data && /* @__PURE__ */ jsx("div", { className: "flex flex-col items-center justify-center py-16 w-auto", children: /* @__PURE__ */ jsxs("div", { className: "user_card rounded-lg shadow-xl w-full mx-4 md:mx-auto md:max-w-md p-5 ", children: [
    /* @__PURE__ */ jsx("h1", { className: "text-3xl font-semibold text-gray-200", children: "User Info" }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-row w-full mt-4", children: [
      /* @__PURE__ */ jsx("span", { className: "text-gray-200 w-1/4", children: "Name" }),
      /* @__PURE__ */ jsx("p", { className: "text-gray-200 ", children: data.user.name })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-row w-full mt-4", children: [
      /* @__PURE__ */ jsx("span", { className: "text-gray-200 w-1/4", children: "E-mail" }),
      /* @__PURE__ */ jsx("p", { className: "text-gray-200 text-left", children: data.user.email })
    ] })
  ] }) }) });
}
const loader$1 = async ({ request }) => {
  const middle = await middleware(request);
  if (middle !== null) {
    return middle;
  }
  const queryClient = createQueryClient();
  const options = meQueryOptions(request);
  await queryClient.prefetchQuery(options);
  return Response.json({ dehydratedState: dehydrate(queryClient) });
};
function Profile() {
  return /* @__PURE__ */ jsx(Me, {});
}
const route6 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Profile,
  loader: loader$1
}, Symbol.toStringTag, { value: "Module" }));
async function logout({ Atoken, Rtoken }) {
  const res = await fetch(`http://localhost:8000/api/auth/logout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Cookie: `refresh_token=${Rtoken}`,
      Authorization: `Bearer ${Atoken}`
    }
  });
  const data = await res.json();
  console.log("from api", data.message);
  if (!res.ok) {
    throw new Error(data.message);
  }
  return data;
}
async function action$2({ request }) {
  const middle = await middleware(request);
  if (middle !== null) {
    return middle;
  }
  const getCookie = request.headers.get("Cookie") || "";
  const rToken = await RCookie.parse(getCookie);
  const aToken = await ACookie.parse(getCookie);
  try {
    const response = await logout({ Rtoken: rToken, Atoken: aToken });
    if (!response) throw new Error("Something went wrong");
    const headers = new Headers();
    if (response.status === "success") {
      headers.append("Set-Cookie", await logoutRtoken.serialize(""));
      headers.append("Set-Cookie", await logoutAtoken.serialize(""));
    }
    if (headers.has("Set-Cookie")) {
      return redirect("/", { headers });
    }
    return new Response("You have been logged out. Have a good day!", {
      status: 200
    });
  } catch (e) {
    console.error(e);
    return new Response("An error occurred while logging out.", {
      status: 500
    });
  }
}
const route7 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  action: action$2
}, Symbol.toStringTag, { value: "Module" }));
async function login(email, password) {
  const res = await fetch("http://localhost:8000/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email, password })
  });
  const apiResponse = await res.json();
  const { data } = apiResponse;
  if (!res.ok) {
    throw new Error(apiResponse.message || "Login failed");
  }
  const setCookieHeader = res.headers.get("set-cookie");
  let refreshToken;
  if (setCookieHeader) {
    const match = setCookieHeader.match(/refresh_token=([^;]+)/);
    if (match) {
      refreshToken = match[1];
    }
  }
  return { data, refreshToken };
}
async function action$1({ request }) {
  var _a;
  const formData = Object.fromEntries(await request.formData());
  const { data, errors } = await validationAction({
    formData,
    schema: LoginUserSchema
  });
  if (errors) {
    console.log("Validation errors:", errors);
    return Response.json({ errors }, { status: 400 });
  }
  if (!data) {
    console.log("No data received");
    return Response.json(
      { errors: { general: "Invalid data" } },
      { status: 400 }
    );
  }
  const { email, password } = data;
  try {
    const response = await login(email, password);
    if (!response) return redirect("/auth/login", { status: 400 });
    const headers = new Headers();
    if (response.refreshToken) {
      headers.append(
        "Set-Cookie",
        await RCookie.serialize(response.refreshToken)
      );
    }
    if ((_a = response.data) == null ? void 0 : _a.access_token) {
      headers.append(
        "Set-Cookie",
        await ACookie.serialize(response.data.access_token)
      );
    }
    if (headers.has("Set-Cookie")) {
      return redirect(workspace, { headers });
    }
    return Response.json(response.data);
  } catch (e) {
    if (e instanceof Error) {
      console.log("Error caught:", e.message);
      return Response.json({ errors: { general: e.message } }, { status: 400 });
    }
  }
}
function Login() {
  const actionData = useActionData() || {
    errors: {}
  };
  return /* @__PURE__ */ jsx("div", { className: "min-h-screen flex items-center justify-center", children: /* @__PURE__ */ jsxs("div", { className: "bg-white p-8 rounded shadow-md w-full max-w-md", children: [
    /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold mb-6 text-center text-black", children: "Login" }),
    /* @__PURE__ */ jsx(
      DynamicForm,
      {
        actionData,
        formSchema: formDefinitions["login"],
        method: "POST",
        submitLabel: "Login"
      }
    )
  ] }) });
}
const route8 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  action: action$1,
  default: Login
}, Symbol.toStringTag, { value: "Module" }));
async function createUrl(token, original_url, short_url, category) {
  const res = await fetch(`http://localhost:8000/api/url`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ original_url, short_url, category })
  });
  const apiResponse = await res.json();
  if (!res) {
    throw new Error(apiResponse.message || "Error creating url");
  }
  return apiResponse;
}
async function deleteUrl(token, id) {
  const res = await fetch(`http://localhost:8000/api/url/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  });
  const apiResponse = await res.json();
  if (!res) {
    throw new Error(apiResponse.message || "Error deleteting url");
  }
  return apiResponse;
}
async function urlRecords(token, limit, offset, category) {
  const categoryParam = category ? `&category=${encodeURIComponent(category)}` : "";
  const res = await fetch(
    `http://localhost:8000/api/url?limit=${limit}&offset=${offset}${categoryParam}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    }
  );
  const apiResponse = await res.json();
  if (apiResponse.status === "error") {
    throw new Error(apiResponse.message || "Unknown error occurred");
  }
  return apiResponse;
}
async function updateUrl(token, id, original_url, short_url, category) {
  const res = await fetch(`http://localhost:8000/api/url/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ original_url, short_url, category })
  });
  const apiResponse = await res.json();
  if (!res) {
    throw new Error(apiResponse.message || "Error updating url");
  }
  return apiResponse;
}
async function urlRecord(id, token) {
  const res = await fetch(`http://localhost:8000/api/url/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  });
  const apiResponse = await res.json();
  if (apiResponse.status === "error") {
    throw new Error(apiResponse.message || "Unknown error occurred");
  }
  return apiResponse;
}
const actions = {
  update: async (params, token) => {
    const { id, original_url, short_url, category } = params;
    if (!id)
      throw new Error(
        "Missing required parameter: id, original_url, short_url, category"
      );
    return await updateUrl(token, id, original_url, short_url, category);
  },
  view: async (params, token) => {
    if (params.id) {
      const { id } = params;
      return await urlRecord(id, token);
    } else {
      const limit = params.limit ? parseInt(params.limit.toString()) : 10;
      const offset = params.offset ? parseInt(params.offset.toString()) : 0;
      return await urlRecords(token, limit, offset, params.category);
    }
  },
  delete: async (params, token) => {
    const { id } = params;
    if (!id) throw new Error("Missing required parameter: id");
    return await deleteUrl(token, id);
  },
  create: async (params, token) => {
    const { original_url, short_url, category } = params;
    if (!original_url || !short_url || !category) {
      throw new Error(
        "Missing required parameters: original_url, short_url, category"
      );
    }
    return await createUrl(token, original_url, short_url, category);
  },
  me: async (_, token) => {
    return await me(token);
  }
};
async function handlerProxy(req) {
  const incomingUrl = new URL(req.url);
  const actionParamName = [
    SearchMethodParams.AUTH,
    SearchMethodParams.URL,
    SearchMethodParams.USERS
  ].find((param) => incomingUrl.searchParams.has(param));
  if (!actionParamName) {
    throw new Error(
      "No supported action parameter found. Use 'url', 'auth' or 'users'."
    );
  }
  const action2 = incomingUrl.searchParams.get(actionParamName) ?? "";
  if (!action2 || !actions[action2]) {
    throw new Error(`Invalid or unsupported action: ${action2}`);
  }
  const queryParams = Object.fromEntries(incomingUrl.searchParams.entries());
  const getCookie = req.headers.get("Cookie") || "";
  const token = await ACookie.parse(getCookie);
  const bodyParams = req.method !== "GET" ? await req.json() : {};
  const params = { ...queryParams, ...bodyParams };
  try {
    const result = await actions[action2](
      params,
      token
    );
    if (result.status === "error") {
      throw new Error(result.message || "Backend error occurred");
    }
    return result;
  } catch (error) {
    console.error(`Error in action '${action2}':`, error);
    throw new Error(`Failed to execute action: ${action2}`);
  }
}
const loader = async ({ request }) => {
  try {
    const result = await handlerProxy(request);
    return Response.json(result, { status: 200 });
  } catch (error) {
    console.error(error);
    return Response.json(
      {
        status: "error",
        message: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 400 }
    );
  }
};
const action = async ({ request }) => {
  try {
    const result = await handlerProxy(request);
    return Response.json(result, { status: 200 });
  } catch (error) {
    console.error(error);
    return Response.json(
      {
        status: "error",
        message: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 400 }
    );
  }
};
const route9 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  action,
  loader
}, Symbol.toStringTag, { value: "Module" }));
const meta = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" }
  ];
};
function Index() {
  return /* @__PURE__ */ jsxs("section", { className: "bg-gradient-to-b from-blue-50 to-white py-16 px-6 md:px-12", children: [
    /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto flex flex-col md:flex-row items-center", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex-1 text-center md:text-left md:pr-12", children: [
        /* @__PURE__ */ jsxs("h1", { className: "text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-4", children: [
          "Boost Your Brand ",
          /* @__PURE__ */ jsx("br", { className: "hidden md:block" }),
          "With ",
          /* @__PURE__ */ jsx("span", { className: "text-blue-600", children: "ByteTrim" })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "text-lg md:text-xl text-gray-600 mb-6", children: "Take control of your links with a powerful custom URL shortener that transforms long, messy URLs into sleek, brand-focused links. Start attracting more clicks and tracking your growth with ease." }),
        /* @__PURE__ */ jsx("div", { className: "flex justify-center md:justify-start", children: /* @__PURE__ */ jsx(
          Link,
          {
            to: "/workspace",
            className: "inline-block bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold px-8 py-3 rounded-md shadow-md transition-all",
            children: "Get Started"
          }
        ) })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "flex-1 mt-10 md:mt-0", children: /* @__PURE__ */ jsx(
        "img",
        {
          src: "https://via.placeholder.com/600x400?text=Your+App+Graphic",
          alt: "ByteTrim illustration",
          className: "w-full h-auto mx-auto"
        }
      ) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto mt-16 grid grid-cols-1 md:grid-cols-3 gap-8", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center text-center", children: [
        /* @__PURE__ */ jsx("div", { className: "w-16 h-16 mb-4 bg-blue-100 text-blue-600 flex items-center justify-center rounded-full shadow", children: /* @__PURE__ */ jsx("svg", { className: "w-8 h-8", fill: "currentColor", viewBox: "0 0 20 20", children: /* @__PURE__ */ jsx("path", { d: "M5 8a3 3 0 106 0H5zM2 14.5A1.5 1.5 0 013.5 13h9a1.5 1.5 0 010 3h-9A1.5 1.5 0 012 14.5z" }) }) }),
        /* @__PURE__ */ jsx("h3", { className: "text-xl font-semibold mb-2 text-gray-800", children: "Custom-Branded Links" }),
        /* @__PURE__ */ jsx("p", { className: "text-gray-600", children: "Elevate your online presence with short, personalized URLs that carry your brand’s look and feel." })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center text-center", children: [
        /* @__PURE__ */ jsx("div", { className: "w-16 h-16 mb-4 bg-green-100 text-green-600 flex items-center justify-center rounded-full shadow", children: /* @__PURE__ */ jsx("svg", { className: "w-8 h-8", fill: "currentColor", viewBox: "0 0 20 20", children: /* @__PURE__ */ jsx("path", { d: "M15 10l4.546-4.546a1 1 0 10-1.414-1.414L13.172 8.586A2 2 0 0113 9.414V18h-2v-8.586a2 2 0 01-.586-1.414l-5.46-5.46A1 1 0 003.586 3.04L8.131 7.586A4 4 0 009 9.414V18H7v-8.586a4 4 0 01-1.172-2.828L1.96 3.96a3 3 0 114.243-4.243L10 7.758l3.797-3.797A3 3 0 1118.04 3.96L15 7l.001 3z" }) }) }),
        /* @__PURE__ */ jsx("h3", { className: "text-xl font-semibold mb-2 text-gray-800", children: "Advanced Analytics" }),
        /* @__PURE__ */ jsx("p", { className: "text-gray-600", children: "Track clicks, referrals, and user engagement in real time. Gain insights that help optimize campaigns." })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center text-center", children: [
        /* @__PURE__ */ jsx("div", { className: "w-16 h-16 mb-4 bg-purple-100 text-purple-600 flex items-center justify-center rounded-full shadow", children: /* @__PURE__ */ jsx("svg", { className: "w-8 h-8", fill: "currentColor", viewBox: "0 0 20 20", children: /* @__PURE__ */ jsx("path", { d: "M2 5a2 2 0 012-2h2a2 2 0 012 2H2zm2 0V3h2v2H4zM2 9h8a2 2 0 002-2v-.586a1 1 0 00-.293-.707l-1.414-1.414A1 1 0 0010 4.586V4h2v4a2 2 0 01-2 2H2V9zm16 6v2h-2a2 2 0 00-2 2 2 2 0 00-2-2H6v-2h8a2 2 0 002-2 2 2 0 002 2h2z" }) }) }),
        /* @__PURE__ */ jsx("h3", { className: "text-xl font-semibold mb-2 text-gray-800", children: "Secure & Reliable" }),
        /* @__PURE__ */ jsx("p", { className: "text-gray-600", children: "Experience peace of mind with enterprise-grade security and lightning-fast link redirections." })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto mt-16 flex flex-col items-center", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-3xl md:text-4xl font-bold text-gray-900 mb-4", children: "Ready to Transform Your Links?" }),
      /* @__PURE__ */ jsx("p", { className: "text-gray-600 text-lg max-w-2xl text-center mb-6", children: "Join thousands of businesses and influencers already amplifying their brand with ByteTrim. It’s fast, secure, and designed for growth." }),
      /* @__PURE__ */ jsx(
        Link,
        {
          to: "/",
          className: "bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold px-8 py-3 rounded-md shadow-md transition-all",
          children: "Start Now"
        }
      )
    ] })
  ] });
}
const route10 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Index,
  meta
}, Symbol.toStringTag, { value: "Module" }));
const serverManifest = { "entry": { "module": "/assets/entry.client-B-XFe01k.js", "imports": ["/assets/jsx-runtime-CAOzMBF_.js", "/assets/index-BicWogre.js", "/assets/browser-C6NKqTpo.js", "/assets/components-B9677cET.js"], "css": [] }, "routes": { "root": { "id": "root", "parentId": void 0, "path": "", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/root-BzdAjPzy.js", "imports": ["/assets/jsx-runtime-CAOzMBF_.js", "/assets/index-BicWogre.js", "/assets/browser-C6NKqTpo.js", "/assets/components-B9677cET.js", "/assets/QueryClientProvider-BDE6StR7.js", "/assets/index-VuzOEtzj.js", "/assets/query-CYgPuyg8.js", "/assets/consts-DKFDT57y.js", "/assets/Icons-CwZxN_tX.js"], "css": ["/assets/consts-23pRJOBv.css"] }, "routes/workspace.new_url": { "id": "routes/workspace.new_url", "parentId": "root", "path": "workspace/new_url", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/workspace.new_url-G9rNMjly.js", "imports": ["/assets/jsx-runtime-CAOzMBF_.js", "/assets/QueryClientProvider-BDE6StR7.js", "/assets/Modal-CD0xIWmW.js", "/assets/index-VuzOEtzj.js", "/assets/formDefinitions-BJPzAbrR.js", "/assets/consts-DKFDT57y.js", "/assets/proxyClient-HgQj7PMq.js", "/assets/index-BicWogre.js"], "css": ["/assets/consts-23pRJOBv.css"] }, "routes/workspace._index": { "id": "routes/workspace._index", "parentId": "root", "path": "workspace", "index": true, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/workspace._index-xpGLncoT.js", "imports": ["/assets/jsx-runtime-CAOzMBF_.js", "/assets/queryOptions-BOPsIEkK.js", "/assets/consts-DKFDT57y.js", "/assets/CustomDropDown-BimewSco.js", "/assets/Icons-CwZxN_tX.js", "/assets/components-B9677cET.js", "/assets/index-BicWogre.js", "/assets/QueryClientProvider-BDE6StR7.js", "/assets/query-CYgPuyg8.js", "/assets/proxyClient-HgQj7PMq.js"], "css": ["/assets/consts-23pRJOBv.css"] }, "routes/auth.register": { "id": "routes/auth.register", "parentId": "root", "path": "auth/register", "index": void 0, "caseSensitive": void 0, "hasAction": true, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/auth.register-D0BbcHCt.js", "imports": ["/assets/jsx-runtime-CAOzMBF_.js", "/assets/formDefinitions-BJPzAbrR.js", "/assets/DynamicForm-DhFB9_uU.js", "/assets/components-B9677cET.js", "/assets/index-BicWogre.js"], "css": [] }, "routes/workspace.$id": { "id": "routes/workspace.$id", "parentId": "root", "path": "workspace/:id", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/workspace._id-D6NuaD3s.js", "imports": ["/assets/jsx-runtime-CAOzMBF_.js", "/assets/queryOptions-BOPsIEkK.js", "/assets/Modal-CD0xIWmW.js", "/assets/Icons-CwZxN_tX.js", "/assets/CustomDropDown-BimewSco.js", "/assets/QueryClientProvider-BDE6StR7.js", "/assets/index-VuzOEtzj.js", "/assets/formDefinitions-BJPzAbrR.js", "/assets/proxyClient-HgQj7PMq.js", "/assets/consts-DKFDT57y.js", "/assets/index-BicWogre.js", "/assets/query-CYgPuyg8.js"], "css": ["/assets/consts-23pRJOBv.css"] }, "routes/auth.refresh": { "id": "routes/auth.refresh", "parentId": "root", "path": "auth/refresh", "index": void 0, "caseSensitive": void 0, "hasAction": true, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/auth.refresh-DmnV9x5g.js", "imports": ["/assets/jsx-runtime-CAOzMBF_.js", "/assets/components-B9677cET.js", "/assets/index-BicWogre.js"], "css": [] }, "routes/workspace.me": { "id": "routes/workspace.me", "parentId": "root", "path": "workspace/me", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/workspace.me-B9OqILLC.js", "imports": ["/assets/jsx-runtime-CAOzMBF_.js", "/assets/queryOptions-BOPsIEkK.js", "/assets/QueryClientProvider-BDE6StR7.js", "/assets/query-CYgPuyg8.js", "/assets/proxyClient-HgQj7PMq.js"], "css": [] }, "routes/auth.logout": { "id": "routes/auth.logout", "parentId": "root", "path": "auth/logout", "index": void 0, "caseSensitive": void 0, "hasAction": true, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/auth.logout-l0sNRNKZ.js", "imports": [], "css": [] }, "routes/auth.login": { "id": "routes/auth.login", "parentId": "root", "path": "auth/login", "index": void 0, "caseSensitive": void 0, "hasAction": true, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/auth.login-CNBlzZP9.js", "imports": ["/assets/jsx-runtime-CAOzMBF_.js", "/assets/formDefinitions-BJPzAbrR.js", "/assets/DynamicForm-DhFB9_uU.js", "/assets/components-B9677cET.js", "/assets/index-BicWogre.js"], "css": [] }, "routes/api.proxy": { "id": "routes/api.proxy", "parentId": "root", "path": "api/proxy", "index": void 0, "caseSensitive": void 0, "hasAction": true, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/api.proxy-l0sNRNKZ.js", "imports": [], "css": [] }, "routes/_index": { "id": "routes/_index", "parentId": "root", "path": void 0, "index": true, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/_index-DztH6WEQ.js", "imports": ["/assets/jsx-runtime-CAOzMBF_.js", "/assets/components-B9677cET.js", "/assets/index-BicWogre.js"], "css": [] } }, "url": "/assets/manifest-c930a87e.js", "version": "c930a87e" };
const mode = "production";
const assetsBuildDirectory = "build/client";
const basename = "/";
const future = { "v3_fetcherPersist": true, "v3_relativeSplatPath": true, "v3_throwAbortReason": true, "v3_routeConfig": false, "v3_singleFetch": true, "v3_lazyRouteDiscovery": true, "unstable_optimizeDeps": false };
const isSpaMode = false;
const publicPath = "/";
const entry = { module: entryServer };
const routes = {
  "root": {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: route0
  },
  "routes/workspace.new_url": {
    id: "routes/workspace.new_url",
    parentId: "root",
    path: "workspace/new_url",
    index: void 0,
    caseSensitive: void 0,
    module: route1
  },
  "routes/workspace._index": {
    id: "routes/workspace._index",
    parentId: "root",
    path: "workspace",
    index: true,
    caseSensitive: void 0,
    module: route2
  },
  "routes/auth.register": {
    id: "routes/auth.register",
    parentId: "root",
    path: "auth/register",
    index: void 0,
    caseSensitive: void 0,
    module: route3
  },
  "routes/workspace.$id": {
    id: "routes/workspace.$id",
    parentId: "root",
    path: "workspace/:id",
    index: void 0,
    caseSensitive: void 0,
    module: route4
  },
  "routes/auth.refresh": {
    id: "routes/auth.refresh",
    parentId: "root",
    path: "auth/refresh",
    index: void 0,
    caseSensitive: void 0,
    module: route5
  },
  "routes/workspace.me": {
    id: "routes/workspace.me",
    parentId: "root",
    path: "workspace/me",
    index: void 0,
    caseSensitive: void 0,
    module: route6
  },
  "routes/auth.logout": {
    id: "routes/auth.logout",
    parentId: "root",
    path: "auth/logout",
    index: void 0,
    caseSensitive: void 0,
    module: route7
  },
  "routes/auth.login": {
    id: "routes/auth.login",
    parentId: "root",
    path: "auth/login",
    index: void 0,
    caseSensitive: void 0,
    module: route8
  },
  "routes/api.proxy": {
    id: "routes/api.proxy",
    parentId: "root",
    path: "api/proxy",
    index: void 0,
    caseSensitive: void 0,
    module: route9
  },
  "routes/_index": {
    id: "routes/_index",
    parentId: "root",
    path: void 0,
    index: true,
    caseSensitive: void 0,
    module: route10
  }
};
export {
  serverManifest as assets,
  assetsBuildDirectory,
  basename,
  entry,
  future,
  isSpaMode,
  mode,
  publicPath,
  routes
};
