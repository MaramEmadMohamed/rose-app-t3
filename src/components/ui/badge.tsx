import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "cn";

const badgeVariants = cva(
  "inline-flex h-4 w-fit shrink-0 items-center justify-center whitespace-nowrap rounded-full border border-transparent px-2 py-0.5 text-xs leading-3 font-medium cursor-default select-none transition-colors",
  {
    variants: {
      variant: {
        primary:
          "bg-[#501419] text-white hover:bg-[#741C21] dark:bg-[#FFA3B9] dark:text-[#27272A] dark:hover:bg-[#FFC2D0]",

        secondary:
          "bg-[#FFE0E7] text-[#501419] hover:bg-[#FFF1F5] dark:bg-[#58171B] dark:text-[#FFA3B9] dark:hover:bg-[#301012]",

        subtle:
          "bg-[#E4E4E7] text-[#27272A] hover:bg-[#F4F4F5] dark:bg-[#3F3F46] dark:text-white dark:hover:bg-[#18181B]",
      },
    },
    defaultVariants: {
      variant: "primary",
    },
  },
);

type BadgeProps = React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants>;

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <span
      data-slot="badge"
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  );
}

export { Badge, badgeVariants };
