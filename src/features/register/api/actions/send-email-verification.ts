"use server";

import type { ActionResult } from "./types";

export async function sendEmailVerificationAction(email: string): Promise<ActionResult> {
  try {
    const res = await fetch(`${process.env.API_URL}/auth/send-email-verification`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
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