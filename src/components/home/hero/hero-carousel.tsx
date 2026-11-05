"use client";

import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { useEffect, useState } from "react";

import { Link } from "@/i18n/navigation";
import { FOCUS_RING_CLASS_NAME } from "@/lib/styles/focus-ring";
import { cn } from "@/lib/utils";

import { HERO_AUTOPLAY_DELAY_MS, HERO_SLIDES } from "./hero-slides";

const ARROW_BUTTON_CLASS_NAME = cn(
  "flex size-8 items-center justify-center rounded-full text-primary-saturated transition-colors hover:bg-secondary-faint",
  FOCUS_RING_CLASS_NAME,
);

export function HeroCarousel() {
  // Translation
  const t = useTranslations("Hero");
  const locale = useLocale();

  // State
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Custom hooks
  const [viewportRef, emblaApi] = useEmblaCarousel({
    loop: true,
    direction: locale === "ar" ? "rtl" : "ltr",
  });

  // Functions
  // The slides stay still while the mouse or the keyboard focus is on them.
  function pauseAutoplay() {
    setIsPaused(true);
  }

  function resumeAutoplay() {
    setIsPaused(false);
  }

  // Effects
  useEffect(() => {
    if (!emblaApi) return;

    function handleSelect() {
      if (emblaApi) setSelectedIndex(emblaApi.selectedScrollSnap());
    }

    emblaApi.on("select", handleSelect);
    return () => {
      emblaApi.off("select", handleSelect);
    };
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi || isPaused) return;

    // People who asked their system for less motion get no autoplay.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const timer = setInterval(
      () => emblaApi.scrollNext(),
      HERO_AUTOPLAY_DELAY_MS,
    );
    return () => clearInterval(timer);
  }, [emblaApi, isPaused]);

  return (
    <section
      aria-roledescription="carousel"
      aria-label={t("carouselLabel")}
      onMouseEnter={pauseAutoplay}
      onMouseLeave={resumeAutoplay}
      onFocus={pauseAutoplay}
      onBlur={resumeAutoplay}
      className="relative h-110 overflow-hidden rounded-2xl bg-primary"
    >
      <div ref={viewportRef} className="h-full overflow-hidden">
        <div className="flex h-full">
          {HERO_SLIDES.map((slide, index) => (
            <div
              key={slide.id}
              role="group"
              aria-roledescription="slide"
              aria-label={t("slidePosition", {
                current: index + 1,
                total: HERO_SLIDES.length,
              })}
              inert={index !== selectedIndex}
              className="relative isolate flex h-full min-w-0 shrink-0 grow-0 basis-full flex-col justify-end p-6 text-white sm:p-9"
            >
              <Image
                src={slide.image}
                alt=""
                fill
                sizes="(min-width: 1024px) 955px, 100vw"
                preload={index === 0}
                className="-z-10 object-cover"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 -z-10 bg-linear-to-t from-black/80 to-transparent"
              />

              <h2 className="text-3xl font-bold sm:text-4xl">
                {t(`${slide.id}Title`)}
              </h2>
              <p className="mt-1.5">{t(`${slide.id}Subtitle`)}</p>
              <Link
                href={slide.href}
                className={cn(
                  "mt-6 w-fit rounded-lg bg-secondary-fade px-4 py-2 font-medium text-primary-saturated transition-opacity hover:opacity-90",
                  FOCUS_RING_CLASS_NAME,
                )}
              >
                {t(`${slide.id}Action`)}
              </Link>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute end-6 top-6 flex items-center gap-2 sm:end-9 sm:top-9">
        {HERO_SLIDES.map((slide, index) => {
          const isSelected = index === selectedIndex;
          return (
            <button
              key={slide.id}
              type="button"
              onClick={() => emblaApi?.scrollTo(index)}
              aria-label={t("goToSlide", { number: index + 1 })}
              aria-current={isSelected}
              className={cn(
                "h-2 rounded-full transition-all",
                isSelected ? "w-8 bg-primary-saturated" : "w-2 bg-white",
                FOCUS_RING_CLASS_NAME,
              )}
            />
          );
        })}
      </div>

      {/* On phones the dots and swiping are enough, and the arrows would cover the button. */}
      <div className="absolute end-9 bottom-9 hidden items-center gap-1 rounded-full bg-secondary-fade p-1 sm:flex">
        <button
          type="button"
          onClick={() => emblaApi?.scrollPrev()}
          aria-label={t("previousSlide")}
          className={ARROW_BUTTON_CLASS_NAME}
        >
          <ChevronLeft aria-hidden="true" className="size-5 rtl:rotate-180" />
        </button>
        <button
          type="button"
          onClick={() => emblaApi?.scrollNext()}
          aria-label={t("nextSlide")}
          className={ARROW_BUTTON_CLASS_NAME}
        >
          <ChevronRight aria-hidden="true" className="size-5 rtl:rotate-180" />
        </button>
      </div>
    </section>
  );
}
