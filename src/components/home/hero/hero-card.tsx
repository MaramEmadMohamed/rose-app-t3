import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";

import { Link } from "@/i18n/navigation";
import { FOCUS_RING_CLASS_NAME } from "@/lib/styles/focus-ring";
import { cn } from "@/lib/utils";

export function HeroCard() {
  // Translation
  const t = useTranslations("Hero");

  return (
    <article className="relative isolate flex h-110 flex-col justify-end gap-4 overflow-hidden rounded-2xl bg-primary p-6 text-white">
      <Image
        src="/images/home/hero-card.jpg"
        alt=""
        fill
        sizes="(min-width: 1024px) 300px, 100vw"
        className="-z-10 object-cover"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-linear-to-t from-black/70 to-transparent"
      />

      <p className="w-fit rounded-full bg-plain px-2.5 py-0.5 text-xs font-medium text-primary-saturated">
        {t("cardBadge")}
      </p>
      <h2 className="text-2xl leading-tight font-bold">{t("cardTitle")}</h2>
      <Link
        href="/products"
        className={cn(
          "flex w-fit items-center gap-2 rounded-lg bg-plain px-4 py-2 text-sm font-medium text-primary-saturated transition-opacity hover:opacity-90",
          FOCUS_RING_CLASS_NAME,
        )}
      >
        {t("cardAction")}
        <ArrowRight aria-hidden="true" className="size-4 rtl:rotate-180" />
      </Link>
    </article>
  );
}
