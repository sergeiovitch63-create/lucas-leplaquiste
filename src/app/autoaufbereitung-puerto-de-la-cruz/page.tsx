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
  title: "Autoaufbereitung | Puerto de la Cruz | Publink",
  description:
    "Auto detailing à Puerto de la Cruz. Außenaufbereitung, Innenaufbereitung, Keramikversiegelung, Nanoversiegelung. Contact WhatsApp.",
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
