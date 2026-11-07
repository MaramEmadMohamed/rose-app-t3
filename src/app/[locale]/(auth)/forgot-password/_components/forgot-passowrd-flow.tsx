"use client";

import { useState } from "react";

import { ForgotPasswordForm } from "./forgot-password-form";
import { ResetLinkSent } from "./rest-link-sent";

type Step = "email" | "sent";

export function ForgotPasswordFlow() {
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
