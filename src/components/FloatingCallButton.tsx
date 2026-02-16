"use client";

import { usePathname } from "next/navigation";
import { site } from "../config/site";
import { Icon } from "./icons";

export function FloatingCallButton() {
  const pathname = usePathname();

  // Ne pas afficher sur la home
  if (pathname === "/") {
    return null;
  }

  return (
    <a
      href={site.telLink}
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full border border-white/10 bg-white/15 backdrop-blur-xl text-white shadow-[0_10px_25px_rgba(0,0,0,0.18)] transition-all duration-200 hover:bg-white/20 hover:scale-110 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
      aria-label="Appeler"
    >
      <Icon name="phone" className="h-6 w-6" />
    </a>
  );
}










