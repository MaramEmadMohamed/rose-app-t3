"use client";

import * as React from "react";
import { OTPInput, OTPInputContext } from "input-otp";

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

function InputOTPSlot({
  index,
  className,
  ...props
}: React.ComponentProps<"div"> & { index: number }) {
  const inputOTPContext = React.useContext(OTPInputContext);
  const { char, hasFakeCaret, isActive } = inputOTPContext?.slots[index] ?? {};

  return (
    <div
      data-slot="input-otp-slot"
      data-active={isActive}
      className={cn(
        "relative flex size-[45px] items-center justify-center rounded-[10px] border",
        "border-line-soft bg-surface text-base leading-none text-text-plain",
        "transition-[border-color,box-shadow]",
        "hover:border-line-default hover:ring-[3px] hover:ring-ring-default",
        "data-[active=true]:border-line-primary data-[active=true]:ring-[3px] data-[active=true]:ring-ring-default",
        className,
      )}
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
  disabled?: boolean;
  invalid?: boolean;
  id?: string;
  className?: string;
};

function OtpInput({
  length = 6,
  disabled,
  invalid,
  className,
  ...props
}: OtpInputProps) {
  return (
    <div
      data-slot="otp-input"
      data-invalid={invalid || undefined}
      data-disabled={disabled || undefined}
      className={cn(
        // error
        "data-[invalid]:[&_[data-slot=input-otp-slot]]:border-line-danger",
        "data-[invalid]:[&_[data-slot=input-otp-slot]]:ring-[3px]",
        "data-[invalid]:[&_[data-slot=input-otp-slot]]:ring-ring-danger",
        // disabled
        "data-[disabled]:pointer-events-none",
        "data-[disabled]:[&_[data-slot=input-otp-slot]]:border-transparent",
        "data-[disabled]:[&_[data-slot=input-otp-slot]]:bg-surface-muted",
        "data-[disabled]:[&_[data-slot=input-otp-slot]]:text-text-muted",
        "data-[disabled]:[&_[data-slot=input-otp-slot]]:ring-0",
        className,
      )}
    >
      <InputOTP maxLength={length} disabled={disabled} {...props}>
        <InputOTPGroup>
          {Array.from({ length }).map((_, i) => (
            <InputOTPSlot key={i} index={i} />
          ))}
        </InputOTPGroup>
      </InputOTP>
    </div>
  );
}

export { OtpInput, InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator };
