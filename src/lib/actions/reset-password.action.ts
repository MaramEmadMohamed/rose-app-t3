"use server";

import { postToApi } from "@/lib/api/server-api";
import type { ActionResult } from "@/types/action-result";
import type { ResetPasswordBody } from "@/types/auth";

export async function resetPasswordAction(
  body: ResetPasswordBody,
): Promise<ActionResult> {
  return postToApi("/api/auth/reset-password", body);
}
