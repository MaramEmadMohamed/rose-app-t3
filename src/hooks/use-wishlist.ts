import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { toast } from "sonner";

import {
  addToWishlist,
  clearWishlist,
  getWishlist,
  removeFromWishlist,
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

export function useWishlistActions() {
  // Translation
  const t = useTranslations("Wishlist");

  // Context
  const queryClient = useQueryClient();

  // Variables
  const mutationCallbacks = {
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: WISHLIST_QUERY_KEY }),
    onError: () => toast.error(t("actionError")),
  };

  // Mutation
  const add = useMutation({ mutationFn: addToWishlist, ...mutationCallbacks });
  const remove = useMutation({
    mutationFn: removeFromWishlist,
    ...mutationCallbacks,
  });
  const clear = useMutation({
    mutationFn: clearWishlist,
    ...mutationCallbacks,
  });

  return { add, remove, clear };
}
