import { keepPreviousData, useQuery } from "@tanstack/react-query";

import { getProducts } from "@/lib/api/products";
import {
  SEARCH_RESULTS_LIMIT,
  SUGGESTED_PRODUCTS_LIMIT,
} from "@/lib/constants/search";

const SUGGESTIONS_STALE_TIME_MS = 5 * 60 * 1000;

// "Products you may like": the most wishlisted products, loaded only once
// the search box is opened.
export function useSuggestedProducts(isEnabled: boolean) {
  return useQuery({
    queryKey: ["products", "suggested"],
    queryFn: () =>
      getProducts({
        sortBy: "mostPopular",
        sortOrder: "desc",
        limit: SUGGESTED_PRODUCTS_LIMIT,
      }),
    enabled: isEnabled,
    staleTime: SUGGESTIONS_STALE_TIME_MS,
  });
}

export function useProductSearch(searchTerm: string) {
  return useQuery({
    queryKey: ["products", "search", searchTerm],
    queryFn: () =>
      getProducts({ search: searchTerm, limit: SEARCH_RESULTS_LIMIT }),
    enabled: searchTerm.length > 0,
    // Keep the last results on screen while the next ones load.
    placeholderData: keepPreviousData,
  });
}
