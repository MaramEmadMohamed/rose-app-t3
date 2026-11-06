"use client";

import Image from "next/image";
import { Star } from "lucide-react";
import type { Testimonial } from "../api/get-testimonials";

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  const date = new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(testimonial.createdAt));

  return (
    <article className="relative mt-14 h-62.5 flex aspect-404/433 w-[min(76vw,404px)] shrink-0 flex-col items-center rounded-2xl bg-white px-6 pb-6 pt-14 text-center shadow-[0_10px_30px_rgba(117,28,38,0.08)] dark:bg-[#30272a] sm:w-[calc((100vw-7.75rem)/3)] sm:max-w-101">
      <div className="absolute -top-12 left-1/2 size-24 -translate-x-1/2 overflow-hidden rounded-full border-4 border-white bg-[#f4dfe3] dark:border-[#30272a]">
        {testimonial.image ? (
          <Image
            src={testimonial.image}
            alt={testimonial.name}
            fill
            sizes="76px"
            className="object-cover"
          />
        ) : (
          <span className="flex size-full items-center justify-center text-3xl font-semibold uppercase text-[#8e252c] dark:text-[#ffb5c5]">
            {testimonial.name.trim().charAt(0) || "?"}
          </span>
        )}
      </div>

      <h3 className="text-base font-semibold text-[#3c3032] dark:text-[#fff0f2]">
        {testimonial.name}
      </h3>

      <div
        className="mt-9.5 mb-2.5 flex items-center justify-center"
        aria-label={`Rated ${testimonial.rating} out of 5`}
      >
        {Array.from({ length: 5 }, (_, index) => (
          <Star
            key={index}
            aria-hidden="true"
            size={18}
            className={
              index < Math.max(0, Math.min(5, testimonial.rating))
                ? "fill-[#f7a600] text-[#f7a600]"
                : "text-[#ded6d6]"
            }
          />
        ))}
      </div>

      <p className="mt-4 line-clamp-4 text-sm leading-relaxed text-[#463c3d] dark:text-[#e1d7d9]">
        {testimonial.content}
      </p>

      <time
        dateTime={testimonial.createdAt}
        className="mt-auto pt-5 text-xs text-[#aaa0a2]"
      >
        {date}
      </time>
    </article>
  );
}

export default function TestimonialsCarousel({
  testimonials,
}: {
  testimonials: Testimonial[];
}) {
  if (!testimonials.length) return null;

  return (
    <section
      aria-label="Customer testimonials"
      className="overflow-hidden bg-[#fbedef] dark:bg-[rgb(63,63,70)] md:py-12"
    >
      <div className="mx-auto w-full max-w-334 overflow-hidden">
        <div className="testimonials-marquee ">
          {[0, 1].map((copy) => (
            <div
              key={copy}
              className="testimonials-marquee-group"
              aria-hidden={copy === 1}
            >
              {testimonials.map((testimonial, index) => (
                <TestimonialCard
                  key={`${copy}-${testimonial.id}-${index}`}
                  testimonial={testimonial}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
