"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { AuthHeading } from "@/components/auth/auth-heading";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForgotPassword } from "@/hooks/use-forgot-password";
import { Link } from "@/i18n/navigation";
import {
  forgotPasswordSchema,
  type ForgotPasswordValues,
} from "@/lib/schemas/forgot-password-schema";

type ForgotPasswordFormProps = {
  defaultEmail: string;
  shouldFocusEmail: boolean;
  onSent: (email: string) => void;
};

type EmailMessageKey = "emailRequired" | "emailInvalid";

export function ForgotPasswordForm({
  defaultEmail,
  shouldFocusEmail,
  onSent,
}: ForgotPasswordFormProps) {
  // Translation
  const t = useTranslations("ForgotPassword");

  // Mutation
  const { mutate: sendLink, isPending } = useForgotPassword();

  // Form
  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<ForgotPasswordValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: defaultEmail },
  });

  // Variables
  const emailMessage = errors.email?.message as EmailMessageKey | undefined;

  // Functions
  function onSubmit({ email }: ForgotPasswordValues) {
    clearErrors("root");
    sendLink(email, {
      onSuccess: () => {
        toast.success(t("linkSent"));
        onSent(email);
      },
      onError: () => setError("root", { message: "serverError" }),
    });
  }

  return (
    <div className="flex w-full flex-col gap-6">
      <AuthHeading title={t("title")} subtitle={t("subtitle")} />

      <form
        noValidate
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-6"
      >
        <Field invalid={Boolean(errors.email)}>
          <Label htmlFor="forgot-email">{t("email")}</Label>
          <Input
            id="forgot-email"
            type="email"
            autoComplete="email"
            autoFocus={shouldFocusEmail}
            placeholder={t("emailPlaceholder")}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={emailMessage ? "forgot-email-error" : undefined}
            {...register("email")}
          />
          {emailMessage && (
            <p id="forgot-email-error" className="text-danger text-sm">
              {t(emailMessage)}
            </p>
          )}
        </Field>

        {errors.root && (
          <p role="alert" className="text-danger text-center text-sm">
            {t("serverError")}
          </p>
        )}

        <Button type="submit" disabled={isPending} className="w-full">
          {isPending ? t("sending") : t("next")}
          <ArrowRight aria-hidden="true" className="rtl:rotate-180" />
        </Button>
      </form>

      <p className="border-soft border-t pt-4 text-center text-sm">
        {t("noAccount")}{" "}
        <Link
          href="/register"
          className="text-primary font-semibold hover:underline"
        >
          {t("createAccount")}
        </Link>
      </p>
    </div>
  );
}
