"use client";

import { useMutation } from "@tanstack/react-query";
import { useLocale } from "next-intl";

import { forgotPasswordAction } from "@/lib/actions/forgot-password.action";

export function useForgotPassword() {
  const locale = useLocale();

  return useMutation({
    mutationFn: async (email: string) => {
      const result = await forgotPasswordAction({
        email,
        redirectUrl: `${window.location.origin}/${locale}/forgot-password`,
      });

      if (!result.success) throw new Error(result.message);
      return result;
    },
  });
}
