"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLogin } from "@/hooks/use-login";
import { Link, useRouter } from "@/i18n/navigation";
import { loginSchema, type LoginValues } from "@/lib/schemas/login-schema";

type LoginMessageKey = "usernameRequired" | "passwordRequired";

export function LoginForm() {
  // Translation
  const t = useTranslations("Login");

  // Navigation
  const router = useRouter();

  // Mutation
  const { mutate: login, isPending } = useLogin();

  // Form
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { username: "", password: "" },
  });

  // Variables
  const usernameMessage = errors.username?.message as
    LoginMessageKey | undefined;
  const passwordMessage = errors.password?.message as
    LoginMessageKey | undefined;

  // Functions
  function onSubmit(values: LoginValues) {
    login(values, {
      onSuccess: () => {
        router.replace("/");
        router.refresh();
      },
      onError: () => setError("root", { message: "invalidCredentials" }),
    });
  }

  return (
    <div className="flex w-full flex-col gap-6">
      <h1 className="text-primary font-script text-center text-3xl">
        {t("title")}
      </h1>

      <form
        noValidate
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4"
      >
        <Field invalid={Boolean(errors.username)}>
          <Label htmlFor="login-username">{t("username")}</Label>
          <Input
            id="login-username"
            autoComplete="username"
            placeholder={t("usernamePlaceholder")}
            aria-invalid={Boolean(errors.username)}
            aria-describedby={
              usernameMessage ? "login-username-error" : undefined
            }
            {...register("username")}
          />
          {usernameMessage && (
            <p id="login-username-error" className="text-danger text-sm">
              {t(usernameMessage)}
            </p>
          )}
        </Field>

        <Field invalid={Boolean(errors.password)}>
          <Label htmlFor="login-password">{t("password")}</Label>
          <Input
            id="login-password"
            type="password"
            autoComplete="current-password"
            placeholder={t("passwordPlaceholder")}
            showPasswordLabel={t("showPassword")}
            hidePasswordLabel={t("hidePassword")}
            aria-invalid={Boolean(errors.password)}
            aria-describedby={
              passwordMessage ? "login-password-error" : undefined
            }
            {...register("password")}
          />
          {passwordMessage && (
            <p id="login-password-error" className="text-danger text-sm">
              {t(passwordMessage)}
            </p>
          )}
        </Field>

        <Link
          href="/forgot-password"
          className="text-primary self-end text-sm font-semibold hover:underline"
        >
          {t("forgotPassword")}
        </Link>

        {errors.root && (
          <p role="alert" className="text-danger text-center text-sm">
            {t("invalidCredentials")}
          </p>
        )}

        <Button type="submit" disabled={isPending} className="w-full">
          {isPending ? t("submitting") : t("submit")}
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
