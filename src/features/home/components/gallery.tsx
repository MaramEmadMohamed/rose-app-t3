import Image from "next/image";
import Heading from "./section-heading";
import { getTranslations } from "next-intl/server";

export default async function Gallery() {
  const t = await getTranslations("Gallery");
  return (
    <section className="w-full py-12 md:py-16">
      <div className="mx-auto max-w-7xl px-4">
        <Heading
          label={t("label")}
          title={t("title")}
          highlight={t("highlight")}
        />
        <div className="grid aspect-[1.23/1] w-full grid-cols-3 grid-rows-5 gap-1 md:gap-1.5">
          <div className="relative col-start-1 row-start-1 row-span-3 overflow-hidden">
            <Image
              src="/images/gallery/main-1.png"
              alt={t("image1")}
              fill
              sizes="(max-width: 768px) 33vw, 25vw"
              className="object-cover"
            />
          </div>
          <div className="relative col-start-1 row-start-4 row-span-2 overflow-hidden">
            <Image
              src="/images/gallery/main-2.png"
              alt={t("image2")}
              fill
              sizes="(max-width: 768px) 33vw, 25vw"
              className="object-cover"
            />
          </div>

          <div className="relative col-start-2 row-start-1 row-span-2 overflow-hidden">
            <Image
              src="/images/gallery/1.png"
              alt={t("image3")}
              fill
              sizes="(max-width: 768px) 33vw, 25vw"
              className="object-cover"
            />
          </div>

          <div className="relative col-start-2 row-start-3 row-span-3 overflow-hidden">
            <Image
              src="/images/gallery/2.png"
              alt={t("image4")}
              fill
              sizes="(max-width: 768px) 33vw, 25vw"
              className="object-cover"
            />
          </div>

          <div className="relative col-start-3 row-start-1 row-span-2 overflow-hidden">
            <Image
              src="/images/gallery/3.png"
              alt={t("image5")}
              fill
              sizes="(max-width: 768px) 33vw, 25vw"
              className="object-cover"
            />
          </div>

          <div className="relative col-start-3 row-start-3 row-span-3 overflow-hidden">
            <Image
              src="/images/gallery/4.png"
              alt={t("image6")}
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
