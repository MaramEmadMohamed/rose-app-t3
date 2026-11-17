"use client";

import { Heart } from "lucide-react";
import { useTranslations } from "next-intl";
import { toast } from "sonner";

import { useWishlist, useWishlistActions } from "@/hooks/use-wishlist";
import { isAuthenticated } from "@/lib/auth/access-token";
import { FOCUS_RING_CLASS_NAME } from "@/lib/styles/focus-ring";
import { cn } from "@/lib/utils";

// The heart on top of a product photo. Other tickets put it on their cards.
// Fixed colors: the design keeps it the same in both themes.
export function WishlistButton({ productId }: { productId: string }) {
  // Translation
  const t = useTranslations("Wishlist");

  // Query
  const { data: items } = useWishlist();

  // Custom hooks
  const { add, remove } = useWishlistActions();

  // Variables
  const savedItem = items?.find((item) => item.product.id === productId);
  const label = savedItem ? t("remove") : t("add");

  // Functions
  function toggleWishlist() {
    // TODO: the meeting didn't say what a guest sees here. Ask the mentor.
    if (!isAuthenticated()) {
      toast.info(t("loginRequired"));
      return;
    }

    if (savedItem) remove.mutate(savedItem.id);
    else add.mutate(productId);
  }

  return (
    <button
      type="button"
      onClick={toggleWishlist}
      disabled={add.isPending || remove.isPending}
      aria-label={label}
      aria-pressed={Boolean(savedItem)}
      className={cn(
        "group flex h-7.5 min-w-7.5 items-center justify-center gap-1.5 rounded-full px-1.5 text-xs leading-none font-medium transition-colors disabled:opacity-60",
        savedItem ? "bg-zinc-800 text-white" : "bg-white text-maroon-600",
        FOCUS_RING_CLASS_NAME,
      )}
    >
      <Heart
        aria-hidden="true"
        size={18}
        className={cn(savedItem && "fill-current")}
      />
      <span
        aria-hidden="true"
        className="hidden group-hover:inline group-focus-visible:inline"
      >
        {label}
      </span>
    </button>
  );
}
