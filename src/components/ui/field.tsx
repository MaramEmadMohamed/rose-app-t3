import * as React from "react";

import { cn } from "@/lib/utils";

type FieldProps = React.ComponentProps<"div"> & {
  invalid?: boolean;
  disabled?: boolean;
};

function Field({ className, invalid, disabled, ...props }: FieldProps) {
  return (
    <div
      data-slot="field"
      data-invalid={invalid}
      data-disabled={disabled}
      className={cn("group/field flex flex-col gap-1.5", className)}
      {...props}
    />
  );
}

export { Field };
