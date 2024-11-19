import { redirect, ActionFunctionArgs } from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";
import { refreshTokenCookie, accessTokenCookie } from "@cookies";

import refresh from "@api/auth/refresh";

export async function action({ request }: ActionFunctionArgs) {
  const getCookie = request.headers.get("Cookie") || "";

  const refreshToken = await refreshTokenCookie.parse(getCookie);
  try {
    if (refreshToken) {
      const response = await refresh(refreshToken);

      if (!response) return redirect("/auth/login", { status: 400 });

      const headers = new Headers();

      if (response.data?.access_token) {
        headers.append(
          "Set-Cookie",
          await accessTokenCookie.serialize(response.data.access_token, {
            sameSite: "lax",
          })
        );
      }

      if (headers.has("Set-Cookie")) {
        return redirect("/dashboard", { headers });
      }

      return Response.json(response.data);
    }
  } catch (err) {
    if (err instanceof Error) {
      return Response.json({ status: "err", message: err.message });
    }
  }
}

export default function Refresh() {
  const data = useActionData<typeof action>();

  return (
    <div>
      <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        Refresh your token
      </h5>
      <p className="font-normal text-gray-700 dark:text-gray-400">
        You can refresh your token by clicking the button below.
      </p>

      {/* The form will trigger the action */}
      <Form method="post">
        <button
          type="submit"
          className="px-4 py-2 font-medium text-white bg-blue-500 rounded hover:bg-blue-600"
        >
          Refresh Token
        </button>
      </Form>
    </div>
  );
}
