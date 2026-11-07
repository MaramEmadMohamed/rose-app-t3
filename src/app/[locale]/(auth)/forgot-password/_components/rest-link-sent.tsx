"use client";

import { ChevronLeft } from "lucide-react";
import { useTranslations } from "next-intl";

import { AuthHeading } from "@/components/auth/auth-heading";
import { Link } from "@/i18n/navigation";

type ResetLinkSentProps = {
  email: string;
  onEdit: () => void;
};

export function ResetLinkSent({ email, onEdit }: ResetLinkSentProps) {
  // Translation
  const t = useTranslations("ForgotPassword");

  return (
    <div className="flex w-full flex-col gap-6">
      <AuthHeading
        title={t("sentTitle")}
        leading={
          <button
            type="button"
            onClick={onEdit}
            aria-label={t("editEmail")}
            className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md"
          >
            <ChevronLeft aria-hidden="true" className="size-4 rtl:rotate-180" />
          </button>
        }
        subtitle={
          <>
            <p>{t("sentTo")}</p>
            <button
              type="button"
              onClick={onEdit}
              aria-label={t("editEmail")}
              className="text-info hover:underline"
            >
              {email}
            </button>
          </>
        }
      />

      <div className="text-default flex flex-col gap-3 text-sm">
        <p>{t("sentInfo")}</p>
        <p>{t("sentSpam")}</p>
      </div>

      <p className="border-soft border-t pt-4 text-center text-sm">
        {t("needHelp")}{" "}
        <Link
          href="/contact"
          className="text-primary font-semibold hover:underline"
        >
          {t("contactUs")}
        </Link>
      </p>
    </div>
  );
}
