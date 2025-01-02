import { Link, useLocation } from "@remix-run/react";
import { baseNavItems, parseNavLink } from "./navItems";

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
  canRefresh,
}: {
  isLoggedIn: boolean;
  canRefresh: boolean;
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

  const sortedItems = items.sort((a, b) =>
    a.label.toLowerCase().localeCompare(b.label.toLowerCase())
  );

  return (
    <>
      {sortedItems.map(({ label, link }) => {
        const { pathname, search } = parseNavLink(link);
        return (
          <li key={label}>
            {label.toLowerCase() === "workspace" &&
            currentPath === "/workspace" ? (
              <form method="post" action="/auth/logout">
                <button className="menu_btn__a">Logout</button>
              </form>
            ) : label.toLowerCase() === "login" ||
              label.toLowerCase() === "workspace" ? (
              <Link
                to={{
                  pathname,
                  search,
                }}
              >
                <button className="menu_btn__a">{label}</button>
              </Link>
            ) : (
              <Link
                to={{
                  pathname,
                  search,
                }}
                className="text-white hover:text-orange-600 font-medium py-2 px-3 transition duration-200"
              >
                {label}
              </Link>
            )}
          </li>
        );
      })}
    </>
  );
}
