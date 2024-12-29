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
  if (typeof link === "string") {
    if (link === "/workspace/new_url") {
      return { pathname: "/workspace/new_url", search: "?modal=create" };
    }
    return { pathname: link, search: "" };
  }

  return {
    pathname: link.pathname,
    search: link.search ?? "",
  };
}

export function baseNavItems(): NavItem[] {
  return [
    { label: "Home", link: "/" },
    { label: "Workspace", link: navigateWorkSpace },
  ];
}
