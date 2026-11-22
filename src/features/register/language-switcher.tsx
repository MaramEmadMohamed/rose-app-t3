"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";

const LANGUAGES = {
  en: { next: "ar", label: "العربية" },
  ar: { next: "en", label: "English" },
} as const;

export function LanguageSwitcher() {
  const t = useTranslations("register");
  const locale = useLocale() as keyof typeof LANGUAGES;
  const pathname = usePathname();
  const router = useRouter();

  const { next, label } = LANGUAGES[locale];

  return (
    <button
      type="button"
      onClick={() => router.replace(pathname, { locale: next })}
      aria-label={t("common.switchLanguage")}
      lang={next}
      className="text-default hover:text-primary cursor-pointer text-base leading-none font-normal underline-offset-4 hover:underline focus-visible:underline"
    >
      {label}
    </button>
  );
}
