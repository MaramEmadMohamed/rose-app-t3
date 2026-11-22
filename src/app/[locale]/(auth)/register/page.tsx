import Image from "next/image";
import { Pinyon_Script } from "next/font/google";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { RegisterFlowClient } from "@/features/register/register-flow-client";
import { LanguageSwitcher } from "@/features/register/language-switcher";
const script = Pinyon_Script({
  subsets: ["latin"],
  weight: "400",
});

export default async function RegisterPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("register");

  return (
    <div className="mx-auto w-full max-w-[406px] space-y-6 px-4 py-6 sm:px-0">
      <div className="flex justify-end">
        <LanguageSwitcher />
      </div>
      <div className="space-y-10 text-center">
        <Image
          src="/image.png"
          alt={t("logoAlt")}
          width={300}
          height={100}
          loading="eager"
          className="mx-auto h-auto w-75 max-w-full"
        />
        <h1 className={`${script.className} text-primary text-3xl`}>
          {t("title")}
        </h1>
        <hr className="border-border" />
      </div>

      <RegisterFlowClient />

      <Image
        src="/image.png"
        alt=""
        aria-hidden
        width={300}
        height={100}
        className="mx-auto h-auto w-75 max-w-full -scale-y-100"
      />
    </div>
  );
}
