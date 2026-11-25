// _components/product-gallery.tsx  (Client)
"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";

export default function ProductGallery({
  images,
  title,
}: {
  images: string[];
  title: string;
}) {
  const [active, setActive] = useState(0);

  return (
    <div className="space-y-3">
      {/* Main image */}
      <div className="relative aspect-3/2 w-full overflow-hidden rounded-xl bg-muted">
        <Image
          src={images[active]}
          alt={title}
          fill
          loading="eager"
          unoptimized
          sizes="(min-width: 768px) 50vw, 100vw"
          className="object-cover"
        />
      </div>

      {/* Thumbnails: مقاس ثابت 91x111 وبيعمل scroll أفقي لو زادوا */}
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {images.map((src, i) => (
            <button
              key={`${src}-${i}`}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`${title} ${i + 1}`}
              aria-current={i === active}
              className={cn(
                "relative h-[111px] w-[91px] shrink-0 overflow-hidden rounded-md border-2 bg-muted transition-colors",
                // overlay أسود 30% على الصور اللي مش active
                "after:pointer-events-none after:absolute after:inset-0 after:bg-black/30 after:transition-opacity",
                i === active
                  ? "border-[#A6252A] after:opacity-0"
                  : "border-transparent hover:border-[#A6252A]/50 hover:after:opacity-0"
              )}
            >
              <Image
                src={src}
                alt=""
                fill
                unoptimized
                sizes="91px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}