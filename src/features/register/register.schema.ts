import { z } from "zod";

export type Translate = (key: string) => string;

export const createEmailSchema = (t: Translate) =>
  z.object({
    email: z
      .string()
      .trim()
      .min(1, t("validation.emailRequired"))
      .email(t("validation.emailInvalid")),
  });

export const createOtpSchema = (t: Translate) =>
  z.object({
    otp: z.string().regex(/^\d{6}$/, t("validation.otpInvalid")),
  });

export const createProfileSchema = (t: Translate) =>
  z.object({
    firstName: z.string().trim().min(2, t("validation.nameShort")),
    lastName: z.string().trim().min(2, t("validation.nameShort")),
    username: z
      .string()
      .min(3, t("validation.usernameShort"))
      .regex(/^[a-zA-Z0-9_.]+$/, t("validation.usernameInvalid")),
    phone: z.string().regex(/^\+?[0-9]{10,15}$/, t("validation.phoneInvalid")),
    gender: z.enum(["male", "female"], { message: t("validation.genderRequired") }),
  });

export const createPasswordSchema = (t: Translate) =>
  z
    .object({
      password: z
        .string()
        .min(8, t("validation.passwordShort"))
        .regex(/[A-Z]/, t("validation.passwordUpper"))
        .regex(/[0-9]/, t("validation.passwordNumber")),
      confirmPassword: z.string(),
    })
    .refine((v) => v.password === v.confirmPassword, {
      path: ["confirmPassword"],
      message: t("validation.passwordMismatch"),
    });

export type EmailValues = z.infer<ReturnType<typeof createEmailSchema>>;
export type OtpValues = z.infer<ReturnType<typeof createOtpSchema>>;
export type ProfileValues = z.infer<ReturnType<typeof createProfileSchema>>;
export type PasswordValues = z.infer<ReturnType<typeof createPasswordSchema>>;