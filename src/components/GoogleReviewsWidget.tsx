 "use client";

import { useEffect } from "react";
import Script from "next/script";

export function GoogleReviewsWidget() {
  useEffect(() => {
    // Ensure Elfsight platform is loaded and widgets are initialized
    if (typeof window !== "undefined" && (window as any).eapps) {
      (window as any).eapps.init();
    }
  }, []);

  return (
    <div className="w-full">
      <Script
        src="https://elfsightcdn.com/platform.js"
        strategy="afterInteractive"
        onLoad={() => {
          // Initialize widgets after script loads
          if (typeof window !== "undefined" && (window as any).eapps) {
            (window as any).eapps.init();
          }
        }}
      />
      <div className="elfsight-app-155f2dd7-a007-4ece-9757-b5f28fc288c5" />
    </div>
  );
}






