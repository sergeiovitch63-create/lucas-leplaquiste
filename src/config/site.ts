export type LinkType = "internal" | "external" | "action";

export type IconKey =
  | "phone"
  | "whatsapp"
  | "facebook"
  | "email"
  | "map"
  | "paint"
  | "ceiling"
  | "layers"
  | "walls"
  | "info"
  | "stars"
  | "instagram"
  | "tiktok";

export interface SiteLink {
  id: string;
  title: string;
  href: string;
  type: LinkType;
  iconKey?: IconKey;
  thumbnail?: string;
  enabled?: boolean;
  order?: number;
}

export interface SiteSeoConfig {
  title: string;
  description: string;
}

export interface SiteOgConfig {
  image: string;
}

export type SocialLinkType =
  | "phone"
  | "whatsapp"
  | "facebook"
  | "instagram"
  | "link"
  | "email"
  | "maps";

export interface SocialLink {
  id: string;
  type: SocialLinkType;
  url: string;
  enabled: boolean;
}

export interface SiteConfig {
  brandName: string;
  tagline: string;
  locationText: string;
  phoneNumber: string;
  telLink: string;
  whatsAppNumber: string;
  waLink: string;
  facebookUrl?: string;
  googleMapsUrl: string;
  seo: SiteSeoConfig;
  og: SiteOgConfig;
  avatar?: string;
  socialLinks?: SocialLink[];
  links: SiteLink[];
}

// Mapping des icônes pour chaque lien
const linkIcons: Record<string, string> = {
  call: "/media/accueil/logo.png",
  reviews: "/media/accueil/favicon-avis.png",
  creation: "/media/accueil/favicon-creation-decoration.jpg",
  ceilings: "/media/accueil/favicon-faux-plafond.jpg",
  doublages: "/media/accueil/favicon-doublage.jpg",
  cloisons: "/media/accueil/favicon-cloison.jpg",
  about: "/media/accueil/logo.png",
};

export const site: SiteConfig = {
  brandName: "Lucas Le Plaquiste",
  tagline: "Zones d'intervention: Occitanie",
  locationText: "Occitanie",
  phoneNumber: "+33699156340",
  telLink: "tel:+33699156340",
  whatsAppNumber: "33699156340",
  waLink: "https://wa.me/33699156340",
  facebookUrl: "https://www.facebook.com/lucas.le.plaquiste/",
  googleMapsUrl: "https://www.google.com/maps?hl=fr&q=GcLC25cZeT8tmqar7",
  seo: {
    title: "Lucas Le Plaquiste | Plaquiste en Occitanie",
    description:
      "Doublages, faux plafonds, cloisons, création & décoration sur mesure. Devis gratuit. Intervention Occitanie.",
  },
  og: {
    image: "/og.jpg",
  },
  links: [
    {
      id: "call",
      title: "Appeler — Devis gratuit",
      href: "tel:+33699156340",
      type: "action",
      iconKey: "phone",
      thumbnail: linkIcons.call,
      enabled: true,
      order: 1,
    },
    {
      id: "reviews",
      title: "Avis clients",
      href: "/avis",
      type: "internal",
      iconKey: "stars",
      thumbnail: linkIcons.reviews,
      enabled: true,
      order: 2,
    },
    {
      id: "creation",
      title: "Création et Décoration sur mesure",
      href: "/creation-decoration",
      type: "internal",
      iconKey: "paint",
      thumbnail: linkIcons.creation,
      enabled: true,
      order: 3,
    },
    {
      id: "ceilings",
      title: "Faux plafonds",
      href: "/faux-plafonds",
      type: "internal",
      iconKey: "ceiling",
      thumbnail: linkIcons.ceilings,
      enabled: true,
      order: 4,
    },
    {
      id: "doublages",
      title: "Doublages",
      href: "/doublages",
      type: "internal",
      iconKey: "layers",
      thumbnail: linkIcons.doublages,
      enabled: true,
      order: 5,
    },
    {
      id: "cloisons",
      title: "Cloisons",
      href: "/cloisons",
      type: "internal",
      iconKey: "walls",
      thumbnail: linkIcons.cloisons,
      enabled: true,
      order: 6,
    },
    {
      id: "about",
      title: "À propos",
      href: "/a-propos",
      type: "internal",
      iconKey: "info",
      thumbnail: linkIcons.about,
      enabled: true,
      order: 7,
    },
  ],
};

export type QuickActionId = "call" | "whatsapp" | "facebook" | "email";

export interface QuickAction {
  id: QuickActionId;
  title: string;
  href: string;
  type: LinkType;
  iconKey: IconKey;
}

export const getQuickActions = (): QuickAction[] => {
  return [
    {
      id: "call",
      title: "Appeler — Devis gratuit",
      href: site.telLink,
      type: "action",
      iconKey: "phone",
    },
    {
      id: "whatsapp",
      title: "WhatsApp",
      href: site.waLink,
      type: "action",
      iconKey: "whatsapp",
    },
    {
      id: "facebook",
      title: "Facebook",
      href: site.facebookUrl!,
      type: "external",
      iconKey: "facebook",
    },
    {
      id: "email",
      title: "Envoyer un email",
      href: "mailto:lucasleplaquiste34@gmail.com?subject=Demande%20de%20devis&body=Bonjour%2C%20je%20souhaite%20un%20devis.",
      type: "action",
      iconKey: "email",
    },
  ];
};


