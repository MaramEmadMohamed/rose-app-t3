"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import type { Product } from "../types";
import BestSellingCard from "./best-selling-card";

interface Props {
  products: Product[];
}

export default function BestSellingCarousel({ products }: Props) {
  return (
    <Carousel
      opts={{
        align: "start",
        loop: products.length > 3,
      }}
      className="group/carousel w-full px-1 sm:px-0"
    >
      <CarouselContent className="-ms-3">
        {products.map((product) => (
          <CarouselItem
            key={product.id}
            className="basis-[82%] ps-3 sm:basis-1/2 lg:basis-1/3"
          >
            <BestSellingCard product={product} />
          </CarouselItem>
        ))}
      </CarouselContent>

      <CarouselPrevious className="start-0 dark:bg-[#b52832] z-10 size-7 border-0 bg-[#b52832] text-white shadow-md hover:bg-[#9f2029] hover:text-white disabled:opacity-60" />

      <CarouselNext className="end-0 dark:bg-[#b52832] z-10 size-7 border-0 bg-[#b52832] text-white shadow-md hover:bg-[#9f2029] hover:text-white disabled:opacity-60" />
    </Carousel>
  );
}
