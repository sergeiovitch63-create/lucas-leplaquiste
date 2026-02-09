import Link from "next/link";
import { BackgroundShell } from "./BackgroundShell";
import { PhoneFrame } from "./PhoneFrame";
import { site } from "../config/site";

interface ServicePageProps {
  title: string;
  description: string | string[];
}

export function ServicePage({ title, description }: ServicePageProps) {
  const paragraphs = Array.isArray(description) ? description : [description];

  return (
    <BackgroundShell>
      <PhoneFrame>
        <div className="space-y-7">
          <div className="flex items-center justify-between gap-3">
            <Link
              href="/"
              className="inline-flex items-center gap-1 text-xs font-medium text-white/80 underline-offset-4 hover:text-white hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
              aria-label="Retour à la page principale"
            >
              <span aria-hidden>←</span>
              <span>Retour</span>
            </Link>
            <p className="text-[11px] font-medium uppercase tracking-wide text-white/60 text-shadow-soft">
              Zone&nbsp;: {site.locationText}
            </p>
          </div>

          <div className="space-y-3">
            <h1 className="text-xl font-semibold tracking-tight text-white text-shadow-soft">
              {title}
            </h1>
            <div className="space-y-3 text-sm text-white/90 leading-relaxed text-shadow-soft">
              {paragraphs.map((text, index) => (
                <p key={index}>{text}</p>
              ))}
            </div>
          </div>

          <div className="space-y-3 pt-2">
            <a
              href={site.telLink}
              className="flex w-full items-center justify-center rounded-2xl bg-white text-sm font-semibold text-black shadow-md transition transform hover:translate-y-[1px] hover:bg-zinc-100 active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent min-h-[52px]"
              aria-label="Appeler pour un devis ou une intervention"
            >
              Appeler
            </a>
            <a
              href={site.waLink}
              className="flex w-full items-center justify-center rounded-2xl border border-white/20 bg-white/5 text-sm font-semibold text-white shadow-md transition transform hover:translate-y-[1px] hover:bg-white/10 active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent min-h-[52px]"
              aria-label="Contacter via WhatsApp"
            >
              WhatsApp
            </a>
          </div>
        </div>
      </PhoneFrame>
    </BackgroundShell>
  );
}


