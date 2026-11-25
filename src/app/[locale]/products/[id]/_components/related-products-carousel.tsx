"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { RelatedProduct } from "@/features/product_overveiw/lib/products/get-related-products";
import RelatedProductCard from "./related-product-card";

export default function RelatedProductsCarousel({
  products,
  locale,
}: {
  products: RelatedProduct[];
  locale: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const scroll = (dir: "prev" | "next") => {
    const el = ref.current;
    if (!el) return;
    const rtl = getComputedStyle(el).direction === "rtl";
    const sign = (dir === "next" ? 1 : -1) * (rtl ? -1 : 1);
    el.scrollBy({ left: sign * el.clientWidth * 0.8, behavior: "smooth" });
  };

  const arrow =
    "absolute top-1/3 z-10 grid size-7 -translate-y-1/2 place-items-center rounded-full bg-[#A6252A] text-white shadow transition hover:bg-[#8a1f23]";

  return (
    <div className="relative">
      <button
        type="button"
        aria-label="Previous"
        onClick={() => scroll("prev")}
        className={`${arrow} inset-s-0 -translate-x-1/2 rtl:translate-x-1/2`}
      >
        <ChevronLeft className="size-4 rtl:rotate-180" />
      </button>

      <div
        ref={ref}
        className="flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-2 scrollbar-none [&::-webkit-scrollbar]:hidden"
      >
        {products.map((p) => (
          <div
            key={p.id}
            className="w-[70%] shrink-0 snap-start sm:w-[calc((100%-16px)/2)] lg:w-[calc((100%-48px)/4)]"
          >
            <RelatedProductCard product={p} locale={locale} />
          </div>
        ))}
      </div>

      <button
        type="button"
        aria-label="Next"
        onClick={() => scroll("next")}
        className={`${arrow} inset-e-0 translate-x-1/2 rtl:-translate-x-1/2`}
      >
        <ChevronRight className="size-4 rtl:rotate-180" />
      </button>
    </div>
  );
}