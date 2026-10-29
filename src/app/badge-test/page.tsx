"use client";

import { Badge } from "@/components/ui/badge";

const variants = [
  {
    name: "Primary",
    variant: "primary" as const,
    hoveredClass: "bg-[#741C21] dark:bg-[#FFC2D0]",
  },
  {
    name: "Secondary",
    variant: "secondary" as const,
    hoveredClass: "bg-[#FFF1F5] dark:bg-[#301012]",
  },
  {
    name: "Subtle",
    variant: "subtle" as const,
    hoveredClass: "bg-[#F4F4F5] dark:bg-[#18181B]",
  },
];

function BadgeExamples() {
  return (
    <div className="grid grid-cols-2 gap-x-10 gap-y-4">
      {variants.map((item) => (
        <div key={item.name} className="contents">
          {/* Default */}
          <div className="flex items-center justify-center">
            <Badge variant={item.variant}>{item.name}</Badge>
          </div>

          {/* Hover preview */}
          <div className="flex items-center justify-center">
            <Badge variant={item.variant} className={item.hoveredClass}>
              {item.name} Hover
            </Badge>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function BadgeTestPage() {
  return (
    <main className="min-h-screen space-y-8 bg-white p-8 text-[#27272A]">
      <h1 className="text-2xl font-bold">Rose App | Badge</h1>

      <section className="space-y-6 rounded-xl bg-white p-8">
        <h2 className="text-lg font-semibold">Badge (Light)</h2>
        <BadgeExamples />
      </section>

      <section className="dark space-y-6 rounded-xl bg-[#27272A] p-8 text-white">
        <h2 className="text-lg font-semibold">Badge (Dark)</h2>
        <BadgeExamples />
      </section>

      <p className="text-sm text-neutral-500">
        First column: Default. Second column: Hover color preview.
      </p>
    </main>
  );
}
