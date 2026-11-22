"use client";

import { useMutation } from "@tanstack/react-query";
import {
  registerUserAction,
  type RegisterPayload,
} from "../api/actions/register-user";

export function useRegisterUser() {
  return useMutation({
    mutationFn: (values: RegisterPayload) => registerUserAction(values),
  });
}