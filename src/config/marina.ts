import type { IconKey } from "./site";
import { marinaMassageCategories } from "@/data/marina-massages";

export type MarinaLinkType = "external" | "action" | "internal";

export interface MarinaLink {
  id: string;
  title: string;
  /** Optional subtitle (e.g. duration + price, or address for LOCATION) */
  subtitle?: string;
  href: string;
  type: MarinaLinkType;
  iconKey: IconKey;
}

export interface MarinaQuickAction {
  id: string;
  title: string;
  href: string;
  iconKey: IconKey;
  openInNewTab: boolean;
}

export interface MarinaConfig {
  brandName: string;
  location: string;
  avatarUrl: string;
  reserveCardLogoUrl?: string;
  /** Images du carrousel "Your Masseuse" (public/media/) */
  masseuseCarouselImages: string[];
  quickActions: MarinaQuickAction[];
  links: MarinaLink[];
}

/** Liens des 10 catégories de massage (sans prix ni durée sur la home) */
const massageCategoryLinks: MarinaLink[] = marinaMassageCategories.map((m) => ({
  id: m.slug,
  title: m.title,
  href: `/marina-masaje/${m.slug}`,
  type: "internal" as const,
  iconKey: "stars" as IconKey,
}));

const MARINA_MAPS_URL = "https://maps.app.goo.gl/Wqtr7pTFZWFe4YfJ6";

/** Icônes sociales / contact sous le lieu (comme Lucas) */
const marinaQuickActions: MarinaQuickAction[] = [
  { id: "instagram", title: "Instagram", href: "https://www.instagram.com/masaje_marina_/", iconKey: "instagram", openInNewTab: true },
  { id: "tiktok", title: "TikTok", href: "https://www.tiktok.com/", iconKey: "tiktok", openInNewTab: true },
  { id: "whatsapp", title: "WhatsApp", href: "https://wa.me/34614202296", iconKey: "whatsapp", openInNewTab: true },
  { id: "phone", title: "Téléphone", href: "tel:+34614202296", iconKey: "phone", openInNewTab: false },
  { id: "maps", title: "Localisation", href: MARINA_MAPS_URL, iconKey: "map", openInNewTab: true },
];

/** Config pour la page Linktree Marina Masaje — à adapter avec les vrais liens si besoin */
export const marinaConfig: MarinaConfig = {
  brandName: "Marina Masaje",
  location: "Puerto De La Cruz",
  avatarUrl: "/media/logo-marina-masaje.jpg",
  quickActions: marinaQuickActions,
  /** Logo pour la card "Reserve now" — à définir quand tu as l’image (ex. /media/marina/reserve-logo.png) */
  reserveCardLogoUrl: "/media/RESERVE-NOW.png",
  masseuseCarouselImages: [
    "/media/votre-masseuse1.jpg",
    "/media/votre-masseuse2.jpg",
    "/media/votre-masseuse3.jpg",
    "/media/votre-masseuse4.jpg",
  ],
  links: [...massageCategoryLinks],
};
