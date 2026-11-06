import { ReactNode } from "react";

type Props = {
  title: string;
  subtitle: string;
  children?: ReactNode;
};

export function StepHeader({ title, subtitle, children }: Props) {
  return (
    <div className="space-y-1">
      <h2 className="text-lg font-semibold">{title}</h2>
      <p className="text-sm font-semibold text-[#7a1b1f]">{subtitle}</p>
      {children && <div className="text-xs text-muted-foreground">{children}</div>}
      <hr className="mt-3" />
    </div>
  );
}