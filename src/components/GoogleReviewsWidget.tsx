 "use client";

import { useEffect } from "react";
import Script from "next/script";

// Extend the global Window interface to include Elfsight API
declare global {
  interface Window {
    eapps?: {
      init: () => void;
    };
  }
}

export function GoogleReviewsWidget() {
  useEffect(() => {
    // Ensure Elfsight platform is loaded and widgets are initialized
    if (typeof window !== "undefined" && window.eapps) {
      window.eapps.init();
    }
  }, []);

  return (
    <div className="w-full">
      <Script
        src="https://elfsightcdn.com/platform.js"
        strategy="afterInteractive"
        onLoad={() => {
          // Initialize widgets after script loads
          if (typeof window !== "undefined" && window.eapps) {
            window.eapps.init();
          }
        }}
      />
      <div className="elfsight-app-155f2dd7-a007-4ece-9757-b5f28fc288c5" />
    </div>
  );
}






