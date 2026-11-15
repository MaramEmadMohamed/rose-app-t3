import "server-only";

import { API_URL } from "@/lib/api-url";
import {
  BEST_SELLING_LIMIT,
  BEST_SELLING_REVALIDATE,
} from "../constants";

import type {
  Product,
  ProductsResponse,
} from "../types";

export async function getBestSelling(): Promise<Product[]> {
  if (!API_URL) return [];

  try {
    const url = new URL("/api/products", API_URL);
    url.searchParams.set("sortBy", "bestSelling");
    url.searchParams.set("sortOrder", "desc");
    url.searchParams.set("limit", String(BEST_SELLING_LIMIT));

    const response = await fetch(url, {
      next: {
        revalidate: BEST_SELLING_REVALIDATE,
        tags: ["products", "best-selling"],
      },
    });

    if (!response.ok) return [];

    const result = (await response.json()) as ProductsResponse;
    return (result.payload?.data ?? [])
      .filter((product) => product.deletedAt === null)
      .slice(0, BEST_SELLING_LIMIT);
  } catch {
    return [];
  }
}
