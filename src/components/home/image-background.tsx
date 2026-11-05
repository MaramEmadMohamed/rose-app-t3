import Image from "next/image";

import { cn } from "@/lib/utils";

type ImageBackgroundProps = {
  src: string;
  sizes: string;
  overlayClassName: string;
  preload?: boolean;
};

// A photo that fills its parent with a dark layer on top, so the white text
// stays readable. Each place sets its own layer from the design.
// The parent needs "relative isolate".
export function ImageBackground({
  src,
  sizes,
  overlayClassName,
  preload,
}: ImageBackgroundProps) {
  return (
    <>
      <Image
        src={src}
        alt=""
        fill
        sizes={sizes}
        preload={preload}
        className="-z-10 object-cover"
      />
      <div
        aria-hidden="true"
        className={cn("absolute inset-0 -z-10", overlayClassName)}
      />
    </>
  );
}
