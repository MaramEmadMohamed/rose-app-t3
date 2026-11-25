"use server";
import { notFound } from "next/navigation";
import { getProduct } from "@/features/product_overveiw/lib/products/get-product";
import ProductInfo from "./_components/product-info";
import ProductGallery from "./_components/product-gallery";
import RelatedProducts from "./_components/related-products";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { locale, id } = await params;
  const product = await getProduct(id);
  if (!product) notFound();

  return (
    <main className="mx-auto w-full max-w-7xl space-y-10 px-4 py-6 sm:px-6 md:space-y-16 md:py-10">
      <section className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-10">
        <div className="min-w-0">
          <ProductGallery images={product.images} title={product.title} />
        </div>
        <div className="min-w-0">
          <ProductInfo product={product} locale={locale} />
        </div>
      </section>

      <RelatedProducts
        productId={product.id}
        categoryId={product.categoryId}
        locale={locale}
      />
    </main>
  );
}
