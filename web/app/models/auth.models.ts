import { z } from "zod";

const passwordValidation = new RegExp("^.*?[@$!%*?&].*$");

export const RegisterUserSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Name must be at least 3 characters long." })
    .describe("A valid name is required. Please provide a name."),
  email: z
    .string()
    .email({ message: "Please provide a valid email address." })
    .describe("An email is required. Please provide an email address."),
  password: z
    .string()
    .regex(passwordValidation, {
      message:
        "Password must contain at least one special character (@$!%*?&).",
    })
    .regex(/(?!.* )(?=.*\d)/, {
      message: "Password must include at least one digit and have no spaces.",
    })
    .describe("A secure password is required. Please provide a password."),
});

export const LoginUserSchema = z.object({
  email: z
    .string()
    .email({ message: "Please provide a valid email address." })
    .min(2, {
      message: "Email is required and must be at least 2 characters long.",
    })
    .describe(
      "An email is required for login. Please provide your email address."
    ),
  password: z
    .string()
    .min(2, {
      message: "Password is required and must be at least 2 characters long.",
    })
    .describe(
      "A password is required for login. Please provide your password."
    ),
});

export type LoginUserSchemaType = z.infer<typeof LoginUserSchema>;
export type RegisterUserSchemaType = z.infer<typeof RegisterUserSchema>;
