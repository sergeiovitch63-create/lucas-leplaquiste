import type { Metadata } from "next";
import { headers } from "next/headers";
import { notFound } from "next/navigation";
import { getPreset, type JobCategory } from "@/lib/getPreset";
import { parseClientParams, type ClientParams } from "@/lib/parseClientParams";
import { getBrandFromHost } from "@/lib/brand";
import { QuickActions } from "@/components/QuickActions";
import SafeImage from "@/components/SafeImage";
import { pickImage } from "@/lib/images";

type PageParams = {
  params: { job: string; category: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

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

export async function generateMetadata({
  params,
  searchParams,
}: PageParams): Promise<Metadata> {
  const preset = getPreset(params.job);
  const usp = toURLSearchParams(searchParams);
  const client = parseClientParams(usp);
  const host = headers().get("host");
  const brand = getBrandFromHost(host);

  const categories = preset.categories ?? [];
  const category = categories.find((c) => c.slug === params.category);
  if (!category) {
    return {
      title: "Page non trouvée",
    };
  }

  const name = client.name || `Votre ${preset.jobLabel}`;
  const city = client.city || client.zone || "Votre ville";

  const title = `${category.label} — ${name} à ${city}`;
  const description =
    category.short ||
    `${preset.jobLabel} à ${city}. Découverte de la catégorie ${category.label}.`;

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
  };
}

function buildBgImage(presetBg?: string, clientBg?: string | null): string {
  return pickImage(clientBg ?? undefined, presetBg, "/media/accueil/fond-ecrans.jpg");
}

function buildZoneText(presetZone: string | undefined, client: ClientParams): string {
  if (client.zone) return client.zone;
  if (presetZone) return presetZone;
  if (client.city) return `${client.city} et alentours`;
  return "Votre zone d’intervention";
}

function buildPrimaryCtaHref(
  presetMode: "booking" | "urgent" | "quote",
  client: ClientParams,
  category: JobCategory,
): { href: string | null; label: string } {
  const cityLabel = client.city || client.zone || "votre ville";

  const label =
    presetMode === "urgent"
      ? "Appel immédiat"
      : presetMode === "booking"
      ? "Réserver sur WhatsApp"
      : "Demander un devis";

  if (presetMode === "urgent" && client.phone) {
    return { href: `tel:${client.phone}`, label };
  }

  if (!client.whatsapp) {
    return { href: null, label };
  }

  const baseWhatsapp = client.whatsapp;
  const message =
    presetMode === "booking"
      ? `Bonjour, je voudrais réserver un ${category.label.toLowerCase()} à ${cityLabel}.`
      : `Bonjour, je voudrais un devis pour ${category.label.toLowerCase()} à ${cityLabel}.`;

  try {
    const url = new URL(baseWhatsapp);
    const encoded = encodeURIComponent(message);
    const separator = url.search ? "&" : "?";
    url.search += `${separator}text=${encoded}`;
    return { href: url.toString(), label };
  } catch {
    return { href: baseWhatsapp, label };
  }
}

function buildBackHref(job: string, usp: URLSearchParams): string {
  const qs = usp.toString();
  return qs ? `/m/${encodeURIComponent(job)}?${qs}` : `/m/${encodeURIComponent(job)}`;
}

export default async function Page({ params, searchParams }: PageParams) {
  const preset = getPreset(params.job);
  const usp = toURLSearchParams(searchParams);
  const client = parseClientParams(usp);

  const categories = preset.categories ?? [];
  const category = categories.find((c) => c.slug === params.category);
  if (!category) {
    notFound();
  }

  const zoneText = buildZoneText(preset.defaultZoneText, client);
  const bgImage = buildBgImage(preset.defaultBgImage, client.bg);
  const name = client.name || `Votre ${preset.jobLabel}`;

  const phoneHref = client.phone ? `tel:${client.phone}` : null;
  const whatsappHref = client.whatsapp;
  const emailHref = client.email ? `mailto:${client.email}` : null;
  const facebookHref = client.facebook;

  const primaryCta = buildPrimaryCtaHref(preset.cta.mode, client, category);
  const backHref = buildBackHref(params.job, usp);

  const initials = name
    .split(" ")
    .filter((part) => part.length > 0)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");

  return (
    <div className="relative min-h-[100dvh] w-full overflow-x-hidden text-white">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url('${bgImage}')` }}
        aria-hidden
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/30" aria-hidden />

      {/* Content */}
      <main className="relative z-10 flex min-h-[100dvh] w-full items-start justify-center px-4 py-10">
        <div className="w-full max-w-[420px] space-y-7">
          {/* Header / back */}
          <div className="flex items-center justify-between text-xs text-white/80">
            <a
              href={backHref}
              className="inline-flex items-center gap-1 underline-offset-4 hover:underline"
            >
              <span aria-hidden>←</span>
              <span>Retour</span>
            </a>
            <span className="rounded-full bg-white/10 px-3 py-1 text-[11px] font-medium uppercase tracking-wide">
              {preset.jobLabel}
            </span>
          </div>

          {/* Hero logo + title */}
          <div className="text-center space-y-4">
            <div className="flex justify-center">
              <div className="relative h-14 w-14 overflow-hidden rounded-full border border-white/25 shadow-lg">
                {client.logo || preset.defaultBannerImage || preset.defaultBgImage ? (
                  <SafeImage
                    src={pickImage(
                      client.logo,
                      preset.defaultBannerImage,
                      preset.defaultBgImage,
                      "/media/placeholder.jpg",
                    )}
                    alt={client.logo ? name : preset.jobLabel}
                    width={56}
                    height={56}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-indigo-500 via-fuchsia-500 to-rose-500 text-xs font-semibold uppercase text-white shadow-inner">
                    {initials || preset.jobLabel[0]?.toUpperCase() || "A"}
                  </div>
                )}
              </div>
            </div>
            <div className="space-y-1">
              <h1 className="text-xl font-semibold tracking-tight text-shadow-soft">
                {category.label} — {name}
              </h1>
              <p className="text-xs text-white/80">
                Zones d’intervention: {zoneText}
              </p>
            </div>

            {/* Icons row */}
            <div className="mt-3">
              <QuickActions
                phone={client.phone}
                whatsapp={client.whatsapp}
                facebook={client.facebook}
                email={client.email}
                variant="dark"
              />
            </div>
          </div>

          {/* Hero image */}
          <div className="overflow-hidden rounded-2xl border border-white/15 bg-white/10 shadow-xl">
            <div className="relative h-[180px] w-full overflow-hidden">
              <SafeImage
                src={pickImage(
                  category.heroImage,
                  preset.defaultBgImage,
                  "/media/accueil/fond-ecrans.jpg",
                )}
                alt={category.label}
                width={800}
                height={360}
                className="h-full w-full object-cover"
              />
            </div>
          </div>

          {/* Body text */}
          <section className="space-y-3 rounded-2xl border border-white/12 bg-black/40 px-4 py-4 text-sm leading-relaxed text-white/85">
            {category.body.map((p, index) => (
              <p key={index}>{p}</p>
            ))}
          </section>

          {/* Why us */}
          {category.whyUs.length > 0 && (
            <section className="space-y-3">
              <h2 className="text-sm font-semibold uppercase tracking-wide text-white/80">
                Pourquoi nous choisir
              </h2>
              <div className="space-y-2 text-sm text-white/85">
                {category.whyUs.map((item, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <span className="mt-[6px] h-1.5 w-1.5 rounded-full bg-white/80" />
                    <p>{item}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Primary CTA */}
          {primaryCta.href && (
            <a
              href={primaryCta.href}
              target="_blank"
              rel="noreferrer"
              className="flex w-full items-center justify-center rounded-2xl bg-white px-4 py-3 text-sm font-semibold text-black shadow-md transition transform hover:translate-y-[1px] hover:bg-zinc-100 active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent min-h-[52px]"
            >
              {primaryCta.label}
            </a>
          )}

          {/* Gallery */}
          {category.gallery.length > 0 && (
            <section className="space-y-3">
              <h2 className="text-sm font-semibold uppercase tracking-wide text-white/80">
                En images
              </h2>
              <div className="grid grid-cols-3 gap-2">
                {category.gallery.map((src, index) => (
                  <div
                    key={index}
                    className="overflow-hidden rounded-xl border border-white/15 bg-white/10"
                  >
                    <SafeImage
                      src={pickImage(
                        src,
                        preset.defaultBgImage,
                        "/media/accueil/fond-ecrans.jpg",
                      )}
                      alt=""
                      width={240}
                      height={120}
                      className="h-24 w-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* FAQ */}
          {category.faq.length > 0 && (
            <section className="space-y-3">
              <h2 className="text-sm font-semibold uppercase tracking-wide text-white/80">
                Questions fréquentes
              </h2>
              <div className="space-y-3">
                {category.faq.map((item, index) => (
                  <details
                    key={index}
                    className="group rounded-2xl border border-white/12 bg-black/40 px-4 py-3 text-sm"
                  >
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-2 font-semibold text-white">
                      <span>{item.q}</span>
                      <span className="text-xs text-white/60 group-open:rotate-180 transition-transform">
                        ▾
                      </span>
                    </summary>
                    {item.a && (
                      <p className="mt-2 text-white/85">{item.a}</p>
                    )}
                  </details>
                ))}
              </div>
            </section>
          )}
        </div>
      </main>
    </div>
  );
}


