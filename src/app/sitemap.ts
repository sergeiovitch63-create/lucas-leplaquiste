import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const envUrl = process.env.NEXT_PUBLIC_SITE_URL;
  const baseUrl =
    envUrl && envUrl.trim().length > 0
      ? envUrl
      : process.env.VERCEL_ENV === "production"
      ? "https://localhost"
      : "http://localhost:3000";

  const routes = [
    "",
    "/avis",
    "/creation-decoration",
    "/faux-plafonds",
    "/doublages",
    "/cloisons",
    "/a-propos",
  ];

  const now = new Date();

  return routes.map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: now,
  }));
}


