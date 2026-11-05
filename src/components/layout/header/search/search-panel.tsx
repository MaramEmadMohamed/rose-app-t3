import { useTranslations } from "next-intl";

import {
  useProductSearch,
  useSuggestedProducts,
} from "@/hooks/use-product-search";
import type { Product } from "@/lib/api/products";

import { SearchResultItem } from "./search-result-item";

type SearchPanelProps = {
  id: string;
  searchTerm: string;
  onSelect: () => void;
};

const STATUS_CLASS_NAME = "p-4 text-sm text-soft";

// Shows "Products you may like" while the box is empty, and the matching
// products once the user types.
export function SearchPanel({ id, searchTerm, onSelect }: SearchPanelProps) {
  // Translation
  const t = useTranslations("Header");

  // Query
  const hasSearchTerm = searchTerm.length > 0;
  const suggestions = useSuggestedProducts(!hasSearchTerm);
  const results = useProductSearch(searchTerm);

  // Variables
  const {
    data: products,
    isPending,
    isError,
  } = hasSearchTerm ? results : suggestions;

  // Functions
  function renderProducts(items: Product[]) {
    return (
      <ul className="max-h-[min(30rem,60vh)] overflow-y-auto p-2">
        {items.map((product) => (
          <SearchResultItem
            key={product.id}
            product={product}
            highlight={searchTerm}
            onSelect={onSelect}
          />
        ))}
      </ul>
    );
  }

  return (
    <div
      id={id}
      className="absolute inset-x-0 top-full z-40 mt-2 overflow-hidden rounded-3xl bg-plain shadow-soft-lg"
    >
      {!hasSearchTerm && (
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

      {products && products.length > 0 && renderProducts(products)}
    </div>
  );
}
