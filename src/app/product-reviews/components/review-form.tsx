"use client";

import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { createReview } from "../api/create-review";
import { reviewSchema, type ReviewFormValues } from "../schemas/review.schema";

export function ReviewForm({ productId }: { productId: string }) {
  const router = useRouter();
  const [submitError, setSubmitError] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ReviewFormValues>({
    resolver: zodResolver(reviewSchema),
    defaultValues: { headline: "", content: "", rating: 0 },
  });

  const onSubmit = async (values: ReviewFormValues) => {
    setSubmitError("");
    setSubmitSuccess(false);
    try {
      await createReview({ ...values, productId });
      reset();
      setSubmitSuccess(true);
      router.refresh();
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : "Could not submit your review.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex min-w-0 flex-col gap-2.5 border-t border-[#e8e7ec] pt-4 dark:border-[#39393e] min-[560px]:border-l min-[560px]:border-t-0 min-[560px]:pl-4 min-[560px]:pt-3"
    >
      <div className="flex min-h-6 items-center gap-2.5 text-[11px] font-semibold">
        <span id="your-rating-label  " className="text-base font-medium mb-3.5 mt-4">Your rating:</span>
        <Controller
          control={control}
          name="rating"
          render={({ field }) => (
            <div className="inline-flex items-center gap-0.5" role="radiogroup" aria-labelledby="your-rating-label">
              {Array.from({ length: 5 }, (_, index) => {
                const value = index + 1;
                return (
                  <button
                    key={value}
                    type="button"
                    className="cursor-pointer border-0 bg-transparent p-0 text-[21px] leading-none text-[#ff9900] focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f39ab7] disabled:cursor-not-allowed disabled:opacity-60"
                    role="radio"
                    aria-checked={field.value === value}
                    aria-label={`${value} ${value === 1 ? "star" : "stars"}`}
                    onClick={() => field.onChange(value)}
                    onBlur={field.onBlur}
                    disabled={!productId || isSubmitting}
                  >
                    {value <= field.value ? "★" : "☆"}
                  </button>
                );
              })}
            </div>
          )}
        />
      </div>
      {errors.rating && <p className="m-0 text-[10px] text-[#df5361]">{errors.rating.message}</p>}

      <label className="flex min-w-0 flex-col gap-1.5">
        <span className="text-[14px] font-normal">Title</span>
        <input
          {...register("headline")}
          className="h-9.25 w-full rounded-lg border border-[#dedde4]
           bg-white px-2.5 text-[11px] text-[#3c3b40] outline-none placeholder:text-[#84838b]
            focus:border-[#f39ab7] focus:ring-2 focus:ring-[#f39ab7]/20 disabled:cursor-not-allowed disabled:opacity-60
             dark:border-[#44444b] dark:bg-white dark:text-[#f0eff2] dark:placeholder:text-[#aaa9b1]
              dark:focus:border-[rgb(217,217,217)] dark:focus:ring-[#ff9cbb]/20"
          placeholder="Enter review title"
          maxLength={100}
          disabled={!productId || isSubmitting}
        />
        {errors.headline && <small className="text-[14px] font-normal text-[#df5361]">{errors.headline.message}</small>}
      </label>

      <label className="flex min-w-0 flex-col gap-1.5">
        <span className="text-[14px] font-normal">Review</span>
        <textarea
          {...register("content")}
          className="min-h-30.5 w-full resize-y rounded-lg border 
          border-[#dedde4] bg-white p-2.5 text-[11px] leading-relaxed text-[#3c3b40] 
          outline-none placeholder:text-[#84838b] focus:border-[#f39ab7] focus:ring-2
           focus:ring-[#f39ab7]/20 disabled:cursor-not-allowed disabled:opacity-60 
           dark:border-[#44444b] dark:bg-white dark:text-[#f0eff2] dark:placeholder:text-[#aaa9b1] dark:focus:border-[rgb(217,217,217)] dark:focus:ring-[#ff9cbb]/20"
          placeholder="What do you think of this product?"
          maxLength={3000}
          disabled={!productId || isSubmitting}
        />
        {errors.content && <small className="text-[14px] font-normal text-[#df5361]">{errors.content.message}</small>}
      </label>

      {submitError && <p className=" text-base text-[#df5361]" role="alert">{submitError}</p>}
      {submitSuccess && <p className=" text-base text-green-700 dark:text-green-400" role="status">Your review was added.</p>}
      <button
        type="submit"
        disabled={!productId || isSubmitting}
        className="min-h-9.25 rounded-lg border-0 bg-[#ff9cbb]  px-4 
        text-base font-semibold text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed
         disabled:opacity-55 dark:bg-[#ad252c] dark:text-[#432630]"
      >
        {isSubmitting ? "Adding review…" : "Add Review"}
      </button>
    </form>
  );
}
