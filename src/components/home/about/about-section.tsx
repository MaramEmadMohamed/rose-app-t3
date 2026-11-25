import { ArrowRight, Check } from "lucide-react";
import { useTranslations } from "next-intl";

import { Link } from "@/i18n/navigation";
import { FOCUS_RING_CLASS_NAME } from "@/lib/styles/focus-ring";
import { cn } from "@/lib/utils";

import { AboutImages } from "./about-images";

const ABOUT_FEATURE_KEYS = [
  "featurePrices",
  "featureQuality",
  "featureOccasions",
  "featureDelivery",
] as const;

export function AboutSection() {
  // Translation
  const t = useTranslations("About");

  return (
    <section
      aria-labelledby="about-title"
      className="mx-auto grid w-full max-w-320 items-center gap-10 px-4 lg:grid-cols-[33.125rem_1fr] lg:gap-20"
    >
      <AboutImages />

      <div className="flex flex-col items-start gap-6">
        <div className="flex flex-col gap-2">
          {/* Arabic letters are joined, so spacing them out would break the word. */}
          <p className="font-bold tracking-[0.25em] text-soft-pink-500 uppercase rtl:tracking-normal dark:text-maroon-400">
            {t("label")}
          </p>
          <h2
            id="about-title"
            className="text-3xl leading-none font-bold text-primary-saturated"
          >
            {t.rich("title", {
              highlight: (chunks) => (
                <span className="text-soft-pink-500 dark:text-maroon-400">
                  {chunks}
                </span>
              ),
            })}
          </h2>
          <p className="leading-none text-soft">{t("description")}</p>
        </div>

        <Link
          href="/products"
          className={cn(
            "flex items-center gap-2.5 rounded-xl bg-primary-saturated px-4 py-2.5 leading-none text-inverse transition-opacity hover:opacity-90",
            FOCUS_RING_CLASS_NAME,
          )}
        >
          {t("action")}
          <ArrowRight aria-hidden="true" className="size-4 rtl:rotate-180" />
        </Link>

        <ul className="grid w-full gap-x-6 text-sm leading-none text-plain sm:grid-cols-2">
          {ABOUT_FEATURE_KEYS.map((key) => (
            <li key={key} className="flex h-8.75 items-center gap-2">
              <span className="flex size-10.5 shrink-0 items-center justify-center">
                <Check
                  aria-hidden="true"
                  size={20}
                  absoluteStrokeWidth
                  className="text-primary-saturated"
                />
              </span>
              {t(key)}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
