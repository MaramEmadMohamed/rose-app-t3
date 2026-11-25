import { getTranslations } from "next-intl/server";
import { getRelatedProducts } from "@/features/product_overveiw/lib/products/get-related-products";
import RelatedProductsCarousel from "./related-products-carousel";

export default async function RelatedProducts({
  productId,
  categoryId,
  locale,
}: {
  productId: string;
  categoryId: string;
  locale: string;
}) {
  const [t, products] = await Promise.all([
    getTranslations("product"),
    getRelatedProducts(productId, categoryId),
  ]);

  if (products.length === 0) return null;

  return (
    <section className="space-y-5">
      <h2 className="relative isolate inline-block text-xl leading-tight font-bold text-[#7A1A21] sm:text-2xl lg:text-3xl">
        <span
          aria-hidden
          className="absolute inset-s-0 -bottom-1 -z-10 h-[45%] w-[55%] rounded-full bg-[#FFDDE3]"
        />
        <span
          aria-hidden
          className="absolute inset-s-0 -bottom-1 -z-10 h-0.5 w-[30%] bg-[#E0506E]"
        />
        {t("relatedProducts")}
      </h2>

      <RelatedProductsCarousel products={products} locale={locale} />
    </section>
  );
}
