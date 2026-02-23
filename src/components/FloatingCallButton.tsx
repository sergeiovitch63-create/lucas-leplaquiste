"use client";

import { usePathname } from "next/navigation";
import { site } from "../config/site";
import { marinaConfig } from "../config/marina";
import { tallerConfig } from "../config/taller";
import { Icon } from "./icons";

export function FloatingCallButton() {
  const pathname = usePathname();

  // Ne pas afficher sur la home
  if (pathname === "/") {
    return null;
  }

  const isMarina = pathname.startsWith("/marina-masaje");
  const isTaller = pathname.startsWith("/taller-el-salon");
  const whatsappHref = isMarina
    ? marinaConfig.quickActions.find((a) => a.id === "whatsapp")?.href
    : isTaller
      ? tallerConfig.quickActions.find((a) => a.id === "whatsapp")?.href
      : site.waLink;
  if (!whatsappHref) return null;

  return (
    <a
      href={whatsappHref}
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full border border-white/10 bg-white/15 backdrop-blur-xl text-white shadow-[0_10px_25px_rgba(0,0,0,0.18)] transition-all duration-200 hover:bg-white/20 hover:scale-110 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
      aria-label="WhatsApp"
    >
      <Icon name="whatsapp" className="h-6 w-6" />
    </a>
  );
}
















