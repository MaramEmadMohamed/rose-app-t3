import { useTranslations } from "next-intl";

import { Link } from "@/i18n/navigation";
import { FOCUS_RING_CLASS_NAME } from "@/lib/styles/focus-ring";
import { cn } from "@/lib/utils";

import { ImageBackground } from "../image-background";
import { ImageBadge } from "../image-badge";

// Each id is also the prefix of the card's texts in the "Hero" messages,
// e.g. "weddingLabel" and "weddingTitle".
const OCCASIONS = [
  { id: "wedding", image: "/images/home/occasion-wedding.jpg" },
  { id: "engagement", image: "/images/home/occasion-engagement.jpg" },
  { id: "anniversary", image: "/images/home/occasion-anniversary.jpg" },
] as const;

export function HeroOccasions() {
  // Translation
  const t = useTranslations("Hero");

  return (
    <ul className="grid gap-6 md:grid-cols-3">
      {OCCASIONS.map((occasion) => (
        <li key={occasion.id}>
          <Link
            href="/products"
            className={cn(
              "relative isolate flex h-67.5 flex-col justify-end gap-2 overflow-hidden rounded-2xl bg-primary p-5 text-white",
              FOCUS_RING_CLASS_NAME,
            )}
          >
            <ImageBackground
              src={occasion.image}
              sizes="(min-width: 768px) 410px, 100vw"
            />
            <ImageBadge>{t(`${occasion.id}Label`)}</ImageBadge>
            <h3 className="text-xl leading-tight font-semibold">
              {t(`${occasion.id}Title`)}
            </h3>
          </Link>
        </li>
      ))}
    </ul>
  );
}
