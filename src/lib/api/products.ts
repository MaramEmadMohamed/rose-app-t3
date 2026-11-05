import { requestApi } from "./api-client";

export type DiscountType = "PERCENT" | "FIXED";

export type Product = {
  id: string;
  title: string;
  price: string;
  discountType: DiscountType | null;
  discountValue: string | null;
  rating: number;
  ratings: number;
  stock: number;
  cover: string;
};

export type ProductsSortBy =
  "title" | "price" | "rating" | "createdAt" | "bestSelling" | "mostPopular";

export type ProductsQuery = {
  search?: string;
  sortBy?: ProductsSortBy;
  sortOrder?: "asc" | "desc";
  limit?: number;
};

type ProductsResponse = {
  payload: {
    data: Product[];
  };
};

export async function getProducts({
  search,
  sortBy,
  sortOrder,
  limit,
}: ProductsQuery) {
  const params = new URLSearchParams();

  if (search) params.set("search", search);
  if (sortBy) params.set("sortBy", sortBy);
  if (sortOrder) params.set("sortOrder", sortOrder);
  if (limit) params.set("limit", String(limit));

  const response = await requestApi<ProductsResponse>(
    `/api/products?${params}`,
  );
  return response.payload.data;
}

// The API sends the original price and the discount separately.
export function getFinalPrice({ price, discountType, discountValue }: Product) {
  const originalPrice = Number(price);
  const discount = Number(discountValue ?? 0);

  if (discountType === "PERCENT") return originalPrice * (1 - discount / 100);
  if (discountType === "FIXED") return Math.max(originalPrice - discount, 0);
  return originalPrice;
}
