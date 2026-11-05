import { useEffect, useState } from "react";

// Returns the value only after it stopped changing for `delayMs`.
export function useDebouncedValue<TValue>(value: TValue, delayMs: number) {
  // State
  const [debouncedValue, setDebouncedValue] = useState(value);

  // Effects
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delayMs);
    return () => clearTimeout(timer);
  }, [value, delayMs]);

  return debouncedValue;
}
