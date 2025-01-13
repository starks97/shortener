import type { MetaFunction, ActionFunctionArgs } from "@remix-run/node";

import { Link, useLoaderData } from "@remix-run/react";
import Footer from "~/components/Footer";
import Services from "~/components/home/Services";
import { navigateWorkSpace } from "~/consts";
import { RCookie } from "~/cookies.server";
import getMetaTags from "~/utils/metaTags";

export const loader = async ({ request }: ActionFunctionArgs) => {
  const getCookie = request.headers.get("Cookie") || "";

  const rCookie = await RCookie.serialize(getCookie);

  try {
    if (rCookie) {
      return Response.json({ isLoggedIn: true });
    }

    return Response.json({ isLoggedIn: false });
  } catch (e) {
    console.log(e);
    if (e instanceof Error) {
      return Response.json({ status: "error", message: e.message });
    }
  }
};

export const meta: MetaFunction = () => getMetaTags("home");

export default function Index() {
  const { isLoggedIn } = useLoaderData<typeof loader>();
  return (
    <>
      <section className="py-16 px-6 md:px-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center">
          {/* Left Section: Headline & CTA */}
          <div className="flex-1 text-center md:text-left md:pr-12">
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-200 leading-tight mb-4">
              Boost Your Brand <br className="hidden md:block" />
              With <span className="text-orange-500">ByteTrim</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 mb-6">
              Take control of your links with a powerful custom URL shortener
              that transforms long, messy URLs into sleek, brand-focused links.
              Start attracting more clicks and tracking your growth with ease.
            </p>
            <div className="flex justify-center md:justify-start">
              <Link
                to={{
                  pathname: isLoggedIn
                    ? navigateWorkSpace.pathname
                    : "/auth/login",
                  search: isLoggedIn ? navigateWorkSpace.search : "",
                }}
              >
                <button className="home_btn__a">Get Starter</button>
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
        <Services />

        {/* CTA Section */}
        <div className="max-w-7xl mx-auto mt-16 flex flex-col items-center">
          <h2 className="text-3xl md:text-4xl font-bold text-orange-700 mb-4">
            Ready to Transform Your Links?
          </h2>
          <p className="text-gray-300 text-lg max-w-2xl text-center mb-6">
            Join thousands of businesses and influencers already amplifying
            their brand with ByteTrim. It’s fast, secure, and designed for
            growth.
          </p>
          <Link to={"/auth/register"}>
            <button className="home_btn__a m">Start Now</button>
          </Link>
        </div>
      </section>
      <Footer />
    </>
  );
}
