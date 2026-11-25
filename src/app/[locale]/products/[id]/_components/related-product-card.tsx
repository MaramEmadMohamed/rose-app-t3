// _components/related-product-card.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { HeartPlus, ShoppingCart, Star } from "lucide-react";
import { useTranslations } from "next-intl";
import type { RelatedProduct } from "@/features/product_overveiw/lib/products/get-related-products";

export default function RelatedProductCard({
  product,
  locale,
}: {
  product: RelatedProduct;
  locale: string;
}) {
  const t = useTranslations("product");
  const money = new Intl.NumberFormat(locale, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  const outOfStock = product.stock <= 0;
  const stars = Math.round(product.rating);

  const badge =
    "rounded-full px-3 py-1 text-xs font-medium uppercase leading-none";

  return (
    <article className="group">
      <div className="bg-muted relative aspect-11/10 overflow-hidden rounded-2xl">
        <Link
          href={`/${locale}/products/${product.id}`}
          className="absolute inset-0"
        >
          <Image
            src={product.cover}
            alt={product.title}
            fill
            unoptimized
            sizes="(min-width: 1024px) 25vw, 70vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </Link>

        {/* Wishlist */}
        {!outOfStock && (
          <button
            type="button"
            aria-label={t("addToWishlist")}
            className="absolute inset-s-3 top-3 z-10 grid size-8 place-items-center rounded-full bg-white text-red-800 shadow-sm"
          >
            <HeartPlus className="size-4" />
          </button>
        )}

        {/* Badges */}
        <div className="pointer-events-none absolute inset-e-3 top-3 z-10 flex items-center gap-1.5">
          {product.isHot && (
            <span className={`${badge} bg-red-50 text-red-800`}>
              {t("hot")}
            </span>
          )}
          {product.isNew && (
            <span className={`${badge} bg-gray-100 text-gray-700`}>
              {t("new")}
            </span>
          )}
          {outOfStock && (
            <span className={`${badge} bg-red-600 text-white`}>
              {t("outOfStock")}
            </span>
          )}
        </div>
      </div>

      <div className="mt-3 flex items-center justify-between gap-2">
        <div className="min-w-0 space-y-1.5">
          <h3 className="truncate text-base font-medium text-red-800">
            {product.title}
          </h3>

          <div className="flex gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={
                  i < stars
                    ? "size-4 fill-amber-400 text-amber-400"
                    : "size-4 text-amber-400"
                }
              />
            ))}
          </div>

          <p className="flex flex-wrap items-center gap-x-2 text-[15px]">
            <span className="font-medium text-red-800">
              {money.format(product.finalPrice)} {t("currency")}
            </span>
            {product.hasDiscount && (
              <span className="text-gray-400 line-through">
                {money.format(product.price)} {t("currency")}
              </span>
            )}
          </p>
        </div>

        <button
          type="button"
          disabled={outOfStock}
          aria-label={t("addToCart")}
          className="grid size-11 shrink-0 place-items-center rounded-full bg-[#A6252A] text-white transition hover:bg-[#8a1f23] disabled:cursor-not-allowed"
        >
          <ShoppingCart className="size-5" />
        </button>
      </div>
    </article>
  );
}
