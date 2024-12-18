import { ZodSchema, ZodError, z } from "zod";

import { FieldErrors } from "@interfaces";

/**
 * Extracts field-level error messages from a `ZodError` object.
 *
 * This function iterates over each error in the `ZodError` and uses the first element
 * in the error's `path` array as the field name. It then maps the field name to the
 * corresponding error message, creating a simple key-value map of field errors.
 *
 * @param error - An instance of `ZodError` containing validation errors.
 *
 * @returns A `FieldErrors` object mapping each field to its associated error message.
 *
 * @example
 * ```typescript
 * import { z } from "zod";
 * import { parsedZodError } from "./parsedZodError";
 *
 * const schema = z.object({
 *   username: z.string().min(1, "Username is required"),
 *   email: z.string().email("Invalid email format"),
 * });
 *
 * try {
 *   schema.parse({ username: "", email: "not-an-email" });
 * } catch (err) {
 *   if (err instanceof z.ZodError) {
 *     const errors = parsedZodError(err);
 *     console.log(errors);
 *     // {
 *     //   username: "Username is required",
 *     //   email: "Invalid email format"
 *     // }
 *   }
 * }
 * ```
 */

export function parsedZodError(error: ZodError): FieldErrors {
  const fieldErrors: FieldErrors = {};

  error.errors.forEach((err) => {
    if (err.path.length > 0) {
      const field = err.path[0];
      fieldErrors[field] = err.message;
    }
  });

  return fieldErrors;
}

/**
 * Validates form data against a given Zod schema.
 *
 * This function:
 * 1. Tries to parse the provided `formData` using the given `schema`.
 * 2. If successful, returns the parsed data and no errors.
 * 3. If validation fails, captures and returns field-level errors extracted from the `ZodError`.
 * 4. If an unexpected error occurs, returns a general error message.
 *
 * @template T - A Zod schema type.
 *
 * @param params - The parameters for validation.
 * @param params.formData - A record of form field values to be validated.
 * @param params.schema - The Zod schema against which the form data will be validated.
 *
 * @returns A promise that resolves to an object containing either:
 * - `data`: The validated and parsed data, or
 * - `errors`: A set of field-level errors or a general error message.
 *
 * @example
 * ```typescript
 * import { z } from "zod";
 *
 * const formSchema = z.object({
 *   username: z.string().nonempty("Username is required"),
 *   email: z.string().email("Invalid email"),
 * });
 *
 * const { data, errors } = await validationAction({ formData: { username: "", email: "test" }, schema: formSchema });
 *
 * if (errors) {
 *   console.log(errors);
 *   // { username: "Username is required", email: "Invalid email" }
 * } else {
 *   console.log(data);
 *   // Parsed data if valid
 * }
 * ```
 */

export async function validationAction<T extends ZodSchema>({
  formData,
  schema,
}: {
  formData: Record<string, any>;
  schema: T;
}): Promise<{ data?: z.infer<T>; errors?: FieldErrors }> {
  try {
    const data = schema.parse(formData);

    return { data, errors: undefined };
  } catch (error) {
    if (error instanceof ZodError) {
      const errors: FieldErrors = parsedZodError(error);
      return { errors };
    }
    return {
      errors: { general: "An unexpected error occurred" },
    };
  }
}
