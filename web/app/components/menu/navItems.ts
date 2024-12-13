type NavItem = {
  label: string;
  link: string;
};

export const navItems: (
  isLoggedIn: boolean,
  canRefresh: boolean
) => NavItem[] = (isLoggedIn: boolean, canRefresh: boolean) => {
  return !isLoggedIn && !canRefresh
    ? [
        { label: "Home", link: "/" },
        { label: "Login", link: "/auth/login" },
      ]
    : [
        { label: "Home", link: "/" },
        { label: "Workspace", link: "/workspace" },
      ];
};
