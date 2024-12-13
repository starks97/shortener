import { Link, useLocation } from "@remix-run/react";
import { navItems } from "./navItems";

export default function CustomMenuBtn({
  isLoggedIn,
  handleLogout,
}: {
  isLoggedIn: boolean;
  handleLogout: () => void;
}) {
  const location = useLocation();
  const currentPath = location.pathname;
  return (
    <>
      {navItems(isLoggedIn).map(({ label, link }) => (
        <li key={label}>
          {label.toLowerCase() === "workspace" &&
          currentPath === "/workspace" ? (
            // Render "Logout" button instead of "Workspace" when on /workspace
            <button onClick={handleLogout} className="menu_btn__a ">
              Logout
            </button>
          ) : label.toLowerCase() === "login" ||
            label.toLowerCase() === "workspace" ? (
            <Link to={link}>
              <button className="menu_btn__a">{label}</button>
            </Link>
          ) : (
            <Link
              to={link}
              className={`text-white hover:text-orange-600 font-medium py-2 px-3 transition duration-200 `}
            >
              {label}
            </Link>
          )}
        </li>
      ))}
    </>
  );
}
