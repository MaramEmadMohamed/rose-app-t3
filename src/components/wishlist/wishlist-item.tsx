import { ShoppingCart, Star, Trash2 } from "lucide-react";
import Image from "next/image";
import { useFormatter, useTranslations } from "next-intl";

import { useWishlistActions } from "@/hooks/use-wishlist";
import { Link } from "@/i18n/navigation";
import { getFinalPrice } from "@/lib/api/products";
import type { WishlistItem as WishlistItemData } from "@/lib/api/wishlist";
import { FOCUS_RING_CLASS_NAME } from "@/lib/styles/focus-ring";
import { cn } from "@/lib/utils";

const ACTION_BUTTON_CLASS_NAME = cn(
  "flex h-11 items-center justify-center gap-2.5 rounded-lg px-6 leading-none font-medium transition-opacity hover:opacity-90",
  FOCUS_RING_CLASS_NAME,
);

export function WishlistItem({ item }: { item: WishlistItemData }) {
  // Translation
  const t = useTranslations("Wishlist");
  const format = useFormatter();

  // Custom hooks
  const { remove } = useWishlistActions();

  // Variables
  const { product } = item;
  const isInStock = product.stock > 0;
  const originalPrice = Number(product.price);
  const finalPrice = getFinalPrice(product);
  const hasDiscount = finalPrice < originalPrice;
  const priceOptions = { maximumFractionDigits: 2 };

  return (
    <li className="flex flex-wrap gap-4 border-b border-subtle pb-5 sm:flex-nowrap">
      <Image
        src={product.cover}
        alt=""
        width={117}
        height={140}
        className={cn(
          "h-35 w-29.25 shrink-0 rounded-lg object-cover",
          !isInStock && "opacity-25",
        )}
      />

      <div className="flex min-w-0 flex-1 flex-col justify-between gap-3">
        <div className="flex flex-col gap-1.5">
          <p
            className={cn(
              "text-sm leading-none font-semibold",
              isInStock ? "text-success" : "text-danger",
            )}
          >
            {isInStock ? t("inStock") : t("outOfStock")}
          </p>
          <h2 className="text-xl leading-none font-semibold text-plain">
            {product.title}
          </h2>
          <p className="flex items-center gap-1.5 py-0.5 text-sm leading-none">
            {/* Fixed colors: the yellow badge keeps dark text in both themes. */}
            <span className="flex items-center gap-1.5 rounded-lg bg-warning px-1.5 py-1 font-medium text-zinc-800">
              <Star aria-hidden="true" size={16} className="fill-current" />
              {t("rating", {
                rating: format.number(product.rating, {
                  maximumFractionDigits: 1,
                }),
              })}
            </span>
            <span className="text-info">
              {t("ratingsCount", { count: product.ratings })}
            </span>
          </p>
        </div>

        <p className="flex flex-wrap items-baseline gap-2 leading-none text-plain">
          <span>
            <span className="text-2xl font-bold">
              {format.number(finalPrice, priceOptions)}
            </span>{" "}
            <span className="text-sm">{t("currency")}</span>
          </span>
          {hasDiscount && (
            <del className="text-lg font-medium text-muted">
              {format.number(originalPrice, priceOptions)}{" "}
              <span className="text-sm">{t("currency")}</span>
            </del>
          )}
        </p>
      </div>

      <div className="flex w-full items-center justify-between gap-3 sm:w-auto sm:flex-col sm:items-end">
        <button
          type="button"
          onClick={() => remove.mutate(item.id)}
          disabled={remove.isPending}
          aria-label={t("removeItem", { title: product.title })}
          className={cn(
            "flex size-12 items-center justify-center rounded-lg bg-danger-fade text-danger transition-opacity hover:opacity-80 disabled:opacity-60",
            FOCUS_RING_CLASS_NAME,
          )}
        >
          <Trash2 aria-hidden="true" size={20} />
        </button>

        {isInStock ? (
          // TODO: the Product List ticket owns add to cart. Connect it here.
          <button
            type="button"
            className={cn(ACTION_BUTTON_CLASS_NAME, "bg-primary text-inverse")}
          >
            <ShoppingCart aria-hidden="true" size={20} />
            {t("addToCart")}
          </button>
        ) : (
          <Link
            href={{
              pathname: "/products",
              query: { categoryId: product.categoryId },
            }}
            className={cn(
              ACTION_BUTTON_CLASS_NAME,
              "bg-primary-fade text-primary",
            )}
          >
            {t("exploreSimilar")}
          </Link>
        )}
      </div>
    </li>
  );
}
