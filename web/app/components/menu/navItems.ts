type NavItem = {
  label: string;
  link: string;
};

export function baseNavItems(): NavItem[] {
  return [
    { label: "Home", link: "/" },
    { label: "Workspace", link: "/workspace" },
  ];
}
