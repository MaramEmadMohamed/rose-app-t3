import type { Review } from "../types";
import { RatingStars } from "./rating-stars";

function formatDate(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

export function ReviewItem({ review }: { review: Review }) {
  const fullName = [review.user?.firstName, review.user?.lastName]
    .filter(Boolean)
    .join(" ");
  const name = fullName || review.user?.username || "Customer";

  return (
    <article className="mb-2 border-b border-[#e8e7ec] px-1 pb-3 dark:border-[#39393e]">
      <div className="mb-1.5 flex items-center gap-2">
        <span className="grid size-11.5 shrink-0 place-items-center rounded-full bg-[#ad252c] text-[13px] font-bold text-white" aria-hidden="true">
          {name[0]?.toUpperCase()}
        </span>
        <div className="grid gap-0.5">
          <strong className=" font-semibold">{name}</strong>
          <time className="text-[9px] text-[#84838b] dark:text-[#aaa9b1]" dateTime={review.createdAt}>
            {formatDate(review.createdAt)}
          </time>
        </div>
      </div>
      <div className="my-2.5">
        <RatingStars rating={review.rating} />
      </div>
      <h3 className="mt-3.5 mb-1.5 text-base font-semibold text-[#3c3b40] dark:text-black">{review.headline}</h3>
      <p className=" wrap-break-word font-normal  leading-[1.45] text-[#84838b] dark:text-[rgb(82,82,91)]">
        {review.content}
      </p>
    </article>
  );
}
