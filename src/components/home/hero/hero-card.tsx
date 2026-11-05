import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";

import { Link } from "@/i18n/navigation";

import { PHOTO_BUTTON_CLASS_NAME } from "../home-styles";
import { ImageBackground } from "../image-background";
import { ImageBadge } from "../image-badge";

export function HeroCard() {
  // Translation
  const t = useTranslations("Hero");

  return (
    <article className="relative isolate flex h-110 flex-col justify-end gap-2.5 overflow-hidden rounded-2xl bg-maroon-700 p-6 text-white">
      <ImageBackground
        src="/images/home/hero-card.jpg"
        sizes="(min-width: 1024px) 300px, 100vw"
        overlayClassName="bg-black/10"
      />

      <ImageBadge>{t("cardBadge")}</ImageBadge>
      <h2 className="text-2xl leading-none font-semibold">{t("cardTitle")}</h2>
      <Link href="/products" className={PHOTO_BUTTON_CLASS_NAME}>
        {t("cardAction")}
        <ArrowRight aria-hidden="true" className="size-4 rtl:rotate-180" />
      </Link>
    </article>
  );
}
