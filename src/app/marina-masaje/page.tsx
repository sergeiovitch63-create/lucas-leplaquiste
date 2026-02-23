import type { Metadata } from "next";
import { BackgroundShell } from "@/components/BackgroundShell";
import { PhoneFrame } from "@/components/PhoneFrame";
import { MarinaMasajeContent } from "@/components/MarinaMasajeContent";
import { marinaConfig } from "@/config/marina";
import { marinaMassageCategories } from "@/data/marina-massages";
import { marinaDefaultLocale, type MarinaLocale } from "@/lib/marina-i18n";

const MARINA_TITLE = "Marina Masaje | Puerto De La Cruz";
const MARINA_DESCRIPTION = "Massage spa à Puerto De La Cruz. Instagram, TikTok, WhatsApp, réservation.";
const MARINA_OG_IMAGE = "/media/logo-marina-masaje.jpg";

export const metadata: Metadata = {
  title: MARINA_TITLE,
  description: MARINA_DESCRIPTION,
  openGraph: {
    title: MARINA_TITLE,
    description: MARINA_DESCRIPTION,
    type: "website",
    siteName: "Marina Masaje",
    images: [
      {
        url: MARINA_OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "Marina Masaje",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: MARINA_TITLE,
    description: MARINA_DESCRIPTION,
    images: [MARINA_OG_IMAGE],
  },
};

/** Vidéo fond : servie via l’API pour éviter 404 (fichier dans public/media/ fond-ecran-manna-masaje ou .mp4) */
const MARINA_BACKGROUND_VIDEO = "/media/fond-ecran-marina-masaje.MP4";

const VALID_LOCALES: MarinaLocale[] = ["fr", "en", "ru", "es", "de", "it"];
function parseLocale(value: string | undefined): MarinaLocale {
  if (value && VALID_LOCALES.includes(value as MarinaLocale)) return value as MarinaLocale;
  return marinaDefaultLocale;
}

export default async function MarinaMasajePage({
  searchParams,
}: {
  searchParams: Promise<{ lang?: string }>;
}) {
  const params = await searchParams;
  const locale = parseLocale(params.lang);

  return (
    <BackgroundShell backgroundVideo={MARINA_BACKGROUND_VIDEO}>
      <PhoneFrame>
        <MarinaMasajeContent
          config={marinaConfig}
          categories={marinaMassageCategories}
          locale={locale}
        />
      </PhoneFrame>
    </BackgroundShell>
  );
}
