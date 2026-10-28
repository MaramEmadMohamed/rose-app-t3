"use client";

import { useTheme } from "next-themes";
import { Toaster as Sonner, toast, type ToasterProps } from "sonner";
import {
  Check,
  InfoIcon,
  OctagonXIcon,
  X,
} from "lucide-react";

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      icons={{
        success: <div className=" w-full  bg-green-200 px-6 relative  py-4 text-sm font-medium">
         <div className="flex items-center gap-2.5">
           <Check className="size-5 text-emerald-600 " />

          <p> Successful operation</p>
         </div>

          <button
            type="button"
            onClick={() => toast.dismiss()}
            aria-label="Close notification"
            className="ml-auto absolute top-0 right-0 rounded-md  py-2 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800 dark:hover:text-slate-200"
          >
            <X className="size-4" />
          </button>
        </div>,
        info: (
          <InfoIcon className="size-5 text-neutral-700 dark:text-neutral-300" />
        ),
        error: <OctagonXIcon className="size-5 text-rose-600" />,
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
          info: "group-[.toaster]:bg-neutral-100 group-[.toaster]:text-neutral-900 group-[.toaster]:border-neutral-200 dark:group-[.toaster]:bg-zinc-800 dark:group-[.toaster]:text-white dark:group-[.toaster]:border-zinc-700",
          success: "group-[.toaster]:bg-[#edf7f0] group-[.toaster]:text-neutral-900 group-[.toaster]:border-[#d4ede0] dark:group-[.toaster]:bg-emerald-950/40 dark:group-[.toaster]:text-emerald-200 dark:group-[.toaster]:border-emerald-900",
          error: "group-[.toaster]:bg-[#fcf0ef] group-[.toaster]:text-neutral-900 group-[.toaster]:border-[#f8d7d4] dark:group-[.toaster]:bg-rose-950/40 dark:group-[.toaster]:text-rose-200 dark:group-[.toaster]:border-rose-900",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };

