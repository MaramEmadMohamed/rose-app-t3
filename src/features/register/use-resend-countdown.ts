"use client";
import { useSyncExternalStore } from "react";

const KEY = "register:otp-resend-at";
const EVENT = "register:otp-resend-changed";
const LOCK_MS = 60_000;

function getSeconds() {
  const at = Number(localStorage.getItem(KEY) ?? 0);
  return Math.max(0, Math.ceil((at - Date.now()) / 1000));
}

function subscribe(onChange: () => void) {
  const id = setInterval(onChange, 1000);
  window.addEventListener(EVENT, onChange);
  window.addEventListener("storage", onChange);
  return () => {
    clearInterval(id);
    window.removeEventListener(EVENT, onChange);
    window.removeEventListener("storage", onChange);
  };
}

export function useResendCountdown() {
  const secondsLeft = useSyncExternalStore(subscribe, getSeconds, () => 0);

  const start = () => {
    localStorage.setItem(KEY, String(Date.now() + LOCK_MS));
    window.dispatchEvent(new Event(EVENT));
  };

  return { secondsLeft, start };
}