const BASE = process.env.NEXT_PUBLIC_API_URL; 

type ApiResponse<T> = {
  status: boolean;
  code: number;
  message: string;
  payload: T;
};

export class ApiError extends Error {
  code: number;
  constructor(message: string, code: number) {
    super(message);
    this.code = code;
  }
}

async function post<T>(path: string, body: unknown): Promise<ApiResponse<T>> {
  const res = await fetch(`${BASE}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  const data = await res.json().catch(() => null);

  if (!res.ok || data?.status === false) {
    if (process.env.NODE_ENV === "development") {
      console.log(`[API ${path}] sent:`, body, "received:", data);
    }
    throw new ApiError(
      data?.message ?? "Something went wrong",
      data?.code ?? res.status,
    );
  }

  return data as ApiResponse<T>;
}

export const sendEmailVerification = (email: string) =>
  post<{ code?: string } | string | undefined>("/auth/send-email-verification", {
    email,
  });

export const confirmEmailVerification = (email: string, otp: string) =>
  post<unknown>("/auth/confirm-email-verification", { email, code: otp });

export type RegisterPayload = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  username: string;
  phone: string;
  gender: string;
};

// ⚠️ أسماء الحقول افتراضية لحد ما أشوف Request body بتاع register
export const registerUser = (data: RegisterPayload) =>
  post<{ user: unknown; token: string }>("/auth/register", data);