"use client";

import * as React from "react";
import { Search, X } from "lucide-react";

import { cn } from "@/lib/utils";

type SearchInputProps = Omit<React.ComponentProps<"input">, "type"> & {
  onClear?: () => void;
};

function SearchInput({
  className,
  value,
  defaultValue,
  onChange,
  onClear,
  disabled,
  ...props
}: SearchInputProps) {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const isControlled = value !== undefined;
  const [inner, setInner] = React.useState(String(defaultValue ?? ""));
  const current = isControlled ? String(value) : inner;

  function handleClear() {
    if (!isControlled) setInner("");
    onClear?.();
    inputRef.current?.focus();
  }

  return (
    <div
      data-slot="search-input"
      data-disabled={disabled || undefined}
      data-filled={current ? "" : undefined}
      className={cn(
        "group/search flex h-(--field-height) w-full items-center gap-2 rounded-lg border px-(--field-padding-x)",
        "border-line-soft bg-surface transition-[border-color,box-shadow]",
        "hover:border-line-default hover:ring-(length:--field-ring-width) hover:ring-ring-default",
        "data-[filled]:border-line-primary",
        "focus-within:border-line-primary focus-within:ring-(length:--field-ring-width) focus-within:ring-ring-default",
        "has-[input[aria-invalid=true]]:border-line-danger has-[input[aria-invalid=true]]:ring-(length:--field-ring-width) has-[input[aria-invalid=true]]:ring-ring-danger",
        "data-[disabled]:pointer-events-none data-[disabled]:border-transparent data-[disabled]:bg-surface-muted data-[disabled]:ring-0",
        className,
      )}
    >
      <Search className="size-4.5 shrink-0 text-text-muted" aria-hidden />
      <input
        {...props}
        ref={inputRef}
        type="text"
        role="searchbox"
        disabled={disabled}
        value={isControlled ? value : inner}
        onChange={(e) => {
          if (!isControlled) setInner(e.target.value);
          onChange?.(e);
        }}
        className="min-w-0 flex-1 bg-transparent text-sm leading-none text-text-plain outline-none placeholder:text-text-muted group-data-[filled]/search:text-base"
      />
      {current && !disabled && (
        <button
          type="button"
          aria-label="Clear search"
          onClick={handleClear}
          className="shrink-0 text-text-muted hover:text-text-default"
        >
          <X className="size-4" />
        </button>
      )}
    </div>
  );
}

export { SearchInput };
