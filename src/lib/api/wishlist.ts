import { requestApi } from "./api-client";
import type { Product } from "./products";

const WISHLIST_PATH = "/api/wishlist";

// TODO: the API docs don't describe the response or which id DELETE expects.
// Check both with a real token, then update this type if needed.
export type WishlistItem = {
  id: string;
  product: Product;
};

type WishlistResponse = {
  payload: {
    data: WishlistItem[];
  };
};

export async function getWishlist() {
  const response = await requestApi<WishlistResponse>(WISHLIST_PATH);
  return response.payload.data;
}

export function addToWishlist(productId: string) {
  return requestApi(WISHLIST_PATH, {
    method: "POST",
    body: JSON.stringify({ productId }),
  });
}

export function removeFromWishlist(itemId: string) {
  return requestApi(`${WISHLIST_PATH}/${itemId}`, { method: "DELETE" });
}

export function clearWishlist() {
  return requestApi(WISHLIST_PATH, { method: "DELETE" });
}
