// _components/product-actions.tsx  (Client)
"use client";

import { useMutation } from "@tanstack/react-query";
import { HeartPlus, ShoppingCart } from "lucide-react";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  addToCartAction,
  addToWishlistAction,
  type ActionResult,
} from "@/features/product_overveiw/lib/products/actions";
export default function ProductActions({
  productId,
  disabled,
}: {
  productId: string;
  disabled?: boolean;
}) {
  const t = useTranslations("product");

  const onDone = (res: ActionResult) =>
    res.success ? toast.success(res.message) : toast.error(res.message);

  const cart = useMutation({
    mutationFn: () => addToCartAction(productId),
    onSuccess: onDone,
    onError: () => toast.error(t("error")),
  });

  const wishlist = useMutation({
    mutationFn: () => addToWishlistAction(productId),
    onSuccess: onDone,
    onError: () => toast.error(t("error")),
  });

  return (
    <div className="flex items-center gap-3">
      <Button
        type="button"
        variant="ghost"
        size="icon"
        aria-label={t("addToWishlist")}
        disabled={wishlist.isPending}
        onClick={() => wishlist.mutate()}
        className="size-10 shrink-0 rounded-lg bg-muted text-foreground hover:bg-muted/70"
      >
        <HeartPlus className="size-5" />
      </Button>

      <Button
        type="button"
        disabled={disabled || cart.isPending}
        onClick={() => cart.mutate()}
        className="h-10 flex-1 rounded-md bg-primary text-primary-foreground"
      >
        <ShoppingCart className="size-5" />
        {t("addToCart")}
      </Button>
    </div>
  );
}