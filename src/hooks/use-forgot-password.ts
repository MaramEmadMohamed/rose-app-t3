"use client";

import { useMutation } from "@tanstack/react-query";
import { useLocale } from "next-intl";

import { requestPasswordReset } from "@/lib/api/auth";

export function useForgotPassword() {
  const locale = useLocale();

  return useMutation({
    mutationFn: (email: string) =>
      requestPasswordReset({
        email,
        redirectUrl: `${window.location.origin}/${locale}/reset-password`,
      }),
  });
}
