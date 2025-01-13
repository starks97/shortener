import "../../styles/global.css";

import { Link } from "@remix-run/react";

import { UrlCardPropsTypes } from "@interfaces";
import ToolTip from "../ToolTip";
import { LinkIcon, QRIcon, ViewMore } from "../Icons";
import { modalNavigateActions } from "~/consts";

import { urlRedirection } from "~/utils/proxyClient";

export default function UrlCard({ short_url, id, slug }: UrlCardPropsTypes) {
  const handleRedirect = async (slug: string) => {
    try {
      const redirection = await urlRedirection(slug);

      setTimeout(() => {
        window.open(`${redirection.data?.original_url}`, "_blank");
      });
    } catch (error) {
      console.error("Error occurred during redirection:", error);
    }
  };
  return (
    <div className="max-w-sm p-6 border-y border-orange-400 rounded-2xl flex items-center space-x-4 flex-col w-full h-auto">
      <div className="inline-flex font-medium items-center gap-2">
        <button
          onClick={() => handleRedirect(slug)}
          className="general_btn__a"
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
