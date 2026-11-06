"use client";
import { useMemo } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Button } from "@/components/ui/button";
import { createOtpSchema, OtpValues } from "../register.schema";
import { useRegister } from "../register-context";
import { useResendCountdown } from "../use-resend-countdown";
import { StepHeader } from "../steps/step-header";
import {
  ApiError,
  confirmEmailVerification,
  sendEmailVerification,
} from "../api/api";

export function OtpStep() {
  const t = useTranslations("register");
  const { email, update } = useRegister();
  const { secondsLeft, start } = useResendCountdown();
  const schema = useMemo(() => createOtpSchema(t), [t]);

  const {
    control,
    handleSubmit,
    setError,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<OtpValues>({
    resolver: zodResolver(schema),
    defaultValues: { otp: "" },
  });

  async function onSubmit({ otp }: OtpValues) {
    try {
      await confirmEmailVerification(email, otp);
      update({ step: "profile" });
    } catch (e) {
      if (e instanceof ApiError) setError("otp", { message: e.message });
      else toast.error((e as Error).message);
    }
  }

  async function resend() {
    try {
      await sendEmailVerification(email);
      start();
      reset();
      toast.success(t("otp.resent"));
    } catch (e) {
      toast.error((e as Error).message);
    }
  }

  const mm = String(Math.floor(secondsLeft / 60)).padStart(2, "0");
  const ss = String(secondsLeft % 60).padStart(2, "0");

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
      <StepHeader title={t("createAccount")} subtitle={t("otp.subtitle")}>
        {t("otp.sentTo")}{" "}
        <span dir="ltr" className="inline-block font-medium text-foreground">
          {email}
        </span>{" "}
        <button
          type="button"
          className="text-blue-600 underline"
          onClick={() => update({ step: "email" })}
        >
          {t("otp.edit")}
        </button>
      </StepHeader>

      <div className="flex flex-col items-center gap-2">
        <Controller
          control={control}
          name="otp"
          render={({ field }) => (
            <InputOTP
              maxLength={6}
              pattern={REGEXP_ONLY_DIGITS}
              dir="ltr"
              value={field.value}
              onChange={field.onChange}
              onBlur={field.onBlur}
              aria-invalid={!!errors.otp}
            >
              <InputOTPGroup className="gap-2">
                {Array.from({ length: 6 }).map((_, i) => (
                  <InputOTPSlot
                    key={i}
                    index={i}
                    className="size-11 rounded-md border first:rounded-md last:rounded-md"
                  />
                ))}
              </InputOTPGroup>
            </InputOTP>
          )}
        />
        {errors.otp && (
          <p className="text-xs text-destructive">{errors.otp.message}</p>
        )}
      </div>

      <div className="min-h-5 text-end text-xs">
        {secondsLeft > 0 ? (
          <p className="text-muted-foreground" aria-live="polite">
            {t("otp.resendIn")}{" "}
            <span dir="ltr" className="inline-block font-medium tabular-nums">
              {mm}:{ss}
            </span>
          </p>
        ) : (
          <button
            type="button"
            onClick={resend}
            className="font-semibold text-[#7a1b1f] underline"
          >
            {t("otp.resend")}
          </button>
        )}
      </div>

      <Button
        type="submit"
        className="w-full bg-[#a4262c] hover:bg-[#8d1f25]"
        disabled={isSubmitting}
      >
        {isSubmitting ? t("otp.verifying") : t("otp.verify")}
      </Button>
    </form>
  );
}