"use client";

import { useTheme } from "next-themes";
import { Toaster as Sonner, toast, type ToasterProps } from "sonner";
import {
  Check,
  InfoIcon,
  OctagonXIcon,
  X,
  XIcon,
} from "lucide-react";

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group "
      icons={{
        success: (
          <div>
            <Check className="size-5 text-emerald-600 " />
            {/* <button
            type="button"
            onClick={() => toast.dismiss()}
            aria-label="Close notification"
            className="  rounded-md  py-2 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800 dark:hover:text-slate-200"
          >
            <X className="size-4 absolute top-0 left-0" />
          </button> */}
          </div>
        ),
        info: (
          <InfoIcon className="size-5 text-neutral-700 " />
        ),
        error: <XIcon className="size-5 text-rose-600" />,
      }}
      style={
        {
          "--normal-bg": "var(--popover)",
          "--normal-text": "var(--popover-foreground)",
          "--normal-border": "var(--border)",
          "--border-radius": "var(--radius)",
        } as React.CSSProperties
      }
    
      toastOptions={{
        classNames: {
          toast: "group toast group-[.toaster]:shadow-sm group-[.toaster]:rounded-2xl group-[.toaster]:p-4 group-[.toaster]:font-sans",
          info: "bg-#f4f4f5! text-black! border-rgba(212, 212, 216, 1)! dark:bg-#18181b! ",
          success: "bg-emerald-50!  text-black! border-rgba(212, 212, 216, 1)!  dark:bg-emerald-500! dark:text-white! ",
          error: "bg-#fef2f2! text-black! border-rgba(212, 212, 216, 1)! dark:bg-#431819! ",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };

