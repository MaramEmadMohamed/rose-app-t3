"use client";

import { useMutation } from "@tanstack/react-query";
import { sendEmailVerificationAction } from "../api/actions/send-email-verification";

export function useSendEmailVerification() {
  return useMutation({ mutationFn: sendEmailVerificationAction });
}