export type ApiUser = {
  id: string;
  username: string;
  email: string;
  phone: string | null;
  firstName: string;
  lastName: string;
  gender: string;
  emailVerified: boolean;
  phoneVerified: boolean;
  role: string;
};

export type LoginResponse = {
  status: boolean;
  code: number;
  payload: { user: ApiUser; token: string };
};

export type ApiMessageResponse = {
  status: boolean;
  code: number;
  message?: string;
};

export type ForgotPasswordBody = { email: string; redirectUrl: string };

export type ResetPasswordBody = {
  token: string;
  newPassword: string;
  confirmPassword: string;
};
