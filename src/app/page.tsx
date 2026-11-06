import Gallery from "@/components/ui/gallery";
import TrustedCompanies from "@/components/ui/trusted-companies";
import BestSelling from "./feature/best-selling/components/BestSelling";
import MostPopular from "./feature/most-popular/components/MostPopular";
import Testimonials from "./feature/testimonials/components/Testimonials";

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
