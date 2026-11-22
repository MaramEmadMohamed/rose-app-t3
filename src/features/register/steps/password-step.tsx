"use client";

import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { createPasswordSchema, PasswordValues } from "../register.schema";
import { useRegister } from "../register-context";
import { StepHeader } from "../steps/step-header";
import { HelpFooter } from "../help-footer";
import { useRegisterUser } from "../hooks/use-register-user";

export function PasswordStep() {
  const t = useTranslations("register");
  const { email, profile, update } = useRegister();
  const schema = useMemo(() => createPasswordSchema(t), [t]);
  const { mutateAsync: registerUser, isPending } = useRegisterUser();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PasswordValues>({
    resolver: zodResolver(schema),
    defaultValues: { password: "", confirmPassword: "" },
  });

  async function onSubmit({ password, confirmPassword }: PasswordValues) {
    if (!profile) {
      update({ step: "profile" });
      return;
    }

    const result = await registerUser({
      email,
      ...profile,
      password,
      confirmPassword,
    });

    if (!result.success) {
      if (result.code === "EMAIL_NOT_VERIFIED") {
        update({ step: "email" });
      }
      toast.error(result.message);
      return;
    }

    update({ step: "done" });
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
      <StepHeader title={t("createAccount")} subtitle={t("password.subtitle")}>
        {t("password.hint")}
      </StepHeader>

      <div className="space-y-2">
        <Label htmlFor="password" className="text-sm font-normal">
          {t("password.password")}
        </Label>
        <Input
          id="password"
          type="password"
          autoComplete="new-password"
          showPasswordLabel={t("password.show")}
          hidePasswordLabel={t("password.hide")}
          aria-invalid={!!errors.password}
          className="h-11 rounded-xl px-4"
          {...register("password")}
        />
        {errors.password && (
          <p className="text-xs text-destructive">{errors.password.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="confirmPassword" className="text-sm font-normal">
          {t("password.confirmPassword")}
        </Label>
        <Input
          id="confirmPassword"
          type="password"
          autoComplete="new-password"
          showPasswordLabel={t("password.show")}
          hidePasswordLabel={t("password.hide")}
          aria-invalid={!!errors.confirmPassword}
          className="h-11 rounded-xl px-4"
          {...register("confirmPassword")}
        />
        {errors.confirmPassword && (
          <p className="text-xs text-destructive">
            {errors.confirmPassword.message}
          </p>
        )}
      </div>

      <Button
        type="submit"
        variant="primary"
        className="h-[41px] w-full gap-2.5 rounded-[10px] bg-(--maroon-600) px-4 py-3.5 font-medium"
        disabled={isPending}
      >
        {isPending ? t("password.creating") : t("next")}
        {!isPending && <ArrowRight className="size-4 rtl:rotate-180" />}
      </Button>

      <HelpFooter />
    </form>
  );
}