import { requestApi } from "@/lib/api/api-client";
import type {
  ApiMessageResponse,
  ForgotPasswordBody,
  ResetPasswordBody,
} from "@/types/auth";

export function requestPasswordReset(body: ForgotPasswordBody) {
  return requestApi<ApiMessageResponse>("/api/auth/forgot-password", {
    method: "POST",
    body: JSON.stringify(body),
  });
}

export function resetPassword(body: ResetPasswordBody) {
  return requestApi<ApiMessageResponse>("/api/auth/reset-password", {
    method: "POST",
    body: JSON.stringify(body),
  });
}
