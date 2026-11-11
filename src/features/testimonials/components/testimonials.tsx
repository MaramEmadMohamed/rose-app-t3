import Heading from "@/features/home/components/section-heading";
import { getTestimonials } from "../api/get-testimonials";
import TestimonialsCarousel from "./testimonials-carousel";

export default async function Testimonials() {
  const testimonials = await getTestimonials();

  return (
    <>
      <Heading
        label="Testimonials"
        title="Real Words"
        highlight="from Happy Customers"
      />
      <TestimonialsCarousel testimonials={testimonials} />
    </>
  );
}
