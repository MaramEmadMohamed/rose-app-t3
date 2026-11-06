import { setRequestLocale } from "next-intl/server";
import RegisterPage from "./(auth)/register/page";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <main className="flex flex-5 min-h-screen flex-col items-center justify-between p-24">
    <RegisterPage/>
    </main>
}
