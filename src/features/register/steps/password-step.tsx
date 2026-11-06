"use client";
import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { createPasswordSchema, PasswordValues } from "../register.schema";
import { useRegister } from "../register-context";
import { ApiError, registerUser } from "../api/api";

export function PasswordStep() {
  const t = useTranslations("register");
  const { email, profile, update } = useRegister();
  const schema = useMemo(() => createPasswordSchema(t), [t]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<PasswordValues>({
    resolver: zodResolver(schema),
    defaultValues: { password: "", confirmPassword: "" },
  });

  async function onSubmit({ password }: PasswordValues) {
    if (!profile) {
      update({ step: "profile" });
      return;
    }
    try {
      await registerUser({ email, ...profile, password });
      update({ step: "done" });
    } catch (e) {
      if (e instanceof ApiError && e.code === 400 && /verify your email/i.test(e.message)) {
        toast.error(e.message);
        update({ step: "email" });
        return;
      }
      toast.error((e as Error).message);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
      <div>
        <h2 className="text-lg font-semibold">{t("createAccount")}</h2>
        <p className="text-sm">{t("password.subtitle")}</p>
        <p className="text-xs text-muted-foreground">{t("password.hint")}</p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">{t("password.password")}</Label>
        <Input
          id="password"
          type="password"
          autoComplete="new-password"
          showPasswordLabel={t("password.show")}
          hidePasswordLabel={t("password.hide")}
          aria-invalid={!!errors.password}
          {...register("password")}
        />
        {errors.password && (
          <p className="text-xs text-destructive">{errors.password.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="confirmPassword">{t("password.confirmPassword")}</Label>
        <Input
          id="confirmPassword"
          type="password"
          autoComplete="new-password"
          showPasswordLabel={t("password.show")}
          hidePasswordLabel={t("password.hide")}
          aria-invalid={!!errors.confirmPassword}
          {...register("confirmPassword")}
        />
        {errors.confirmPassword && (
          <p className="text-xs text-destructive">{errors.confirmPassword.message}</p>
        )}
      </div>

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? t("password.creating") : `${t("next")} →`}
      </Button>
    </form>
  );
}