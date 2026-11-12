import { setRequestLocale } from "next-intl/server";
import { ForgotPasswordFlow } from "./_components/forgot-password-flow";

export default async function ForgotPasswordPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ token?: string }>;
}) {
  const { locale } = await params;
  const { token } = await searchParams;
  setRequestLocale(locale);

  return <ForgotPasswordFlow token={token} />;
}
