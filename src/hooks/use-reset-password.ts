"use client";

import { useMutation } from "@tanstack/react-query";

import { resetPasswordAction } from "@/lib/actions/reset-password.action";
import type { ResetPasswordBody } from "@/types/auth";

export function useResetPassword() {
  return useMutation({
    mutationFn: async (body: ResetPasswordBody) => {
      const result = await resetPasswordAction(body);

      if (!result.success) throw new Error(result.message);
      return result;
    },
  });
}
