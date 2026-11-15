import Image from "next/image";
import { getTranslations } from "next-intl/server";

export default async function TrustedCompanies() {
  const t = await getTranslations("Companies");
  const companies = [
    { src: "/images/companies/5.png", alt: t("coconut") },
    { src: "/images/companies/4.png", alt: t("ginyard") },
    { src: "/images/companies/3.png", alt: t("ingoude") },
    { src: "/images/companies/2.png", alt: t("velvet") },
    { src: "/images/companies/1.png", alt: t("habu") },
  ];
  return (
    <section className="w-full px-4 py-8 md:py-10">
      <div className="mx-auto max-w-7xl  rounded-2xl bg-[#fbedef] px-5 py-5 dark:text-[rgb(63,63,70)] dark:bg-[rgb(63,63,70)] sm:px-8 sm:py-6">
        <h2 className=" my-10 text-center text-4xl dark:text-[rgb(255,194,208)] font-bold text-[#741c21] ">
          {t("title")} <span className="text-[#ff668b] dark:text-[rgb(215,84,88)]">{t("count")}</span> {t("suffix")}
        </h2>

        <ul className="grid grid-cols-2 items-center justify-items-center gap-x-6 gap-y-4 sm:grid-cols-3 lg:grid-cols-5">
          {companies.map((company) => (
            <li key={company.src} className="flex h-10 w-full items-center justify-center sm:h-12">
              <Image
                src={company.src}
                alt={company.alt}
                width={165}
                height={58}
                sizes="(max-width: 639px) 40vw, (max-width: 1023px) 25vw, 16vw"
                className="h-full w-auto max-w-full object-contain"
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
