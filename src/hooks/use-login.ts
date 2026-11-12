"use client";

import { useMutation } from "@tanstack/react-query";
import { signIn } from "next-auth/react";

import type { LoginValues } from "@/lib/schemas/login-schema";

type LoginResult = { success: true } | { success: false; code?: string };

async function loginWithCredentials(values: LoginValues): Promise<LoginResult> {
  const result = await signIn("credentials", { ...values, redirect: false });

  if (!result?.error) return { success: true };
  return { success: false, code: result.code };
}

export function useLogin() {
  return useMutation({ mutationFn: loginWithCredentials });
}
