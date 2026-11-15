import "server-only";

import { API_URL } from "@/lib/api-url";
import type { Product, ProductsResponse } from "../../best-selling/types";
import { MOST_POPULAR_LIMIT } from "../constants";

export async function getProductsForOccasion(
  occasionId?: string,
): Promise<Product[]> {
  if (!API_URL) return [];

  try {
    const url = new URL("/api/products", API_URL);
    url.searchParams.set("page", "1");
    url.searchParams.set("limit", String(MOST_POPULAR_LIMIT));
    url.searchParams.set("sortBy", "mostPopular");
    url.searchParams.set("sortOrder", "desc");

    if (occasionId) url.searchParams.set("occasionId", occasionId);

    const response = await fetch(url.href, { cache: "no-store" });
    if (!response.ok) return [];

    const result = (await response.json()) as ProductsResponse;
    return (result.payload?.data ?? []).slice(0, MOST_POPULAR_LIMIT);
  } catch {
    return [];
  }
}
