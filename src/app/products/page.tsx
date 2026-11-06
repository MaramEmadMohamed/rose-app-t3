import BestSellingCard from "../feature/best-selling/components/best-selling-card";
import { getProductsForOccasion } from "../feature/most-popular/api/get-products";

export default async function ProductsPage() {
  const products = await getProductsForOccasion();

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-10 lg:px-6">
      <h1 className="mb-6 text-2xl font-bold text-[#741c21] dark:text-[#ffd4dc]">
        Products
      </h1>

      {products.length ? (
        <div className="grid grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-3 lg:grid-cols-4">
          {products.map((product) => (
            <BestSellingCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <p className="py-16 text-center text-sm text-muted-foreground">
          No products found.
        </p>
      )}
    </main>
  );
}
