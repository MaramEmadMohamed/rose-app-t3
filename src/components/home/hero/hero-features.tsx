import { Headset, RefreshCw, ShieldCheck, Truck } from "lucide-react";
import { useTranslations } from "next-intl";

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
    <ul className="grid gap-6 rounded-2xl bg-primary-fade p-6 sm:grid-cols-2 sm:p-10 lg:flex lg:justify-between">
      {FEATURES.map(({ id, icon: Icon }) => (
        <li key={id} className="flex items-center gap-4">
          <span className="flex size-16.25 shrink-0 items-center justify-center rounded-full bg-primary-saturated text-inverse">
            <Icon
              aria-hidden="true"
              size={40}
              strokeWidth={1.46}
              absoluteStrokeWidth
            />
          </span>
          <div className="flex flex-col gap-1.25">
            <p className="text-xl leading-none font-semibold text-primary-saturated">
              {t(`${id}Title`)}
            </p>
            <p className="text-sm leading-none text-soft">{t(`${id}Text`)}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}
