import { setRequestLocale } from "next-intl/server";

import { WishlistContent } from "@/components/wishlist/wishlist-content";

export default async function WishlistPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main className="flex flex-1">
      <WishlistContent />
    </main>
  );
}
