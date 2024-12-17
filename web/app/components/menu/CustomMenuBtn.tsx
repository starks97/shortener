import { Link, useLocation } from "@remix-run/react";
import { baseNavItems } from "./navItems";

export default function CustomMenuBtn({
  isLoggedIn,
  handleLogout,
  canRefresh,
}: {
  isLoggedIn: boolean;
  handleLogout: () => void;
  canRefresh: boolean;
}) {
  const location = useLocation();
  const currentPath = location.pathname;

  const items = baseNavItems();

  if ((isLoggedIn || canRefresh) && currentPath.startsWith("/workspace")) {
    items.push({ label: "Profile", link: "/workspace/me" });
    items.push({ label: "New Url", link: "/workspace/new_url" });
  }

  if (!isLoggedIn && !canRefresh && currentPath === "/") {
    items.splice(1, 1, { label: "Login", link: "/auth/login" });
  }

  const sortedItems = items.sort((a, b) =>
    a.label.toLowerCase().localeCompare(b.label.toLowerCase())
  );

  return (
    <>
      {sortedItems.map(({ label, link }) => (
        <li key={label}>
          {label.toLowerCase() === "workspace" &&
          currentPath === "/workspace" ? (
            <button onClick={handleLogout} className="menu_btn__a">
              Logout
            </button>
          ) : label.toLowerCase() === "login" ||
            label.toLowerCase() === "workspace" ? (
            <Link
              to={{
                pathname:
                  link === "/workspace/new_url" ? "/workspace/new_url" : link,
                search: link === "/workspace/new_url" ? "?modal=create" : "",
              }}
            >
              <button className="menu_btn__a">{label}</button>
            </Link>
          ) : (
            <Link
              to={{
                pathname:
                  link === "/workspace/new_url" ? "/workspace/new_url" : link,
                search: link === "/workspace/new_url" ? "?modal=create" : "",
              }}
              className="text-white hover:text-orange-600 font-medium py-2 px-3 transition duration-200"
            >
              {label}
            </Link>
          )}
        </li>
      ))}
    </>
  );
}
