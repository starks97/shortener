import { LoaderFunctionArgs, redirect } from "@remix-run/node";
import { urlRedirection } from "~/utils/proxyClient";

export const loader = async ({ params, request }: LoaderFunctionArgs) => {
  try {
    const response = await urlRedirection(params.slug!, request);

    if (response.status === "error") {
      throw new Error(response.message);
    }

    if (!response.data) {
      throw new Error("something happend");
    }

    return redirect(response.data.original_url);
  } catch (error) {
    console.error("Error during redirection:", error);
    throw new Error("Failed to redirect");
  }
};

export default function QrRedirectionPage() {
  return (
    <div>
      <p>Redirecting...</p>
    </div>
  );
}
