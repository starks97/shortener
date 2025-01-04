import "../../styles/global.css";

import { Link } from "@remix-run/react";

import { UrlCardPropsTypes } from "@interfaces";
import ToolTip from "../ToolTip";
import { LinkIcon, QRIcon, ViewMore } from "../Icons";
import { modalNavigateActions } from "~/consts";

export default function UrlCard({ short_url, id, slug }: UrlCardPropsTypes) {
  const redirection = `http://shortener.ambitious-idelle.internal:8000/api/url/redirect/${slug}`;

  const handleRedirect = () => {
    window.open(`${redirection}`, "_blank");
  };
  return (
    <div className="max-w-sm p-6 border-y border-orange-400 rounded-2xl flex items-center space-x-4 flex-col w-full h-auto">
      <div className="inline-flex font-medium items-center gap-2">
        <button
          onClick={() => handleRedirect()}
          className={`w-full text-white py-2 px-5 rounded-xl transition flex items-center justify-center bg-transparent border-2 border-orange-500 hover:bg-orange-400 hover:text-black focus:outline-none focus:ring-2 focus:ring-blue-300 }`}
          aria-label="Shorten URL"
        >
          <LinkIcon />
          {short_url}
        </button>
      </div>
      <div className="mt-5 w-full flex items-center justify-between">
        <Link to={modalNavigateActions["view"](id)} className="btn-grad">
          <ToolTip label="info">
            <ViewMore />
          </ToolTip>
        </Link>

        <Link to={modalNavigateActions["qr"](id)} className="btn-grad">
          <ToolTip label="qr code">
            <QRIcon />
          </ToolTip>
        </Link>
      </div>
    </div>
  );
}
