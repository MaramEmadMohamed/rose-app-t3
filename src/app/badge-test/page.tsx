"use client";

import { useState } from "react";
import { ModeToggle } from "@/components/ui/mode-toggle";

export default function ModeToggleTestPage() {
  const [mode, setMode] = useState<"light" | "system" | "dark">("dark");

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 bg-white p-8 dark:bg-[#27272A]">
      <h1 className="text-2xl font-bold text-[#27272A] dark:text-white">
        Rose App | Mode Toggle
      </h1>

      <ModeToggle value={mode} onValueChange={setMode} />

      <p className="text-sm text-neutral-500">Selected mode: {mode}</p>
    </main>
  );
}
