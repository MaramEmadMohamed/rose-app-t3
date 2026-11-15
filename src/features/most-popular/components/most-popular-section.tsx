"use client";

import { useRef, useState, type ReactNode } from "react";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";
import BestSellingCard from "../../best-selling/components/best-selling-card";
import type { Product } from "../../best-selling/types";
import type { MostPopularTab } from "../constants";

interface Props {
  tabs: MostPopularTab[];
  initialTab: string;
  initialProducts: Product[];
  heading?: ReactNode;
}

export default function MostPopularSection({ tabs, initialTab, initialProducts, heading }: Props) {
  const t = useTranslations("MostPopular");
  // State
  const [activeTab, setActiveTab] = useState(initialTab);
  const [products, setProducts] = useState(initialProducts);
  const [isLoading, setIsLoading] = useState(false);
  const [unavailable, setUnavailable] = useState(false);

  // Ref
  const requestId = useRef(0);

  // Functions
  async function selectTab(label: string, occasionId: string | null) {
    const currentRequest = ++requestId.current;
    setActiveTab(label);
    setIsLoading(true);
    setUnavailable(false);

    try {
      const query = new URLSearchParams();
      if (occasionId) query.set("occasionId", occasionId);

      const response = await fetch(`/api/most-popular?${query.toString()}`);

      if (!response.ok) throw new Error("Unable to load products.");

      const result = (await response.json()) as {
        products: Product[];
        unavailable: boolean;
      };

      if (currentRequest !== requestId.current) return;
      setProducts(result.products);
      setUnavailable(result.unavailable);
    } catch {
      if (currentRequest !== requestId.current) return;
      setProducts([]);
      setUnavailable(false);
    } finally {
      if (currentRequest === requestId.current) setIsLoading(false);
    }
  }

  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-10 lg:px-6">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-4">
        {heading}

        <div className="flex flex-wrap items-center gap-4 sm:gap-6">
          {tabs.map((tab) => (
            <button
              key={tab.label}
              type="button"
              aria-pressed={activeTab === tab.label}
              onClick={() => selectTab(tab.label, tab.occasionId)}
              className={`text-xs transition-colors hover:text-[#b52832] dark:hover:text-[#ff9eae] sm:text-sm ${
                activeTab === tab.label
                  ? "font-semibold text-[#b52832] dark:text-[#ff9eae]"
                  : "text-muted-foreground"
              }`}
            >
              {t(`occasions.${tab.label}`)}
            </button>
          ))}
        </div>
      </div>

      {isLoading ? (
        <div
          className="grid grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-3 lg:grid-cols-4"
          aria-label={t("loading")}
          aria-busy="true"
        >
          {Array.from({ length: 12 }, (_, index) => (
            <div key={index} className="aspect-square animate-pulse rounded-xl bg-muted" />
          ))}
        </div>
      ) : products.length ? (
        <div className="grid grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-3 lg:grid-cols-4">
          {products.slice(0, 12).map((product) => (
            <BestSellingCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <p className="py-16 text-center text-sm text-muted-foreground">
          {unavailable
            ? t("unavailable", { category: t(`occasions.${activeTab}`) })
            : t("empty", { category: t(`occasions.${activeTab}`) })}
        </p>
      )}

      <div className="mt-8 flex justify-end">
        <Link
          href="/products"
          className="inline-flex items-center gap-2 text-xs font-semibold text-[#8e252c] underline-offset-4 hover:underline dark:text-[#ff9eae]"
        >
          {t("viewMore")} <ArrowRight size={14} aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}
