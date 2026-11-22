import "server-only";

import type { Review, ReviewsResponse } from "../types";

function getReviewsUrl() {
  const base = process.env.API_URL?.trim().replace(/\/+$/, "");
  if (!base) throw new Error("API_URL is not configured.");
  return `${base.endsWith("/api") ? base : `${base}/api`}/reviews`;
}

export async function getReviews(productId: string): Promise<Review[]> {
  const response = await fetch(getReviewsUrl(), { cache: "no-store" });
  if (!response.ok) {
    throw new Error(`Could not load reviews (${response.status}).`);
  }

  const result = (await response.json()) as ReviewsResponse;
  if (!result.status || !Array.isArray(result.payload?.data)) {
    throw new Error(result.message || "The reviews response has an unexpected format.");
  }

  return result.payload.data.filter((review) => review.productId === productId);
}
