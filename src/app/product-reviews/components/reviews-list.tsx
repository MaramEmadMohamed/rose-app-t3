import type { Review } from "../types";
import { ReviewItem } from "./review-item";

export function ReviewsList({ reviews, error }: { reviews: Review[]; error?: string }) {
  return (
    <div
      className="h-[clamp(230px,42vh,390px)] min-w-0 overflow-x-hidden overflow-y-auto overscroll-y-contain py-3 pr-4 max-[559px]:h-[280px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f39ab7]"
      aria-label="Customer reviews"
      tabIndex={0}
    >
      {error ? (
        <p className="m-0 px-1 py-2.5 text-xs leading-relaxed text-[#df5361]">{error}</p>
      ) : reviews.length === 0 ? (
        <p className="m-0 px-1 py-2.5 text-xs leading-relaxed text-[#84838b] dark:text-[#aaa9b1]">
          No reviews yet. Be the first to review this product.
        </p>
      ) : (
        reviews.map((review) => <ReviewItem key={review.id} review={review} />)
      )}
    </div>
  );
}
