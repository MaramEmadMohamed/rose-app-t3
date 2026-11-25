// _components/product-info.tsx  (Server)
import { getTranslations } from "next-intl/server";
import { Package, Star } from "lucide-react";
import ProductActions from "./product-actions";
import { Product } from "@/features/product_overveiw/lib/products/types";

export default async function ProductInfo({
  product,
  locale,
}: {
  product: Product;
  locale: string;
}) {
  const t = await getTranslations("product");

  const plain = new Intl.NumberFormat(locale, { maximumFractionDigits: 2 });
  const money = new Intl.NumberFormat(locale, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return (
    <div className="flex h-full min-h-0 flex-col">
      {/* Title */}
      <h1 className="text-3xl font-semibold leading-tight">{product.title}</h1>

      {/* Price + stock */}
      <div className="mt-2 flex flex-wrap items-center gap-3">
        {product.hasDiscount && (
          <span className="text-3xl font-bold text-gray-400 line-through">
            {plain.format(product.price)}
          </span>
        )}
        <span className="text-3xl font-bold">
          {money.format(product.finalPrice)}
        </span>
        <span className="text-lg">{t("currency")}</span>

        <span className="inline-flex items-center gap-2 rounded-full bg-muted px-4 py-2 text-sm">
          <Package className="size-5" />
          {t("inStock", { count: product.stock })}
        </span>
      </div>

      <hr className="my-4 border-border" />

      {/* Rating */}
      <div className="flex items-center gap-2 text-base font-medium">
        <Star className="size-5 fill-amber-400 text-amber-400" />
        <span>{t("rating", { rating: product.rating })}</span>
        <a href="#reviews" className="text-blue-600 hover:underline">
          {t("ratings", { count: product.ratings })}
        </a>
      </div>

      <hr className="my-4 border-border" />

      <div className="min-h-0 flex-1 overflow-y-auto pe-2">
        <p className="text-base leading-6 text-muted-foreground">
          {product.description}
        </p>
      </div>

     
      <div className="shrink-0 pt-6">
        <ProductActions productId={product.id} disabled={product.stock <= 0} />
      </div>
    </div>
  );
}