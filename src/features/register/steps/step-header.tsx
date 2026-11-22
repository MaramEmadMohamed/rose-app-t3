import { ReactNode } from "react";

type Props = {
  title: string;
  subtitle: string;
  children?: ReactNode;
};

export function StepHeader({ title, subtitle, children }: Props) {
  return (
    <div className="space-y-1">
      <h1 className="text-2xl font-bold">{title}</h1>
      <p className="text-md font-semibold text-primary">{subtitle}</p>
      {children && <div className="text-xs">{children}</div>}
      <hr className="mt-3 border-border" />
    </div>
  );
}