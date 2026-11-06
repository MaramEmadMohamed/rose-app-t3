import Image from "next/image";
import Heading from "./heading";

export default function Gallery() {
  return (
    <section className="w-full py-12 md:py-16">
      <div className="mx-auto max-w-7xl px-4">
        {/* Section Heading */}
        <Heading
          Heading="Gallery"
          SubHeading1="Check Out"
          SubHeading2="our Wonderful Gallery"
        />
        <div className="grid aspect-[1.23/1] w-full grid-cols-3 grid-rows-5 gap-1 md:gap-1.5">
          {/* Left column: 617px over 406px, scaled to the gallery width. */}
          <div className="relative col-start-1 row-start-1 row-span-3 overflow-hidden">
            <Image
              src="/images/gallery/main-1.png"
              alt="Red birthday gift boxes"
              fill
              sizes="(max-width: 768px) 33vw, 25vw"
              className="object-cover"
            />
          </div>
          <div className="relative col-start-1 row-start-4 row-span-2 overflow-hidden">
            <Image
              src="/images/gallery/main-2.png"
              alt="Roses and chocolate gift"
              fill
              sizes="(max-width: 768px) 33vw, 25vw"
              className="object-cover"
            />
          </div>

          {/* Center and right columns: 411px over 617px, scaled to the gallery width. */}
          <div className="relative col-start-2 row-start-1 row-span-2 overflow-hidden">
            <Image
              src="/images/gallery/1.png"
              alt="Red engagement gift boxes"
              fill
              sizes="(max-width: 768px) 33vw, 25vw"
              className="object-cover"
            />
          </div>

          <div className="relative col-start-2 row-start-3 row-span-3 overflow-hidden">
            <Image
              src="/images/gallery/2.png"
              alt="Engagement ring surrounded by roses"
              fill
              sizes="(max-width: 768px) 33vw, 25vw"
              className="object-cover"
            />
          </div>

          <div className="relative col-start-3 row-start-1 row-span-2 overflow-hidden">
            <Image
              src="/images/gallery/3.png"
              alt="Engagement ring gift box"
              fill
              sizes="(max-width: 768px) 33vw, 25vw"
              className="object-cover"
            />
          </div>

          <div className="relative col-start-3 row-start-3 row-span-3 overflow-hidden">
            <Image
              src="/images/gallery/4.png"
              alt="Engagement invitation and ring box"
              fill
              sizes="(max-width: 768px) 33vw, 25vw"
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
