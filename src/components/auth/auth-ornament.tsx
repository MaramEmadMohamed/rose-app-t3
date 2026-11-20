import { cn } from "@/lib/utils";

const ORNAMENT_MASK =
  "url(/images/auth/ornament.svg) center / contain no-repeat";

export function AuthOrnament({ flipped = false }: { flipped?: boolean }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "bg-primary block h-10 w-full max-w-72",
        flipped && "-scale-y-100",
      )}
      style={{ mask: ORNAMENT_MASK, WebkitMask: ORNAMENT_MASK }}
    />
  );
}
