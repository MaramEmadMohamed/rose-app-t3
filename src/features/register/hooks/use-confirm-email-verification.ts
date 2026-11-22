"use client";
import { useMutation } from "@tanstack/react-query";
import { confirmEmailVerificationAction } from "../api/actions/confirm-email-verification";

export function useConfirmEmailVerification() {
  return useMutation({ mutationFn: confirmEmailVerificationAction });
}