"use client"

import { Tabs as TabsPrimitive } from "@base-ui/react/tabs"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "cn"

function Tabs({
  className,
  orientation = "horizontal",
  ...props
}: TabsPrimitive.Root.Props) {
  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      data-orientation={orientation}
      className={cn(
        "group/tabs flex  data-horizontal:flex-col",
        className
      )}
      {...props}
    />
  )
}

const tabsListVariants = cva(
  "flex min-w-[294px] min-h-[44px]  items-stretch rounded-[10px] border-2 border-[#d9d9df] bg-white p-0 overflow-hidden",
  {
    variants: {
      variant: {
        default: "bg-white",
        line: "border-transparent bg-transparent",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function TabsList({
  className,
  variant = "default",
  ...props
}: TabsPrimitive.List.Props & VariantProps<typeof tabsListVariants>) {
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      data-variant={variant}
      className={cn(tabsListVariants({ variant }), className)}
      {...props}
    />
  )
}

function TabsTrigger({ className, ...props }: TabsPrimitive.Tab.Props) {
  return (
    <TabsPrimitive.Tab
      data-slot="tabs-trigger"
      className={cn( 
        "relative flex h-11 px-4 py-3.5 transition-colors  dark:bg-#52525b  dark:text-white  flex-1 items-center justify-center rounded-none border-0 bg-white  text-[16px] font-medium text-[#292929] ",
        "hover:bg-[#dc2626] dark:hover:bg-#ffc2d0 ",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#50151a] dark:focus-visible:ring-[#ff85a240]",
        "data-active:bg-[#50151a] data-active:text-white dark:data-active:text-black dark:data-active:bg-[#ff85a240]",
        "disabled:pointer-events-none disabled:opacity-40 dark:bg-[#18181b]",
        className
      )}
      {...props}
    />
  )
}
function TabsContent({ className, ...props }: TabsPrimitive.Panel.Props) {
  return (
    <TabsPrimitive.Panel
      data-slot="tabs-content"
      className={cn("flex-1 text-sm outline-none mt-2", className)}
      {...props}
    />
  )
}

export { Tabs, TabsList, TabsTrigger, TabsContent, tabsListVariants }