"use client";
import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useRegister } from "../register-context";
import { useResendCountdown } from "../use-resend-countdown";
import { createEmailSchema, EmailValues } from "../register.schema";
import { ApiError, sendEmailVerification } from "../api/api";

export function EmailStep() {
  const t = useTranslations("register");
  const { email, update } = useRegister();
  const { secondsLeft, start } = useResendCountdown();
  const schema = useMemo(() => createEmailSchema(t), [t]);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<EmailValues>({
    resolver: zodResolver(schema),
    defaultValues: { email },
  });

  async function onSubmit(values: EmailValues) {
    try {
      // نفس الإيميل والقفل لسه شغال: ما نبعتش كود جديد
      // (كل إرسال بيبطّل الكود القديم عند السيرفر)
      const sameEmailLocked = values.email === email && secondsLeft > 0;

      if (!sameEmailLocked) {
        const res = await sendEmailVerification(values.email);
        start();

        if (process.env.NODE_ENV === "development") {
          console.log("DEV verification code:", res.payload);
        }
      }

      update({ email: values.email, step: "otp" });
    } catch (e) {
      if (e instanceof ApiError) setError("email", { message: e.message });
      else toast.error((e as Error).message);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
      <div className="space-y-2">
        <Label htmlFor="email">{t("email.label")}</Label>
        <Input
          id="email"
          type="email"
          autoComplete="email"
          placeholder={t("email.placeholder")}
          aria-invalid={!!errors.email}
          {...register("email")}
        />
        {errors.email && (
          <p className="text-xs text-destructive">{errors.email.message}</p>
        )}
      </div>

      <Button
        type="submit"
        className="w-full bg-[#a4262c] hover:bg-[#8d1f25]"
        disabled={isSubmitting}
      >
        {isSubmitting ? t("email.sending") : `${t("next")} →`}
      </Button>

      <p className="text-center text-xs">
        {t("email.haveAccount")}{" "}
        <Link href="/login" className="font-semibold text-[#7a1b1f] underline">
          {t("email.login")}
        </Link>
      </p>
    </form>
  );
}