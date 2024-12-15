import "../../styles/global.css";

import { Link } from "@remix-run/react";

import { UrlCardPropsTypes } from "@interfaces";

export default function UrlCard({ short_url, id, slug }: UrlCardPropsTypes) {
  const redirection = `http://localhost:8000/api/url/redirect/${slug}`;

  const handleRedirect = () => {
    window.open(`${redirection}`, "_blank");
  };
  return (
    <div className="max-w-sm p-6 border-y rounded-2xl flex items-center space-x-4 flex-col w-full h-auto">
      <div className="inline-flex font-medium items-center gap-2">
        <button onClick={() => handleRedirect()} className="text-white text-lg">
          {short_url}
        </button>
      </div>
      <div className="mt-5 w-full flex items-center justify-between">
        <Link
          to={{
            pathname: `/workspace/${id}`,
            search: "?modal=view",
          }}
          className="btn-grad"
        >
          view info..
        </Link>

        <Link
          to={{
            pathname: `/workspace/${id}`,
            search: "?modal=qr",
          }}
          className="btn-grad"
        >
          QR...
        </Link>
      </div>
    </div>
  );
}
