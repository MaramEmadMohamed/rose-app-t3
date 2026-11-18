"use client";

import { Trash2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRef } from "react";

import { useWishlistActions } from "@/hooks/use-wishlist";
import { FOCUS_RING_CLASS_NAME } from "@/lib/styles/focus-ring";
import { cn } from "@/lib/utils";

const DIALOG_BUTTON_CLASS_NAME = cn(
  "h-11 rounded-lg px-6 leading-none font-medium",
  FOCUS_RING_CLASS_NAME,
);

export function ClearWishlistButton({ disabled }: { disabled: boolean }) {
  // Translation
  const t = useTranslations("Wishlist");

  // Ref
  const dialogRef = useRef<HTMLDialogElement>(null);

  // Custom hooks
  const { clear } = useWishlistActions();

  // Functions
  function openDialog() {
    dialogRef.current?.showModal();
  }

  function closeDialog() {
    dialogRef.current?.close();
  }

  function clearWishlist() {
    clear.mutate();
    closeDialog();
  }

  return (
    <>
      <button
        type="button"
        onClick={openDialog}
        disabled={disabled}
        className={cn(
          "flex h-11 items-center gap-2.5 rounded-lg bg-danger px-4 leading-none text-inverse transition-opacity hover:opacity-90 disabled:bg-danger-fade disabled:text-danger disabled:hover:opacity-100",
          FOCUS_RING_CLASS_NAME,
        )}
      >
        <Trash2 aria-hidden="true" size={16} />
        {t("clear")}
      </button>

      <dialog
        ref={dialogRef}
        aria-labelledby="clear-wishlist-question"
        className="m-auto w-[min(26rem,calc(100%-2rem))] rounded-2xl bg-plain p-6 text-plain backdrop:bg-overlay"
      >
        <p
          id="clear-wishlist-question"
          className="text-xl leading-snug font-semibold"
        >
          {t("clearQuestion")}
        </p>
        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={closeDialog}
            className={cn(DIALOG_BUTTON_CLASS_NAME, "bg-muted text-plain")}
          >
            {t("cancel")}
          </button>
          <button
            type="button"
            onClick={clearWishlist}
            className={cn(DIALOG_BUTTON_CLASS_NAME, "bg-danger text-inverse")}
          >
            {t("clearConfirm")}
          </button>
        </div>
      </dialog>
    </>
  );
}
