"use client";

import * as React from "react";
import PhoneInputBase, {
  getCountryCallingCode,
  type Country,
  type Value,
} from "react-phone-number-input";
import flags from "react-phone-number-input/flags";
import { ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";

type PhoneInputProps = {
  value?: Value;
  onChange?: (value?: Value) => void;
  defaultCountry?: Country;
  placeholder?: string;
  disabled?: boolean;
  id?: string;
  className?: string;
  "aria-invalid"?: boolean;
};

const InnerInput = React.forwardRef<
  HTMLInputElement,
  React.ComponentProps<"input">
>(({ className, ...props }, ref) => (
  <input
    ref={ref}
    className={cn(
      "min-w-0 flex-1 bg-transparent text-sm leading-none text-text-plain outline-none placeholder:text-text-muted",
      className,
    )}
    {...props}
  />
));
InnerInput.displayName = "InnerInput";

function PhoneInput({
  className,
  disabled,
  defaultCountry = "EG",
  placeholder = "Phone number",
  "aria-invalid": ariaInvalid,
  ...props
}: PhoneInputProps) {
  return (
    <div
      data-slot="phone-input"
      data-disabled={disabled || undefined}
      data-invalid={ariaInvalid || undefined}
      className={cn(
        "group/phone flex h-(--field-height) w-full items-center rounded-lg border px-(--field-padding-x)",
        "border-line-soft bg-surface transition-[border-color,box-shadow]",
        "hover:border-line-default hover:ring-(length:--field-ring-width) hover:ring-ring-default",
        "focus-within:border-line-primary focus-within:ring-(length:--field-ring-width) focus-within:ring-ring-default",
        "data-[invalid]:border-line-danger data-[invalid]:ring-(length:--field-ring-width) data-[invalid]:ring-ring-danger",
        "data-[disabled]:pointer-events-none data-[disabled]:border-transparent data-[disabled]:bg-surface-muted data-[disabled]:ring-0",
        className,
      )}
    >
      <PhoneInputBase
        {...props}
        flags={flags}
        defaultCountry={defaultCountry}
        disabled={disabled}
        placeholder={placeholder}
        inputComponent={InnerInput}
        className="flex w-full items-center gap-2"
        countrySelectComponent={CountrySelect}
      />
    </div>
  );
}

function CountrySelect({
  value,
  onChange,
  options,
  disabled,
}: {
  value?: Country;
  onChange: (value?: Country) => void;
  options: { value?: Country; label: string; divider?: boolean }[];
  disabled?: boolean;
}) {
  const label = options.find((o) => o.value === value)?.label ?? "";
  const Flag = value ? flags[value] : undefined;

  return (
    <div className="relative flex shrink-0 items-center gap-2">
      {/* Round flag, cropped from the 3:2 svg */}
      <span className="flex size-5 shrink-0 items-center justify-center overflow-hidden rounded-full bg-surface-muted [&_svg]:h-full [&_svg]:w-auto [&_svg]:max-w-none">
        {Flag && <Flag title={label} />}
      </span>
      {value && (
        <span className="flex items-center gap-1 text-sm font-medium leading-none text-text-plain group-data-[disabled]/phone:text-text-muted">
          {value}(+{getCountryCallingCode(value)})
          <ChevronsUpDown className="size-3.5 text-text-muted" aria-hidden />
        </span>
      )}
      <select
        value={value ?? ""}
        disabled={disabled}
        aria-label="Country"
        onChange={(e) => onChange((e.target.value || undefined) as Country)}
        className="absolute inset-0 size-full cursor-pointer bg-surface text-text-plain opacity-0"
      >
        {options.map(({ value: v, label: l, divider }, index) =>
          divider ? (
            <option key={`divider-${index}`} disabled>
              ──────────
            </option>
          ) : (
            <option key={v ?? "—"} value={v ?? ""}>
              {l}
            </option>
          ),
        )}
      </select>
    </div>
  );
}

export { PhoneInput };
