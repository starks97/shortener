import { Link, useLocation } from "@remix-run/react";
import { baseNavItems } from "./navItems";

/**
 * Renders a dynamic navigation menu based on user authentication status and current route.
 *
 * The `CustomMenuBtn` component generates navigation items by evaluating:
 * - `isLoggedIn`: Whether the user is authenticated.
 * - `canRefresh`: Whether to include refresh-related options.
 * - `currentPath`: The current URL path.
 *
 * Depending on these props, it conditionally displays links like "Profile," "New Url," "Login," or a "Logout" button.
 *
 * @param props - Properties for the CustomMenuBtn component.
 * @param props.isLoggedIn - Indicates if the user is authenticated.
 * @param props.handleLogout - Function to handle user logout.
 * @param props.canRefresh - Determines if refresh options should be available.
 *
 * @returns A list of navigation items tailored to the user's state and current location.
 *
 * @example
 * ```tsx
 * <CustomMenuBtn
 *   isLoggedIn={true}
 *   handleLogout={handleLogoutFunction}
 *   canRefresh={true}
 * />
 * ```
 */

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
