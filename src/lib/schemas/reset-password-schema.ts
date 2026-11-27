import { z } from "zod";

const MIN_PASSWORD_LENGTH = 8;

export const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(1, "passwordRequired")
      .min(MIN_PASSWORD_LENGTH, "passwordTooShort"),
    confirmPassword: z.string().min(1, "confirmPasswordRequired"),
  })
  .refine((values) => values.password === values.confirmPassword, {
    path: ["confirmPassword"],
    message: "passwordsDoNotMatch",
  });

export type ResetPasswordValues = z.infer<typeof resetPasswordSchema>;
