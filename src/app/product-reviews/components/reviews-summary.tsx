import type { Review } from "../types";
import { RatingStars } from "./rating-stars";

export function ReviewsSummary({ reviews }: { reviews: Review[] }) {
  const average = reviews.length
    ? reviews.reduce((total, review) => total + review.rating, 0) / reviews.length
    : 0;

  return (
    <header className="border-b border-[#e8e7ec] pb-3.5 dark:border-[#39393e]">
      <h2
        className="mb-2.5 w-fit border-b-[3px] border-[#f39ab7] text-[clamp(22px,2.4vw,28px)] font-bold leading-[1.15] tracking-[-0.035em] text-[#ad252c] dark:border-[#ff9cbb] dark:text-[#ff9cbb]"
        id="product-reviews-heading"
      >
        Product Reviews
      </h2>
      <p className="m-0 text-[20px] font-semibold">General rating:</p>
      <p className="my-1 flex items-baseline gap-1 leading-[1.1]">
        <strong className="text-[24px] font-bold">{average.toFixed(1)}</strong>
        <span className="text-[10px] text-[#84838b] dark:text-[#aaa9b1]">
          ({reviews.length} {reviews.length === 1 ? "rating" : "ratings"})
        </span>
      </p>
      <RatingStars rating={average} label={`Average rating: ${average.toFixed(1)} out of 5`} />
    </header>
  );
}
