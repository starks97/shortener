import { redirect, ActionFunctionArgs } from "@remix-run/node";
import { Form } from "@remix-run/react";
import { RCookie, ACookie } from "@cookies";

import refresh from "@api/auth/refresh";
import { workspace } from "~/consts";
import AuthWrapperForm from "~/components/AuthWrapperForm";

export async function action({ request }: ActionFunctionArgs) {
  const getCookie = request.headers.get("Cookie") || "";

  const refreshToken = await RCookie.parse(getCookie);
  try {
    if (refreshToken) {
      const response = await refresh(refreshToken);

      if (!response) return redirect("/auth/login", { status: 400 });

      const headers = new Headers();

      if (response.data?.access_token) {
        headers.append(
          "Set-Cookie",
          await ACookie.serialize(response.data.access_token, {
            sameSite: "lax",
          })
        );
      }

      if (headers.has("Set-Cookie")) {
        return redirect(workspace, {
          headers,
        });
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
  return (
    <AuthWrapperForm
      description="Your session has expired. Please refresh your token to continue."
      title="Session Expired"
    >
      <Form method="post">
        <button type="submit" className="auth_form_btn__a">
          Refresh Token
        </button>
      </Form>
    </AuthWrapperForm>
  );
}
