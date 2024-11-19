import { ActionFunctionArgs, redirect } from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";
import { LoginUserSchema, LoginUserSchemaType } from "@models/auth.models";

import { ActionData } from "~/interfaces";

import login from "@api/auth/login";
import { refreshTokenCookie, accessTokenCookie } from "@cookies";
import { validationAction } from "@utils/validationAction";

import { LoginFormField } from "~/consts";

import FormInput from "@components/FormInput";

export async function action({ request }: ActionFunctionArgs) {
  const { data, errors } = await validationAction({
    request,
    schema: LoginUserSchema,
  });

  if (errors) {
    console.log("Validation errors:", errors);
    return Response.json({ errors }, { status: 400 });
  }

  if (!data) {
    console.log("No data received");
    return Response.json(
      { errors: { general: "Invalid data" } },
      { status: 400 }
    );
  }

  const { email, password } = data;

  try {
    const response = await login(email, password);

    if (!response) return redirect("/auth/login", { status: 400 });

    const headers = new Headers();

    if (response.refreshToken) {
      headers.append(
        "Set-Cookie",
        await refreshTokenCookie.serialize(response.refreshToken, {
          sameSite: "lax",
        })
      );
    }

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
  } catch (e) {
    if (e instanceof Error) {
      console.log("Error caught:", e.message);
      return Response.json({ errors: { general: e.message } }, { status: 400 });
    }
  }
}

export default function Login() {
  const actionData = useActionData<ActionData<LoginUserSchemaType>>() || {
    errors: {},
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-black">
          Login
        </h2>

        <Form method="post" className="space-y-4">
          <FormInput<LoginUserSchemaType>
            actionData={actionData!}
            formSchema={LoginFormField}
          >
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            >
              Login
            </button>
          </FormInput>
        </Form>
      </div>
    </div>
  );
}
