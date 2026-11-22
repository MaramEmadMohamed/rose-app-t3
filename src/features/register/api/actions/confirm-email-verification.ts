"use server";

import type { ActionResult } from "./types";

export async function confirmEmailVerificationAction(input: {
  email: string;
  otp: string;
}): Promise<ActionResult> {
  try {
    const res = await fetch(`${process.env.API_URL}/auth/confirm-email-verification`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: input.email, code: input.otp }),
      cache: "no-store",
    });
    const data = await res.json().catch(() => null);

    if (!res.ok || data?.status === false) {
      return { success: false, message: data?.message ?? "Something went wrong" };
    }
    return { success: true, message: data?.message ?? "OK" };
  } catch {
    return { success: false, message: "Network error, please try again" };
  }
}