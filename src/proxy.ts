import { NextResponse } from "next/server";
import createMiddleware from "next-intl/middleware";

import { auth } from "@/auth";
import { routing } from "@/i18n/routing";

const GUEST_ONLY_PATHS = ["/login", "/forgot-password"];

const intlMiddleware = createMiddleware(routing);

function splitLocale(pathname: string) {
  const [, firstSegment, ...rest] = pathname.split("/");
  const locale = routing.locales.find((item) => item === firstSegment);

  return { locale, path: `/${rest.join("/")}`.replace(/\/$/, "") || "/" };
}

export default auth((request) => {
  const { locale, path } = splitLocale(request.nextUrl.pathname);
  const isSignedIn = Boolean(request.auth);
  const isGuestOnlyPath = GUEST_ONLY_PATHS.includes(path);

  if (locale && isSignedIn && isGuestOnlyPath) {
    return NextResponse.redirect(new URL(`/${locale}`, request.url));
  }

  return intlMiddleware(request);
});

export const config = {
  matcher: "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
};
