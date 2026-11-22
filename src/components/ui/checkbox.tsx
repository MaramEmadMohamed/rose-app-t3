"use client";

import { Checkbox as CheckboxPrimitive } from "@base-ui/react/checkbox";
import { CheckIcon } from "lucide-react";
import { cn } from "cn";

/**
 * Checkbox
 * --------
 * Rose App Design System checkbox.
 *
 * Supports:
 * - Unchecked and checked states
 * - Light and dark modes
 * - Disabled state
 * - Validation error styling through aria-invalid
 * - Keyboard focus visibility
 */
function Checkbox({ className, ...props }: CheckboxPrimitive.Root.Props) {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      className={cn(
        // Checkbox dimensions and square shape
        "peer relative flex size-5 shrink-0 items-center justify-center",
        "rounded-[6px] border border-[#501419] bg-white",

        // Interaction
        "transition-colors outline-none",
        "focus-visible:ring-2 focus-visible:ring-[#FBEAEA]",

        // Checked state
        "data-checked:border-[#501419]",
        "data-checked:bg-[#501419] data-checked:text-white",

        // Error state
        "aria-invalid:border-[#DC2626]",

        // Disabled state
        "disabled:cursor-not-allowed disabled:opacity-50",

        // Dark mode
        "dark:border-[#FFA3B9] dark:bg-[#27272A]",
        "dark:data-checked:border-[#FFA3B9]",
        "dark:data-checked:bg-[#FFA3B9] dark:data-checked:text-[#18181B]",

        // Focus state: soft pink halo around the checkbox
        "focus-visible:outline-none",
        "focus-visible:ring-[8]",
        "focus-visible:ring-[#FBEAEA]",
        "focus-visible:ring-offset-0",

        className,
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        data-slot="checkbox-indicator"
        className="grid place-content-center text-current"
      >
        <CheckIcon className="size-3.5" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
}

export { Checkbox };
