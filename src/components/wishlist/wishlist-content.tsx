"use client";

import { ArrowLeft, FolderHeart } from "lucide-react";
import { useTranslations } from "next-intl";
import type { ReactNode } from "react";

import { useWishlist } from "@/hooks/use-wishlist";
import { Link } from "@/i18n/navigation";
import { isAuthenticated } from "@/lib/auth/access-token";
import { FOCUS_RING_CLASS_NAME } from "@/lib/styles/focus-ring";
import { cn } from "@/lib/utils";

import { ClearWishlistButton } from "./clear-wishlist-button";
import { WishlistEmpty } from "./wishlist-empty";
import { WishlistItem } from "./wishlist-item";

type StatusMessageProps = {
  role?: "status" | "alert";
  children: ReactNode;
};

function StatusMessage({ role, children }: StatusMessageProps) {
  return (
    <p role={role} className="py-10 text-center text-soft">
      {children}
    </p>
  );
}

export function WishlistContent() {
  // Translation
  const t = useTranslations("Wishlist");

  // Query
  const { data: items, isPending, isError } = useWishlist();

  // Functions
  // The query only runs for a logged-in user, so a guest gets a message.
  function renderItems() {
    if (!isAuthenticated())
      return <StatusMessage>{t("loginRequired")}</StatusMessage>;
    if (isPending)
      return <StatusMessage role="status">{t("loading")}</StatusMessage>;
    if (isError)
      return <StatusMessage role="alert">{t("error")}</StatusMessage>;
    if (items.length === 0) return <WishlistEmpty />;

    return (
      <ul className="flex flex-col gap-5">
        {items.map((item) => (
          <WishlistItem key={item.id} item={item} />
        ))}
      </ul>
    );
  }

  return (
    <section
      aria-labelledby="wishlist-title"
      className="mx-auto flex w-full max-w-320 flex-col gap-4 px-4 py-10"
    >
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-end gap-2.5 text-plain">
          <FolderHeart aria-hidden="true" size={60} absoluteStrokeWidth />
          <h1 id="wishlist-title" className="text-5xl leading-none font-bold">
            {t("title")}
          </h1>
          {items && (
            <p className="leading-none text-soft">
              {t("count", { count: items.length })}
            </p>
          )}
        </div>
        {items && <ClearWishlistButton disabled={items.length === 0} />}
      </div>

      <div className="border-t border-subtle pt-5">{renderItems()}</div>

      <Link
        href="/products"
        className={cn(
          "flex h-12 w-fit items-center gap-2.5 rounded-lg bg-primary px-8 leading-none font-medium text-inverse transition-opacity hover:opacity-90",
          FOCUS_RING_CLASS_NAME,
        )}
      >
        <ArrowLeft aria-hidden="true" size={20} className="rtl:rotate-180" />
        {t("continueShopping")}
      </Link>
    </section>
  );
}
