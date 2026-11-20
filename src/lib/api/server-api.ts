import { SERVER_API_URL } from "@/lib/constants/server-api";
import type { ActionResult } from "@/types/action-result";

type ApiMessageBody = { message?: string };

export async function postToApi(
  path: string,
  body: unknown,
): Promise<ActionResult> {
  try {
    const response = await fetch(`${SERVER_API_URL}${path}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      cache: "no-store",
    });
    const data: ApiMessageBody = await response.json().catch(() => ({}));

    return {
      success: response.ok,
      message: data.message ?? response.statusText,
    };
  } catch {
    return { success: false, message: "Network error" };
  }
}
