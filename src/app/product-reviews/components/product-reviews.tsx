import type { Review } from "../types";
import { getReviews } from "../api/get-reviews";
import { ReviewForm } from "./review-form";
import { ReviewsList } from "./reviews-list";
import { ReviewsSummary } from "./reviews-summary";

export async function ProductReviews({ productId }: { productId: string }) {
  let reviews: Review[] = [];
  let error = "";

  try {
    reviews = await getReviews(productId);
  } catch (cause) {
    error = cause instanceof Error ? cause.message : "Could not load product reviews.";
  }

  return (
    <section className="max-w-full container text-[#3c3b40] dark:text-[rgb(39,39,42)]" aria-labelledby="product-reviews-heading">
      <ReviewsSummary reviews={reviews} />
      <div className="grid grid-cols-1 items-stretch min-[560px]:grid-cols-[minmax(0,1.45fr)_minmax(220px,1fr)] min-[900px]:grid-cols-[minmax(0,1.55fr)_minmax(280px,1fr)]">
        <ReviewsList reviews={reviews} error={error} />
        <ReviewForm productId={productId} />
      </div>
    </section>
  );
}
