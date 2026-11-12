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
import { LOGIN_ERROR_CODE } from "@/lib/auth/auth-errors";
import { AuthTitle } from "@/components/auth/auth-title";

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
    clearErrors,
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

  const LOGIN_ERROR_MESSAGE_KEY = {
    [LOGIN_ERROR_CODE.INVALID_CREDENTIALS]: "invalidCredentials",
    [LOGIN_ERROR_CODE.SERVICE_UNAVAILABLE]: "serverError",
  } as const;

  // داخل الـ component
  function onSubmit(values: LoginValues) {
    clearErrors("root");
    login(values, {
      onSuccess: (result) => {
        if (!result.success) {
          const key =
            LOGIN_ERROR_MESSAGE_KEY[
              result.code as keyof typeof LOGIN_ERROR_MESSAGE_KEY
            ] ?? "serverError";
          setError("root", { message: key });
          return;
        }
        router.replace("/");
        router.refresh();
      },
      onError: () => setError("root", { message: "serverError" }),
    });
  }

  return (
    <div className="flex w-full flex-col gap-6">
      <AuthTitle title={t("title")} />

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
