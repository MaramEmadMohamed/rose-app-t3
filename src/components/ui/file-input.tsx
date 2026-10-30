"use client";

import * as React from "react";
import { ImageIcon, Upload } from "lucide-react";

import { cn } from "@/lib/utils";

type FileInputProps = Omit<React.ComponentProps<"input">, "type"> & {
  uploadText?: string;
  reviewLabel?: string;
  onReview?: () => void;
};

function FileInput({
  id,
  className,
  uploadText = "Upload file",
  reviewLabel,
  onReview,
  onChange,
  disabled,
  ...props
}: FileInputProps) {
  const autoId = React.useId();
  const inputId = id ?? autoId;
  const [fileName, setFileName] = React.useState("");

  return (
    <div
      data-slot="file-input"
      data-disabled={disabled || undefined}
      className="relative"
    >
      <input
        {...props}
        id={inputId}
        type="file"
        disabled={disabled}
        className="peer sr-only"
        onChange={(e) => {
          const files = e.target.files;
          setFileName(
            !files || files.length === 0
              ? ""
              : files.length === 1
                ? files[0].name
                : `${files.length} files`,
          );
          onChange?.(e);
        }}
      />

      <label
        htmlFor={inputId}
        className={cn(
          "flex h-(--field-height) w-full cursor-pointer items-center justify-between gap-2",
          "rounded-lg border border-line-soft bg-surface px-(--field-padding-x)",
          "transition-[border-color,box-shadow]",
          "hover:border-line-default hover:ring-(length:--field-ring-width) hover:ring-ring-default",
          "peer-focus-visible:border-line-primary peer-focus-visible:ring-(length:--field-ring-width) peer-focus-visible:ring-ring-default",
          "peer-aria-invalid:border-line-danger peer-aria-invalid:ring-(length:--field-ring-width) peer-aria-invalid:ring-ring-danger",
          "peer-disabled:pointer-events-none peer-disabled:border-transparent peer-disabled:bg-surface-muted peer-disabled:ring-0",
          "peer-disabled:[&>[data-slot=upload]]:text-text-muted",
          className,
        )}
      >
        {reviewLabel && !fileName ? (
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              onReview?.();
            }}
            className="flex items-center gap-1.5 text-xs leading-none text-text-info"
          >
            <ImageIcon className="size-4 shrink-0" aria-hidden />
            {reviewLabel}
          </button>
        ) : (
          <span className="min-w-0 flex-1 truncate text-xs leading-none text-text-plain">
            {fileName}
          </span>
        )}

        <span
          data-slot="upload"
          className="flex shrink-0 items-center gap-1.5 text-sm leading-none text-text-primary"
        >
          <Upload className="size-4.5" aria-hidden />
          {uploadText}
        </span>
      </label>
    </div>
  );
}

export { FileInput };
