import { z } from "zod";

const passwordValidation = new RegExp("^.*?[@$!%*?&].*$");

export const RegisterUserSchema = z.object({
  name: z
    .string({ description: "name must be provide, please provide a name" })
    .min(3),
  email: z
    .string({ description: "email must be provide, please provide a email" })
    .email(),
  password: z
    .string({
      description: "password must be provide, please provide a password",
    })
    .regex(passwordValidation, {
      message: "password must contain at least one special character",
    })
    .regex(/(?!.* )(?=.*\d)/, {
      message: "password must contain at least one digit, and no spaces",
    }),
});

export const LoginUserSchema = z.object({
  email: z
    .string({ description: "email must be provide, please provide a email" })
    .email()
    .min(2, { message: "email must be provided" }),
  password: z
    .string({
      description: "password must be provide, please provide a password",
    })
    .min(2, { message: "password must be provided" }),
});

export type LoginUserSchemaType = z.infer<typeof LoginUserSchema>;
export type RegisterUserSchemaType = z.infer<typeof RegisterUserSchema>;
