import { Star } from "lucide-react";
import Image from "next/image";
import { useFormatter, useTranslations } from "next-intl";

import { Link } from "@/i18n/navigation";
import { getFinalPrice, type Product } from "@/lib/api/products";

import { HighlightedText } from "./highlighted-text";

type SearchResultItemProps = {
  product: Product;
  highlight: string;
  onSelect: () => void;
};

export function SearchResultItem({
  product,
  highlight,
  onSelect,
}: SearchResultItemProps) {
  // Translation
  const t = useTranslations("Header");
  const format = useFormatter();

  // Variables
  const price = format.number(getFinalPrice(product), {
    maximumFractionDigits: 2,
  });
  const rating = format.number(product.rating, { maximumFractionDigits: 1 });

  return (
    <li>
      <Link
        href={`/products/${product.id}`}
        onClick={onSelect}
        className="flex items-center gap-4 rounded-xl p-2.5 outline-none hover:bg-subtle focus-visible:bg-subtle focus-visible:ring-3 focus-visible:ring-focus"
      >
        <Image
          src={product.cover}
          alt=""
          width={80}
          height={80}
          className="size-16 shrink-0 rounded-lg object-cover sm:size-20"
        />

        <div className="flex min-w-0 flex-1 flex-col gap-1 text-plain">
          <p className="truncate text-sm font-semibold">
            <HighlightedText text={product.title} highlight={highlight} />
          </p>
          <p>
            <span className="text-xl font-bold">{price}</span>{" "}
            <span className="text-xs">{t("currency")}</span>
          </p>
        </div>

        <p className="hidden shrink-0 items-center gap-1 text-sm text-plain sm:flex">
          <Star
            aria-hidden="true"
            className="size-5 fill-warning text-warning"
          />
          {t("searchRating", { rating })}
          <span className="text-info">
            {t("searchRatingsCount", { count: product.ratings })}
          </span>
        </p>
      </Link>
    </li>
  );
}
