"use client";

import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import { STEPS, Step } from "./register-context";

export function Stepper({ current }: { current: Step }) {
  const t = useTranslations("register");
  const index = STEPS.indexOf(current);

  return (
    <ol
      className="flex items-center justify-center gap-2"
      aria-label={t("stepperLabel")}
    >
      {STEPS.map((s, i) => (
        <li key={s} className="flex items-center gap-2">
          <span
            aria-current={i === index ? "step" : undefined}
            className={cn(
              "flex size-5 items-center justify-center rounded-full text-[10px] font-medium",
              i <= index
                ? "bg-primary text-primary-foreground"
                : "bg-primary-fade text-primary",
            )}
          >
            {i + 1}
          </span>
          {i < STEPS.length - 1 && (
            <span
              className={cn(
                "h-px w-8 sm:w-12",
                i < index ? "bg-primary" : "bg-primary-faint",
              )}
            />
          )}
        </li>
      ))}
    </ol>
  );
}