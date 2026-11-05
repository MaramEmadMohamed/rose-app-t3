import { HeroCard } from "./hero-card";
import { HeroCarousel } from "./hero-carousel";

export function Hero() {
  return (
    <div className="mx-auto grid w-full max-w-320 gap-6 px-4 lg:grid-cols-[18.75rem_1fr]">
      <div className="order-2 lg:order-1">
        <HeroCard />
      </div>
      <div className="order-1 lg:order-2">
        <HeroCarousel />
      </div>
    </div>
  );
}
