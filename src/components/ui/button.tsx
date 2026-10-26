import { Button as ButtonPrimitive } from "@base-ui/react/button";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "cn";

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center rounded-lg border border-transparent bg-clip-padding text-sm font-medium whitespace-nowrap transition-all outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:bg-[#E4E4E7] disabled:text-[#A1A1AA] disabled:hover:bg-[#E4E4E7] aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/80",
        primary:
          "bg-[#501419] text-white hover:bg-[#741C21] disabled:bg-[#E4E4E7] disabled:text-[#71717A]",
        outline:
          "border border-[#501419] bg-[#FFFFFF] text-[#501419] hover:bg-[#FBEAEA] hover:text-[#501419] disabled:border-transparent disabled:bg-[#E4E4E7] disabled:text-[#A1A1AA] aria-expanded:bg-[#FFFFFF] aria-expanded:text-[#501419]",
        secondary:
          "bg-[#FBEAEA] text-[#501419] disabled:bg-[#E4E4E7] disabled:text-[#71717A] hover:bg-[#F3C5C7]",
        subtle:
          "border border-[#D4D4D8] bg-[#F4F4F5] text-[#27272A] hover:bg-[#E4E4E7] hover:text-[#27272A]",
        ghost:
          "border border-transparent bg-[#FFFFFF] text-[#27272A] hover:bg-[#E4E4E7] hover:text-[#27272A]",
        destructive:
          "bg-[#DC2626] text-white hover:bg-[#B91C1C] hover:text-white",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default:
          "h-8 gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
        md: "h-11 w-45.25 px-4 py-3.5 gap-2.5 rounded-lg",
        xs: "h-6 gap-1 rounded-[min(var(--radius-md),10px)] px-2 text-xs in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3",
        sm: "h-7 gap-1 rounded-[min(var(--radius-md),12px)] px-2.5 text-[0.8rem] in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3.5",
        lg: "h-9 gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
        icon: "size-8",
        "icon-xs":
          "size-6 rounded-[min(var(--radius-md),10px)] in-data-[slot=button-group]:rounded-lg [&_svg:not([class*='size-'])]:size-3",
        "icon-sm":
          "size-7 rounded-[min(var(--radius-md),12px)] in-data-[slot=button-group]:rounded-lg",
        "icon-lg": "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

function Button({
  className,
  variant = "default",
  size = "default",
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
