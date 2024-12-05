import "../../styles/global.css";

import { Link } from "@remix-run/react";

interface Props {
  short_url: string;
  id: string;
  slug: string;
}

export default function UrlCard({ short_url, id, slug }: Props) {
  const redirection = `http://localhost:8000/api/url/redirect/${slug}`;

  const handleRedirect = () => {
    //useUpdateViewsAndRedirect(redirection, props.id).mutate();
    window.open(`${redirection}`, "_blank");
  };
  return (
    <div
      id="card"
      className="bg-yellow-box max-w-sm p-6 border rounded-lg shadow flex items-center space-x-4 flex-col w-full"
    >
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
          view more...
        </Link>

        <Link
          to={{
            pathname: `/workspace/${id}`,
            search: "?modal=qr",
          }}
          className="btn-grad"
        >
          qr...
        </Link>
      </div>
    </div>
  );
}
