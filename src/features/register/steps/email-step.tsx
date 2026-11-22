"use client";

import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useRegister } from "../register-context";
import { useResendCountdown } from "../use-resend-countdown";
import { createEmailSchema, EmailValues } from "../register.schema";
import { useSendEmailVerification } from "../hooks/use-send-email-verification";

export function EmailStep() {
  const t = useTranslations("register");
  const { email, update } = useRegister();
  const { secondsLeft, start } = useResendCountdown();
  const schema = useMemo(() => createEmailSchema(t), [t]);
  const { mutateAsync: sendVerification, isPending } =
    useSendEmailVerification();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<EmailValues>({
    resolver: zodResolver(schema),
    defaultValues: { email },
  });

  async function onSubmit(values: EmailValues) {
    const sameEmailLocked = values.email === email && secondsLeft > 0;

    if (!sameEmailLocked) {
      const result = await sendVerification(values.email);

      if (!result.success) {
        setError("email", { message: result.message });
        return;
      }
      start();
    }

    update({ email: values.email, step: "otp" });
  }

  return (
    <div className="w-full">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-8 py-6"
        noValidate
      >
        <div className="space-y-2">
          <Label htmlFor="email" className="text-sm font-normal">
            {t("email.label")}
          </Label>
          <Input
            id="email"
            type="email"
            autoComplete="email"
            placeholder={t("email.placeholder")}
            aria-invalid={!!errors.email}
            className="h-11 rounded-xl px-4"
            {...register("email")}
          />
          {errors.email && (
            <p className="text-xs text-destructive">{errors.email.message}</p>
          )}
        </div>

        <Button
          type="submit"
          variant="primary"
          className="h-[41px] w-full gap-2.5 rounded-[10px] bg-(--maroon-600) px-4 py-3.5 font-medium"
          disabled={isPending}
        >
          {isPending ? t("email.sending") : t("next")}
          {!isPending && <ArrowRight className="size-4 rtl:rotate-180" />}
        </Button>
      </form>

      <div className="border-t border-border pt-4 text-center text-sm">
        <span>{t("email.haveAccount")} </span>
        <Link
          href="/login"
          className="cursor-pointer font-semibold text-primary underline-offset-4 hover:underline focus-visible:underline"
        >
          {t("email.login")}
        </Link>
      </div>
    </div>
  );
}