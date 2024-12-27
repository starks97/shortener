import type { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return (
    <section className="bg-gradient-to-b from-blue-50 to-white py-16 px-6 md:px-12">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center">
        {/* Left Section: Headline & CTA */}
        <div className="flex-1 text-center md:text-left md:pr-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-4">
            Boost Your Brand <br className="hidden md:block" />
            With <span className="text-blue-600">ByteTrim</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-6">
            Take control of your links with a powerful custom URL shortener that
            transforms long, messy URLs into sleek, brand-focused links. Start
            attracting more clicks and tracking your growth with ease.
          </p>
          <div className="flex justify-center md:justify-start">
            <Link
              to={"/workspace"}
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold px-8 py-3 rounded-md shadow-md transition-all"
            >
              Get Started
            </Link>
          </div>
        </div>

        {/* Right Section: Illustration/Graphics */}
        <div className="flex-1 mt-10 md:mt-0">
          <img
            src="https://via.placeholder.com/600x400?text=Your+App+Graphic"
            alt="ByteTrim illustration"
            className="w-full h-auto mx-auto"
          />
        </div>
      </div>

      {/* Feature Highlights */}
      <div className="max-w-7xl mx-auto mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="flex flex-col items-center text-center">
          <div className="w-16 h-16 mb-4 bg-blue-100 text-blue-600 flex items-center justify-center rounded-full shadow">
            {/* Replace with your icon */}
            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
              <path d="M5 8a3 3 0 106 0H5zM2 14.5A1.5 1.5 0 013.5 13h9a1.5 1.5 0 010 3h-9A1.5 1.5 0 012 14.5z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold mb-2 text-gray-800">
            Custom-Branded Links
          </h3>
          <p className="text-gray-600">
            Elevate your online presence with short, personalized URLs that
            carry your brand’s look and feel.
          </p>
        </div>

        <div className="flex flex-col items-center text-center">
          <div className="w-16 h-16 mb-4 bg-green-100 text-green-600 flex items-center justify-center rounded-full shadow">
            {/* Replace with your icon */}
            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
              <path d="M15 10l4.546-4.546a1 1 0 10-1.414-1.414L13.172 8.586A2 2 0 0113 9.414V18h-2v-8.586a2 2 0 01-.586-1.414l-5.46-5.46A1 1 0 003.586 3.04L8.131 7.586A4 4 0 009 9.414V18H7v-8.586a4 4 0 01-1.172-2.828L1.96 3.96a3 3 0 114.243-4.243L10 7.758l3.797-3.797A3 3 0 1118.04 3.96L15 7l.001 3z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold mb-2 text-gray-800">
            Advanced Analytics
          </h3>
          <p className="text-gray-600">
            Track clicks, referrals, and user engagement in real time. Gain
            insights that help optimize campaigns.
          </p>
        </div>

        <div className="flex flex-col items-center text-center">
          <div className="w-16 h-16 mb-4 bg-purple-100 text-purple-600 flex items-center justify-center rounded-full shadow">
            {/* Replace with your icon */}
            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2 5a2 2 0 012-2h2a2 2 0 012 2H2zm2 0V3h2v2H4zM2 9h8a2 2 0 002-2v-.586a1 1 0 00-.293-.707l-1.414-1.414A1 1 0 0010 4.586V4h2v4a2 2 0 01-2 2H2V9zm16 6v2h-2a2 2 0 00-2 2 2 2 0 00-2-2H6v-2h8a2 2 0 002-2 2 2 0 002 2h2z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold mb-2 text-gray-800">
            Secure & Reliable
          </h3>
          <p className="text-gray-600">
            Experience peace of mind with enterprise-grade security and
            lightning-fast link redirections.
          </p>
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-7xl mx-auto mt-16 flex flex-col items-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Ready to Transform Your Links?
        </h2>
        <p className="text-gray-600 text-lg max-w-2xl text-center mb-6">
          Join thousands of businesses and influencers already amplifying their
          brand with ByteTrim. It’s fast, secure, and designed for growth.
        </p>
        <Link
          to={"/"}
          className="bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold px-8 py-3 rounded-md shadow-md transition-all"
        >
          Start Now
        </Link>
      </div>
    </section>
  );
}
