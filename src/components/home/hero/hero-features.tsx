import { Headset, RefreshCw, ShieldCheck, Truck } from "lucide-react";
import { useTranslations } from "next-intl";

// Each id is also the prefix of the feature's texts in the "Hero" messages,
// e.g. "deliveryTitle" and "deliveryText".
const FEATURES = [
  { id: "delivery", icon: Truck },
  { id: "refund", icon: RefreshCw },
  { id: "payment", icon: ShieldCheck },
  { id: "support", icon: Headset },
] as const;

export function HeroFeatures() {
  // Translation
  const t = useTranslations("Hero");

  return (
    <ul className="grid gap-6 rounded-2xl bg-maroon-50 p-6 sm:grid-cols-2 sm:p-10 lg:grid-cols-4 dark:bg-zinc-700">
      {FEATURES.map(({ id, icon: Icon }) => (
        <li key={id} className="flex items-center gap-4">
          <span className="flex size-16.25 shrink-0 items-center justify-center rounded-full bg-maroon-600 text-white dark:bg-soft-pink-200 dark:text-zinc-800">
            <Icon
              aria-hidden="true"
              strokeWidth={1.46}
              absoluteStrokeWidth
              className="size-10"
            />
          </span>
          <div className="flex flex-col gap-1.25">
            <p className="text-xl leading-none font-semibold text-maroon-600 dark:text-soft-pink-200">
              {t(`${id}Title`)}
            </p>
            <p className="text-sm leading-none text-soft">{t(`${id}Text`)}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}
