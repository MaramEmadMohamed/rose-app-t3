"use client";

import * as React from "react";
import { Eye, EyeOff } from "lucide-react";

import { cn } from "@/lib/utils";

type PasswordInputProps = Omit<React.ComponentProps<"input">, "type">;

function PasswordInput({ className, disabled, ...props }: PasswordInputProps) {
  const [visible, setVisible] = React.useState(false);

  return (
    <div
      data-slot="password-input"
      data-disabled={disabled || undefined}
      className={cn(
        "flex h-(--field-height) w-full items-center gap-2 rounded-lg border px-(--field-padding-x)",
        "border-line-soft bg-surface transition-[border-color,box-shadow]",
        "hover:border-line-default hover:ring-[3px] hover:ring-ring-default",
        "focus-within:border-line-primary focus-within:ring-[3px] focus-within:ring-ring-default",
        "has-[input[aria-invalid=true]]:border-line-danger has-[input[aria-invalid=true]]:ring-[3px] has-[input[aria-invalid=true]]:ring-ring-danger",
        "data-[disabled]:pointer-events-none data-[disabled]:border-transparent data-[disabled]:bg-surface-muted data-[disabled]:ring-0",
        className,
      )}
    >
      <input
        {...props}
        type={visible ? "text" : "password"}
        disabled={disabled}
        className="min-w-0 flex-1 bg-transparent text-sm leading-none text-text-plain outline-none placeholder:text-text-muted"
      />
      <button
        type="button"
        disabled={disabled}
        aria-label={visible ? "Hide password" : "Show password"}
        onClick={() => setVisible((v) => !v)}
        className="shrink-0 text-text-muted hover:text-text-default"
      >
        {visible ? <Eye className="size-5" /> : <EyeOff className="size-5" />}
      </button>
    </div>
  );
}

export { PasswordInput };
