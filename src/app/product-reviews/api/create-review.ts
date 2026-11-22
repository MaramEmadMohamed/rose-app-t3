"use server";

import { cookies } from "next/headers";
import { reviewSchema } from "../schemas/review.schema";
import type { CreateReviewPayload } from "../types";

function getReviewsUrl() {
  const base = process.env.API_URL?.trim().replace(/\/+$/, "");
  if (!base) throw new Error("API_URL is not configured.");
  return `${base.endsWith("/api") ? base : `${base}/api`}/reviews`;
}

export async function createReview(
  payload: CreateReviewPayload,
): Promise<void> {
  const token = (await cookies()).get("token")?.value;
  const productId = payload.productId.trim();
  const validated = reviewSchema.safeParse({
    headline: payload.headline,
    content: payload.content,
    rating: payload.rating,
  });

  if (!productId) throw new Error("A product ID is required.");
  if (!validated.success) {
    throw new Error(
      validated.error.issues[0]?.message ?? "Please check your review.",
    );
  }

  const response = await fetch(getReviewsUrl(), {
    method: "POST",
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer  ${token}` , // you must be logged in to create a review
    }, 
    body: JSON.stringify({
      productId,
      headline: validated.data.headline,
      content: validated.data.content,
      rating: validated.data.rating,
    }),
  });
  const result = (await response.json().catch(() => null)) as {
    status?: boolean;
    message?: string;
  } | null;

  if (!response.ok || result?.status === false) {
    throw new Error(
      result?.message || `Could not submit review (${response.status}).`,
    );
  }
}
