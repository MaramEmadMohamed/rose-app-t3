"use client";

import { useMutation } from "@tanstack/react-query";
import { signIn } from "next-auth/react";

import type { LoginValues } from "@/lib/schemas/login-schema";

export class LoginError extends Error {
  readonly code: string;

  constructor(code: string) {
    super(code);
    this.name = "LoginError";
    this.code = code;
  }
}

async function loginWithCredentials(values: LoginValues) {
  const result = await signIn("credentials", { ...values, redirect: false });

  if (result?.error) throw new LoginError(result.code ?? result.error);
}

export function useLogin() {
  return useMutation({ mutationFn: loginWithCredentials });
}
