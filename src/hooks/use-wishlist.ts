import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { toast } from "sonner";

import {
  addToWishlist,
  clearWishlist,
  deleteWishlistItemById,
  getWishlist,
} from "@/lib/api/wishlist";
import { isAuthenticated } from "@/lib/auth/access-token";

const WISHLIST_QUERY_KEY = ["wishlist"];

export function useWishlist() {
  return useQuery({
    queryKey: WISHLIST_QUERY_KEY,
    queryFn: getWishlist,
    enabled: isAuthenticated(),
  });
}

// Every wishlist change refreshes the list and shows the same error message.
function useWishlistMutation<TVariables>(
  mutationFn: (variables: TVariables) => Promise<unknown>,
) {
  // Translation
  const t = useTranslations("Wishlist");

  // Context
  const queryClient = useQueryClient();

  // Mutation
  return useMutation({
    mutationFn,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: WISHLIST_QUERY_KEY }),
    onError: () => toast.error(t("actionError")),
  });
}

export function useWishlistActions() {
  // Custom hooks
  const add = useWishlistMutation(addToWishlist);
  const deleteItem = useWishlistMutation(deleteWishlistItemById);
  const clear = useWishlistMutation(clearWishlist);

  return { add, deleteItem, clear };
}
