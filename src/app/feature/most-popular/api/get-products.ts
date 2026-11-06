import "server-only";

import type { Product, ProductsResponse } from "../../best-selling/types";
import { MOST_POPULAR_LIMIT } from "../constants";

export async function getProductsForOccasion(
  occasionId?: string,
): Promise<Product[]> {
  const apiBaseUrl = process.env.API?.trim();
  if (!apiBaseUrl) return [];

  try {
    const url = new URL("/api/products", apiBaseUrl);
    url.searchParams.set("page", "1");
    url.searchParams.set("limit", String(MOST_POPULAR_LIMIT));

    if (occasionId) url.searchParams.set("occasionId", occasionId);

    const response = await fetch(url, { cache: "no-store" });
    if (!response.ok) return [];

    const result = (await response.json()) as ProductsResponse;
    return (result.payload?.data ?? []).slice(0, MOST_POPULAR_LIMIT);
  } catch {
    return [];
  }
}
