import { ActionFunctionArgs, redirect } from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";

import register from "@api/auth/register";
import formDefinitions from "~/formDefinitions";
import {
  RegisterUserSchema,
  RegisterUserSchemaType,
} from "@models/auth.models";
import { ActionData } from "@interfaces";

import FormInput from "@components/FormInput";
import { validationAction } from "@utils/validationAction";

export async function action({ request }: ActionFunctionArgs) {
  const { data, errors } = await validationAction({
    request,
    schema: RegisterUserSchema,
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

  const { email, password, name } = data;

  try {
    const response = await register(email, password, name);

    if (!response) return redirect("/auth/register", { status: 400 });

    return redirect("/auth/login");
  } catch (err) {
    if (err instanceof Error) {
      console.log("Error caught:", err.message);
      return Response.json(
        { errors: { general: err.message } },
        { status: 400 }
      );
    }
  }
}

export default function Register() {
  const actionData = useActionData<ActionData<RegisterUserSchemaType>>() || {
    errors: {},
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-black">
          Register
        </h2>

        <Form method="post" className="space-y-4">
          <FormInput<RegisterUserSchemaType>
            actionData={actionData!}
            formSchema={formDefinitions["register"]}
          >
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            >
              Register
            </button>
          </FormInput>
        </Form>
      </div>
    </div>
  );
}
