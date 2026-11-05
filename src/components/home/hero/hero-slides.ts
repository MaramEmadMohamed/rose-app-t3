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

// How long each slide stays before the carousel moves on by itself.
export const HERO_AUTOPLAY_DELAY_MS = 5000;
