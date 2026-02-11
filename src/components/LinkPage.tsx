import type { JobPreset } from "@/lib/getPreset";
import type { ClientParams } from "@/lib/parseClientParams";
import { LucasLikeTemplate } from "./LucasLikeTemplate";

interface LinkPageHero {
  title: string;
  subtitle: string;
  tagline: string;
}

interface LinkPageCtas {
  phoneHref: string | null;
  whatsappHref: string | null;
  mapsHref: string | null;
  primaryCtaHref: string | null;
  primaryCtaLabel: string;
}

export interface LinkPageProps {
  preset: JobPreset;
  client: ClientParams;
  hero: LinkPageHero;
  services: { title: string; desc: string }[];
  benefits: { title: string; desc: string }[];
  faq: { q: string; a: string }[];
  ctas: LinkPageCtas;
}

export function LinkPage({
  preset,
  client,
  hero,
}: LinkPageProps) {
  return (
    <LucasLikeTemplate
      preset={preset}
      client={client}
      heroTitle={hero.title}
    />
  );
}



