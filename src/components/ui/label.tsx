"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

function Label({ className, ...props }: React.ComponentProps<"label">) {
  return (
    <label
      data-slot="label"
      className={cn(
        "text-sm font-medium leading-none select-none text-default",
        "group-data-[invalid=true]/field:text-danger",
        "group-data-[disabled=true]/field:text-muted",
        className,
      )}
      {...props}
    />
  );
}

export { Label };
