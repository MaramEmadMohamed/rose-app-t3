"use client";
import { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useRegister } from "../register-context";

export function DoneStep() {
  const { reset } = useRegister();
  // ننظف الـ state بعد ما المستخدم يسيب الصفحة، مش وقت الدخول
  useEffect(() => () => reset(), []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="space-y-4 text-center">
      <h2 className="text-lg font-semibold">Your account has been created 🎉</h2>
      <p className="text-sm text-muted-foreground">Welcome to the family!</p>
      <Button  className="w-full"><Link href="/">Continue</Link></Button>
    </div>
  );
}