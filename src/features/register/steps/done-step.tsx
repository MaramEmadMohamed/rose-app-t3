"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { useRegister } from "../register-context";

export function DoneStep() {
  const t = useTranslations("register.done");
  const { reset } = useRegister();

  return (
    <div className="space-y-4 text-center">
      <h2 className="text-lg font-semibold">{t("title")}</h2>
      <p className="text-sm text-muted-foreground">{t("subtitle")}</p>
      <Button
        variant="primary"
        className="h-[41px] w-full gap-2.5 rounded-[10px] bg-(--maroon-600) px-4 py-3.5 font-medium"
        nativeButton={false}
        render={<Link href="/" onClick={reset} />}
      >
        {t("continue")}
      </Button>
    </div>
  );
}