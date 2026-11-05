"use client";

import { Search, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { useId, useRef, useState, type FormEvent } from "react";

import { useDebouncedValue } from "@/hooks/use-debounced-value";
import { useDismiss } from "@/hooks/use-dismiss";
import { useRouter } from "@/i18n/navigation";
import { SEARCH_DEBOUNCE_MS } from "@/lib/constants/search";
import { FOCUS_RING_CLASS_NAME } from "@/lib/styles/focus-ring";
import { cn } from "@/lib/utils";

import { SearchPanel } from "./search/search-panel";

export function HeaderSearch() {
  // Translation
  const t = useTranslations("Header");

  // Navigation
  const router = useRouter();

  // State
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  // Ref
  const searchRef = useRef<HTMLElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const panelId = useId();

  // Custom hooks
  const searchTerm = useDebouncedValue(query.trim(), SEARCH_DEBOUNCE_MS);
  useDismiss({ ref: searchRef, isOpen, onDismiss: closePanel });

  // Functions
  function openPanel() {
    setIsOpen(true);
  }

  function closePanel() {
    setIsOpen(false);
  }

  function clearSearch() {
    setQuery("");
    inputRef.current?.focus();
  }

  // Enter opens the products page with the search term in the URL.
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmedQuery = query.trim();
    if (!trimmedQuery) return;

    closePanel();
    router.push({ pathname: "/products", query: { search: trimmedQuery } });
  }

  return (
    <search ref={searchRef} className="relative min-w-0 flex-1">
      {/* While the panel is open, the box and the list below look like one
          card, like the design. The line under the box turns maroon once
          something is typed. */}
      <form
        onSubmit={handleSubmit}
        className={cn(
          "flex h-13 items-center gap-2 rounded-xl border border-soft bg-plain px-4",
          isOpen
            ? "rounded-t-3xl rounded-b-none border-transparent border-b-subtle"
            : "focus-within:border-default focus-within:ring-3 focus-within:ring-focus",
          isOpen && query && "border-b-maroon-600",
        )}
      >
        <Search aria-hidden="true" className="size-5 shrink-0 text-muted" />
        <label htmlFor="header-search" className="sr-only">
          {t("searchLabel")}
        </label>
        <input
          ref={inputRef}
          id="header-search"
          type="search"
          autoComplete="off"
          value={query}
          onChange={(event) => {
            setQuery(event.target.value);
            openPanel();
          }}
          onFocus={openPanel}
          aria-controls={isOpen ? panelId : undefined}
          placeholder={t("searchPlaceholder")}
          className="min-w-0 flex-1 bg-transparent text-plain outline-none placeholder:text-sm placeholder:text-muted [&::-webkit-search-cancel-button]:appearance-none"
        />
        {query && (
          <button
            type="button"
            onClick={clearSearch}
            aria-label={t("searchClear")}
            className={cn(
              "rounded-md text-muted transition-colors hover:text-plain",
              FOCUS_RING_CLASS_NAME,
            )}
          >
            <X aria-hidden="true" className="size-4" />
          </button>
        )}
      </form>

      {isOpen && (
        <SearchPanel
          id={panelId}
          searchTerm={searchTerm}
          onSelect={closePanel}
        />
      )}
    </search>
  );
}
