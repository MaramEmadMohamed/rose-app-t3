"use server";

import { ApiError } from "@/lib/api/api-client";
import { subscribeToNewsletter } from "@/lib/api/newsletter";
import { HTTP_STATUS } from "@/lib/constants/api";
import { newsletterSchema } from "@/lib/schemas/newsletter-schema";

// Errors thrown in a server action lose their details on the way to the
// browser, so the action returns the outcome as plain data instead.
export type SubscribeToNewsletterResult =
  { success: true } | { success: false; status: number };

export async function subscribeToNewsletterAction(
  email: string,
): Promise<SubscribeToNewsletterResult> {
  // The browser already validated the email, but the server checks it again
  // because anyone can call this action directly.
  const validation = newsletterSchema.safeParse({ email });

  if (!validation.success) {
    return { success: false, status: HTTP_STATUS.BAD_REQUEST };
  }

  try {
    await subscribeToNewsletter(validation.data.email);
    return { success: true };
  } catch (error) {
    if (error instanceof ApiError) {
      return { success: false, status: error.status };
    }

    return { success: false, status: HTTP_STATUS.INTERNAL_SERVER_ERROR };
  }
}
