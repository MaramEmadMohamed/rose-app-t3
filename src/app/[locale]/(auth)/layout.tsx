import { AuthOrnament } from "@/components/auth/auth-ornament";
import Image from "next/image";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="bg-plain grid min-h-screen flex-1 lg:grid-cols-2">
      <section className="flex flex-col items-center justify-center gap-6 px-6 py-10">
        <div className="flex w-full max-w-sm flex-col items-center gap-6">
          <AuthOrnament />
          {children}
          <AuthOrnament flipped />
        </div>
      </section>

      <div className="relative hidden lg:block">
        <Image
          src="/images/auth/login-hero.jpg"
          alt=""
          fill
          priority
          sizes="50vw"
          className="object-cover"
        />
      </div>
    </main>
  );
}
