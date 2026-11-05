import { ArrowRight, Check } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";

import { Link } from "@/i18n/navigation";
import { FOCUS_RING_CLASS_NAME } from "@/lib/styles/focus-ring";
import { cn } from "@/lib/utils";

// Keys of the short selling points in the "About" messages.
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
      className="mx-auto grid w-full max-w-320 items-center gap-10 px-4 lg:grid-cols-2 lg:gap-20"
    >
      <div className="grid h-80 grid-cols-[3fr_2fr] gap-4 sm:h-97">
        <div className="relative">
          <div
            aria-hidden="true"
            className="absolute -inset-2 rounded-[5rem] border-2 border-primary-saturated"
          />
          <Image
            src="/images/home/about-gift.jpg"
            alt=""
            fill
            sizes="(min-width: 1024px) 360px, 60vw"
            className="rounded-[4.5rem] object-cover"
          />
        </div>
        <div className="grid grid-rows-2 gap-4">
          <div className="relative">
            <Image
              src="/images/home/about-confetti.jpg"
              alt=""
              fill
              sizes="(min-width: 1024px) 240px, 40vw"
              className="rounded-full object-cover"
            />
          </div>
          <div className="relative">
            <Image
              src="/images/home/about-balloons.jpg"
              alt=""
              fill
              sizes="(min-width: 1024px) 240px, 40vw"
              className="rounded-[3rem] object-cover"
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col items-start gap-6">
        <div className="flex flex-col gap-2">
          {/* Arabic letters are joined, so spacing them out would break the word. */}
          <p className="text-sm font-semibold tracking-[0.3em] text-secondary uppercase rtl:tracking-normal">
            {t("label")}
          </p>
          <h2
            id="about-title"
            className="text-3xl leading-tight font-bold text-primary-saturated"
          >
            {t.rich("title", {
              highlight: (chunks) => (
                <span className="text-secondary">{chunks}</span>
              ),
            })}
          </h2>
          <p className="text-soft">{t("description")}</p>
        </div>

        <Link
          href="/products"
          className={cn(
            "flex items-center gap-2 rounded-lg bg-primary-saturated px-4 py-2 font-medium text-inverse transition-opacity hover:opacity-90",
            FOCUS_RING_CLASS_NAME,
          )}
        >
          {t("action")}
          <ArrowRight aria-hidden="true" className="size-4 rtl:rotate-180" />
        </Link>

        <ul className="grid w-full gap-x-6 gap-y-4 text-sm text-plain sm:grid-cols-2">
          {ABOUT_FEATURE_KEYS.map((key) => (
            <li key={key} className="flex items-center gap-3">
              <Check
                aria-hidden="true"
                className="size-5 shrink-0 text-primary-saturated"
              />
              {t(key)}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
