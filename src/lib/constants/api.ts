const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

// Fail early with a clear message instead of sending requests to a wrong URL.
if (!apiBaseUrl) {
  throw new Error(
    "NEXT_PUBLIC_API_BASE_URL is missing. Copy .env.example to .env.local and set it.",
  );
}

export const API_BASE_URL = apiBaseUrl;

export const HTTP_STATUS = {
  BAD_REQUEST: 400,
  CONFLICT: 409,
  INTERNAL_SERVER_ERROR: 500,
} as const;
