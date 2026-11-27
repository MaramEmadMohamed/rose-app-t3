"use client";

import * as React from "react";
import { cn } from "cn";

function Label({ className, ...props }: React.ComponentProps<"label">) {
  return (
    <label
      data-slot="label"
      className={cn(
        "text-default flex items-center gap-2 text-sm leading-none font-medium select-none",
        "group-data-[invalid=true]/field:text-danger",
        "group-data-[disabled=true]/field:text-muted group-data-[disabled=true]/field:pointer-events-none group-data-[disabled=true]/field:opacity-100",
        "peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
        className,
      )}
      {...props}
    />
  );
}

export { Label };
