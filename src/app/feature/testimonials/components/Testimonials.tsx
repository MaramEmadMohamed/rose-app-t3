import Heading from "@/components/ui/heading";
import { getTestimonials } from "../api/get-testimonials";
import TestimonialsCarousel from "./testimonials-carousel";

export default async function Testimonials() {
  const testimonials = await getTestimonials();

  return <>
  
  <Heading Heading="Testimonials" SubHeading1="Real Words" SubHeading2="from Happy Customers" />
  <TestimonialsCarousel testimonials={testimonials} />
  </>;
}
