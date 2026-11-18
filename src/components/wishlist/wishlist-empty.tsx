import { HeartCrack } from "lucide-react";
import { useTranslations } from "next-intl";

// Same look as the empty cart in the design: there is no empty wishlist frame.
export function WishlistEmpty() {
  // Translation
  const t = useTranslations("Wishlist");

  return (
    <div className="flex h-98.75 flex-col items-center justify-center gap-4 rounded-md border border-muted p-5">
      <HeartCrack
        aria-hidden="true"
        size={120}
        strokeWidth={1}
        className="text-muted"
      />
      <p className="text-center text-lg leading-none text-muted">
        {t("empty")}
      </p>
    </div>
  );
}
