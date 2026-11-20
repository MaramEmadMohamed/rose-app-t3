"use server";

import { postToApi } from "@/lib/api/server-api";
import type { ActionResult } from "@/types/action-result";
import type { ForgotPasswordBody } from "@/types/auth";

export async function forgotPasswordAction(
  body: ForgotPasswordBody,
): Promise<ActionResult> {
  return postToApi("/api/auth/forgot-password", body);
}
