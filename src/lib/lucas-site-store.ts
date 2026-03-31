import { Redis } from "@upstash/redis";
import { site, type SiteConfig } from "@/config/site";

const LUCAS_SITE_KEY = "lucas:site:config";
const LUCAS_PAGES_KEY = "lucas:pages:config";
let redis: Redis | null = null;

export type PagesConfig = Record<
  string,
  {
    title: string;
    subtitle: string;
    intro: string;
    paragraphs?: string[];
    listItems?: string[];
    thumbnail: string;
    gallery: string[];
    ctaLabel: string;
    ctaLink: string;
  }
>;

function getRedisCredentials() {
  const url =
    process.env.UPSTASH_REDIS_REST_URL ?? process.env.KV_REST_API_URL;
  const token =
    process.env.UPSTASH_REDIS_REST_TOKEN ?? process.env.KV_REST_API_TOKEN;
  return { url, token };
}

function hasRedisCredentials(): boolean {
  const { url, token } = getRedisCredentials();
  return Boolean(url && token);
}

function getRedis(): Redis {
  if (!redis) {
    const { url, token } = getRedisCredentials();
    if (!url || !token) {
      throw new Error(
        "Redis credentials missing. Set UPSTASH_REDIS_* or KV_REST_API_* env vars."
      );
    }
    redis = new Redis({ url, token });
  }
  return redis;
}

function normalizeSiteConfig(input: unknown): SiteConfig | null {
  if (!input || typeof input !== "object") return null;
  const cfg = input as Partial<SiteConfig>;
  if (
    !cfg.brandName ||
    !cfg.seo ||
    !cfg.og ||
    !cfg.phoneNumber ||
    !cfg.telLink ||
    !cfg.waLink ||
    !cfg.googleMapsUrl ||
    !Array.isArray(cfg.links)
  ) {
    return null;
  }
  const nextLinks = cfg.links.map((link, index) => ({
    ...link,
    enabled: link.enabled ?? true,
    order: link.order ?? index + 1,
  }));
  return {
    ...(cfg as SiteConfig),
    links: nextLinks,
  } as SiteConfig;
}

function getDefaultPagesConfig(base: SiteConfig): PagesConfig {
  return {
    "/": {
      title: base.brandName,
      subtitle: base.tagline,
      intro: "",
      paragraphs: [],
      listItems: [],
      thumbnail: base.og.image || "/media/accueil/logo.png",
      gallery: [],
      ctaLabel: "Appeler",
      ctaLink: base.telLink,
    },
    "/avis": {
      title: "Avis clients",
      subtitle: "",
      intro: "",
      paragraphs: [],
      listItems: [],
      thumbnail: "/media/accueil/favicon-avis.png",
      gallery: [],
      ctaLabel: "Voir les avis",
      ctaLink: "/avis",
    },
    "/creation-decoration": {
      title: "Création et Décoration sur mesure",
      subtitle: "Création et Décoration sur mesure",
      intro:
        "Conception et réalisation d'éléments en plaques de plâtre entièrement sur mesure, pensés pour sublimer vos espaces intérieurs.",
      paragraphs: [
        "Conception et réalisation d'éléments en plaques de plâtre entièrement sur mesure, pensés pour sublimer vos espaces intérieurs.",
        "Chaque projet associe esthétisme, fonctionnalité et finitions soignées, afin de créer des aménagements durables, harmonieux et parfaitement intégrés à votre intérieur.",
      ],
      listItems: [],
      thumbnail: "/media/accueil/favicon-creation-decoration.jpg",
      gallery: [
        "/media/services/creation-decoration-1.jpg",
        "/media/services/creation-decoration-2.jpg",
        "/media/services/creation-decoration-3.jpg",
        "/media/services/creation-decoration-4.jpg",
        "/media/services/creation-decoration-5.jpg",
        "/media/services/creation-decoration-6.jpg",
      ],
      ctaLabel: "Contactez-nous",
      ctaLink: base.telLink,
    },
    "/faux-plafonds": {
      title: "Faux plafonds",
      subtitle: "Faux plafonds",
      intro:
        "Réalisation de faux plafonds en plaques de plâtre, sous charpente ou structure existante, intégrant des solutions d'isolation thermique et acoustique adaptées.",
      paragraphs: [
        "Réalisation de faux plafonds en plaques de plâtre, sous charpente ou structure existante, intégrant des solutions d'isolation thermique et acoustique adaptées.",
        "Un travail minutieux qui garantit des volumes équilibrés, une finition nette et une mise en valeur optimale de vos espaces.",
      ],
      listItems: [],
      thumbnail: "/media/accueil/favicon-faux-plafond.jpg",
      gallery: [
        "/media/services/faux-plafond-1.jpg",
        "/media/services/faux-plafond-2.jpg",
        "/media/services/faux-plafond-3.jpg",
        "/media/services/faux-plafond-4.jpg",
        "/media/services/faux-plafonnd-5.jpg",
        "/media/services/faux-plafond-6.jpg",
      ],
      ctaLabel: "Contactez-nous",
      ctaLink: base.telLink,
    },
    "/doublages": {
      title: "Doublages",
      subtitle: "Doublages",
      intro:
        "Doublage de murs en plaques de plâtre avec intégration d'une isolation thermique et acoustique, permettant d'obtenir des surfaces parfaitement planes, propres et prêtes à recevoir tous types de finitions.",
      paragraphs: [
        "Doublage de murs en plaques de plâtre avec intégration d'une isolation thermique et acoustique, permettant d'obtenir des surfaces parfaitement planes, propres et prêtes à recevoir tous types de finitions.",
        "Une solution idéale pour améliorer l'esthétique, la régularité et le confort de vos espaces intérieurs.",
      ],
      listItems: [],
      thumbnail: "/media/accueil/favicon-doublage.jpg",
      gallery: [
        "/media/services/doublages-1.jpg",
        "/media/services/doublages-2.jpg",
        "/media/services/doublages-3.jpg",
        "/media/services/doublages-4.jpg",
        "/media/services/doublages-5.jpg",
        "/media/services/doubalges-6.jpg",
        "/media/services/doublages-7.jpg",
      ],
      ctaLabel: "Contactez-nous",
      ctaLink: base.telLink,
    },
    "/cloisons": {
      title: "Cloisons",
      subtitle: "Cloisons",
      intro:
        "Pose de cloisons en plaques de plâtre pour structurer, séparer ou redistribuer vos espaces de vie, avec intégration de solutions d'isolation phonique adaptées.",
      paragraphs: [
        "Pose de cloisons en plaques de plâtre pour structurer, séparer ou redistribuer vos espaces de vie, avec intégration de solutions d'isolation phonique adaptées.",
        "Chaque installation est réalisée avec précision, dans le respect des alignements et des finitions, afin d'offrir un résultat propre, durable et fonctionnel.",
      ],
      listItems: [],
      thumbnail: "/media/accueil/favicon-cloison.jpg",
      gallery: [
        "/media/services/cloison-1.jpg",
        "/media/services/cloison-2.jpg",
        "/media/services/cloison-3.jpg",
      ],
      ctaLabel: "Contactez-nous",
      ctaLink: base.telLink,
    },
    "/a-propos": {
      title: "À propos",
      subtitle: "À propos",
      intro:
        "Plaquiste formé chez les compagnons du devoir, avec une approche du métier fondée sur la rigueur, la précision et le respect des règles de l'art.",
      paragraphs: [
        "Plaquiste formé chez les compagnons du devoir, avec une approche du métier fondée sur la rigueur, la précision et le respect des règles de l'art.",
        "Chaque prestation est réalisée avec un souci constant du détail : supports soigneusement préparés, alignements précis et finitions propres, aussi bien en rénovation qu'en construction neuve.",
        "À l'écoute des clients, des conseils et un accompagnement personnalisé sont proposés afin d'apporter des solutions adaptées aux besoins et aux attentes de chaque projet.",
        "Travail sérieux, chantier propre en fin d'intervention. Devis gratuit.",
      ],
      listItems: [],
      thumbnail: "/media/accueil/logo.png",
      gallery: ["/media/a-propos/a-propos-1.jpg", "/media/a-propos/a-propos-2.jpg"],
      ctaLabel: "Contactez-nous",
      ctaLink: base.telLink,
    },
  };
}

function normalizePagesConfig(input: unknown, fallbackSite: SiteConfig): PagesConfig {
  const defaults = getDefaultPagesConfig(fallbackSite);
  if (!input || typeof input !== "object") return defaults;
  const raw = input as Record<string, Partial<PagesConfig[string]>>;
  const next: PagesConfig = { ...defaults };
  for (const [slug, value] of Object.entries(raw)) {
    if (!value || typeof value !== "object") continue;
    next[slug] = {
      title: typeof value.title === "string" ? value.title : defaults[slug]?.title ?? "",
      subtitle:
        typeof value.subtitle === "string"
          ? value.subtitle
          : defaults[slug]?.subtitle ?? "",
      intro: typeof value.intro === "string" ? value.intro : defaults[slug]?.intro ?? "",
      paragraphs: Array.isArray(value.paragraphs)
        ? value.paragraphs.filter((p): p is string => typeof p === "string")
        : defaults[slug]?.paragraphs ?? [],
      listItems: Array.isArray(value.listItems)
        ? value.listItems.filter((p): p is string => typeof p === "string")
        : defaults[slug]?.listItems ?? [],
      thumbnail:
        typeof value.thumbnail === "string"
          ? value.thumbnail
          : defaults[slug]?.thumbnail ?? "",
      gallery: Array.isArray(value.gallery)
        ? value.gallery.filter((g): g is string => typeof g === "string")
        : defaults[slug]?.gallery ?? [],
      ctaLabel:
        typeof value.ctaLabel === "string"
          ? value.ctaLabel
          : defaults[slug]?.ctaLabel ?? "",
      ctaLink:
        typeof value.ctaLink === "string" ? value.ctaLink : defaults[slug]?.ctaLink ?? "",
    };
  }
  return next;
}

export async function getLucasSiteConfig(): Promise<SiteConfig> {
  if (hasRedisCredentials()) {
    try {
      const data = await getRedis().get<SiteConfig>(LUCAS_SITE_KEY);
      const normalized = normalizeSiteConfig(data);
      if (normalized) return normalized;
    } catch {
      // fallback below
    }
  }
  return site;
}

export async function setLucasSiteConfig(config: SiteConfig): Promise<void> {
  if (!hasRedisCredentials()) {
    // No Redis configured: keep app functional in dev.
    return;
  }
  await getRedis().set(LUCAS_SITE_KEY, config);
}

export async function getLucasPagesConfig(siteConfig?: SiteConfig): Promise<PagesConfig> {
  const base = siteConfig ?? (await getLucasSiteConfig());
  if (hasRedisCredentials()) {
    try {
      const data = await getRedis().get(LUCAS_PAGES_KEY);
      return normalizePagesConfig(data, base);
    } catch {
      return getDefaultPagesConfig(base);
    }
  }
  return getDefaultPagesConfig(base);
}

export async function setLucasPagesConfig(pagesConfig: PagesConfig): Promise<void> {
  if (!hasRedisCredentials()) return;
  await getRedis().set(LUCAS_PAGES_KEY, pagesConfig);
}

