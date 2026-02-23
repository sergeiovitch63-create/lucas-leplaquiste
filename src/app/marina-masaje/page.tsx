import { BackgroundShell } from "@/components/BackgroundShell";
import { PhoneFrame } from "@/components/PhoneFrame";
import { MarinaMasajeContent } from "@/components/MarinaMasajeContent";
import { marinaConfig } from "@/config/marina";
import { marinaMassageCategories } from "@/data/marina-massages";
import { marinaDefaultLocale, type MarinaLocale } from "@/lib/marina-i18n";

export const metadata = {
  title: "Marina Masaje | Puerto De La Cruz",
  description: "Massage spa à Puerto De La Cruz. Instagram, TikTok, WhatsApp, adresse.",
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
