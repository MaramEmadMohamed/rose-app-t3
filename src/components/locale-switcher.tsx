"use client";

import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

export function LocaleSwitcher({ className }: { className?: string }) {
  const t = useTranslations("common");
  const locale = useLocale();
  const pathname = usePathname();

  const next = locale === "ar" ? "en" : "ar";
  const label = next === "ar" ? "العربية" : "English";

  return (
    <Link
      href={pathname}
      locale={next}
      aria-label={t("switchLanguage")}
      className={cn(
        "cursor-pointer text-sm font-medium text-foreground underline-offset-4 hover:text-primary hover:underline focus-visible:underline",
        className,
      )}
    >
      {label}
    </Link>
  );
}