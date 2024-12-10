import { ZodSchema, ZodError, z } from "zod";

import { FieldErrors } from "@interfaces";

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
