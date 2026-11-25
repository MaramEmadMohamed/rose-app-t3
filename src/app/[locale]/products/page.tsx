import { setRequestLocale } from "next-intl/server";

// TODO: the products grid and filters come in their own tickets. Until then
// this empty page keeps the home page links from opening a 404.
export default async function ProductsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <main className="flex flex-1" />;
}
