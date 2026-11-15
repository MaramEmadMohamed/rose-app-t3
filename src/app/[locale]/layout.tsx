import type { Metadata } from "next";
import { Sarabun, Tajawal } from "next/font/google";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { Toaster } from "@/components/ui/sonner";
import LocaleSwitcher from "@/components/locale-switcher";
import { routing } from "@/i18n/routing";
import "../globals.css";

const sarabun = Sarabun({ variable: "--font-sarabun", subsets: ["latin"], weight: ["400", "500", "600", "700"] });
const tajawal = Tajawal({ variable: "--font-tajawal", subsets: ["arabic", "latin"], weight: ["400", "500", "700"] });

export const metadata: Metadata = {
  title: "Rose | Gifts for Every Occasion",
  description: "Find thoughtful gifts for every special occasion.",
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: LayoutProps<"/[locale]">) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  const messages = await getMessages();

  return (
    <html lang={locale} dir={locale === "ar" ? "rtl" : "ltr"} className={`${sarabun.variable} ${tajawal.variable} h-full antialiased`}>
      <body className={`flex min-h-full flex-col ${locale === "ar" ? "font-[family-name:var(--font-tajawal)]" : "font-[family-name:var(--font-sarabun)]"}`}>
        <NextIntlClientProvider messages={messages}>
          <LocaleSwitcher />
          {children}
        </NextIntlClientProvider>
        <Toaster />
      </body>
    </html>
  );
}
