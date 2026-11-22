import { z } from "zod";

export const reviewSchema = z.object({
  headline: z
    .string()
    .trim()
    .min(3, "Headline must be at least 3 characters")
    .max(100, "Headline must not exceed 100 characters"),

  content: z
    .string()
    .trim()
    .min(5, "Review must be at least 5 characters"),

  rating: z
    .number()
    .min(1, "Please select a rating")
    .max(5, "Rating cannot exceed 5"),
});

export type ReviewFormValues = z.infer<typeof reviewSchema>;