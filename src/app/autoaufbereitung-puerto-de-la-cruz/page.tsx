import type { Metadata } from "next";
import { BackgroundShell } from "@/components/BackgroundShell";
import { PhoneFrame } from "@/components/PhoneFrame";
import { AutoaufbereitungContent } from "@/components/AutoaufbereitungContent";
import { getAutoaufbereitungConfig } from "@/lib/autoaufbereitung-store";
import {
  autoaufbereitungDefaultLocale,
  type AutoaufbereitungLocale,
} from "@/lib/autoaufbereitung-i18n";

export const metadata: Metadata = {
  title: "Auto Detailing Puerto de la Cruz | Autoaufbereitung",
  description:
    "Auto detailing à Puerto de la Cruz : nettoyage intérieur/extérieur, polissage, protection céramique et nano. Devis rapide par WhatsApp.",
  openGraph: {
    title: "Auto Detailing Puerto de la Cruz | Autoaufbereitung",
    description:
      "Préparation esthétique automobile à Puerto de la Cruz : extérieur, intérieur, correction de peinture, protection céramique. Contact et devis par WhatsApp.",
    siteName: "Autoaufbereitung Puerto de la Cruz",
    images: [
      {
        url: "/media/autoaufbereitung/1772448001978-87c4hu.png",
        width: 1200,
        height: 630,
        alt: "Auto detailing à Puerto de la Cruz",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Auto Detailing Puerto de la Cruz | Autoaufbereitung",
    description:
      "Préparation esthétique auto : extérieur, intérieur, correction de peinture, protection céramique. Puerto de la Cruz.",
    images: ["/media/autoaufbereitung/1772448001978-87c4hu.png"],
  },
};

const VALID_LOCALES: AutoaufbereitungLocale[] = ["de", "en", "es", "ru"];

function parseLocale(value: string | undefined): AutoaufbereitungLocale {
  if (value && VALID_LOCALES.includes(value as AutoaufbereitungLocale))
    return value as AutoaufbereitungLocale;
  return autoaufbereitungDefaultLocale;
}

export default async function AutoaufbereitungPage({
  searchParams,
}: {
  searchParams: Promise<{ lang?: string }>;
}) {
  const params = await searchParams;
  const locale = parseLocale(params.lang);
  const autoaufbereitungConfig = getAutoaufbereitungConfig();
  const backgroundImage =
    autoaufbereitungConfig.backgroundImageUrl ??
    "/media/autoaufbereitung/bg-teide-car.png.jpeg";

  return (
    <BackgroundShell backgroundImage={backgroundImage}>
      <PhoneFrame>
        <AutoaufbereitungContent config={autoaufbereitungConfig} locale={locale} />
      </PhoneFrame>
    </BackgroundShell>
  );
}
