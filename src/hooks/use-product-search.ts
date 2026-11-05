import { keepPreviousData, useQuery } from "@tanstack/react-query";

import { getProducts } from "@/lib/api/products";
import {
  SEARCH_RESULTS_LIMIT,
  SUGGESTED_PRODUCTS_LIMIT,
} from "@/lib/constants/search";

// Empty search term: "Products you may like" (the most wishlisted products).
// Otherwise: the products whose title matches the search term.
export function useProductSearch(searchTerm: string) {
  return useQuery({
    queryKey: ["products", "search", searchTerm],
    queryFn: () =>
      searchTerm
        ? getProducts({ search: searchTerm, limit: SEARCH_RESULTS_LIMIT })
        : getProducts({
            sortBy: "mostPopular",
            sortOrder: "desc",
            limit: SUGGESTED_PRODUCTS_LIMIT,
          }),
    // Keep the last list on screen while the next one loads.
    placeholderData: keepPreviousData,
  });
}
