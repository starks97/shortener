import { ActionFunctionArgs, redirect } from "@remix-run/node";
import { RCookie, logoutAtoken, logoutRtoken, ACookie } from "@cookies";
import logout from "~/api/auth/logout";

import middleware from "~/middleware";

export async function action({ request }: ActionFunctionArgs) {
  const middle = await middleware(request);

  if (middle !== null) {
    return middle;
  }

  const getCookie = request.headers.get("Cookie") || "";

  const rToken = await RCookie.parse(getCookie);
  const aToken = await ACookie.parse(getCookie);

  try {
    const response = await logout({ Rtoken: rToken, Atoken: aToken });

    if (!response) throw new Error("Something went wrong");

    const headers = new Headers();

    if (response.status === "success") {
      headers.append("Set-Cookie", await logoutRtoken.serialize(""));
      headers.append("Set-Cookie", await logoutAtoken.serialize(""));
    }

    if (headers.has("Set-Cookie")) {
      return redirect("/", { headers });
    }

    // If successful but no headers were set, return a success message.
    return new Response("You have been logged out. Have a good day!", {
      status: 200,
    });
  } catch (e) {
    console.error(e);

    // Return an error response for the client.
    return new Response("An error occurred while logging out.", {
      status: 500,
    });
  }
}
