import Image from "next/image";
import { ShoppingCart, Star } from "lucide-react";
import type { Product } from "../types";

interface BestSellingCardProps {
  product: Product;
  isHot?: boolean;
}

function getDiscountedPrice(product: Product) {
  const price = Number(product.price);
  const discount = Number(product.discountValue ?? 0);

  if (
    !Number.isFinite(price) ||
    !Number.isFinite(discount) ||
    price < 0
  ) {
    return null;
  }

  if (product.discountType === "PERCENT") {
    return price * (1 - discount / 100);
  }

  if (product.discountType === "FIXED") {
    return Math.max(0, price - discount);
  }

  return price;
}

function formatPrice(price: number) {
  return new Intl.NumberFormat("en-EG", {
    maximumFractionDigits: 2,
  }).format(price);
}

export default function BestSellingCard({
  product,
  isHot = false,
}: BestSellingCardProps) {
  const discountedPrice = getDiscountedPrice(product);

  const hasDiscount =
    discountedPrice !== null &&
    discountedPrice < Number(product.price);

  const isOutOfStock = product.stock <= 0;
  const filledStars = Math.max(0, Math.min(5, Math.round(product.rating || 0)));

  return (
    <article className="group min-w-0">
      <div className="relative aspect-[1.02/1] me-6 overflow-hidden rounded-[16px] bg-[#eee9e4]">
        {product.cover && (
          <Image
            src={product.cover}
            alt={product.title}
            fill
            // sizes="(max-width: 302px) 80vw, (max-width: 1023px) 40vw, 25vw"
            className="object-cover max-w-75.5  h-68 hover:cursor-pointer transition-transform duration-300 group-hover:scale-105"
          />
        )}

        <div className="absolute left-2 right-2 top-2 flex flex-wrap items-start justify-end gap-1">
          {isHot && (
            <span className="rounded-full bg-[#ed6675] px-2 py-0.5 text-[9px] font-semibold text-white">
              HOT
            </span>
          )}

          {isOutOfStock && (
            <span className="rounded-full bg-[#e84242] px-2 py-0.5 text-[9px] font-semibold text-white">
              OUT OF STOCK
            </span>
          )}
        </div>
      </div>

      <div className="mt-2 space-y-0.5">
        <h3 className="truncate text-[18px] font-semibold text-[#681d24] dark:text-[#f2d9dd]">
          {product.title}
        </h3>

        <div
          className="flex items-center gap-1"
          aria-label={`Rated ${product.rating} out of 5`}
        >
          <span className="flex items-center" aria-hidden="true">
            {Array.from({ length: 5 }, (_, index) => (
              <Star
                key={index}
                size={12}
                className={index < filledStars ? "fill-[#f7a600] text-[#f7a600]" : "text-[#d8d1cc]"}
              />
            ))}
          </span>

          <span className="text-[16px] text-muted-foreground dark:text-[#aaa2a5]">
            ({product._count.reviews})
          </span>
        </div>

        <div className="flex flex-wrap items-center text-[16px] font-semibold gap-1.5 ">
          {discountedPrice !== null && (
            <span className="font-semibold text-[#8e252c] dark:text-[#ff9eae]">
              {formatPrice(discountedPrice)} EGP
            </span>
          )}

          {hasDiscount && (
            <span className="text-muted-foreground line-through dark:text-[#aaa2a5]">
              {formatPrice(Number(product.price))} EGP
            </span>
          )}
          <button
            type="button"
            aria-label={`Add ${product.title} to cart`}
            className="ml-auto inline-flex size-10 shrink-0 items-center justify-center rounded-full bg-[#b52832] text-white shadow-sm transition-colors hover:bg-[#9f2029]"
          >
            <ShoppingCart size={20} aria-hidden="true" />
          </button>
        </div>
      </div>
    </article>
  );
}
