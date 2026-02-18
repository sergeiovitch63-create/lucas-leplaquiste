import type { Metadata } from "next";
import { headers } from "next/headers";
import { getPreset } from "@/lib/getPreset";
import { parseClientParams, type ClientParams } from "@/lib/parseClientParams";
import { getBrandFromHost } from "@/lib/brand";
import { QuickActions } from "@/components/QuickActions";
import { pickImage } from "@/lib/images";
import { getTranslation, type Locale } from "@/lib/i18n";

const locale: Locale = "es";

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
  const preset = getPreset(params.job, locale);
  const client = parseClientParams(toURLSearchParams(searchParams));
  const host = headers().get("host");
  const brand = getBrandFromHost(host);

  const isAbnRevetement = preset.jobKey === "abn-revetement";
  const name =
    client.name || (isAbnRevetement ? preset.jobLabel : `Su ${preset.jobLabel}`);
  const city = client.city || client.zone || "Su ciudad";

  const title = `Opiniones — ${name} (${preset.jobLabel} en ${city})`;

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
      name: "Camila L.",
      rating: 5,
      date: "marzo 2024",
      text: "Uno de los mejores masajes que he recibido. El ambiente es muy suave y salí mucho más ligera, tanto física como mentalmente.",
    },
    {
      name: "Tomás R.",
      rating: 5,
      date: "febrero 2024",
      text: "Masaje descontracturante de espalda después de varias semanas de tensión: resultado inmediato. Se nota una verdadera escucha y un gran dominio de los gestos.",
    },
    {
      name: "Elena G.",
      rating: 4.8,
      date: "enero 2024",
      text: "Probé el masaje relajante y luego un cuidado facial, ambos fueron perfectos. Lugar muy limpio, música agradable, te sientes en confianza rápidamente.",
    },
    {
      name: "Julia M.",
      rating: 5,
      date: "diciembre 2023",
      text: "Regalado en bono regalo para mi cumpleaños, el ritual premium fue una verdadera pausa. Me encantó la mezcla de masaje corporal y cuidado facial.",
    },
    {
      name: "Pablo D.",
      rating: 4.9,
      date: "noviembre 2023",
      text: "Masaje deportivo muy eficaz después de un trail. Las piernas estaban mucho menos pesadas al día siguiente, y las explicaciones son claras.",
    },
    {
      name: "Sofía T.",
      rating: 5,
      date: "octubre 2023",
      text: "Atención cálida, escucha, y ninguna sensación de 'cadena'. Realmente se toman el tiempo de preguntarte cómo estás antes de comenzar.",
    },
    {
      name: "Nicolás V.",
      rating: 4.7,
      date: "septiembre 2023",
      text: "Masaje en pareja con mi compañera, muy bella experiencia. Salimos relajados y encantados ambos, volveremos sin dudarlo.",
    },
  ];
}

function getAbnRevetementReviews(): Review[] {
  return [
    {
      name: "Laurent P.",
      rating: 5,
      date: "enero 2025",
      text: "Aislamiento térmico por el exterior realizado en nuestra casa cerca de Toulouse. Obra limpia, plazos cumplidos y una verdadera diferencia en el confort desde el primer invierno.",
    },
    {
      name: "Mélanie R.",
      rating: 4.9,
      date: "diciembre 2024",
      text: "Hemos rehecho varias estancias (trasdosados + pintura). Los equipos de ABN Revestimiento han sido puntuales, cuidadosos y muy claros sobre las etapas de la obra.",
    },
    {
      name: "Hugo D.",
      rating: 4.8,
      date: "noviembre 2024",
      text: "Trabajos de yesería para crear un nuevo dormitorio. Tabiques rectos, cintas limpias, todo estaba listo para pintar sin sorpresas desagradables.",
    },
    {
      name: "Claire S.",
      rating: 5,
      date: "septiembre 2024",
      text: "Renovación completa de un apartamento en Toulouse: muros, techos y puertas. El resultado es neto, sin huellas, y la obra ha estado muy bien protegida.",
    },
    {
      name: "Nicolas F.",
      rating: 4.9,
      date: "julio 2024",
      text: "Buen acompañamiento para elegir entre aislamiento interior y exterior. Las explicaciones eran claras y los trabajos se desarrollaron como estaba previsto.",
    },
    {
      name: "Sarah G.",
      rating: 5,
      date: "mayo 2024",
      text: "Hemos confiado a ABN Revestimiento la refección completa de un salón: falso techo, enlucidos y pintura. El resultado es muy limpio, se nota el cuidado del detalle.",
    },
  ];
}

function getGenericReviews(jobLabel: string, city: string): Review[] {
  const baseCity = city || "su ciudad";
  return [
    {
      name: "Alejandro B.",
      rating: 4.9,
      date: "marzo 2024",
      text: `Intervención muy profesional. ${jobLabel} en ${baseCity} atento, que se toma el tiempo de explicar los trabajos y proponer soluciones adaptadas a la vivienda.`,
    },
    {
      name: "Julia C.",
      rating: 5,
      date: "febrero 2024",
      text: `Obra bien organizada de principio a fin. El ${jobLabel.toLowerCase()} ha respetado los plazos anunciados y dejado las estancias limpias después de su paso.`,
    },
    {
      name: "Tomás H.",
      rating: 4.8,
      date: "enero 2024",
      text: `Muy buen contacto, presupuesto claro y sin sorpresas. El resultado es conforme a lo que se había anunciado, recomiendo este ${jobLabel.toLowerCase()} en ${baseCity}.`,
    },
    {
      name: "Isabel M.",
      rating: 5,
      date: "noviembre 2023",
      text: "Toma de cita simple, horarios respetados y trabajo cuidado. Se nota que hay la costumbre de las obras en renovación.",
    },
    {
      name: "Román T.",
      rating: 4.7,
      date: "octubre 2023",
      text: "Buen seguimiento, fotos enviadas a medida del avance de los trabajos. Muy práctico cuando no se está en el lugar.",
    },
    {
      name: "Céline D.",
      rating: 5,
      date: "septiembre 2023",
      text: "Artesano serio, reactivo y fuerza de propuesta. El resultado final es conforme a nuestras expectativas, volveremos a llamarle sin dudarlo.",
    },
  ];
}

function buildBgImage(presetBg?: string, clientBg?: string | null): string {
  return pickImage(clientBg ?? undefined, presetBg, "/media/accueil/fond-ecrans.jpg");
}

function buildZoneText(
  presetZone: string | undefined,
  client: ClientParams,
  locale: Locale = "es",
): string {
  if (client.zone) return client.zone;
  if (presetZone) return presetZone;
  if (client.city)
    return locale === "es"
      ? `${client.city} y alrededores`
      : `${client.city} et alentours`;
  return locale === "es" ? "Su zona de intervención" : "Votre zone d'intervention";
}

function buildBackHref(job: string, usp: URLSearchParams, locale: Locale = "es"): string {
  const qs = usp.toString();
  const prefix = locale === "es" ? "/es" : "";
  return qs
    ? `${prefix}/m/${encodeURIComponent(job)}?${qs}`
    : `${prefix}/m/${encodeURIComponent(job)}`;
}

export default async function Page({ params, searchParams }: PageParams) {
  const preset = getPreset(params.job, locale);
  const usp = toURLSearchParams(searchParams);
  const client = parseClientParams(usp);

  const isAbnRevetement = preset.jobKey === "abn-revetement";
  const name =
    client.name || (isAbnRevetement ? preset.jobLabel : `Su ${preset.jobLabel}`);
  const zoneText = buildZoneText(preset.defaultZoneText, client, locale);
  const bgImage = buildBgImage(preset.defaultBgImage, client.bg);
  const backHref = buildBackHref(params.job, usp, locale);

  const reviews =
    params.job === "massage"
      ? getMassageReviews()
      : params.job === "abn-revetement"
      ? getAbnRevetementReviews()
      : getGenericReviews(
          preset.jobLabel,
          client.city || client.zone || "Su ciudad",
        );

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
              <span>{getTranslation(locale, "retour")}</span>
            </a>
            <span className="rounded-full bg-white/10 px-3 py-1 text-[11px] font-medium uppercase tracking-wide">
              {getTranslation(locale, "avis-clients")}
            </span>
          </div>

          {/* Title */}
          <header className="space-y-3 text-center">
            <div className="space-y-1">
              <h1 className="text-xl font-semibold tracking-tight text-shadow-soft">
                {getTranslation(locale, "avis-sur")} {name}
              </h1>
              <p className="text-xs text-white/80">
                {preset.jobLabel} — {getTranslation(locale, "zones-intervention")}: {zoneText}
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
                <p className="text-xs text-white/70">{getTranslation(locale, "note-globale")}</p>
                <p className="text-lg font-semibold">
                  {globalRating.toFixed(1)}{" "}
                  <span className="text-base text-yellow-300">★</span>
                  <span className="text-xs text-white/70"> / 5</span>
                </p>
                <p className="text-[11px] text-white/70">
                  {getTranslation(locale, "base-sur")} {totalCount}{" "}
                  {getTranslation(locale, "avis-google")}
                </p>
              </div>
              {client.maps && (
                <a
                  href={client.maps}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center rounded-full bg-white px-3 py-1.5 text-[11px] font-semibold text-black shadow-sm transition hover:bg-zinc-100"
                >
                  {getTranslation(locale, "voir-google")}
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




