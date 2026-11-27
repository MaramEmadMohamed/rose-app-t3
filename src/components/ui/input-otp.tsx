"use client";

import * as React from "react";
import { OTPInput, OTPInputContext, REGEXP_ONLY_DIGITS } from "input-otp";

import { inputVariants } from "@/components/ui/input";
import { cn } from "@/lib/utils";

function InputOTP({
  className,
  containerClassName,
  ...props
}: React.ComponentProps<typeof OTPInput> & {
  containerClassName?: string;
}) {
  return (
    <OTPInput
      data-slot="input-otp"
      containerClassName={cn(
        "flex items-center gap-2 has-disabled:opacity-100",
        containerClassName,
      )}
      className={cn("disabled:cursor-not-allowed", className)}
      {...props}
    />
  );
}

function InputOTPGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="input-otp-group"
      className={cn("flex items-center gap-1.5", className)}
      {...props}
    />
  );
}

type InputOTPSlotProps = React.ComponentProps<"div"> & {
  index: number;
  invalid?: boolean;
  disabled?: boolean;
};

function InputOTPSlot({
  index,
  invalid,
  disabled,
  className,
  ...props
}: InputOTPSlotProps) {
  const inputOTPContext = React.useContext(OTPInputContext);
  const { char, hasFakeCaret, isActive } = inputOTPContext?.slots[index] ?? {};

  return (
    <div
      data-slot="input-otp-slot"
      data-active={isActive}
      data-invalid={invalid}
      data-disabled={disabled}
      className={cn(inputVariants({ shape: "cell" }), "relative", className)}
      {...props}
    >
      {char}
      {hasFakeCaret && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="h-4 w-px animate-caret-blink bg-text-plain duration-1000" />
        </div>
      )}
    </div>
  );
}

function InputOTPSeparator(props: React.ComponentProps<"div">) {
  return <div data-slot="input-otp-separator" role="separator" {...props} />;
}

type OtpInputProps = {
  length?: number;
  value?: string;
  onChange?: (value: string) => void;
  onComplete?: (value: string) => void;
  disabled?: boolean;
  invalid?: boolean;
  id?: string;
  className?: string;
};

// Design system component: use this one in pages
function OtpInput({
  length = 6,
  disabled,
  invalid,
  className,
  ...props
}: OtpInputProps) {
  return (
    <InputOTP
      {...props}
      maxLength={length}
      pattern={REGEXP_ONLY_DIGITS}
      disabled={disabled}
      aria-invalid={invalid}
      containerClassName={className}
    >
      <InputOTPGroup>
        {Array.from({ length }, (_, index) => (
          <InputOTPSlot
            key={index}
            index={index}
            invalid={invalid}
            disabled={disabled}
          />
        ))}
      </InputOTPGroup>
    </InputOTP>
  );
}

export { OtpInput, InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator };
