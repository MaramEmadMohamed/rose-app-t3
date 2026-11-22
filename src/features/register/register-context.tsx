"use client";
import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { ProfileValues } from "./register.schema";

export type Step = "email" | "otp" | "profile" | "password" | "done";
export const STEPS: Step[] = ["email", "otp", "profile", "password"];

type State = {
  step: Step;
  email: string;
  profile: ProfileValues | null;
};

type Ctx = State & {
  update: (patch: Partial<State>) => void;
  reset: () => void;
};

const KEY = "register:state";
const initial: State = { step: "email", email: "", profile: null };

function load(): State {
  try {
    const saved = sessionStorage.getItem(KEY);
    return saved ? JSON.parse(saved) : initial;
  } catch {
    return initial;
  }
}

const RegisterContext = createContext<Ctx | null>(null);

export function RegisterProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<State>(load);

  // مزامنة مع نظام خارجي (sessionStorage) وده استخدام سليم للـ effect
  useEffect(() => {
    sessionStorage.setItem(KEY, JSON.stringify(state));
  }, [state]);

  const update = (patch: Partial<State>) => setState((s) => ({ ...s, ...patch }));

  const reset = () => {
    sessionStorage.removeItem(KEY);
    localStorage.removeItem("register:otp-resend-at");
    setState(initial);
  };

  return (
    <RegisterContext.Provider value={{ ...state, update, reset }}>
      {children}
    </RegisterContext.Provider>
  );
}

export const useRegister = () => {
  const ctx = useContext(RegisterContext);
  if (!ctx) throw new Error("useRegister must be used inside RegisterProvider");
  return ctx;
};