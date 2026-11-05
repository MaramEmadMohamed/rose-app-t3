// Each id is also the prefix of the slide's texts in the "Hero" messages,
// e.g. "flowersTitle", "flowersSubtitle" and "flowersAction".
export const HERO_SLIDES = [
  { id: "flowers", image: "/images/home/hero-flowers.jpg", href: "/products" },
  {
    id: "chocolates",
    image: "/images/home/hero-chocolates.jpg",
    href: "/products",
  },
] as const;

// Enough time to read a slide's title and decide to click its button.
export const HERO_AUTOPLAY_DELAY_MS = 5000;

// Embla's slide speed: higher is slower and smoother (its default is 25).
export const HERO_SLIDE_DURATION = 40;
