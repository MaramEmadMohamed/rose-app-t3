import type { ReactNode } from "react";

type AuthHeadingProps = {
  title: string;
  subtitle?: ReactNode;
  leading?: ReactNode;
};

export function AuthHeading({ title, subtitle, leading }: AuthHeadingProps) {
  return (
    <header className="border-soft flex w-full flex-col gap-1 border-b pb-4">
      <div className="flex items-center gap-2">
        {leading}
        <h1 className="text-plain text-xl font-medium">{title}</h1>
      </div>
      {subtitle && <div className="text-default text-sm">{subtitle}</div>}
    </header>
  );
}
