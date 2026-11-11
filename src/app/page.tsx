import Gallery from "@/features/home/components/gallery";
import TrustedCompanies from "@/features/home/components/trusted-companies";
import BestSelling from "@/features/best-selling/components/best-selling";
import MostPopular from "@/features/most-popular/components/most-popular";
import Testimonials from "@/features/testimonials/components/testimonials";

export default function Home() {
  return (
    <>
      <BestSelling />
      <MostPopular />
      <Gallery />
      <Testimonials />
      <TrustedCompanies />
    </>
  );
}
