import fs from "node:fs";
import path from "node:path";

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
  favicon?: string;
  categories?: JobCategory[];
  seo: {
    keywords: string[];
    category: string;
  };
  cta: {
    mode: JobCtaMode;
  };
}

const FALLBACK_JOB_KEY = "plombier";

function readPresetFile(jobKey: string): JobPreset | null {
  try {
    const presetsDir = path.join(process.cwd(), "src", "presets", "jobs");
    const filePath = path.join(presetsDir, `${jobKey}.json`);
    const raw = fs.readFileSync(filePath, "utf8");
    const parsed = JSON.parse(raw) as JobPreset;
    return parsed;
  } catch {
    return null;
  }
}

export function getPreset(jobKeyRaw: string | undefined | null): JobPreset {
  const safeKey = (jobKeyRaw || "").toLowerCase().trim() || FALLBACK_JOB_KEY;

  const direct = readPresetFile(safeKey);
  if (direct) return direct;

  const fallback = readPresetFile(FALLBACK_JOB_KEY);
  if (fallback) return fallback;

  // Very defensive fallback if even files are missing
  return {
    jobKey: FALLBACK_JOB_KEY,
    jobLabel: "Plombier",
    defaultHeroTagline: "Interventions rapides pour vos urgences et travaux de plomberie.",
    defaultServices: [],
    defaultBenefits: [],
    defaultFaq: [],
    seo: { keywords: [], category: "Plumber" },
    cta: { mode: "urgent" },
  };
}


