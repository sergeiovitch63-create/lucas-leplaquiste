import { site } from "@/config/site";

export interface BrandConfig {
  siteName: string;
  defaultTitle: string;
  defaultDescription: string;
  faviconPath: string;
}

export function getBrandFromHost(host: string | null): BrandConfig {
  if (host && host.includes("publink-teamplates")) {
    return {
      siteName: "PUBLINK",
      defaultTitle: "PUBLINK",
      defaultDescription: "Templates multi-métiers prêts à l’emploi.",
      faviconPath: "/favicons/menuisier.svg",
    };
  }

  // Lucas (default) - keep EXACT branding & SEO from site config
  return {
    siteName: site.brandName,
    defaultTitle: site.seo.title,
    defaultDescription: site.seo.description,
    faviconPath: "/icon.png",
  };
}





