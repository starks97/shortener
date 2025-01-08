import { FormProps } from "~/interfaces";

/**
 * A dynamic and reusable form component built with React.
 *
 * The `DynamicForm` component generates form fields based on a provided schema and handles
 * validation errors. It supports various input types, including text inputs and select dropdowns,
 * and displays error messages when validation fails. This component is highly customizable
 * and can be styled using the `className` prop.
 *
 * @template T - The shape of the form data, inferred from the provided schema.
 *
 * @param props - The properties required to render and manage the form.
 * @param props.formSchema - An array defining the structure of the form fields. Each field
 *   should include properties such as `name`, `label`, `type`, `required`, `placeholder`, and
 *   optionally `options` for select fields.
 * @param props.actionData - An object containing any validation errors or additional data
 *   returned from the form submission action. Errors should be keyed by field name.
 * @param props.method - The HTTP method to be used when submitting the form (e.g., "GET", "POST").
 * @param props.action - The URL or endpoint where the form data should be submitted.
 * @param props.submitLabel - The label text displayed on the submit button.
 * @param props.className - Optional additional CSS classes to apply to the form for styling purposes.
 *
 * @returns A React `<form>` element containing dynamically generated input fields, error messages, and a submit button.
 *
 * @example
 * ```tsx
 * import React from 'react';
 * import DynamicForm from './DynamicForm';
 * import { z } from 'zod';
 *
 * const formSchema = [
 *   { name: 'username', label: 'Username', type: 'text', required: true, placeholder: 'Enter your username' },
 *   { name: 'email', label: 'Email', type: 'email', required: true, placeholder: 'Enter your email' },
 *   { name: 'role', label: 'Role', type: 'select', required: true, placeholder: 'Select a role', options: [
 *     { label: 'User', value: 'user' },
 *     { label: 'Admin', value: 'admin' },
 *   ] },
 * ];
 *
 * const actionData = {
 *   errors: {
 *     username: "Username is required",
 *     email: "Invalid email address",
 *   }
 * };
 *
 * const App = () => {
 *   return (
 *     <DynamicForm
 *       formSchema={formSchema}
 *       actionData={actionData}
 *       method="POST"
 *       action="/api/register"
 *       submitLabel="Register"
 *       className="max-w-lg mx-auto p-4"
 *     />
 *   );
 * };
 *
 * export default App;
 * ```
 *
 * @component
 */

export default function DynamicForm<T>({
  formSchema,
  actionData,
  method,
  action,
  submitLabel,
  className,
}: FormProps<T>) {
  return (
    <form
      method={method}
      action={action}
      className={`space-y-4 ${className || ""}`}
    >
      {actionData.errors?.general && (
        <div className="text-red-500 text-sm mb-4">
          {actionData.errors.general}
        </div>
      )}

      {formSchema.map((field) => {
        const fieldError = actionData.errors?.[field.name as keyof T];

        return (
          <div key={field.name} className="flex flex-col mb-4">
            <label
              htmlFor={field.name}
              className="block text-sm font-medium text-orange-700"
            >
              {field.label}
            </label>

            {field.type === "select" ? (
              <select
                name={field.name}
                id={field.name}
                required={field.required}
                className={`mt-1 block w-full rounded-xl  ${
                  fieldError ? "border-red-500" : "border-gray-300"
                } shadow-sm focus:border-blue-500 focus:ring-blue-500`}
                aria-invalid={!!fieldError}
                aria-describedby={
                  fieldError ? `${field.name}-error` : undefined
                }
              >
                <option value={field.placeholder} disabled>
                  {field.placeholder || "Select an option"}
                </option>
                {field.options?.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            ) : (
              <input
                type={field.type}
                name={field.name}
                id={field.name}
                required={field.required}
                placeholder={field.placeholder}
                autoComplete={field.name}
                className={`mt-1 block w-full rounded-md border py-2 px-4 ${
                  fieldError ? "border-red-500" : "border-gray-300"
                } shadow-sm focus:border-blue-500 focus:ring-blue-500`}
                aria-invalid={!!fieldError}
                aria-describedby={
                  fieldError ? `${field.name}-error` : undefined
                }
              />
            )}
            {fieldError && (
              <p
                id={`${field.name}-error`}
                className="text-red-500 text-sm mt-1"
              >
                {fieldError}
              </p>
            )}
          </div>
        );
      })}
      <button type="submit" className="auth_form_btn__a">
        {submitLabel}
      </button>
    </form>
  );
}
