import type { ReactNode } from "react";

// The small white label on top of a photo, like "Wedding".
export function ImageBadge({ children }: { children: ReactNode }) {
  return (
    <p className="w-fit rounded-full bg-plain px-2.5 py-0.5 text-xs font-medium text-primary-saturated">
      {children}
    </p>
  );
}
