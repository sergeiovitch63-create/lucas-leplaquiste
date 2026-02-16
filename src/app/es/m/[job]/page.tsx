import type { Metadata } from "next";
import { headers } from "next/headers";
import { LinkPage } from "@/components/LinkPage";
import { getPreset, type JobPreset } from "@/lib/getPreset";
import { parseClientParams, type ClientParams } from "@/lib/parseClientParams";
import { getBrandFromHost } from "@/lib/brand";
import { getTranslation, type Locale } from "@/lib/i18n";

type PageParams = {
  params: { job: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

const locale: Locale = "es";

function toURLSearchParams(
  searchParams: PageParams["searchParams"],
): URLSearchParams {
  const usp = new URLSearchParams();
  for (const [key, value] of Object.entries(searchParams)) {
    if (typeof value === "string") {
      usp.append(key, value);
    } else if (Array.isArray(value)) {
      for (const v of value) {
        usp.append(key, v);
      }
    }
  }
  return usp;
}

function mapJobToSchemaType(jobKey: string): string {
  const key = jobKey.toLowerCase();
  switch (key) {
    case "plombier":
      return "Plumber";
    case "electricien":
      return "Electrician";
    case "serrurier":
      return "Locksmith";
    case "garage":
      return "AutoRepair";
    case "massage":
      return "HealthAndBeautyBusiness";
    case "menuisier":
      return "HomeAndConstructionBusiness";
    default:
      return "LocalBusiness";
  }
}

function cleanObject<T extends Record<string, unknown>>(obj: T): Partial<T> {
  const result: Partial<T> = {};
  for (const [key, value] of Object.entries(obj)) {
    if (value === undefined || value === null || value === "") continue;
    result[key as keyof T] = value as T[keyof T];
  }
  return result;
}

function buildPrimaryCtaLabel(
  mode: JobPreset["cta"]["mode"],
  locale: Locale = "es",
): string {
  switch (mode) {
    case "urgent":
      return getTranslation(locale, "appel-immediat");
    case "booking":
      return getTranslation(locale, "reserver-whatsapp");
    case "quote":
    default:
      return getTranslation(locale, "demander-devis");
  }
}

function buildPrimaryCtaHref(
  baseWhatsapp: string | null,
  mode: JobPreset["cta"]["mode"],
  city: string,
  locale: Locale = "es",
): string | null {
  if (!baseWhatsapp) return null;

  const cityLabel = city || (locale === "es" ? "su ciudad" : "votre ville");
  let message: string;

  switch (mode) {
    case "urgent":
      message =
        locale === "es"
          ? `Hola, tengo una emergencia. ¿Están disponibles en ${cityLabel}?`
          : `Bonjour, j'ai une urgence. Êtes-vous disponible à ${cityLabel} ?`;
      break;
    case "booking":
      message =
        locale === "es"
          ? `Hola, me gustaría reservar una sesión en ${cityLabel}.`
          : `Bonjour, je voudrais réserver une séance à ${cityLabel}.`;
      break;
    case "quote":
    default:
      message =
        locale === "es"
          ? `Hola, me gustaría un presupuesto para sus servicios en ${cityLabel}.`
          : `Bonjour, je voudrais un devis pour vos services à ${cityLabel}.`;
      break;
  }

  try {
    const url = new URL(baseWhatsapp);
    const encoded = encodeURIComponent(message);
    const separator = url.search ? "&" : "?";
    url.search += `${separator}text=${encoded}`;
    return url.toString();
  } catch {
    return baseWhatsapp;
  }
}

export async function generateMetadata({
  params,
  searchParams,
}: PageParams): Promise<Metadata> {
  const preset = getPreset(params.job, locale);
  const client = parseClientParams(toURLSearchParams(searchParams));
  const host = headers().get("host");
  const brand = getBrandFromHost(host);

  const isAbnRevetement = preset.jobKey === "abn-revetement";
  const name = client.name || (isAbnRevetement ? preset.jobLabel : `Su ${preset.jobLabel}`);
  const city = client.city || (locale === "es" ? "Su ciudad" : "Votre ville");

  const title = `${name} — ${preset.jobLabel} en ${city}`;
  const description = `${preset.jobLabel} en ${city}. ${preset.defaultHeroTagline} Contacto directo: llamada / WhatsApp.`;

  return {
    title,
    description,
    icons: {
      icon: preset.favicon ?? brand.faviconPath,
    },
    openGraph: {
      title,
      description,
      siteName: brand.siteName,
    },
    alternates: {
      canonical: `/es/m/${params.job}`,
    },
  };
}

export default async function Page({ params, searchParams }: PageParams) {
  const preset = getPreset(params.job, locale);
  const usp = toURLSearchParams(searchParams);
  const client: ClientParams = parseClientParams(usp);

  const isAbnRevetement = preset.jobKey === "abn-revetement";
  const name = client.name || (isAbnRevetement ? preset.jobLabel : `Su ${preset.jobLabel}`);
  const city = client.city || (locale === "es" ? "Su ciudad" : "Votre ville");

  const hero = {
    title: name,
    subtitle: client.city,
    tagline: client.tagline || preset.defaultHeroTagline,
  };

  const services =
    client.servicesCustom && client.servicesCustom.length > 0
      ? client.servicesCustom
      : preset.defaultServices;

  const benefits = preset.defaultBenefits;
  const faq = preset.defaultFaq;

  const phoneHref = client.phone ? `tel:${client.phone}` : null;
  const whatsappHref = client.whatsapp || null;
  const mapsHref = client.maps || null;

  const primaryCtaLabel = buildPrimaryCtaLabel(preset.cta.mode, locale);
  const primaryCtaHref = buildPrimaryCtaHref(
    whatsappHref,
    preset.cta.mode,
    client.city || city,
    locale,
  );

  const schemaType = mapJobToSchemaType(preset.jobKey);
  const urlPath = `/es/m/${encodeURIComponent(params.job)}`;

  const schemaObj = cleanObject({
    "@context": "https://schema.org",
    "@type": schemaType,
    name,
    telephone: client.phone || undefined,
    areaServed: city,
    url: urlPath,
    image: client.logo || undefined,
    sameAs: client.maps ? [client.maps] : undefined,
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaObj) }}
      />
      <LinkPage
        preset={preset}
        client={client}
        hero={hero}
        services={services}
        benefits={benefits}
        faq={faq}
        ctas={{
          phoneHref,
          whatsappHref,
          mapsHref,
          primaryCtaHref,
          primaryCtaLabel,
        }}
        jobKey={preset.jobKey}
        queryString={usp.toString()}
        locale={locale}
      />
    </>
  );
}

