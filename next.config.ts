import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

if (!apiBaseUrl) {
  throw new Error(
    "NEXT_PUBLIC_API_BASE_URL is missing. Copy .env.example to .env.local and set it.",
  );
}

// Product images come from the API server, so next/image must allow its host.
const apiUrl = new URL(apiBaseUrl);

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: apiUrl.hostname,
        pathname: "/storage/**",
      },
    ],
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  // The service worker must never be cached, so users always get the latest one.
  async headers() {
    return [
      {
        source: "/sw.js",
        headers: [
          { key: "Content-Type", value: "application/javascript; charset=utf-8" },
          { key: "Cache-Control", value: "no-cache, no-store, must-revalidate" },
          { key: "Content-Security-Policy", value: "default-src 'self'; script-src 'self'" },
        ],
      },
    ];
  },
};

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

export default withNextIntl(nextConfig);
