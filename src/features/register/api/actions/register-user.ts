"use server";

import { AUTH_ENDPOINT } from "../auth.endpoint";
import type { ActionResult } from "./types";

export type RegisterPayload = {
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
  username: string;
  phone: string;
  gender: "MALE" | "FEMALE";
};

export async function registerUserAction(
  data: RegisterPayload,
): Promise<ActionResult> {
  const baseUrl = process.env.API_URL;
  if (!baseUrl) {
    return { success: false, message: "API_URL is not configured" };
  }

  try {
    const res = await fetch(`${baseUrl}${AUTH_ENDPOINT}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
      cache: "no-store",
    });
    const body = await res.json().catch(() => null);

    if (!res.ok || body?.status === false) {
      return {
        success: false,
        message: body?.message ?? "Something went wrong",
        code:
          body?.code ?? (res.status === 403 ? "EMAIL_NOT_VERIFIED" : undefined),
      };
    }
    return { success: true, message: body?.message ?? "OK" };
  } catch {
    return { success: false, message: "Network error, please try again" };
  }
}