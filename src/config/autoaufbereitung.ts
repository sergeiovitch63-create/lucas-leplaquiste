import type { IconKey } from "./site";
import { autoaufbereitungCategories } from "@/data/autoaufbereitung-categories";

export interface AutoaufbereitungQuickAction {
  id: string;
  title: string;
  href: string;
  iconKey: IconKey;
  openInNewTab: boolean;
}

export interface AutoaufbereitungConfig {
  brandName: string;
  location: string;
  avatarUrl: string;
  contactCardLogoUrl?: string;
  /** Image de fond principale de la page */
  backgroundImageUrl?: string;
  quickActions: AutoaufbereitungQuickAction[];
  whatsappHref: string;
  mapsHref: string;
  address: string;
  phone: string;
  instagramHref: string;
  facebookHref: string;
  /** FAQs personnalisées par catégorie (slug -> liste) */
  faqs?: Record<
    string,
    {
      question: string;
      answer: string;
    }[]
  >;
  /** Libellés UI personnalisables par langue (clé -> texte) */
  uiLabels?: Record<
    string,
    {
      [key: string]: string;
    }
  >;
  categories: typeof autoaufbereitungCategories;
}

const WHATSAPP = "https://api.whatsapp.com/send?phone=34614397963";
const PHONE = "tel:+34614397963";
const MAPS = "https://maps.app.goo.gl/urqbjG1C5UYatvL69";
const ADDRESS = "Ctra. Gral. Puerto Cruz-Arenas 124, Puerto de la Cruz";
const INSTAGRAM = "https://instagram.com/autodetailingpuertodelacruz";
const FACEBOOK = "https://www.facebook.com/profile.php?id=100093339990378";

export const autoaufbereitungConfig: AutoaufbereitungConfig = {
  brandName: "AUTO DETAILING",
  location: "Puerto de la Cruz",
  avatarUrl: "/media/auto-detailing-puerto-logo.png.jpg",
  contactCardLogoUrl: "/media/auto-detailing-puerto-logo.png.jpg",
  backgroundImageUrl: "/media/autoaufbereitung/bg-teide-car.png.jpeg",
  quickActions: [
    { id: "whatsapp", title: "WhatsApp", href: WHATSAPP, iconKey: "whatsapp", openInNewTab: true },
    { id: "phone", title: "Téléphone", href: PHONE, iconKey: "phone", openInNewTab: false },
    { id: "facebook", title: "Facebook", href: FACEBOOK, iconKey: "facebook", openInNewTab: true },
    { id: "maps", title: "Localisation", href: MAPS, iconKey: "map", openInNewTab: true },
  ],
  whatsappHref: WHATSAPP,
  mapsHref: MAPS,
  address: ADDRESS,
  phone: "+34 614 39 79 63",
  instagramHref: INSTAGRAM,
  facebookHref: FACEBOOK,
  categories: autoaufbereitungCategories,
};
