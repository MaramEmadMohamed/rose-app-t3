import "server-only";

const apiUrl = process.env.API_URL;

if (!apiUrl) {
  throw new Error(
    "API_URL is missing. Copy .env.example to .env.local and set it.",
  );
}

export const SERVER_API_URL = apiUrl;
