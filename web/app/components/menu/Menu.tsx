import { useState, useEffect, useRef } from "react";
import { Link } from "@remix-run/react";
import CustomMenuBtn from "./CustomMenuBtn";
import { ByteTrimLogo, HambugerMenuIcon } from "../Icons";

export default function Menu({
  isLoggedIn,
  canRefresh,
}: {
  isLoggedIn: boolean;
  canRefresh: boolean;
}) {
  const [menuOpen, setMenuOpen] = useState(false);

  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="bg-transparent border-b border-gray-200 px-5 py-3 mb-5">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
        {/* Logo or site title */}
        <div className="flex-shrink-0 group-hover:text-white">
          <Link
            to="/"
            className="text-xl font-bold text-orange-400 flex items-center "
          >
            <ByteTrimLogo />
            ByteTrim
          </Link>
        </div>

        {/* Hamburger button */}
        <div className="flex lg:hidden">
          <button
            type="button"
            className="text-white hover:text-gray-300 focus:outline-none"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            {menuOpen ? (
              // Close (X) Icon
              <span>X</span>
            ) : (
              // Hamburger Icon
              <HambugerMenuIcon />
            )}
          </button>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden lg:flex lg:space-x-8 items-center">
          <CustomMenuBtn isLoggedIn={isLoggedIn} canRefresh={canRefresh} />
        </ul>
      </div>

      {/* Mobile/Tablet Menu*/}
      {menuOpen && (
        <div className="lg:hidden border-t border-gray-200" ref={menuRef}>
          <ul className="flex flex-col space-y-1 py-2 px-4">
            <CustomMenuBtn isLoggedIn={isLoggedIn} canRefresh={canRefresh} />
          </ul>
        </div>
      )}
    </nav>
  );
}
