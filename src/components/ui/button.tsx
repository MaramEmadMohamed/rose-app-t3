import { Button as ButtonPrimitive } from "@base-ui/react/button";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "cn";

/**
 * Button Design System
 * --------------------
 * Defines visual variants, interaction states, and sizes.
 *
 * Variants:
 * - default     : Theme-driven button
 * - primary     : Brand primary action
 * - secondary   : Secondary brand action
 * - outline     : Bordered button
 * - subtle      : Neutral surface button
 * - ghost       : Minimal background button
 * - destructive : Destructive actions
 * - link        : Text link button
 *
 * Modes:
 * - Light Mode
 * - Dark Mode (dark:)
 *
 * States:
 * - Default
 * - Hover
 * - Disabled
 *
 * Note:
 * Loading is currently handled by the test page.
 * It is not yet a dedicated Button prop.
 */

const buttonVariants = cva(
  // ==================================================
  // Base Styles
  // Shared across all variants and sizes.
  // ==================================================
  [
    "group/button inline-flex shrink-0 items-center justify-center",
    "rounded-lg border border-transparent bg-clip-padding",
    "text-sm font-medium whitespace-nowrap",
    "transition-all outline-none select-none",

    // Focus
    "focus-visible:border-ring",
    "focus-visible:ring-3 focus-visible:ring-ring/50",

    // Active press feedback
    "active:not-aria-[haspopup]:translate-y-px",

    // Shared disabled behavior
    "disabled:pointer-events-none",

    // Invalid state
    "aria-invalid:border-destructive",
    "aria-invalid:ring-3 aria-invalid:ring-destructive/20",

    // SVG normalization
    "[&_svg]:pointer-events-none",
    "[&_svg]:shrink-0",
    "[&_svg:not([class*='size-'])]:size-4",
  ].join(" "),
  {
    variants: {
      // ==================================================
      // Variant
      // ==================================================
      variant: {
        // --------------------------------------------------
        // Default
        // Uses semantic theme tokens.
        // --------------------------------------------------
        default: [
          "bg-primary text-primary-foreground",
          "hover:bg-primary/80",

          // Disabled
          "disabled:bg-[#E4E4E7] disabled:text-[#A1A1AA]",
          "disabled:hover:bg-[#E4E4E7]",

          // Dark Mode
          "dark:disabled:bg-[#18181B]",
          "dark:disabled:text-[#A1A1AA]",
        ].join(" "),

        // --------------------------------------------------
        // Primary
        // --------------------------------------------------
        primary: [
          // Light Mode - Default
          "bg-[#501419] text-white",

          // Light Mode - Hover
          "hover:bg-[#741C21]",

          // Light Mode - Disabled
          "disabled:bg-[#E4E4E7]",
          "disabled:text-[#71717A]",
          "disabled:hover:bg-[#E4E4E7]",

          // Dark Mode - Default
          "dark:bg-[#FFA3B9]",
          "dark:text-[#18181B]",

          // Dark Mode - Hover
          "dark:hover:bg-[#FFC2D0]",

          // Dark Mode - Disabled
          "dark:disabled:bg-[#18181B]",
          "dark:disabled:text-[#A1A1AA]",
          "dark:disabled:hover:bg-[#18181B]",
        ].join(" "),

        // --------------------------------------------------
        // Secondary
        // --------------------------------------------------
        secondary: [
          // Light Mode - Default
          "bg-[#FBEAEA] text-[#501419]",

          // Light Mode - Hover
          "hover:bg-[#F3C5C7]",

          // Light Mode - Disabled
          "disabled:bg-[#E4E4E7]",
          "disabled:text-[#71717A]",
          "disabled:hover:bg-[#E4E4E7]",

          // Dark Mode - Default
          "dark:bg-[#473036]",
          "dark:text-white",

          // Dark Mode - Hover
          "dark:hover:bg-[#C17C8E]",

          // Dark Mode - Disabled
          "dark:disabled:bg-[#18181B]",
          "dark:disabled:text-[#A1A1AA]",
          "dark:disabled:hover:bg-[#18181B]",
        ].join(" "),

        // --------------------------------------------------
        // Outline
        // --------------------------------------------------
        outline: [
          // Light Mode - Default
          "border border-[#501419]",
          "bg-white text-[#501419]",

          // Light Mode - Hover
          "hover:border-[#501419]",
          "hover:bg-[#FBEAEA]",

          // Light Mode - Disabled
          "disabled:border-[#E4E4E7]",
          "disabled:bg-[#E4E4E7]",
          "disabled:text-[#71717A]",
          "disabled:hover:bg-[#E4E4E7]",

          // Dark Mode - Default
          "dark:border-[#FFA3B9]",
          "dark:bg-[#3F3F46]",
          "dark:text-[#FFA3B9]",

          // Dark Mode - Hover
          "dark:hover:border-[#FFA3B9]",
          "dark:hover:bg-[#473036]",

          // Dark Mode - Disabled
          "dark:disabled:border-[#18181B]",
          "dark:disabled:bg-[#18181B]",
          "dark:disabled:text-[#A1A1AA]",
          "dark:disabled:hover:bg-[#18181B]",
        ].join(" "),

        subtle: [
          // -----------------------------------------------
          // Light Mode - Default
          // -----------------------------------------------
          "border border-[#D4D4D8]",
          "bg-[#F4F4F5] text-[#27272A]",

          // Light Mode - Hover
          "hover:border-[#D4D4D8]",
          "hover:bg-[#E4E4E7]",
          "hover:text-[#27272A]",

          // Light Mode - Disabled
          "disabled:border-[#E4E4E7]",
          "disabled:bg-[#E4E4E7]",
          "disabled:text-[#71717A]",

          // -----------------------------------------------
          // Dark Mode - Default
          // Background: #18181B
          // Border:     #52525B
          // -----------------------------------------------
          "dark:border-[#52525B]",
          "dark:bg-[#18181B]",
          "dark:text-white",

          // Dark Mode - Hover
          // Background: #27272A
          // Border:     #FFA3B9
          "dark:hover:border-[#FFA3B9]",
          "dark:hover:bg-[#27272A]",
          "dark:hover:text-white",

          // Dark Mode - Disabled
          "dark:disabled:border-[#18181B]",
          "dark:disabled:bg-[#18181B]",
          "dark:disabled:text-[#A1A1AA]",
        ].join(" "),

        // --------------------------------------------------
        // Ghost
        // Minimal background button.
        // Dark colors are provisional pending Figma review.
        // --------------------------------------------------
        ghost: [
          // Light Mode - Default
          "border border-transparent",
          "bg-white text-[#27272A]",

          // Light Mode - Hover
          "hover:bg-[#E4E4E7]",
          "hover:text-[#27272A]",

          // Light Mode - Disabled
          "disabled:bg-[#E4E4E7]",
          "disabled:text-[#71717A]",

          // Dark Mode - Default
          "dark:border-transparent",
          "dark:bg-transparent",
          "dark:text-white",

          // Dark Mode - Hover
          "dark:hover:bg-[#3F3F46]",
          "dark:hover:text-white",

          // Dark Mode - Disabled
          "dark:disabled:bg-[#18181B]",
          "dark:disabled:text-[#A1A1AA]",
        ].join(" "),

        // --------------------------------------------------
        // Destructive
        // Danger and delete actions.
        // Dark colors are provisional pending Figma review.
        // --------------------------------------------------

        destructive: [
          // Light Mode - Default
          "bg-[#DC2626] text-white",

          // Light Mode - Hover
          "hover:bg-[#B91C1C] hover:text-white",

          // Light Mode - Disabled
          "disabled:bg-[#E4E4E7]",
          "disabled:text-[#71717A]",

          // Dark Mode - Default
          "dark:bg-[#EF4444]",
          "dark:text-[#27272A]",

          // Dark Mode - Hover
          "dark:hover:bg-[#F87171]",
          "dark:hover:text-[#27272A]",

          // Dark Mode - Disabled
          "dark:disabled:bg-[#18181B]",
          "dark:disabled:text-[#A1A1AA]",
        ].join(" "),

        // --------------------------------------------------
        // Link
        // Text-only button style.
        // --------------------------------------------------
        link: [
          "text-primary underline-offset-4",
          "hover:underline",

          // Disabled
          "disabled:bg-transparent",
          "disabled:text-[#71717A]",

          // Dark Mode
          "dark:disabled:bg-transparent",
          "dark:disabled:text-[#A1A1AA]",
        ].join(" "),
      },

      // ==================================================
      // Size
      // ==================================================
      size: {
        // Default
        default: [
          "h-8 gap-1.5 px-2.5",
          "has-data-[icon=inline-end]:pr-2",
          "has-data-[icon=inline-start]:pl-2",
        ].join(" "),

        // Figma medium button
        md: "h-11 w-45.25 gap-2.5 rounded-lg px-4 py-3.5",

        // Extra small
        xs: [
          "h-6 gap-1",
          "rounded-[min(var(--radius-md),10px)]",
          "px-2 text-xs",
          "in-data-[slot=button-group]:rounded-lg",
          "has-data-[icon=inline-end]:pr-1.5",
          "has-data-[icon=inline-start]:pl-1.5",
          "[&_svg:not([class*='size-'])]:size-3",
        ].join(" "),

        // Small
        sm: [
          "h-7 gap-1",
          "rounded-[min(var(--radius-md),12px)]",
          "px-2.5 text-[0.8rem]",
          "in-data-[slot=button-group]:rounded-lg",
          "has-data-[icon=inline-end]:pr-1.5",
          "has-data-[icon=inline-start]:pl-1.5",
          "[&_svg:not([class*='size-'])]:size-3.5",
        ].join(" "),

        // Large
        lg: [
          "h-9 gap-1.5 px-2.5",
          "has-data-[icon=inline-end]:pr-2",
          "has-data-[icon=inline-start]:pl-2",
        ].join(" "),

        // Icon buttons
        icon: "size-8",

        "icon-xs": [
          "size-6",
          "rounded-[min(var(--radius-md),10px)]",
          "in-data-[slot=button-group]:rounded-lg",
          "[&_svg:not([class*='size-'])]:size-3",
        ].join(" "),

        "icon-sm": [
          "size-7",
          "rounded-[min(var(--radius-md),12px)]",
          "in-data-[slot=button-group]:rounded-lg",
        ].join(" "),

        "icon-lg": "size-9",
      },
    },

    // ==================================================
    // Default Props
    // ==================================================
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

/**
 * Button Component
 * ----------------
 * Wraps Base UI ButtonPrimitive and applies CVA styles.
 *
 * Examples:
 * <Button>Default</Button>
 * <Button variant="primary" size="md">Primary</Button>
 * <Button variant="outline" size="sm">Outline</Button>
 * <Button variant="destructive" size="icon">Delete</Button>
 */

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
