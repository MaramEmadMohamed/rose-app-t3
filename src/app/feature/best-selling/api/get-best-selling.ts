import "server-only";

import {
  BEST_SELLING_LIMIT,
  BEST_SELLING_REVALIDATE,
  PRODUCTS_PAGE_SIZE,
} from "../constants";

import type {
  Product,
  ProductsResponse,
} from "../types";

async function fetchProductsPage(
  page: number
): Promise<ProductsResponse> {
  const apiBaseUrl = process.env.API?.trim();

  if (!apiBaseUrl) {
    throw new Error("API is not set. Add the API base URL to .env and restart the dev server.");
  }

  let url: URL;

  try {
    url = new URL("/api/products", apiBaseUrl);
  } catch {
    throw new Error("API must be a valid absolute URL, such as https://api.example.com.");
  }

  url.searchParams.set("page", String(page));
  url.searchParams.set("limit", String(PRODUCTS_PAGE_SIZE));

  const response = await fetch(url, {
    next: {
      revalidate: BEST_SELLING_REVALIDATE,
      tags: ["products", "best-selling"],
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  return response.json();
}

export async function getBestSelling(): Promise<Product[]> {
  const firstPage = await fetchProductsPage(1);

  const { totalPages } = firstPage.payload.metadata;

  const remainingPages = Array.from(
    { length: Math.max(0, totalPages - 1) },
    (_, index) => index + 2
  );

  const remainingResults = await Promise.all(
    remainingPages.map(fetchProductsPage)
  );

  const allProducts = [
    ...firstPage.payload.data,
    ...remainingResults.flatMap(
      (result) => result.payload.data
    ),
  ];

  return allProducts
    .filter((product) => product.deletedAt === null)
    .sort(
      (a, b) =>
        b._count.orderItems - a._count.orderItems
    )
    .slice(0, BEST_SELLING_LIMIT);
}
