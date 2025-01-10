import { ByteTrimLogo } from "./Icons";

export default function Footer() {
  return (
    <footer className="footer bg-transparent py-8">
      <div className="footer-content max-w-6xl mx-auto px-4 grid gap-8 md:grid-cols-3 i text-center h-full">
        {/* Left Section: Logo and Slogan */}
        <div className="footer-logo flex flex-col items-center  justify-end h-full">
          <ByteTrimLogo />
          <p className="text-orange-500 text-3xl">ByteTrim</p>
        </div>

        {/* Middle Section: Quick Links */}
        <div className="footer-links flex flex-col items-center justify-center">
          <h3 className="text-xl font-semibold mb-4 text-orange-600 border-b border-orange-300">
            Quick Links
          </h3>
          <nav className="flex flex-col gap-2">
            <a
              href="/about"
              className="hover:text-orange-600 transition-colors duration-200 text-gray-300 text-lg"
            >
              About
            </a>
            <a
              href="/pricing"
              className="hover:text-orange-600 transition-colors duration-200 text-gray-300 text-lg"
            >
              Pricing
            </a>
          </nav>
        </div>

        {/* Right Section: Social Media */}
        <div className="footer-social flex flex-col items-center gap-10">
          <h3 className="text-xl font-semibold text-orange-600 border-b border-orange-300 flex ">
            Social Media
          </h3>
          <div className="flex gap-4">
            <a
              href="https://twitter.com/byteTrim"
              aria-label="Twitter"
              className="hover:text-orange-600 transition-colors duration-200"
            >
              <svg
                className="social-icon w-6 h-6"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M22.46 6c-.77.35-1.61.59-2.49.7a4.33 4.33 0 0 0 1.89-2.4 8.66 8.66 0 0 1-2.73 1.05 4.31 4.31 0 0 0-7.35 3.93A12.25 12.25 0 0 1 3 4.85a4.31 4.31 0 0 0 1.34 5.75 4.3 4.3 0 0 1-1.96-.54v.05a4.31 4.31 0 0 0 3.45 4.23 4.3 4.3 0 0 1-1.95.07 4.32 4.32 0 0 0 4.02 2.98 8.68 8.68 0 0 1-5.38 1.85A8.71 8.71 0 0 1 2 19.54a12.2 12.2 0 0 0 6.6 1.94c7.92 0 12.25-6.56 12.25-12.25v-.56A8.63 8.63 0 0 0 24 5.5a8.52 8.52 0 0 1-2.54.7z"></path>
              </svg>
            </a>
            <a
              href="https://facebook.com/byteTrim"
              aria-label="Facebook"
              className="hover:text-orange-600 transition-colors duration-200"
            >
              <svg
                className="social-icon w-6 h-6"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M18 2h-3a6 6 0 0 0-6 6v3H6v4h3v8h4v-8h3l1-4h-4V8a2 2 0 0 1 2-2h2z"></path>
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Section: Copyright */}
      <div className="footer-bottom mt-8 text-center text-orange-400 text-sm">
        © 2025 ByteTrim. All rights reserved.
      </div>
    </footer>
  );
}
