"use client";

import dynamic from "next/dynamic";

const RegisterFlow = dynamic(
  () => import("./register-flow").then((m) => m.RegisterFlow),
  { ssr: false },
);

export function RegisterFlowClient() {
  return <RegisterFlow />;
}