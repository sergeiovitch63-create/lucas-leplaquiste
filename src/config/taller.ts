import type { IconKey } from "./site";
import { tallerServiceCategories } from "@/data/taller-el-salon-categories";

export type TallerLinkType = "external" | "action" | "internal";

export interface TallerLink {
  id: string;
  title: string;
  subtitle?: string;
  href: string;
  type: TallerLinkType;
  iconKey: IconKey;
}

export interface TallerQuickAction {
  id: string;
  title: string;
  href: string;
  iconKey: IconKey;
  openInNewTab: boolean;
}

export interface TallerConfig {
  brandName: string;
  location: string;
  avatarUrl: string;
  contactCardLogoUrl?: string;
  carouselImages: string[];
  quickActions: TallerQuickAction[];
  links: TallerLink[];
}

const TALLER_WHATSAPP = "https://wa.me/34617009592";
const TALLER_PHONE = "tel:+34617009592";
const TALLER_MAPS_URL = "https://maps.app.goo.gl/EN4YsCsmL1xpUqUD9";

const serviceCategoryLinks: TallerLink[] = tallerServiceCategories.map((s) => ({
  id: s.slug,
  title: s.title,
  href: `/taller-el-salon/${s.slug}`,
  type: "internal" as const,
  iconKey: "stars" as IconKey,
}));

const tallerQuickActions: TallerQuickAction[] = [
  { id: "whatsapp", title: "WhatsApp", href: TALLER_WHATSAPP, iconKey: "whatsapp", openInNewTab: true },
  { id: "phone", title: "Téléphone", href: TALLER_PHONE, iconKey: "phone", openInNewTab: false },
  { id: "maps", title: "Localisation", href: TALLER_MAPS_URL, iconKey: "map", openInNewTab: true },
];

export const tallerConfig: TallerConfig = {
  brandName: "Taller El Salón",
  location: "Los Realejos",
  avatarUrl: "/media/LOGO-LOS.jpg",
  contactCardLogoUrl: "/media/LOGO-LOS.jpg",
  carouselImages: ["/media/carroussel-tailler.png", "/media/caroussel-tailler-2.png"],
  quickActions: tallerQuickActions,
  links: [...serviceCategoryLinks],
};
