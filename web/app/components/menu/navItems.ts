type NavItem = {
  label: string;
  link: string;
};

export const navItems: (isLoggedIn: boolean) => NavItem[] = (
  isLoggedIn: boolean
) => {
  return isLoggedIn
    ? [
        { label: "Home", link: "/" },
        { label: "Workspace", link: "/workspace" },
      ]
    : [
        { label: "Home", link: "/" },
        { label: "Login", link: "/auth/login" },
      ];
};
