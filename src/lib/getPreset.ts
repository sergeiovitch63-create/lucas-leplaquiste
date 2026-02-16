import fs from "node:fs";
import path from "node:path";
import type { Locale } from "./i18n";

export type JobCtaMode = "booking" | "urgent" | "quote";

export interface JobCategory {
  slug: string;
  label: string;
  short: string;
  heroImage: string;
  gallery: string[];
  body: string[];
  whyUs: string[];
  faq: { q: string; a: string }[];
}

export interface JobPreset {
  jobKey: string;
  jobLabel: string;
  defaultHeroTagline: string;
  defaultServices: { title: string; desc: string }[];
  defaultBenefits: { title: string; desc: string }[];
  defaultFaq: { q: string; a: string }[];
  defaultBgImage?: string;
  defaultBannerImage?: string;
  defaultZoneText?: string;
  defaultLinks?: { label: string; href: string; icon?: string }[];
  defaultCategoryIcon?: string;
  defaultReviewsIcon?: string;
  favicon?: string;
  categories?: JobCategory[];
  phone?: string;
  whatsapp?: string | null;
  email?: string | null;
  facebook?: string | null;
  seo: {
    keywords: string[];
    category: string;
  };
  cta: {
    mode: JobCtaMode;
  };
}

const FALLBACK_JOB_KEY = "plombier";

function readPresetFile(jobKey: string, locale: Locale = "fr"): JobPreset | null {
  try {
    const presetsDir = path.join(process.cwd(), "src", "presets", "jobs");
    // Try locale-specific file first (e.g., abn-revetement.es.json)
    if (locale === "es") {
      const esFilePath = path.join(presetsDir, `${jobKey}.es.json`);
      if (fs.existsSync(esFilePath)) {
        const raw = fs.readFileSync(esFilePath, "utf8");
        const parsed = JSON.parse(raw) as JobPreset;
        return parsed;
      }
    }
    // Fallback to default file
    const filePath = path.join(presetsDir, `${jobKey}.json`);
    const raw = fs.readFileSync(filePath, "utf8");
    const parsed = JSON.parse(raw) as JobPreset;
    return parsed;
  } catch {
    return null;
  }
}

export function getPreset(
  jobKeyRaw: string | undefined | null,
  locale: Locale = "fr",
): JobPreset {
  const safeKey = (jobKeyRaw || "").toLowerCase().trim() || FALLBACK_JOB_KEY;

  // Try to read the locale-specific file first
  const direct = readPresetFile(safeKey, locale);
  if (direct) return direct;

  // If we're in Spanish mode and no Spanish file exists, try to read the French file
  // and use it as a temporary fallback (this should be replaced with actual .es.json files)
  if (locale === "es") {
    const frFile = readPresetFile(safeKey, "fr");
    if (frFile) {
      // Return the French file as a temporary fallback
      // TODO: Create proper .es.json files for all jobs
      return frFile;
    }
  }

  // Fallback to default job
  const fallback = readPresetFile(FALLBACK_JOB_KEY, locale);
  if (fallback) return fallback;

  // Very defensive fallback if even files are missing
  return {
    jobKey: FALLBACK_JOB_KEY,
    jobLabel: locale === "es" ? "Fontanero" : "Plombier",
    defaultHeroTagline:
      locale === "es"
        ? "Intervenciones rápidas para sus emergencias y trabajos de fontanería."
        : "Interventions rapides pour vos urgences et travaux de plomberie.",
    defaultServices: [],
    defaultBenefits: [],
    defaultFaq: [],
    seo: { keywords: [], category: "Plumber" },
    cta: { mode: "urgent" },
  };
}


