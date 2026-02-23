import type { Metadata } from "next";
import { BackgroundShell } from "@/components/BackgroundShell";
import { PhoneFrame } from "@/components/PhoneFrame";
import { TallerElSalonContent } from "@/components/TallerElSalonContent";
import { tallerConfig } from "@/config/taller";
import { tallerServiceCategories } from "@/data/taller-el-salon-categories";
import { tallerDefaultLocale, type TallerLocale } from "@/lib/taller-i18n";

const TALLER_TITLE = "Taller El Salón | Los Realejos";
const TALLER_DESCRIPTION = "Garage automobile à Los Realejos. Électricité, freins, pneus, vidange, diagnostic. Contact WhatsApp.";
const TALLER_OG_IMAGE = "/media/placeholder.svg";

export const metadata: Metadata = {
  title: TALLER_TITLE,
  description: TALLER_DESCRIPTION,
  openGraph: {
    title: TALLER_TITLE,
    description: TALLER_DESCRIPTION,
    type: "website",
    siteName: "Taller El Salón",
    images: [{ url: TALLER_OG_IMAGE, width: 1200, height: 630, alt: "Taller El Salón" }],
  },
  twitter: {
    card: "summary_large_image",
    title: TALLER_TITLE,
    description: TALLER_DESCRIPTION,
    images: [TALLER_OG_IMAGE],
  },
};

const VALID_LOCALES: TallerLocale[] = ["fr", "en", "es", "de"];
function parseLocale(value: string | undefined): TallerLocale {
  if (value && VALID_LOCALES.includes(value as TallerLocale)) return value as TallerLocale;
  return tallerDefaultLocale;
}

export default async function TallerElSalonPage({
  searchParams,
}: {
  searchParams: Promise<{ lang?: string }>;
}) {
  const params = await searchParams;
  const locale = parseLocale(params.lang);

  const whatsappAction = tallerConfig.quickActions.find((a) => a.id === "whatsapp");
  const whatsappHref = whatsappAction?.href ?? "https://wa.me/34600000000";

  return (
    <BackgroundShell backgroundImage="/media/fond-los.png">
      <PhoneFrame>
        <TallerElSalonContent
          config={tallerConfig}
          categories={tallerServiceCategories}
          locale={locale}
          whatsappHref={whatsappHref}
        />
      </PhoneFrame>
    </BackgroundShell>
  );
}
