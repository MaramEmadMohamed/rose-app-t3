import "server-only";

import { API_URL } from "@/lib/api-url";
import type { Testimonial, TestimonialsResponse } from "../types";


export async function getTestimonials(): Promise<Testimonial[]> {
  if (!API_URL) return [];

  try {
    const url = new URL("/api/testimonials", API_URL);
    const response = await fetch(url, { next: { revalidate: 3600 } });

    if (!response.ok) return [];

    const result = (await response.json()) as TestimonialsResponse;
    return result.payload?.data ?? [];
  } catch {
    return [];
  }
}
