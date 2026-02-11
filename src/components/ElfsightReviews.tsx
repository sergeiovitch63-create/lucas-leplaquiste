"use client";

import { useCallback, useEffect, useRef } from "react";

const ELFSIGHT_APP_CLASS = "elfsight-app-155f2dd7-a007-4ece-9757-b5f28fc288c5";
const ELFSIGHT_SCRIPT_SRC_BASE = "https://apps.elfsight.com/p/platform.js";

function removeExistingElfsightScripts() {
  if (typeof document === "undefined") return;

  const scripts = Array.from(
    document.querySelectorAll<HTMLScriptElement>("script[src*=\"elfsight.com/p/platform.js\"], script[src*=\"elfsightcdn.com/platform.js\"]"),
  );

  scripts.forEach((script) => {
    script.parentElement?.removeChild(script);
  });
}

function injectElfsightScript() {
  if (typeof document === "undefined") return;

  const script = document.createElement("script");
  script.src = `${ELFSIGHT_SCRIPT_SRC_BASE}?cb=${Date.now()}`;
  script.defer = true;
  document.body.appendChild(script);
}

export function ElfsightReviews() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const reloadWidget = useCallback(() => {
    // Clear previous widget markup if any
    if (containerRef.current) {
      containerRef.current.innerHTML = "";
    }

    // Remove any existing Elfsight platform scripts
    removeExistingElfsightScripts();

    // Inject a fresh script tag with cache-buster
    injectElfsightScript();
  }, []);

  useEffect(() => {
    reloadWidget();
  }, [reloadWidget]);

  return (
    <div className="w-full space-y-3">
      <div ref={containerRef} className={ELFSIGHT_APP_CLASS} />

      <button
        type="button"
        onClick={reloadWidget}
        className="inline-flex items-center justify-center rounded-full border border-white/30 bg-white/10 px-3 py-1 text-[11px] font-medium uppercase tracking-wide text-white/80 shadow-sm backdrop-blur-sm transition hover:bg-white/15 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
      >
        Rafraîchir les avis
      </button>
    </div>
  );
}


