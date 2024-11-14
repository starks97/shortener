import { FormProps } from "~/interfaces";

export default function FormInput<T>({
  formSchema,
  children,
  actionData,
}: FormProps<T>) {
  return (
    <>
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
              className="block text-sm font-medium text-gray-700"
            >
              {field.label}
            </label>

            {field.type === "select" ? (
              <select
                name={field.name}
                id={field.name}
                required={field.required}
                className={`mt-1 block w-full rounded-md border ${
                  fieldError ? "border-red-500" : "border-gray-300"
                } shadow-sm focus:border-blue-500 focus:ring-blue-500`}
                aria-invalid={!!fieldError}
                aria-describedby={
                  fieldError ? `${field.name}-error` : undefined
                }
              >
                <option value="" disabled>
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
                className={`mt-1 block w-full rounded-md border ${
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
      {children}
    </>
  );
}
