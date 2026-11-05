import { useTranslations } from "next-intl";

import { useProductSearch } from "@/hooks/use-product-search";

import { SearchResultItem } from "./search-result-item";

type SearchPanelProps = {
  id: string;
  searchTerm: string;
  onSelect: () => void;
};

const STATUS_CLASS_NAME = "p-4 text-sm text-soft";

export function SearchPanel({ id, searchTerm, onSelect }: SearchPanelProps) {
  // Translation
  const t = useTranslations("Header");

  // Query
  const { data: products, isPending, isError } = useProductSearch(searchTerm);

  return (
    <div
      id={id}
      className="absolute inset-x-0 top-full z-40 mt-2 overflow-hidden rounded-3xl bg-plain shadow-soft-lg"
    >
      {!searchTerm && (
        <p className="border-b border-subtle px-4 py-3 font-semibold text-primary-saturated">
          {t("searchSuggestionsTitle")}
        </p>
      )}

      {isPending && (
        <p role="status" className={STATUS_CLASS_NAME}>
          {t("searchLoading")}
        </p>
      )}

      {isError && (
        <p role="alert" className={STATUS_CLASS_NAME}>
          {t("searchError")}
        </p>
      )}

      {products?.length === 0 && (
        <p role="status" className={STATUS_CLASS_NAME}>
          {t("searchNoResults", { searchTerm })}
        </p>
      )}

      {products && products.length > 0 && (
        <ul className="max-h-[min(30rem,60vh)] overflow-y-auto p-2">
          {products.map((product) => (
            <SearchResultItem
              key={product.id}
              product={product}
              highlight={searchTerm}
              onSelect={onSelect}
            />
          ))}
        </ul>
      )}
    </div>
  );
}
