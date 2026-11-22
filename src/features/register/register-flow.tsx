"use client";
import { RegisterProvider, useRegister } from "./register-context";
import { Stepper } from "./stepper";
import { EmailStep } from "./steps/email-step";
import { OtpStep } from "./steps/otp-step";
import { ProfileStep } from "./steps/profile-step";
import { PasswordStep } from "./steps/password-step";
import { DoneStep } from "./steps/done-step";

function Flow() {
  const { step } = useRegister();

  return (
    <div className="space-y-6">
      {step !== "done" && step !== "email" && <Stepper current={step} />}
      {step === "email" && <EmailStep />}
      {step === "otp" && <OtpStep />}
      {step === "profile" && <ProfileStep />}
      {step === "password" && <PasswordStep />}
      {step === "done" && <DoneStep />}
    </div>
  );
}

export function RegisterFlow() {
  return (
    <RegisterProvider>
      <Flow />
    </RegisterProvider>
  );
}