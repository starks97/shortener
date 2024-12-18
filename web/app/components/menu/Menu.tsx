import { useState } from "react";
import { Link, useNavigate } from "@remix-run/react";
import CustomMenuBtn from "./CustomMenuBtn";

export default function Menu({
  isLoggedIn,
  canRefresh,
}: {
  isLoggedIn: boolean;
  canRefresh: boolean;
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    console.log("User logged out");
    navigate("/");
  };

  return (
    <nav className="bg-transparent border-b border-gray-200 px-5 py-3 mb-5">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
        {/* Logo or site title */}
        <div className="flex-shrink-0">
          <Link to="/" className="text-xl font-bold text-white">
            MyApp
          </Link>
        </div>

        {/* Hamburger button */}
        <div className="flex md:hidden">
          <button
            type="button"
            className="text-white hover:text-gray-300 focus:outline-none"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
              {menuOpen ? (
                // Close (X) Icon
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M6 18L18 6M6 6l12 12"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              ) : (
                // Hamburger Icon
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M4 6h16M4 12h16M4 18h16"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex md:space-x-8 items-center">
          <CustomMenuBtn
            handleLogout={handleLogout}
            isLoggedIn={isLoggedIn}
            canRefresh={canRefresh}
          />
        </ul>
      </div>

      {/* Mobile/Tablet Menu*/}
      {menuOpen && (
        <div className="md:hidden border-t border-gray-200">
          <ul className="flex flex-col space-y-1 py-2 px-4">
            <CustomMenuBtn
              handleLogout={handleLogout}
              isLoggedIn={isLoggedIn}
              canRefresh={canRefresh}
            />
          </ul>
        </div>
      )}
    </nav>
  );
}
