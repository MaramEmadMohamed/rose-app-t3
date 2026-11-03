"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import {
  Check,
  ChevronDown,
  ChevronsUpDown,
  ChevronUp,
  Eye,
  EyeOff,
  ImageIcon,
  Search,
  Upload,
  X,
} from "lucide-react";
import * as RPNInput from "react-phone-number-input";
import flags from "react-phone-number-input/flags";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

/* ---------- Shared field box (single source of truth for all states) ---------- */

const inputVariants = cva(
  [
    "group/box flex items-center border text-text-plain outline-none transition-[border-color,box-shadow]",
    "hover:border-line-default hover:ring-(length:--field-ring-width) hover:ring-ring-default",
    "focus-within:border-line-primary focus-within:ring-(length:--field-ring-width) focus-within:ring-ring-default",
    "data-[active=true]:border-line-primary data-[active=true]:ring-(length:--field-ring-width) data-[active=true]:ring-ring-default",
    "data-[invalid=true]:border-line-danger data-[invalid=true]:ring-(length:--field-ring-width) data-[invalid=true]:ring-ring-danger",
    "data-[disabled=true]:pointer-events-none data-[disabled=true]:border-transparent data-[disabled=true]:bg-surface-muted data-[disabled=true]:text-text-muted data-[disabled=true]:ring-0",
  ],
  {
    variants: {
      variant: {
        outline: "border-line-soft bg-surface",
      },
      shape: {
        field:
          "h-(--field-height) w-full gap-2 rounded-lg px-(--field-padding-x) text-sm leading-none",
        cell: "size-(--otp-slot-size) justify-center rounded-otp text-base leading-none",
      },
    },
    defaultVariants: {
      variant: "outline",
      shape: "field",
    },
  },
);

const controlClassName =
  "min-w-0 flex-1 bg-transparent outline-none placeholder:text-text-muted";

const hideNativeSpinner =
  "[appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none";

/* ---------- Types ---------- */

type FieldVariantProps = Pick<VariantProps<typeof inputVariants>, "variant">;
type NativeInputProps = Omit<React.ComponentProps<"input">, "type">;
type AriaInvalid = React.AriaAttributes["aria-invalid"];

type TextFieldProps = NativeInputProps &
  FieldVariantProps & { type?: "text" | "email" | "url" };

type NumberFieldProps = NativeInputProps &
  FieldVariantProps & { increaseLabel: string; decreaseLabel: string };

type PasswordFieldProps = NativeInputProps &
  FieldVariantProps & { showPasswordLabel: string; hidePasswordLabel: string };

type SearchFieldProps = NativeInputProps &
  FieldVariantProps & { clearLabel: string; onClear?: () => void };

type FileFieldProps = NativeInputProps &
  FieldVariantProps & {
    uploadLabel: string;
    reviewLabel?: string;
    onReview?: () => void;
  };

type PhoneFieldProps = FieldVariantProps & {
  id?: string;
  name?: string;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  "aria-invalid"?: AriaInvalid;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  defaultCountry?: RPNInput.Country;
  countryNames?: RPNInput.Labels;
  countryLabel: string;
  searchCountryLabel: string;
  noCountryLabel: string;
};

type InputProps =
  | TextFieldProps
  | (NumberFieldProps & { type: "number" })
  | (PasswordFieldProps & { type: "password" })
  | (SearchFieldProps & { type: "search" })
  | (FileFieldProps & { type: "file" })
  | (PhoneFieldProps & { type: "tel" });

/* ---------- Helpers ---------- */

function isAriaInvalid(value: AriaInvalid) {
  return value === true || value === "true";
}

function mergeRefs<T>(
  ...refs: (React.Ref<T> | undefined)[]
): React.RefCallback<T> {
  return (node) => {
    refs.forEach((ref) => {
      if (typeof ref === "function") ref(node);
      else if (ref) ref.current = node;
    });
  };
}

function useControllableValue<T>(value: T | undefined, defaultValue: T) {
  const [inner, setInner] = React.useState(defaultValue);
  return [value ?? inner, setInner] as const;
}

/* ---------- Field box ---------- */

type FieldBoxProps = React.ComponentProps<"div"> &
  FieldVariantProps & { disabled?: boolean; invalid?: boolean };

function FieldBox({
  className,
  variant,
  disabled,
  invalid,
  ...props
}: FieldBoxProps) {
  return (
    <div
      data-slot="input"
      data-disabled={disabled}
      data-invalid={invalid}
      className={cn(inputVariants({ variant }), className)}
      {...props}
    />
  );
}

/* ---------- Text ---------- */

function TextField({
  className,
  variant,
  type = "text",
  disabled,
  ...props
}: TextFieldProps) {
  return (
    <FieldBox
      variant={variant}
      disabled={disabled}
      invalid={isAriaInvalid(props["aria-invalid"])}
      className={className}
    >
      <input
        {...props}
        type={type}
        disabled={disabled}
        className={controlClassName}
      />
    </FieldBox>
  );
}

/* ---------- Number ---------- */

type StepDirection = "up" | "down";

function stepNumberInput(
  input: HTMLInputElement | null,
  direction: StepDirection,
) {
  // stepUp/stepDown throw on step="any"
  if (!input || input.step === "any") return;
  if (direction === "up") input.stepUp();
  else input.stepDown();
  input.dispatchEvent(new Event("input", { bubbles: true }));
  input.focus();
}

type StepButtonProps = {
  label: string;
  direction: StepDirection;
  disabled?: boolean;
  onStep: (direction: StepDirection) => void;
};

function StepButton({ label, direction, disabled, onStep }: StepButtonProps) {
  const Icon = direction === "up" ? ChevronUp : ChevronDown;

  return (
    <button
      type="button"
      tabIndex={-1}
      aria-label={label}
      disabled={disabled}
      onClick={() => onStep(direction)}
      className="flex h-2.5 items-center text-text-muted hover:text-text-default disabled:pointer-events-none"
    >
      <Icon className="size-2.5" aria-hidden />
    </button>
  );
}

function NumberField({
  className,
  variant,
  disabled,
  readOnly,
  increaseLabel,
  decreaseLabel,
  ref,
  ...props
}: NumberFieldProps) {
  // Ref
  const inputRef = React.useRef<HTMLInputElement>(null);

  // Variables
  const isStepDisabled = disabled || readOnly;

  // Functions
  function handleStep(direction: StepDirection) {
    stepNumberInput(inputRef.current, direction);
  }

  return (
    <FieldBox
      variant={variant}
      disabled={disabled}
      invalid={isAriaInvalid(props["aria-invalid"])}
      className={className}
    >
      <input
        {...props}
        ref={mergeRefs(inputRef, ref)}
        type="number"
        disabled={disabled}
        readOnly={readOnly}
        className={cn(controlClassName, hideNativeSpinner)}
      />
      <div className="flex shrink-0 flex-col gap-px">
        <StepButton
          label={increaseLabel}
          direction="up"
          disabled={isStepDisabled}
          onStep={handleStep}
        />
        <StepButton
          label={decreaseLabel}
          direction="down"
          disabled={isStepDisabled}
          onStep={handleStep}
        />
      </div>
    </FieldBox>
  );
}

/* ---------- Password ---------- */

function PasswordField({
  className,
  variant,
  disabled,
  showPasswordLabel,
  hidePasswordLabel,
  ...props
}: PasswordFieldProps) {
  // State
  const [isVisible, setIsVisible] = React.useState(false);

  // Variables
  const ToggleIcon = isVisible ? Eye : EyeOff;

  return (
    <FieldBox
      variant={variant}
      disabled={disabled}
      invalid={isAriaInvalid(props["aria-invalid"])}
      className={className}
    >
      <input
        {...props}
        type={isVisible ? "text" : "password"}
        disabled={disabled}
        className={controlClassName}
      />
      <button
        type="button"
        disabled={disabled}
        aria-label={isVisible ? hidePasswordLabel : showPasswordLabel}
        onClick={() => setIsVisible((previous) => !previous)}
        className="shrink-0 text-text-muted hover:text-text-default"
      >
        <ToggleIcon className="size-5" aria-hidden />
      </button>
    </FieldBox>
  );
}

/* ---------- Search ---------- */

function SearchField({
  className,
  variant,
  disabled,
  value,
  defaultValue,
  onChange,
  onClear,
  clearLabel,
  ref,
  ...props
}: SearchFieldProps) {
  // Ref
  const inputRef = React.useRef<HTMLInputElement>(null);

  // State
  const [text, setText] = useControllableValue(
    value === undefined ? undefined : String(value),
    String(defaultValue ?? ""),
  );

  // Variables
  const isInvalid = isAriaInvalid(props["aria-invalid"]);
  const hasText = text !== "";
  const isFilled = hasText && !isInvalid && !disabled;

  // Functions
  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setText(event.target.value);
    onChange?.(event);
  }

  function handleClear() {
    setText("");
    onClear?.();
    inputRef.current?.focus();
  }

  return (
    <FieldBox
      variant={variant}
      disabled={disabled}
      invalid={isInvalid}
      data-filled={isFilled}
      className={cn(
        "data-[filled=true]:border-line-primary data-[filled=true]:text-base",
        className,
      )}
    >
      <Search className="size-4.5 shrink-0 text-text-muted" aria-hidden />
      <input
        {...props}
        ref={mergeRefs(inputRef, ref)}
        type="search"
        disabled={disabled}
        value={text}
        onChange={handleChange}
        className={cn(
          controlClassName,
          "[&::-webkit-search-cancel-button]:appearance-none",
        )}
      />
      {hasText && !disabled && (
        <button
          type="button"
          aria-label={clearLabel}
          onClick={handleClear}
          className="shrink-0 text-text-muted hover:text-text-default"
        >
          <X className="size-4" aria-hidden />
        </button>
      )}
    </FieldBox>
  );
}

/* ---------- File ---------- */

function FileField({
  className,
  variant,
  disabled,
  onChange,
  uploadLabel,
  reviewLabel,
  onReview,
  ...props
}: FileFieldProps) {
  // State
  const [fileNames, setFileNames] = React.useState("");

  // Variables
  const shouldShowReview = Boolean(reviewLabel) && fileNames === "";

  // Functions
  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const names = Array.from(event.target.files ?? [], (file) => file.name);
    setFileNames(names.join(", "));
    onChange?.(event);
  }

  function handleReview(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    onReview?.();
  }

  return (
    <label
      data-slot="input"
      data-disabled={disabled}
      data-invalid={isAriaInvalid(props["aria-invalid"])}
      className={cn(
        inputVariants({ variant }),
        "cursor-pointer justify-between",
        className,
      )}
    >
      <input
        {...props}
        type="file"
        disabled={disabled}
        onChange={handleChange}
        className="sr-only"
      />
      {shouldShowReview ? (
        <button
          type="button"
          onClick={handleReview}
          className="flex items-center gap-1.5 text-xs text-text-info"
        >
          <ImageIcon className="size-4 shrink-0" aria-hidden />
          {reviewLabel}
        </button>
      ) : (
        <span className="min-w-0 flex-1 truncate text-xs">{fileNames}</span>
      )}
      <span className="flex shrink-0 items-center gap-1.5 text-text-primary group-data-[disabled=true]/box:text-text-muted">
        <Upload className="size-4.5" aria-hidden />
        {uploadLabel}
      </span>
    </label>
  );
}

/* ---------- Phone (react-phone-number-input + shadcn Command/Popover) ---------- */

type PhoneLabels = {
  country: string;
  searchCountry: string;
  noCountry: string;
};

const PhoneLabelsContext = React.createContext<PhoneLabels>({
  country: "",
  searchCountry: "",
  noCountry: "",
});

type CountryOption = { label: string; value: RPNInput.Country | undefined };

type PhoneCountrySelectProps = {
  disabled?: boolean;
  value?: RPNInput.Country;
  options: CountryOption[];
  onChange: (country: RPNInput.Country) => void;
};

function PhoneNumberInput({
  className,
  ...props
}: React.ComponentProps<"input">) {
  return <input className={cn(controlClassName, className)} {...props} />;
}

function PhoneFlag({ country }: { country?: RPNInput.Country }) {
  const Flag = country ? flags[country] : undefined;

  return (
    <span className="flex size-5 shrink-0 items-center justify-center overflow-hidden rounded-full bg-surface-muted [&_svg]:h-full [&_svg]:w-auto [&_svg]:max-w-none">
      {Flag && <Flag title={country ?? ""} />}
    </span>
  );
}

function PhoneCountrySelect({
  disabled,
  value,
  options,
  onChange,
}: PhoneCountrySelectProps) {
  // Translation
  const labels = React.useContext(PhoneLabelsContext);

  // State
  const [isOpen, setIsOpen] = React.useState(false);

  // Variables
  const countries = options.filter((option) => option.value);

  // Functions
  function handleSelect(country: RPNInput.Country) {
    onChange(country);
    setIsOpen(false);
  }

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger
        disabled={disabled}
        aria-label={labels.country}
        className="flex shrink-0 items-center gap-2 outline-none"
      >
        <PhoneFlag country={value} />
        {value && (
          <span className="flex items-center gap-1 font-medium group-data-[disabled=true]/box:text-text-muted">
            {value}(+{RPNInput.getCountryCallingCode(value)})
            <ChevronsUpDown className="size-3.5 text-text-muted" aria-hidden />
          </span>
        )}
      </PopoverTrigger>
      <PopoverContent align="start" className="w-72 p-0">
        <Command>
          <CommandInput placeholder={labels.searchCountry} />
          <CommandList>
            <CommandEmpty>{labels.noCountry}</CommandEmpty>
            <CommandGroup>
              {countries.map(({ value: country, label }) =>
                country ? (
                  <CommandItem
                    key={country}
                    value={`${label} +${RPNInput.getCountryCallingCode(country)}`}
                    onSelect={() => handleSelect(country)}
                  >
                    <PhoneFlag country={country} />
                    <span className="flex-1 truncate">{label}</span>
                    <span className="text-muted-foreground">
                      +{RPNInput.getCountryCallingCode(country)}
                    </span>
                    <Check
                      className={cn(
                        "size-4",
                        country === value ? "opacity-100" : "opacity-0",
                      )}
                      aria-hidden
                    />
                  </CommandItem>
                ) : null,
              )}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

function PhoneField({
  className,
  variant,
  disabled,
  value,
  defaultValue,
  onChange,
  defaultCountry = "EG",
  countryNames,
  countryLabel,
  searchCountryLabel,
  noCountryLabel,
  "aria-invalid": ariaInvalid,
  ...props
}: PhoneFieldProps) {
  // State
  const [phone, setPhone] = useControllableValue(value, defaultValue ?? "");

  // Variables
  const labels = React.useMemo(
    () => ({
      country: countryLabel,
      searchCountry: searchCountryLabel,
      noCountry: noCountryLabel,
    }),
    [countryLabel, searchCountryLabel, noCountryLabel],
  );

  // Functions
  function handleChange(next?: RPNInput.Value) {
    const nextPhone = next ?? "";
    setPhone(nextPhone);
    onChange?.(nextPhone);
  }

  return (
    <PhoneLabelsContext.Provider value={labels}>
      <FieldBox
        variant={variant}
        disabled={disabled}
        invalid={isAriaInvalid(ariaInvalid)}
        className={className}
      >
        <RPNInput.default
          {...props}
          {...(countryNames && { labels: countryNames })}
          aria-invalid={ariaInvalid}
          disabled={disabled}
          value={phone ? (phone as RPNInput.Value) : undefined}
          onChange={handleChange}
          defaultCountry={defaultCountry}
          countrySelectComponent={PhoneCountrySelect}
          inputComponent={PhoneNumberInput}
          className="flex min-w-0 flex-1 items-center gap-2"
        />
      </FieldBox>
    </PhoneLabelsContext.Provider>
  );
}

/* ---------- Public component: the `type` prop selects the field ---------- */

function Input(props: InputProps) {
  switch (props.type) {
    case "number":
      return <NumberField {...props} />;
    case "password":
      return <PasswordField {...props} />;
    case "search":
      return <SearchField {...props} />;
    case "file":
      return <FileField {...props} />;
    case "tel":
      return <PhoneField {...props} />;
    default:
      return <TextField {...props} />;
  }
}

export { Input, inputVariants };