import type { Metadata } from "next";
import { headers } from "next/headers";
import { getPreset } from "@/lib/getPreset";
import { parseClientParams, type ClientParams } from "@/lib/parseClientParams";
import { getBrandFromHost } from "@/lib/brand";
import { QuickActions } from "@/components/QuickActions";
import { pickImage } from "@/lib/images";

type PageParams = {
  params: { job: string };
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
  const client = parseClientParams(toURLSearchParams(searchParams));
  const host = headers().get("host");
  const brand = getBrandFromHost(host);

  const name = client.name || `Votre ${preset.jobLabel}`;
  const city = client.city || client.zone || "Votre ville";

  const title = `Avis — ${name} (${preset.jobLabel} à ${city})`;

  return {
    title,
    icons: {
      icon: preset.favicon ?? brand.faviconPath,
    },
    openGraph: {
      title,
      siteName: brand.siteName,
    },
  };
}

interface Review {
  name: string;
  rating: number;
  date: string;
  text: string;
}

function getMassageReviews(): Review[] {
  return [
    {
      name: "Camille L.",
      rating: 5,
      date: "mars 2024",
      text: "Un des meilleurs massages que j’ai pu recevoir. L’ambiance est très douce et je suis ressortie beaucoup plus légère, aussi bien physiquement que mentalement.",
    },
    {
      name: "Thomas R.",
      rating: 5,
      date: "février 2024",
      text: "Massage décontractant du dos après plusieurs semaines de tension : résultat immédiat. On sent une vraie écoute et une grande maîtrise des gestes.",
    },
    {
      name: "Elena G.",
      rating: 4.8,
      date: "janvier 2024",
      text: "J’ai testé le massage relaxant puis un soin visage, les deux ont été parfaits. Lieu très propre, musique agréable, on se sent vite en confiance.",
    },
    {
      name: "Julie M.",
      rating: 5,
      date: "décembre 2023",
      text: "Offert en bon cadeau pour mon anniversaire, le rituel premium a été une vraie parenthèse. J’ai adoré le mélange massage du corps et soin visage.",
    },
    {
      name: "Paul D.",
      rating: 4.9,
      date: "novembre 2023",
      text: "Massage sportif très efficace après un trail. Les jambes étaient beaucoup moins lourdes le lendemain, et les explications sont claires.",
    },
    {
      name: "Sophie T.",
      rating: 5,
      date: "octobre 2023",
      text: "Accueil chaleureux, écoute, et aucune sensation de “chaîne”. On prend vraiment le temps de vous demander comment vous allez avant de commencer.",
    },
    {
      name: "Nicolas V.",
      rating: 4.7,
      date: "septembre 2023",
      text: "Massage duo avec ma compagne, très belle expérience. Nous sommes ressortis détendus et ravis tous les deux, nous reviendrons sans hésiter.",
    },
  ];
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

function buildBackHref(job: string, usp: URLSearchParams): string {
  const qs = usp.toString();
  return qs ? `/m/${encodeURIComponent(job)}?${qs}` : `/m/${encodeURIComponent(job)}`;
}

export default async function Page({ params, searchParams }: PageParams) {
  const preset = getPreset(params.job);
  const usp = toURLSearchParams(searchParams);
  const client = parseClientParams(usp);

  const name = client.name || `Votre ${preset.jobLabel}`;
  const zoneText = buildZoneText(preset.defaultZoneText, client);
  const bgImage = buildBgImage(preset.defaultBgImage, client.bg);
  const backHref = buildBackHref(params.job, usp);

  const reviews =
    params.job === "massage" ? getMassageReviews() : getMassageReviews();

  const globalRating = 4.9;
  const totalCount = 37;

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
              Avis clients
            </span>
          </div>

          {/* Title */}
          <header className="space-y-3 text-center">
            <div className="space-y-1">
              <h1 className="text-xl font-semibold tracking-tight text-shadow-soft">
                Avis sur {name}
              </h1>
              <p className="text-xs text-white/80">
                {preset.jobLabel} — Zones d’intervention: {zoneText}
              </p>
            </div>
            <div className="flex justify-center">
              <QuickActions
                phone={client.phone}
                whatsapp={client.whatsapp}
                facebook={client.facebook}
                email={client.email}
                variant="dark"
              />
            </div>
          </header>

          {/* Global score */}
          <section className="rounded-2xl border border-white/15 bg-black/40 px-4 py-4 text-sm shadow-lg">
            <div className="flex items-center justify-between">
              <div className="space-y-1 text-left">
                <p className="text-xs text-white/70">Note globale</p>
                <p className="text-lg font-semibold">
                  {globalRating.toFixed(1)}{" "}
                  <span className="text-base text-yellow-300">★</span>
                  <span className="text-xs text-white/70"> / 5</span>
                </p>
                <p className="text-[11px] text-white/70">
                  Basé sur {totalCount} avis Google (données fictives)
                </p>
              </div>
              {client.maps && (
                <a
                  href={client.maps}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center rounded-full bg-white px-3 py-1.5 text-[11px] font-semibold text-black shadow-sm transition hover:bg-zinc-100"
                >
                  Voir sur Google
                </a>
              )}
            </div>
          </section>

          {/* Reviews list */}
          <section className="space-y-3">
            {reviews.map((review, index) => (
              <article
                key={`${review.name}-${index}`}
                className="rounded-2xl border border-white/12 bg-black/40 px-4 py-3 text-sm shadow-md"
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/15 text-xs font-semibold uppercase text-white/85">
                      {review.name
                        .split(" ")
                        .map((p) => p[0])
                        .join("")}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white">
                        {review.name}
                      </p>
                      <p className="text-[11px] text-white/65">
                        {review.date}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-yellow-300">
                      {review.rating.toFixed(1)} ★
                    </p>
                  </div>
                </div>
                <p className="mt-2 text-sm text-white/85">{review.text}</p>
              </article>
            ))}
          </section>
        </div>
      </main>
    </div>
  );
}


