import { z } from "zod";
import { UrlCategories } from "@interfaces";

export const CreateUrlSchema = z.object({
  original_url: z.string().url(),
  short_url: z
    .string({
      description: "short url must be provide, please provide at lease a name",
    })
    .min(5)
    .max(30),
  category: z.nativeEnum(UrlCategories),
});

export const UpdateUrlSchema = CreateUrlSchema.partial();

export type UpdateUrlSchemaType = z.infer<typeof UpdateUrlSchema>;

export type CreateUrlSchemaType = z.infer<typeof CreateUrlSchema>;

export const DeleteUrlSchema = z.object({
  delete: z
    .string()
    .default("CONFIRM")
    .superRefine((val, ctx) => {
      if (val !== "CONFIRM") {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Has to match with CONFIRM",
          path: ["delete"],
        });
      }
    }),
});

export type DeleteUrlSchemaType = z.infer<typeof DeleteUrlSchema>;
