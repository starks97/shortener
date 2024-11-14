import { ActionFunctionArgs, redirect } from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";
import { LoginUserSchema, LoginUserSchemaType } from "@models/auth.models";

import { ActionData } from "~/interfaces";

import login from "@api/auth/login";
import { refreshTokenCookie } from "@cookies";
import { validationAction } from "@utils/validationAction";

import { LoginFormField } from "~/consts";

import FormInput from "@components/FormInput";

export async function action({ request }: ActionFunctionArgs) {
  const { data, errors } = await validationAction({
    request,
    schema: LoginUserSchema,
  });

  if (errors) {
    return Response.json({ errors }, { status: 400 });
  }

  if (!data) {
    return Response.json(
      { errors: { general: "Invalid data" } },
      { status: 400 }
    );
  }

  const { email, password } = data;

  try {
    const response = await login(email, password);

    if (!response) return redirect("/login", { status: 400 });

    if (response.refreshToken) {
      const cookieHeader = await refreshTokenCookie.serialize(
        response.refreshToken,
        { sameSite: "lax" }
      );
      return redirect("/", {
        headers: {
          "Set-Cookie": cookieHeader,
        },
      });
    }
    return response.data;
  } catch (e) {
    if (e instanceof Error) {
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
