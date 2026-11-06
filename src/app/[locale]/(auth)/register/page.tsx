"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { Pinyon_Script } from "next/font/google";
import dynamic from "next/dynamic";

const script = Pinyon_Script({
  subsets: ["latin"],
  weight: "400",
});
const RegisterFlow = dynamic(
  () =>
    import("@/features/register/register-flow").then((m) => m.RegisterFlow),
  { ssr: false },
);

export default function RegisterPage() {
  const t = useTranslations("register");

  return (
    <div className="mx-auto max-w-lg space-y-6 p-6">
      <div className="space-y-10 text-center">
        <Image
          src="/image.png"
          alt="Logo"
          width={300}
          height={100}
          className="mx-auto"
        />
        <h1 className={`${script.className} text-3xl text-[#7a1b1f]`}>
          {t("title")}
        </h1>
        <hr />
      </div>

      <RegisterFlow/>

      <hr />

      <Image
        src="/image.png"
        alt="Logo"
        width={300}
        height={100}
        className="mx-auto -scale-y-100"
      />
    </div>
  );
}
