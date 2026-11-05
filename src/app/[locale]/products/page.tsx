import { setRequestLocale } from "next-intl/server";

// Empty for now so the home page links have a real page to open.
// The products grid and filters come in their own tickets.
export default async function ProductsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <main className="flex flex-1" />;
}
