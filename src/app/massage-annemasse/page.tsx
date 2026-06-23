import type { Metadata } from "next";
import { BackgroundShell } from "@/components/BackgroundShell";
import { PhoneFrame } from "@/components/PhoneFrame";
import { MarinaMasajeContent } from "@/components/MarinaMasajeContent";
import { annemasseConfig } from "@/config/annemasse";
import { marinaMassageCategories } from "@/data/marina-massages";
import { marinaDefaultLocale, type MarinaLocale } from "@/lib/marina-i18n";

const PAGE_TITLE = "Marina Masaje | Annemasse 74100";
const PAGE_DESCRIPTION = "Massage spa à Annemasse 74100. Instagram, TikTok, WhatsApp, réservation.";
const PAGE_OG_IMAGE = "/media/logo-marina-masaje.jpg";

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  openGraph: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    type: "website",
    siteName: "Marina Masaje",
    images: [
      {
        url: PAGE_OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "Marina Masaje",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    images: [PAGE_OG_IMAGE],
  },
};

/** Même vidéo de fond que Marina Masaje */
const BACKGROUND_VIDEO = "/media/fond-ecran-marina-masaje.MP4";

const VALID_LOCALES: MarinaLocale[] = ["fr", "en", "ru", "es", "de", "it"];
function parseLocale(value: string | undefined): MarinaLocale {
  if (value && VALID_LOCALES.includes(value as MarinaLocale)) return value as MarinaLocale;
  return marinaDefaultLocale;
}

export default async function MassageAnnemassePage({
  searchParams,
}: {
  searchParams: Promise<{ lang?: string }>;
}) {
  const params = await searchParams;
  const locale = parseLocale(params.lang);

  return (
    <BackgroundShell backgroundVideo={BACKGROUND_VIDEO}>
      <PhoneFrame>
        <MarinaMasajeContent
          config={annemasseConfig}
          categories={marinaMassageCategories}
          locale={locale}
        />
      </PhoneFrame>
    </BackgroundShell>
  );
}
