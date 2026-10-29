
import * as React from "react";
import { cn } from "cn";

function Textarea({
  className,
  ...props
}: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        // Base
        "peer w-full min-h-18.75 resize-none rounded-lg border px-2.5 py-2 text-sm",
        "bg-[#3f3f46] text-white placeholder:text-[#85858f]",
        "border-[#52525b]",

        // Transition
        "transition-all duration-200 outline-none",

        // Hover
        "hover:border-[#71717a]",

        // Focus
        "focus-visible:border-[#ffa3b9]",
        "focus-visible:ring-2 focus-visible:ring-[#ffa3b9]/20",

        // Error
        "aria-invalid:border-red-500",
        "aria-invalid:text-white",
        "aria-invalid:focus-visible:ring-red-500/20",

        // Disabled
        "disabled:cursor-not-allowed",
        "disabled:bg-[#18181b]",
        "disabled:border-[#18181b]",
        "disabled:text-[#71717a]",
        "disabled:placeholder:text-[#52525b]",

        // Light mode
        "dark:bg-[#3f3f46] dark:border-[#52525b]",
        "dark:hover:border-[#71717a]",

        className
      )}
      {...props}
    />
  );
}

export { Textarea };
