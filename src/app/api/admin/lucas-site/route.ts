import { NextRequest, NextResponse } from "next/server";
import type { SiteConfig } from "@/config/site";
import {
  getLucasPagesConfig,
  getLucasSiteConfig,
  setLucasPagesConfig,
  setLucasSiteConfig,
} from "@/lib/lucas-site-store";

type PagesConfig = Record<
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

type SiteConfigWithPages = SiteConfig & { pages?: PagesConfig };
type AdminPutPayload = {
  siteConfig?: SiteConfigWithPages;
  pagesConfig?: PagesConfig;
} & Partial<SiteConfigWithPages>;

function isValidPagesConfig(pagesConfig: PagesConfig): boolean {
  return Object.values(pagesConfig).every(
    (page) =>
      typeof page.title === "string" &&
      typeof page.subtitle === "string" &&
      typeof page.intro === "string" &&
      (!page.paragraphs ||
        (Array.isArray(page.paragraphs) &&
          page.paragraphs.every((item) => typeof item === "string"))) &&
      (!page.listItems ||
        (Array.isArray(page.listItems) &&
          page.listItems.every((item) => typeof item === "string"))) &&
      typeof page.thumbnail === "string" &&
      Array.isArray(page.gallery) &&
      page.gallery.every((img) => typeof img === "string") &&
      typeof page.ctaLabel === "string" &&
      typeof page.ctaLink === "string"
  );
}

function isAuthorized(request: NextRequest): boolean {
  const secret = process.env.LUCAS_ADMIN_SECRET ?? process.env.ADMIN_SECRET;
  if (!secret) return true;
  const header = request.headers.get("x-admin-secret");
  return header === secret;
}

function isValidSiteConfig(config: SiteConfigWithPages): boolean {
  const validTypes = new Set(["internal", "external", "action"]);
  const seenIds = new Set<string>();
  const seenOrders = new Set<number>();
  const linksAreValid = config.links.every((link, index) => {
    if (!link.id || !link.title || !link.href) return false;
    if (!validTypes.has(link.type)) return false;
    if (seenIds.has(link.id)) return false;
    seenIds.add(link.id);
    const order = link.order ?? index + 1;
    if (!Number.isFinite(order)) return false;
    if (seenOrders.has(order)) return false;
    seenOrders.add(order);
    return true;
  });

  const pagesAreValid =
    !config.pages ||
    Object.values(config.pages).every(
      (page) =>
        typeof page.title === "string" &&
        typeof page.subtitle === "string" &&
        typeof page.intro === "string" &&
        typeof page.thumbnail === "string" &&
        Array.isArray(page.gallery) &&
        page.gallery.every((img) => typeof img === "string") &&
        typeof page.ctaLabel === "string" &&
        typeof page.ctaLink === "string"
    );

  return Boolean(
    config.brandName &&
      config.tagline &&
      config.phoneNumber &&
      config.telLink &&
      config.waLink &&
      config.googleMapsUrl &&
      config.seo?.title &&
      config.seo?.description &&
      config.og?.image &&
      Array.isArray(config.links) &&
      config.links.length > 0 &&
      linksAreValid &&
      pagesAreValid
  );
}

export async function GET() {
  const config = await getLucasSiteConfig();
  const pagesConfig = await getLucasPagesConfig(config);
  return NextResponse.json({ ...config, pagesConfig });
}

export async function PUT(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }
  try {
    const body = (await request.json()) as AdminPutPayload;
    const siteConfig = (body.siteConfig ?? body) as SiteConfigWithPages;
    const pagesConfig = body.pagesConfig ?? body.pages;

    if (!isValidSiteConfig(siteConfig)) {
      return NextResponse.json(
        { error: "Configuration invalide" },
        { status: 400 }
      );
    }
    if (pagesConfig && !isValidPagesConfig(pagesConfig)) {
      return NextResponse.json(
        { error: "pagesConfig invalide" },
        { status: 400 }
      );
    }
    await setLucasSiteConfig(siteConfig);
    if (pagesConfig) {
      await setLucasPagesConfig(pagesConfig);
    }
    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Erreur serveur" },
      { status: 500 }
    );
  }
}

