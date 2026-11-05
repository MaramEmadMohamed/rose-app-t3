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
    <ul className="grid gap-6 rounded-2xl bg-primary-fade p-6 sm:grid-cols-2 sm:p-10 lg:grid-cols-4">
      {FEATURES.map(({ id, icon: Icon }) => (
        <li key={id} className="flex items-center gap-3">
          <span className="flex size-16 shrink-0 items-center justify-center rounded-full bg-primary-saturated text-inverse">
            <Icon aria-hidden="true" className="size-7" />
          </span>
          <div>
            <p className="text-lg font-semibold text-primary-saturated">
              {t(`${id}Title`)}
            </p>
            <p className="text-sm text-soft">{t(`${id}Text`)}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}
