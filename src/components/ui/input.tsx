// import * as React from "react";
// import { cva, type VariantProps } from "class-variance-authority";

// import { cn } from "@/lib/utils";

// const inputVariants = cva(
//   [
//     "h-(--field-height) w-full min-w-0 rounded-lg border px-(--field-padding-x)",
//     "text-sm font-normal leading-none text-text-plain placeholder:text-text-muted",
//     "outline-none transition-[border-color,box-shadow]",
//     "disabled:pointer-events-none disabled:ring-0",
//   ],
//   {
//     variants: {
//       variant: {
//         outline: [
//           "border-line-soft bg-surface",
//           "hover:border-line-default hover:ring-[3px] hover:ring-ring-default",
//           "focus-visible:border-line-primary focus-visible:ring-[3px] focus-visible:ring-ring-default",
//           "aria-invalid:border-line-danger aria-invalid:ring-[3px] aria-invalid:ring-ring-danger",
//           "disabled:border-transparent disabled:bg-surface-muted",
//         ],
//       },
//     },
//     defaultVariants: {
//       variant: "outline",
//     },
//   },
// );

// type InputProps = React.ComponentProps<"input"> &
//   VariantProps<typeof inputVariants>;

// function Input({ className, type = "text", variant, ...props }: InputProps) {
//   return (
//     <input
//       type={type}
//       data-slot="input"
//       className={cn(inputVariants({ variant }), className)}
//       {...props}
//     />
//   );
// }

// export { Input, inputVariants };

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const inputVariants = cva(
  [
    "h-(--field-height) w-full min-w-0 rounded-lg border px-(--field-padding-x)",
    "text-sm font-normal leading-none text-text-plain placeholder:text-text-muted",
    "outline-none transition-[border-color,box-shadow]",
    "disabled:pointer-events-none disabled:ring-0",
  ],
  {
    variants: {
      variant: {
        outline: [
          "border-line-soft bg-surface",
          "hover:border-line-default hover:ring-(length:--field-ring-width) hover:ring-ring-default",
          "focus-visible:border-line-primary focus-visible:ring-(length:--field-ring-width) focus-visible:ring-ring-default",
          "aria-invalid:border-line-danger aria-invalid:ring-(length:--field-ring-width) aria-invalid:ring-ring-danger",
          "disabled:border-transparent disabled:bg-surface-muted",
        ],
      },
    },
    defaultVariants: {
      variant: "outline",
    },
  },
);

type InputProps = React.ComponentProps<"input"> &
  VariantProps<typeof inputVariants>;

function Input({ className, type = "text", variant, ...props }: InputProps) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(inputVariants({ variant }), className)}
      {...props}
    />
  );
}

export { Input, inputVariants };
