"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { LoaderCircle } from "lucide-react";

export default function ButtonTestPage() {
  const [loading, setLoading] = useState(false);

  function handleClick() {
    setLoading(true);
    setTimeout(() => setLoading(false), 1500);
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-8 bg-white p-8 text-neutral-900">
      <h1 className="text-2xl font-bold">Rose App | Primary Button</h1>
      {/* test button primary light */}
      <div className="flex flex-wrap items-center justify-center gap-4">
        <Button variant="primary" size="md">
          primary
        </Button>

        <Button variant="primary" size="md" disabled>
          Disabled
        </Button>

        <Button
          variant="primary"
          size="md"
          onClick={handleClick}
          disabled={loading}
        >
          {loading ? (
            <>
              Loading
              <LoaderCircle className="size-4.5 animate-spin" />
            </>
          ) : (
            "Test loading"
          )}
        </Button>
      </div>

      {/* test button secondary */}
      <div className="flex flex-wrap items-center justify-center gap-4">
        <Button variant="secondary" size="md">
          secondary
        </Button>

        <Button variant="secondary" size="md" disabled>
          Disabled
        </Button>

        <Button
          variant="primary"
          size="md"
          onClick={handleClick}
          disabled={loading}
        >
          {loading ? (
            <>
              Loading
              <LoaderCircle className="size-4.5 animate-spin" />
            </>
          ) : (
            "Test loading"
          )}
        </Button>
      </div>

      {/* test button outline */}
      <div className="flex flex-wrap items-center justify-center gap-4">
        <Button variant="outline" size="md">
          outline
        </Button>

        <Button variant="outline" size="md" disabled>
          Disabled
        </Button>

        <Button
          variant="outline"
          size="md"
          onClick={handleClick}
          disabled={loading}
        >
          {loading ? (
            <>
              Loading
              <LoaderCircle className="size-4.5 animate-spin" />
            </>
          ) : (
            "Test loading"
          )}
        </Button>
      </div>

      {/* test button subtle */}
      <div className="flex flex-wrap items-center justify-center gap-4">
        <Button variant="subtle" size="md">
          subtle
        </Button>

        <Button variant="subtle" size="md" disabled>
          Disabled
        </Button>

        <Button
          variant="subtle"
          size="md"
          onClick={handleClick}
          disabled={loading}
        >
          {loading ? (
            <>
              Loading
              <LoaderCircle className="size-4.5 animate-spin" />
            </>
          ) : (
            "Test loading"
          )}
        </Button>
      </div>

      {/* test button ghost */}
      <div className="flex flex-wrap items-center justify-center gap-4">
        <Button variant="ghost" size="md">
          ghost
        </Button>

        <Button variant="ghost" size="md" disabled>
          Disabled
        </Button>

        <Button
          variant="ghost"
          size="md"
          onClick={handleClick}
          disabled={loading}
        >
          {loading ? (
            <>
              Loading
              <LoaderCircle className="size-4.5 animate-spin" />
            </>
          ) : (
            "Test loading"
          )}
        </Button>
      </div>

      {/* test button destructive */}
      <div className="flex flex-wrap items-center justify-center gap-4">
        <Button variant="destructive" size="md">
          destructive
        </Button>

        <Button variant="destructive" size="md" disabled>
          Disabled
        </Button>

        <Button
          variant="destructive"
          size="md"
          onClick={handleClick}
          disabled={loading}
        >
          {loading ? (
            <>
              Loading
              <LoaderCircle className="size-4.5 animate-spin" />
            </>
          ) : (
            "Test loading"
          )}
        </Button>
      </div>

      {/* Test Button - Dark Mode */}
      <div className="dark flex flex-wrap items-center justify-center gap-4 rounded-xl bg-[#27272A] p-6">
        <Button variant="primary" size="md">
          Primary Dark
        </Button>

        <Button variant="primary" size="md" disabled>
          Disabled Dark
        </Button>

        <Button
          variant="primary"
          size="md"
          onClick={handleClick}
          disabled={loading}
        >
          {loading ? (
            <>
              Loading
              <LoaderCircle className="size-4.5 animate-spin" />
            </>
          ) : (
            "Test Loading Dark"
          )}
        </Button>
      </div>

      {/* Secondary - Dark Mode */}
      <div className="dark flex flex-wrap items-center gap-4 rounded-xl bg-[#27272A] p-6">
        <Button variant="secondary" size="md">
          Secondary
        </Button>

        <Button variant="secondary" size="md" disabled>
          Disabled
        </Button>

        <Button
          variant="secondary"
          size="md"
          disabled={loading}
          onClick={handleClick}
        >
          {loading ? (
            <>
              Loading
              <LoaderCircle className="size-4.5 animate-spin" />
            </>
          ) : (
            "Test Loading"
          )}
        </Button>
      </div>

      {/* Outline - Dark Mode */}
      <div className="dark flex flex-wrap items-center gap-4 rounded-xl bg-[#27272A] p-6">
        <Button variant="outline" size="md">
          Outline
        </Button>

        <Button variant="outline" size="md" disabled>
          Disabled
        </Button>

        <Button
          variant="outline"
          size="md"
          disabled={loading}
          onClick={handleClick}
        >
          {loading ? (
            <>
              Loading
              <LoaderCircle className="size-4.5 animate-spin" />
            </>
          ) : (
            "Test Loading"
          )}
        </Button>
      </div>

      {/* Subtle - Dark Mode */}
      <div className="dark flex flex-wrap items-center gap-4 rounded-xl bg-[#27272A] p-6">
        <Button variant="subtle" size="md">
          Subtle
        </Button>

        <Button variant="subtle" size="md" disabled>
          Disabled
        </Button>

        <Button
          variant="subtle"
          size="md"
          disabled={loading}
          onClick={handleClick}
        >
          {loading ? (
            <>
              Loading
              <LoaderCircle className="size-4.5 animate-spin" />
            </>
          ) : (
            "Test Loading"
          )}
        </Button>
      </div>

      {/* Ghost - Dark Mode */}
      <div className="dark flex flex-wrap items-center gap-4 rounded-xl bg-[#27272A] p-6">
        <Button variant="ghost" size="md">
          Ghost
        </Button>

        <Button variant="ghost" size="md" disabled>
          Disabled
        </Button>

        <Button
          variant="ghost"
          size="md"
          disabled={loading}
          onClick={handleClick}
        >
          {loading ? (
            <>
              Loading
              <LoaderCircle className="size-4.5 animate-spin" />
            </>
          ) : (
            "Test Loading"
          )}
        </Button>
      </div>

      {/* Destructive - Dark Mode */}
      <div className="dark flex flex-wrap items-center gap-4 rounded-xl bg-[#27272A] p-6">
        <Button variant="destructive" size="md">
          Destructive
        </Button>

        <Button variant="destructive" size="md" disabled>
          Disabled
        </Button>

        <Button
          variant="destructive"
          size="md"
          disabled={loading}
          onClick={handleClick}
        >
          {loading ? (
            <>
              Loading
              <LoaderCircle className="size-4.5 animate-spin" />
            </>
          ) : (
            "Test Loading"
          )}
        </Button>
      </div>

      <p className="text-sm text-neutral-500">
        جرّب المرور بالمؤشر فوق الزر، ثم اختبر التعطيل والتحميل.
      </p>
    </main>
  );
}
