import type { JobPreset } from "@/lib/getPreset";
import type { ClientParams, ClientLink } from "@/lib/parseClientParams";
import { pickImage } from "@/lib/images";
import { QuickActions } from "./QuickActions";
import SafeImage from "./SafeImage";

interface LucasLikeTemplateProps {
  preset: JobPreset;
  client: ClientParams;
  heroTitle: string;
  jobKey: string;
  queryString: string;
}

function buildZoneText(preset: JobPreset, client: ClientParams): string {
  if (client.zone) return client.zone;
  if (preset.defaultZoneText) return preset.defaultZoneText;
  if (client.city) return `${client.city} et alentours`;
  return "Votre zone d’intervention";
}

function buildBgImage(preset: JobPreset, client: ClientParams): string {
  return pickImage(client.bg, preset.defaultBgImage);
}

function buildBannerImage(preset: JobPreset, client: ClientParams): string {
  return pickImage(
    client.banner,
    client.logo,
    preset.defaultBannerImage,
    preset.defaultBgImage,
    "/media/logo-centre.png",
  );
}

function appendQueryToInternalHref(href: string, queryString: string): string {
  if (!queryString) return href;
  if (!href.startsWith("/m/")) return href;
  const separator = href.includes("?") ? "&" : "?";
  return `${href}${separator}${queryString}`;
}

function buildLinks(
  preset: JobPreset,
  client: ClientParams,
  services: { title: string; desc: string }[],
  jobKey: string,
  queryString: string,
): ClientLink[] {
  let baseLinks: ClientLink[];

  if (client.links && client.links.length > 0) {
    baseLinks = client.links;
  } else if (preset.defaultLinks && preset.defaultLinks.length > 0) {
    baseLinks = preset.defaultLinks;
  } else {
    // Fallback: map default services to non-clickable links
    baseLinks = services.map((service) => ({
      label: service.title,
      href: "#",
    }));
  }

  const normalizedBase = baseLinks.map((link) => ({
    ...link,
    href: appendQueryToInternalHref(link.href, queryString),
    icon:
      link.icon ||
      pickImage(
        preset.defaultCategoryIcon,
        preset.defaultBgImage,
        "/media/logo-centre.png",
      ),
  }));

  const qs = queryString ? `?${queryString}` : "";
  const avisHref = appendQueryToInternalHref(
    `/m/${encodeURIComponent(jobKey)}/avis${qs}`,
    queryString,
  );

  const avisIcon = pickImage(
    preset.defaultReviewsIcon,
    preset.defaultCategoryIcon,
    preset.defaultBgImage,
    "/media/logo-centre.png",
  );

  const avisLink: ClientLink = {
    label: "Avis clients",
    href: avisHref,
    icon: avisIcon,
  };

  return [avisLink, ...normalizedBase];
}

export function LucasLikeTemplate({
  preset,
  client,
  heroTitle,
  jobKey,
  queryString,
}: LucasLikeTemplateProps) {
  const zoneText = buildZoneText(preset, client);
  const bgImage = buildBgImage(preset, client);
  const bannerImage = buildBannerImage(preset, client);

  const name = heroTitle;

  const phoneHref = client.phone ? `tel:${client.phone}` : null;
  const whatsappHref = client.whatsapp;

  const ctaLabel =
    client.primaryLabel ||
    (preset.cta.mode === "urgent"
      ? "Urgence"
      : preset.cta.mode === "booking"
      ? "Réserver"
      : "Devis gratuit");

  // Primary CTA: urgent -> tel, sinon -> WhatsApp (avec message pré-rempli)
  let primaryHref: string | null = null;
  if (preset.cta.mode === "urgent" && phoneHref) {
    primaryHref = phoneHref;
  } else if (whatsappHref) {
    // message simple, on garde la logique avancée dans la page si besoin
    const cityLabel = client.city || zoneText || "votre ville";
    const message =
      preset.cta.mode === "booking"
        ? `Bonjour, je voudrais réserver à ${cityLabel}.`
        : `Bonjour, je voudrais un devis pour vos services à ${cityLabel}.`;
    try {
      const url = new URL(whatsappHref);
      const encoded = encodeURIComponent(message);
      const separator = url.search ? "&" : "?";
      url.search += `${separator}text=${encoded}`;
      primaryHref = url.toString();
    } catch {
      primaryHref = whatsappHref;
    }
  }

  const links = buildLinks(
    preset,
    client,
    preset.defaultServices,
    jobKey,
    queryString,
  );

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
      <div className="absolute inset-0 bg-black/25" aria-hidden />

      {/* Content */}
      <main className="relative z-10 flex min-h-[100dvh] w-full items-start justify-center px-4 py-10">
        <div className="w-full max-w-[420px] text-center space-y-7">
          {/* Logo / Hero */}
          <div className="space-y-4">
            <div className="flex justify-center">
              <div className="relative h-16 w-16 overflow-hidden rounded-full border border-white/25 shadow-lg">
                {client.logo ? (
                  <SafeImage
                    src={pickImage(
                      client.logo,
                      preset.defaultBannerImage,
                      preset.defaultBgImage,
                      "/media/logo-centre.png",
                    )}
                    alt={name}
                    width={64}
                    height={64}
                    className="h-full w-full object-cover rounded-full"
                  />
                ) : preset.defaultBannerImage || preset.defaultBgImage ? (
                  <SafeImage
                    src={pickImage(
                      preset.defaultBannerImage || preset.defaultBgImage,
                      "/media/logo-centre.png",
                    )}
                    alt={preset.jobLabel}
                    width={64}
                    height={64}
                    className="h-full w-full object-cover rounded-full"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-indigo-500 via-fuchsia-500 to-rose-500 text-sm font-semibold uppercase text-white shadow-inner">
                    {initials || preset.jobLabel[0]?.toUpperCase() || "A"}
                  </div>
                )}
              </div>
            </div>
            <div className="space-y-1">
              <h1 className="text-2xl font-semibold tracking-tight text-shadow-soft">
                {name}
              </h1>
              <p className="text-xs text-white/80">
                Zones d’intervention: {zoneText}
              </p>
            </div>
          </div>

          {/* Icons row */}
          <QuickActions
            phone={client.phone || null}
            whatsapp={client.whatsapp}
            facebook={client.facebook}
            email={client.email}
            variant="dark"
          />

          {/* Banner card */}
          <a
            href={primaryHref || phoneHref || whatsappHref || "#"}
            className="block overflow-hidden rounded-2xl bg-white/15 shadow-xl ring-1 ring-black/10 backdrop-blur-md transition hover:translate-y-[1px]"
          >
            <div className="relative h-[170px] w-full overflow-hidden bg-[color:var(--logo-blue,#021C43)]">
              {bannerImage && (
                <SafeImage
                  src={bannerImage}
                  alt=""
                  width={800}
                  height={340}
                  className="h-full w-full object-cover"
                />
              )}
            </div>
            <div className="flex h-[54px] items-center justify-center bg-white/35 px-4 text-sm font-semibold text-slate-900 backdrop-blur-md">
              <span>Appeler — {ctaLabel}</span>
            </div>
          </a>

          {/* Links list */}
          {links.length > 0 && (
            <div className="mt-5 space-y-3">
              {links.map((link, index) => (
                <a
                  key={`${link.label}-${index}`}
                  href={link.href || "#"}
                  target={link.href.startsWith("http") ? "_blank" : undefined}
                  rel={link.href.startsWith("http") ? "noreferrer" : undefined}
                  className="group flex min-h-[56px] items-center gap-3 rounded-2xl border border-white/10 bg-white/18 px-3.5 shadow-[0_10px_25px_rgba(0,0,0,0.18)] backdrop-blur-md transition hover:translate-y-[-1px] hover:bg-white/22 active:scale-[0.99]"
                >
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full bg-white/20">
                    <SafeImage
                      src={pickImage(
                        link.icon || null,
                        bannerImage,
                        preset.defaultBannerImage,
                        preset.defaultBgImage,
                        "/media/logo-centre.png",
                      )}
                      alt=""
                      width={36}
                      height={36}
                      className="h-full w-full object-cover rounded-full"
                    />
                  </div>
                  <div className="flex flex-1 items-center justify-center">
                    <span className="line-clamp-1 text-sm font-medium text-white/90">
                      {link.label}
                    </span>
                  </div>
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/10 text-lg leading-none text-white/65">
                    ⋯
                  </div>
                </a>
              ))}
            </div>
          )}

          {/* Footer */}
          <div className="pt-6">
            <p className="text-[11px] text-white/60">Made by</p>
            <a
              href="https://www.publox-marketing.com/"
              target="_blank"
              rel="noreferrer"
              className="mt-2 inline-flex h-10 items-center justify-center rounded-2xl border border-white/10 bg-white/20 px-5 text-xs font-medium text-white shadow-[0_10px_25px_rgba(0,0,0,0.18)] transition hover:-translate-y-[1px] hover:bg-white/25 active:scale-[0.99]"
            >
              PUBLOX
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}


