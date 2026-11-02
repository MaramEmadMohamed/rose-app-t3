import { getBestSelling } from "../api/get-best-selling";
import BestSellingCarousel from "./best-selling-carousel";
import { ArrowRight } from "lucide-react";

export default async function BestSelling() {
  const products = await getBestSelling();

  if (!products.length) return null;

  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-12 lg:px-6">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[250px_minmax(0,1fr)] lg:items-center lg:gap-8">
        {/* Left Content */}
        <div className="flex flex-col items-start">
          <span className="mb-2.5 text-[16px] font-bold uppercase tracking-[0.3em] text-[#ff668b]">
            Best Selling
          </span>

          <h2 className="max-w-72.75 h-22.5 text-[30px] font-bold leading-[1.05] text-[#741c21] tracking-tight dark:text-[#f4e9e8]">
            <span className="text-[#ff668b]">Check Out{" "}</span>
            <span >
              What Everyone’s  <span className="text-[#ff668b]">Buying</span> <br />Right Now
            </span>
          </h2>

          <p className="mt-2 max-w-72.75 mb-2.5 h-28.5 text-[16px] font-normal leading-[120%] text-muted-foreground dark:text-[#c8c1c2]">
            Not sure what to choose? Start with our best sellers, these are the
            gifts our customers keep coming back for. Whether you’re celebrating
            a birthday, anniversary or wedding, our top picks are guaranteed to
            leave a lasting impression.
          </p>

          <button
            type="button"
            className="mt-7 inline-flex items-center gap-2 rounded-md bg-[#b52832] px-4 py-2 text-[11px] font-medium text-white transition-opacity hover:opacity-90 dark:bg-[#f6b4c3] dark:text-[#6f2029]"
          >
            Explore gifts
            <ArrowRight size={14} />
          </button>
        </div>

        {/* Right Content */}
        <div className="min-w-0">
          <BestSellingCarousel products={products} />
        </div>
      </div>
    </section>
  );
}
