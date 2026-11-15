import type { ReactNode } from "react";

// Fixed colors: the design keeps this badge the same in both themes.
export function ImageBadge({ children }: { children: ReactNode }) {
  return (
    <p className="w-fit rounded-full bg-maroon-50 px-2 py-0.5 text-xs leading-none font-medium text-maroon-600">
      {children}
    </p>
  );
}
