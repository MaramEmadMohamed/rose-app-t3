export function RatingStars({
  rating,
  label,
}: {
  rating: number;
  label?: string;
}) {
  return (
    <span
      className="inline-flex gap-px whitespace-nowrap  text-xl leading-none tracking-[-1.5px] text-[#ff9900]"
      aria-label={label ?? `${rating} out of 5 stars`}
    >
      {Array.from({ length: 5 }, (_, index) => {
        const value = index + 1;
        const isFull = rating >= value;
        const isHalf = !isFull && rating >= value - 0.5;
        return (
          <span
            key={value}
            aria-hidden="true"
            className={ isHalf ? " bg-linear-to-r from-[#ff9900] from-50% to-[#aaa9b1] to-50% bg-clip-text text-transparent " : undefined}
          >
            {isFull || isHalf ? "★" : "☆"}
          </span>
        );
      })}
    </span>
  );
}
