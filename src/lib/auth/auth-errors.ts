import { CredentialsSignin } from "next-auth";

export const LOGIN_ERROR_CODE = {
  INVALID_CREDENTIALS: "invalid_credentials",
  SERVICE_UNAVAILABLE: "service_unavailable",
} as const;

export class InvalidCredentialsError extends CredentialsSignin {
  code = LOGIN_ERROR_CODE.INVALID_CREDENTIALS;
}

export class LoginServiceError extends CredentialsSignin {
  code = LOGIN_ERROR_CODE.SERVICE_UNAVAILABLE;
}
