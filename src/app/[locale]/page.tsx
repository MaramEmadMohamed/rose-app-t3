import { setRequestLocale } from "next-intl/server";

import { AboutSection } from "@/components/home/about/about-section";
import { Hero } from "@/components/home/hero/hero";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main className="flex flex-1 flex-col gap-20 py-10">
      <Hero />
      <AboutSection />
    </main>
  );
}
