import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export function HelpFooter() {
  const t = useTranslations("register");

  return (
    <div className="mt-6 border-t border-border pt-4 text-center text-sm">
      <span className="text-foreground">{t("help.text")} </span>
      <Link
        href="/contact"
        className="cursor-pointer font-semibold text-primary underline-offset-4 hover:underline focus-visible:underline"
      >
        {t("help.contact")}
      </Link>
    </div>
  );
}