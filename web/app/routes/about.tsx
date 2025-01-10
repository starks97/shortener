import Footer from "~/components/Footer";
import { Link, useLoaderData } from "@remix-run/react";

export default function About() {
  return (
    <>
      <section className="about-page bg-transparent py-12 px-6">
        {/* Introduction Section */}
        <div className="intro max-w-4xl mx-auto text-center mb-12">
          <h1 className="text-4xl font-bold text-orange-600 mb-4">
            Why I Created This App
          </h1>
          <p className="text-lg text-gray-300">
            As a programmer, I often found myself juggling multiple tabs in my
            browser. Whether it was for research, debugging, or managing tasks,
            my browser became cluttered, consuming excessive memory and slowing
            down my system.
            <br />
            This app was born out of the need to keep my tabs organized without
            the browser draining resources. With this app, I can store and
            manage my URLs efficiently, assign custom names for better
            organization, and share them seamlessly with my friends and
            customers.
          </p>
        </div>

        <div className="ux-focus bg-gradient-to-br from-orange-400 to-cyan-950 p-6 rounded-lg shadow-md mb-12 max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-semibold text-white mb-4">
            A User Experience for Everyone
          </h2>
          <p className="text-gray-300">
            ByteTrim is built with simplicity and accessibility in mind. Its
            intuitive interface ensures that anyone, regardless of technical
            expertise, can manage tabs, name URLs, and share them with ease.
          </p>
        </div>

        {/* Comparison Section */}
        <div className="comparison max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
          {/* Advantages */}
          <div className="advantages bg-white shadow-md p-6 rounded-lg border-l-4 border-green-400">
            <h2 className="text-2xl font-semibold text-green-600 mb-4">
              Advantages
            </h2>
            <ul className="list-disc list-inside text-black space-y-2">
              <li>Reduces browser memory and resource consumption.</li>
              <li>Keeps tabs organized in one convenient place.</li>
              <li>
                Allows you to set custom names for URLs for better
                identification.
              </li>
              <li>Enables sharing URLs easily with friends and customers.</li>
              <li>Helps you focus on programming without tab clutter.</li>
            </ul>
          </div>

          {/* Disadvantages */}
          <div className="disadvantages bg-white shadow-md p-6 rounded-lg border-l-4 border-red-400">
            <h2 className="text-2xl font-semibold text-red-600 mb-4">
              Disadvantages
            </h2>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Requires an internet connection to access the app.</li>
              <li>
                Dependency on the app for managing tabs may be inconvenient for
                some.
              </li>
              <li>Not suitable for offline-only workflows.</li>
              <li>
                Initial setup and customization might take time for new users.
              </li>
              <li>
                Learning curve for users unfamiliar with URL management tools.
              </li>
            </ul>
          </div>
        </div>

        {/* Closing Section */}
        <div className="closing max-w-4xl mx-auto text-center mt-12 flex flex-col space-y-10">
          <h2 className="text-3xl md:text-4xl font-bold text-orange-700 mb-4">
            Ready to Transform Your Links?
          </h2>
          <p className="text-lg text-gray-300">
            This app is a simple yet effective tool for programmers and
            professionals who value organization, efficiency, and sharing. Give
            it a try and transform the way you manage your online resources!
          </p>
          <Link to={"/auth/register"}>
            <button className="about_btn__a ">Start Now</button>
          </Link>
        </div>
      </section>
      <Footer />
    </>
  );
}
