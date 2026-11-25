"use server";
import type { ApiProduct, ApiResponse, Product } from "./types";

function getBaseUrl() {
  const url = process.env.API_URL;
  if (!url) throw new Error("API_URL is not defined in .env.local");
  return url.replace(/\/$/, "");
}

function parseGallery(gallery: string): string[] {
  try {
    const parsed = JSON.parse(gallery);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function mapProduct(p: ApiProduct): Product {
  const price = Number(p.price);
  const discount = Number(p.discountValue) || 0;

  let finalPrice = price;
  if (p.discountType === "PERCENT") finalPrice = price - (price * discount) / 100;
  else if (p.discountType === "FIXED") finalPrice = price - discount;
  finalPrice = Math.max(finalPrice, 0);

  return {
    ...p,
    price,
    finalPrice,
    hasDiscount: finalPrice < price,
    images: [p.cover, ...parseGallery(p.gallery)],
  };
}

export async function getProduct(id: string): Promise<Product | null> {
  const url = `${getBaseUrl()}/products/${id}`;

  try {
    const res = await fetch(url, { next: { revalidate: 60 } });

    if (res.status === 404) return null;
    if (!res.ok) throw new Error(`Failed to fetch product (${res.status})`);

    const json: ApiResponse<{ product: ApiProduct }> = await res.json();
    return json.payload?.product ? mapProduct(json.payload.product) : null;
  } catch (e) {
    console.error("FETCH URL:", url);
    console.error("FETCH ERROR CAUSE:", (e as { cause?: unknown }).cause ?? e);
    throw e;
  }
}