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
import { useConfirmEmailVerification } from "../hooks/use-confirm-email-verification";
import { useSendEmailVerification } from "../hooks/use-send-email-verification";
import { HelpFooter } from "../help-footer";

export function OtpStep() {
  const t = useTranslations("register");
  const { email, update } = useRegister();
  const { secondsLeft, start } = useResendCountdown();
  const schema = useMemo(() => createOtpSchema(t), [t]);

  const { mutateAsync: confirmEmail, isPending: isConfirming } =
    useConfirmEmailVerification();
  const { mutateAsync: resendEmail, isPending: isResending } =
    useSendEmailVerification();

  const {
    control,
    handleSubmit,
    setError,
    reset,
    formState: { errors },
  } = useForm<OtpValues>({
    resolver: zodResolver(schema),
    defaultValues: { otp: "" },
  });

  async function onSubmit({ otp }: OtpValues) {
    const result = await confirmEmail({ email, otp });

    if (!result.success) {
      setError("otp", { message: result.message });
      return;
    }
    update({ step: "profile" });
  }

  async function resend() {
    const result = await resendEmail(email);

    if (!result.success) {
      toast.error(result.message);
      return;
    }
    start();
    reset();
    toast.success(t("otp.resent"));
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
        <Button
          type="button"
          variant="link"
          className="h-auto cursor-pointer p-0 text-sm font-semibold"
          onClick={() => update({ step: "email" })}
        >
          {t("otp.edit")}
        </Button>
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
                    className="size-11 rounded-xl border first:rounded-xl last:rounded-xl"
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

      <div className="flex min-h-5 justify-end text-xs">
        {secondsLeft > 0 ? (
          <p className="text-muted-foreground" aria-live="polite">
            {t("otp.resendIn")}{" "}
            <span dir="ltr" className="inline-block font-medium tabular-nums">
              {mm}:{ss}
            </span>
          </p>
        ) : (
          <Button
            type="button"
            variant="link"
            className="h-auto cursor-pointer p-0 text-xs font-semibold"
            onClick={resend}
            disabled={isResending}
          >
            {t("otp.resend")}
          </Button>
        )}
      </div>

      <Button
        type="submit"
        variant="primary"
        className="h-[41px] w-full gap-2.5 rounded-[10px] bg-(--maroon-600) px-4 py-3.5 font-medium"
        disabled={isConfirming}
      >
        {isConfirming ? t("otp.verifying") : t("otp.verify")}
      </Button>

      <HelpFooter />
    </form>
  );
}