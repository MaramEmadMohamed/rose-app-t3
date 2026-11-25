import { HeroCard } from "./hero-card";
import { HeroCarousel } from "./hero-carousel";
import { HeroFeatures } from "./hero-features";
import { HeroOccasions } from "./hero-occasions";

export function Hero() {
  return (
    <div className="mx-auto flex w-full max-w-320 flex-col gap-6 px-4">
      <div className="grid gap-6 lg:grid-cols-[18.75rem_1fr]">
        <div className="order-2 lg:order-1">
          <HeroCard />
        </div>
        <div className="order-1 lg:order-2">
          <HeroCarousel />
        </div>
      </div>

      <HeroOccasions />
      <HeroFeatures />
    </div>
  );
}
