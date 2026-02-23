"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import type { MarinaLocale } from "@/lib/marina-i18n";
import {
  marinaLocales,
  getMarinaTranslation,
} from "@/lib/marina-i18n";

function ChevronDown({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}

function ChevronUp({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M18 15l-6-6-6 6" />
    </svg>
  );
}

export function MarinaLanguageAccordion({ currentLocale }: { currentLocale: MarinaLocale }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  const setLocale = (locale: MarinaLocale) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("lang", locale);
    const path = typeof window !== "undefined" ? window.location.pathname : "/marina-masaje";
    router.push(`${path}?${params.toString()}`);
    setIsExpanded(false);
  };

  const currentFlag = marinaLocales.find((l) => l.value === currentLocale)?.flag ?? "🇫🇷";
  const chooseLabel = getMarinaTranslation(currentLocale, "choose-language");
  const closeLabel = getMarinaTranslation(currentLocale, "close");
  const openLabel = getMarinaTranslation(currentLocale, "open");

  return (
    <div className="w-full">
      <div className="rounded-xl border border-white/15 bg-white/10 overflow-hidden">
        <button
          type="button"
          onClick={() => setIsExpanded((p) => !p)}
          className="flex w-full min-h-[36px] items-center justify-center gap-1.5 px-3 py-2 transition-all duration-200 hover:bg-white/10 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
          aria-expanded={isExpanded}
          aria-label={isExpanded ? `${closeLabel} ${chooseLabel}` : `${openLabel} ${chooseLabel}`}
        >
          <span className="text-lg leading-none" aria-hidden>
            {currentFlag}
          </span>
          <span className="shrink-0 text-white/80">
            {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </span>
        </button>
        {isExpanded && (
          <div className="flex flex-wrap justify-center gap-1 border-t border-white/10 bg-white/5 p-2">
            {marinaLocales.map(({ value, flag, label }) => (
              <button
                key={value}
                type="button"
                onClick={() => setLocale(value)}
                title={label}
                aria-label={label}
                className={`flex h-8 w-8 items-center justify-center rounded-lg text-lg transition-all hover:bg-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:ring-inset ${
                  value === currentLocale ? "scale-110 bg-white/15 ring-1 ring-white/20" : "opacity-90"
                }`}
              >
                {flag}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
