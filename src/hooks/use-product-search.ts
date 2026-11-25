import { keepPreviousData, useQuery } from "@tanstack/react-query";

import { getProducts } from "@/lib/api/products";
import {
  SEARCH_RESULTS_LIMIT,
  SUGGESTED_PRODUCTS_LIMIT,
} from "@/lib/constants/search";

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
    placeholderData: keepPreviousData,
  });
}
