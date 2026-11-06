"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import BestSellingCard from "../../best-selling/components/best-selling-card";
import type { Product } from "../../best-selling/types";
import type { MostPopularTab } from "../constants";
import Heading from "@/components/ui/heading";

interface Props {
  tabs: MostPopularTab[];
  initialTab: string;
  initialProducts: Product[];
}

export default function MostPopularSection({ tabs, initialTab, initialProducts }: Props) {
  const [activeTab, setActiveTab] = useState(initialTab);
  const [products, setProducts] = useState(initialProducts);
  const [isLoading, setIsLoading] = useState(false);
  const [unavailable, setUnavailable] = useState(false);
  const requestId = useRef(0);

  async function selectTab(label: string, occasionId: string | null) {
    const currentRequest = ++requestId.current;
    setActiveTab(label);
    setIsLoading(true);
    setUnavailable(false);

    try {
      const response = await fetch("/api/most-popular", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ occasionId }),
      });

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
        <h2 className="text-xl font-bold text-[#741c21] dark:text-[#ffd4dc] md:text-2xl">
         <Heading  Heading={""} SubHeading1="Most " SubHeading2="Popular" />
        </h2>

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
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {isLoading ? (
        <div
          className="grid grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-3 lg:grid-cols-4"
          aria-label="Loading products"
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
            ? `${activeTab} products are not available in the API yet.`
            : `No products found for ${activeTab}.`}
        </p>
      )}

      <div className="mt-8 flex justify-end">
        <Link
          href="/products"
          className="inline-flex items-center gap-2 text-xs font-semibold text-[#8e252c] underline-offset-4 hover:underline dark:text-[#ff9eae]"
        >
          View More <ArrowRight size={14} aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}
