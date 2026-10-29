"use client";

import { Sun, Monitor, Moon } from "lucide-react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { cn } from "@/lib/utils";

type ThemeMode = "light" | "system" | "dark";

type ModeToggleProps = {
  value: ThemeMode;
  onValueChange: (value: ThemeMode) => void;
  className?: string;
};

function ModeToggle({ value, onValueChange, className }: ModeToggleProps) {
  const modes = [
    { value: "light", label: "Light mode", Icon: Sun },
    { value: "system", label: "System mode", Icon: Monitor },
    { value: "dark", label: "Dark mode", Icon: Moon },
  ] as const;

  return (
    <div
      className={cn(
        "inline-flex h-10 items-center gap-0.5 rounded-full border border-[#E4E4E7] bg-white p-1",
        "dark:border-[#3F3F46] dark:bg-[#27272A]",
        className,
      )}
    >
      <ToggleGroup
        value={[value]}
        onValueChange={(nextValue) => {
          const selected = nextValue[0];

          if (
            selected === "light" ||
            selected === "system" ||
            selected === "dark"
          ) {
            onValueChange(selected);
          }
        }}
        spacing={0}
        className="gap-0"
        aria-label="Choose color theme"
      >
        {modes.map(({ value: mode, label, Icon }) => (
          <ToggleGroupItem
            key={mode}
            value={mode}
            aria-label={label}
            className={cn(
              "size-8 rounded-full border-0 p-0 text-[#27272A]",
              "hover:bg-[#E4E4E7] data-[pressed]:bg-[#E4E4E7]",
              "dark:text-white dark:hover:bg-[#3F3F46] dark:data-[pressed]:bg-[#3F3F46]",
            )}
          >
            <Icon className="size-6" />
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
    </div>
  );
}

export { ModeToggle };
