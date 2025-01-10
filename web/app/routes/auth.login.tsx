import { ActionFunctionArgs, redirect } from "@remix-run/node";
import { useActionData } from "@remix-run/react";
import { LoginUserSchema, LoginUserSchemaType } from "@models/auth.models";

import { ActionData } from "~/interfaces";

import login from "@api/auth/login";
import { RCookie, ACookie } from "@cookies";
import { validationAction } from "@utils/validationAction";

import formDefinitions from "~/formDefinitions";

import DynamicForm from "@components/DynamicForm";
import { workspace } from "~/consts";
import AuthWrapperForm from "~/components/AuthWrapperForm";

export async function action({ request }: ActionFunctionArgs) {
  const formData = Object.fromEntries(await request.formData());
  const { data, errors } = await validationAction({
    formData,
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
        await RCookie.serialize(response.refreshToken)
      );
    }

    if (response.data?.access_token) {
      headers.append(
        "Set-Cookie",
        await ACookie.serialize(response.data.access_token)
      );
    }

    if (headers.has("Set-Cookie")) {
      return redirect(workspace, { headers });
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
    <AuthWrapperForm
      title="Welcome Back to"
      description="Manage and track your links effortlessly."
      appName="ByteTrim!"
    >
      <DynamicForm<LoginUserSchemaType>
        actionData={actionData!}
        formSchema={formDefinitions["login"]}
        method="POST"
        submitLabel="Login"
      />

      <p className="text-gray-300 text-center mt-4 text-sm">
        Don’t have an account?{" "}
        <a
          href="/auth/register"
          className="text-orange-700 hover:underline transition duration-150"
        >
          Sign up here
        </a>
      </p>
    </AuthWrapperForm>
  );
}
