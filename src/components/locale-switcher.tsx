"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";

export default function LocaleSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const t = useTranslations("Common");
  const nextLocale = locale === "ar" ? "en" : "ar";

  return (
    <div className="mx-auto flex w-full max-w-7xl justify-end px-4 pt-3 lg:px-6">
      <button
        type="button"
        aria-label={t("selectLanguage")}
        onClick={() => router.replace(pathname, { locale: nextLocale })}
        className="rounded-md border px-3 py-1.5 text-xs font-medium"
      >
        {t("locale")}
      </button>
    </div>
  );
}
