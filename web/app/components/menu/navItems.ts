import { navigateWorkSpace } from "~/consts";

type NavItemLink =
  | string
  | {
      pathname: string;
      search?: string;
    };

type NavItem = {
  label: string;
  link: NavItemLink;
};

export function parseNavLink(link: NavItemLink): {
  pathname: string;
  search: string;
} {
  // If `link` is a string
  if (typeof link === "string") {
    if (link === "/workspace/new_url") {
      return { pathname: "/workspace/new_url", search: "?modal=create" };
    }
    // Otherwise just treat it as a normal path
    return { pathname: link, search: "" };
  }

  // If `link` is an object with { pathname, search? }
  return {
    pathname: link.pathname,
    search: link.search ?? "", // default to empty if undefined
  };
}

export function baseNavItems(): NavItem[] {
  return [
    { label: "Home", link: "/" },
    { label: "Workspace", link: navigateWorkSpace },
  ];
}
