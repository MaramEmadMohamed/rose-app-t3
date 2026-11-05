import type { ReactNode } from "react";

// The small label on top of a photo, like "Wedding". Same colors in both
// themes, like the design.
export function ImageBadge({ children }: { children: ReactNode }) {
  return (
    <p className="w-fit rounded-full bg-maroon-50 px-2 py-0.5 text-xs leading-none font-medium text-maroon-600">
      {children}
    </p>
  );
}
