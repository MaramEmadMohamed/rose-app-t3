import { Testimonial, TestimonialsResponse } from "@/app/types/testimonials";
import "server-only";



export async function getTestimonials(): Promise<Testimonial[]> {
  const apiBaseUrl = process.env.API?.trim();
  if (!apiBaseUrl) return [];

  try {
    const url = new URL("/api/testimonials", apiBaseUrl);
    const response = await fetch(url, { next: { revalidate: 3600 } });

    if (!response.ok) return [];

    const result = (await response.json()) as TestimonialsResponse;
    return result.payload?.data ?? [];
  } catch {
    return [];
  }
}
