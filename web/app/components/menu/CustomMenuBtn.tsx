import { useMemo } from "react";
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

  const items = useMemo(() => {
    const baseItems = baseNavItems();

    const publicRoutes = ["/", "/auth/login", "/auth/register"];

    if ((isLoggedIn || canRefresh) && currentPath.startsWith("/workspace")) {
      baseItems.push({ label: "Profile", link: "/workspace/me" });
      baseItems.push({ label: "New Url", link: "/workspace/new_url" });
    }

    if (!isLoggedIn && !canRefresh && publicRoutes.includes(currentPath)) {
      baseItems[1] = { label: "Login", link: "/auth/login" };
    }

    return baseItems.sort((a, b) =>
      a.label.toLowerCase().localeCompare(b.label.toLowerCase())
    );
  }, [isLoggedIn, canRefresh, currentPath]);

  return (
    <>
      {items.map(({ label, link }) => {
        const { pathname, search } = parseNavLink(link);
        return (
          <li
            key={label}
            className="flex flex-col space-y-10 md:space-y-0 items-center md:items-start"
          >
            {label.toLowerCase() === "workspace" &&
            currentPath === "/workspace" ? (
              <form method="post" action="/auth/logout">
                <button className="general_btn__a">Logout</button>
              </form>
            ) : label.toLowerCase() === "login" ||
              label.toLowerCase() === "workspace" ? (
              <Link
                to={{
                  pathname,
                  search,
                }}
              >
                <button className="general_btn__a">{label}</button>
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
