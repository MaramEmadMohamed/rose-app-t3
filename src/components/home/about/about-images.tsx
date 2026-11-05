import Image from "next/image";

import { cn } from "@/lib/utils";

// Corner sizes from the design: only the top-start corner is less rounded.
const GIFT_SHAPE_CLASS_NAME =
  "rounded-ss-[50px] rounded-se-[120px] rounded-ee-[120px] rounded-es-[120px]";

// The three photos of the About section, placed like the design (530 x 377).
// Positions are percentages of the design sizes, so the group scales down
// on small screens without changing its shape.
export function AboutImages() {
  return (
    <div className="mx-auto flex w-full max-w-132.5 items-center gap-2">
      <div className="relative aspect-[329/377] w-[62%] shrink-0">
        {/* The tilted outline sits behind the photo, so only its top and
            start edges show. */}
        <div
          aria-hidden="true"
          className={cn(
            "absolute start-[2.9%] top-[1.9%] h-[96.3%] w-[81.6%] rotate-[3.09deg] border-4 border-maroon-600 rtl:-rotate-[3.09deg]",
            GIFT_SHAPE_CLASS_NAME,
          )}
        />
        <div
          className={cn(
            "absolute start-[8.3%] top-[6.4%] h-[91.3%] w-[91.7%] overflow-hidden",
            GIFT_SHAPE_CLASS_NAME,
          )}
        >
          <Image
            src="/images/home/about-gift.jpg"
            alt=""
            fill
            sizes="(min-width: 1024px) 302px, 60vw"
            className="object-cover"
          />
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-2">
        <div className="relative aspect-square overflow-hidden rounded-full">
          <Image
            src="/images/home/about-confetti.jpg"
            alt=""
            fill
            sizes="(min-width: 1024px) 193px, 35vw"
            className="object-cover"
          />
        </div>
        <div className="relative aspect-[193/144] overflow-hidden rounded-ss-[50px] rounded-se-[100px] rounded-ee-[100px] rounded-es-[50px]">
          <Image
            src="/images/home/about-balloons.jpg"
            alt=""
            fill
            sizes="(min-width: 1024px) 193px, 35vw"
            className="object-cover"
          />
        </div>
      </div>
    </div>
  );
}
