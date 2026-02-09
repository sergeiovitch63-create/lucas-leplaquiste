 "use client";

import Script from "next/script";

export function GoogleReviewsWidget() {
  return (
    <div className="w-full">
      <Script
        src="https://elfsightcdn.com/platform.js"
        strategy="afterInteractive"
      />
      <div className="elfsight-app-155f2dd7-a007-4ece-9757-b5f28fc288c5" />
    </div>
  );
}






