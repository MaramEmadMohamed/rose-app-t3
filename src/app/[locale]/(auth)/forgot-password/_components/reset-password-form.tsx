"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { AuthHeading } from "@/components/auth/auth-heading";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useResetPassword } from "@/hooks/use-reset-password";
import { Link, useRouter } from "@/i18n/navigation";
import {
  resetPasswordSchema,
  type ResetPasswordValues,
} from "@/lib/schemas/reset-password-schema";

type ResetPasswordFormProps = { token?: string };

type FieldMessageKey =
  | "passwordRequired"
  | "passwordTooShort"
  | "confirmPasswordRequired"
  | "passwordsDoNotMatch";

export function ResetPasswordForm({ token }: ResetPasswordFormProps) {
  // Translation
  const t = useTranslations("ResetPassword");

  // Navigation
  const router = useRouter();

  // Mutation
  const { mutate: changePassword, isPending } = useResetPassword();

  // Form
  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<ResetPasswordValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: { password: "", confirmPassword: "" },
  });

  // Variables
  const passwordMessage = errors.password?.message as
    FieldMessageKey | undefined;
  const confirmMessage = errors.confirmPassword?.message as
    FieldMessageKey | undefined;

  // Functions
  function onSubmit(values: ResetPasswordValues) {
    if (!token) {
      setError("root", { message: "invalidLink" });
      return;
    }

    clearErrors("root");
    changePassword(
      {
        token,
        newPassword: values.password,
        confirmPassword: values.confirmPassword,
      },
      {
        onSuccess: () => {
          toast.success(t("success"));
          router.replace("/login");
        },
        onError: () => setError("root", { message: "serverError" }),
      },
    );
  }

  return (
    <div className="flex w-full flex-col gap-6">
      <AuthHeading title={t("title")} subtitle={t("subtitle")} />

      <form
        noValidate
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4"
      >
        <Field invalid={Boolean(errors.password)}>
          <Label htmlFor="reset-password">{t("password")}</Label>
          <Input
            id="reset-password"
            type="password"
            autoComplete="new-password"
            placeholder={t("passwordPlaceholder")}
            showPasswordLabel={t("showPassword")}
            hidePasswordLabel={t("hidePassword")}
            aria-invalid={Boolean(errors.password)}
            aria-describedby={
              passwordMessage ? "reset-password-error" : undefined
            }
            {...register("password")}
          />
          {passwordMessage && (
            <p id="reset-password-error" className="text-danger text-sm">
              {t(passwordMessage)}
            </p>
          )}
        </Field>

        <Field invalid={Boolean(errors.confirmPassword)}>
          <Label htmlFor="reset-confirm-password">{t("confirmPassword")}</Label>
          <Input
            id="reset-confirm-password"
            type="password"
            autoComplete="new-password"
            placeholder={t("passwordPlaceholder")}
            showPasswordLabel={t("showPassword")}
            hidePasswordLabel={t("hidePassword")}
            aria-invalid={Boolean(errors.confirmPassword)}
            aria-describedby={
              confirmMessage ? "reset-confirm-error" : undefined
            }
            {...register("confirmPassword")}
          />
          {confirmMessage && (
            <p id="reset-confirm-error" className="text-danger text-sm">
              {t(confirmMessage)}
            </p>
          )}
        </Field>

        {errors.root?.message && (
          <p role="alert" className="text-danger text-center text-sm">
            {t(errors.root.message as "invalidLink" | "serverError")}
          </p>
        )}

        <Button type="submit" disabled={isPending} className="mt-2 w-full">
          {isPending ? t("submitting") : t("submit")}
        </Button>
      </form>

      <p className="border-soft border-t pt-4 text-center text-sm">
        {t("needHelp")}{" "}
        <Link
          href="/contact"
          className="text-primary font-semibold hover:underline"
        >
          {t("contactUs")}
        </Link>
      </p>
    </div>
  );
}
