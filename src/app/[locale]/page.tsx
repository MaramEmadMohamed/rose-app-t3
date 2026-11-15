import Gallery from "@/features/home/components/gallery";
import TrustedCompanies from "@/features/home/components/trusted-companies";
import BestSelling from "@/features/best-selling/components/best-selling";
import MostPopular from "@/features/most-popular/components/most-popular";
import Testimonials from "@/features/testimonials/components/testimonials";
import { getTranslations } from "next-intl/server";
import Heading from "@/features/home/components/section-heading";

export default async function Home() {
  const t = await getTranslations("MostPopular");
  return (
    <>
      <BestSelling />
      <MostPopular heading={<Heading label="" title={t("title")} highlight={t("highlight")} />} />
      <Gallery />
      <Testimonials />
      <TrustedCompanies />
    </>
  );
}
