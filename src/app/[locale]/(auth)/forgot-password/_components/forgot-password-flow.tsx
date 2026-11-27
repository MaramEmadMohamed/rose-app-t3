"use client";

import { useState } from "react";

import { ForgotPasswordForm } from "./forgot-password-form";
import { ResetPasswordForm } from "./reset-password-form";
import { ResetLinkSent } from "./reset-link-sent";

type Step = "email" | "sent";

export function ForgotPasswordFlow({ token }: { token?: string }) {
  // State
  const [step, setStep] = useState<Step>("email");
  const [email, setEmail] = useState("");

  // Functions
  function handleSent(sentEmail: string) {
    setEmail(sentEmail);
    setStep("sent");
  }

  function handleEdit() {
    setStep("email");
  }

  if (token) return <ResetPasswordForm token={token} />;

  if (step === "sent") {
    return <ResetLinkSent email={email} onEdit={handleEdit} />;
  }

  return (
    <ForgotPasswordForm
      defaultEmail={email}
      shouldFocusEmail={email !== ""}
      onSent={handleSent}
    />
  );
}
