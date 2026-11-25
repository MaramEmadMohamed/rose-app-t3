"use client";

import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";

export default function Error({ reset }: { error: Error; reset: () => void }) {
  const t = useTranslations("product");
  return (
    <main className="container mx-auto space-y-4 px-4 py-24 text-center">
      <h1 className="text-2xl font-bold">{t("error")}</h1>
      <Button onClick={reset}>{t("retry")}</Button>
    </main>
  );
}