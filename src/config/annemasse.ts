import type { IconKey } from "./site";
import type { MarinaConfig, MarinaLink, MarinaQuickAction } from "./marina";
import { marinaMassageCategories } from "@/data/marina-massages";

/**
 * Clone "factice" de Marina Masaje, localisé à Annemasse 74100.
 * Mêmes images / même vidéo de fond que Marina ; coordonnées en placeholder
 * (à remplacer par les vraies infos d'Annemasse le moment venu).
 */

/** Route de base de cette page */
export const ANNEMASSE_BASE_PATH = "/massage-annemasse";

/** Liens des catégories de massage (réutilise les mêmes données que Marina) */
const massageCategoryLinks: MarinaLink[] = marinaMassageCategories.map((m) => ({
  id: m.slug,
  title: m.title,
  href: `${ANNEMASSE_BASE_PATH}/${m.slug}`,
  type: "internal" as const,
  iconKey: "stars" as IconKey,
}));

// TODO: remplacer par la vraie fiche Google Maps d'Annemasse
const ANNEMASSE_MAPS_URL = "https://maps.google.com/?q=Annemasse+74100";

/** Coordonnées en placeholder — à compléter plus tard */
const annemasseQuickActions: MarinaQuickAction[] = [
  { id: "instagram", title: "Instagram", href: "https://www.instagram.com/", iconKey: "instagram", openInNewTab: true },
  { id: "tiktok", title: "TikTok", href: "https://www.tiktok.com/", iconKey: "tiktok", openInNewTab: true },
  { id: "whatsapp", title: "WhatsApp", href: "https://wa.me/33000000000", iconKey: "whatsapp", openInNewTab: true },
  { id: "phone", title: "Téléphone", href: "tel:+33000000000", iconKey: "phone", openInNewTab: false },
  { id: "maps", title: "Localisation", href: ANNEMASSE_MAPS_URL, iconKey: "map", openInNewTab: true },
];

export const annemasseConfig: MarinaConfig = {
  brandName: "Marina Masaje",
  location: "Annemasse 74100",
  avatarUrl: "/media/logo-marina-masaje.jpg",
  // Lien placeholder de la card "Reserve now"
  reserveHref: "https://wa.me/33000000000",
  reserveCardLogoUrl: "/media/RESERVE-NOW.png",
  // Carrousel "Your Masseuse" masqué sur le clone Annemasse
  masseuseCarouselImages: [],
  quickActions: annemasseQuickActions,
  links: [...massageCategoryLinks],
};
