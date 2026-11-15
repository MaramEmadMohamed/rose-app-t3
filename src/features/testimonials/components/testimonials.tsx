import Heading from "@/features/home/components/section-heading";
import { getTestimonials } from "../api/get-testimonials";
import TestimonialsCarousel from "./testimonials-carousel";
import { getTranslations } from "next-intl/server";

export default async function Testimonials() {
  const testimonials = await getTestimonials();
  const t = await getTranslations("Testimonials");

  return (
    <>
      <Heading
        label={t("label")}
        title={t("title")}
        highlight={t("highlight")}
      />
      <TestimonialsCarousel testimonials={testimonials} />
    </>
  );
}
