import type { Metadata } from "next";
import Image from "next/image";
import { BackgroundShell } from "@/components/BackgroundShell";
import { PhoneFrame } from "@/components/PhoneFrame";
import { Icon } from "@/components/icons";

const FINCA_WHATSAPP = "https://wa.me/34617009592";
const FINCA_PHONE = "tel:+34617009592";
const FINCA_MAPS_URL = "https://maps.app.goo.gl/EN4YsCsmL1xpUqUD9";

export const metadata: Metadata = {
  title: "Finca Canarias | Publink",
  description:
    "Finca de vacances aux Canaries. Informations, contact WhatsApp et localisation.",
};

export default function FincaCanariasPage() {
  const brandName = "Finca Canarias";
  const location = "Islas Canarias";

  return (
    <BackgroundShell backgroundImage="/media/fond-los.png">
      <PhoneFrame>
        <div className="p-6">
          <div className="space-y-6">
            <div className="flex flex-col items-center gap-4">
              <div className="relative flex h-20 w-20 items-center justify-center overflow-hidden rounded-full border border-white/15 bg-black/40 shadow-lg ring-2 ring-white/20">
                <Image
                  src="/media/placeholder.svg"
                  alt={brandName}
                  fill
                  sizes="80px"
                  className="object-cover"
                  unoptimized
                />
              </div>
              <div className="text-center">
                <h1 className="text-xl font-semibold tracking-tight text-white sm:text-2xl text-shadow-soft">
                  {brandName}
                </h1>
                <p className="mt-1 text-xs text-white/80 sm:text-sm text-shadow-soft">
                  {location}
                </p>
              </div>

              <div className="mt-4 flex items-center justify-center gap-3">
                <a
                  href={FINCA_WHATSAPP}
                  aria-label="WhatsApp"
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex items-center justify-center transition-all duration-200 hover:-translate-y-[2px] hover:opacity-80 active:translate-y-0 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
                >
                  <Icon name="whatsapp" className="h-7 w-7 text-white" />
                </a>
                <a
                  href={FINCA_PHONE}
                  aria-label="Téléphone"
                  className="group inline-flex items-center justify-center transition-all duration-200 hover:-translate-y-[2px] hover:opacity-80 active:translate-y-0 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
                >
                  <Icon name="phone" className="h-7 w-7 text-white" />
                </a>
                <a
                  href={FINCA_MAPS_URL}
                  aria-label="Localisation"
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex items-center justify-center transition-all duration-200 hover:-translate-y-[2px] hover:opacity-80 active:translate-y-0 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
                >
                  <Icon name="map" className="h-7 w-7 text-white" />
                </a>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <a
                href={FINCA_WHATSAPP}
                target="_blank"
                rel="noreferrer"
                className="block"
                aria-label="Réserver la finca sur WhatsApp"
              >
                <div className="animate-call-shake-burst relative w-full overflow-hidden rounded-2xl shadow-[0_10px_25px_rgba(0,0,0,0.18)] transition-all duration-200 hover:-translate-y-[1px] active:scale-[0.99]">
                  <div className="relative h-[140px] w-full overflow-hidden rounded-t-2xl bg-black/40 sm:h-[160px]">
                    <Image
                      src="/media/placeholder.svg"
                      alt=""
                      fill
                      className="object-cover object-center"
                      sizes="(max-width: 420px) 100vw, 420px"
                      aria-hidden
                      unoptimized
                    />
                  </div>
                  <div className="flex h-[54px] w-full items-center justify-center rounded-b-2xl border-t border-white/10 bg-black/50 px-4 backdrop-blur-xl transition-all duration-200 hover:bg-black/60 active:scale-[0.99]">
                    <span className="text-sm font-medium text-white sm:text-base uppercase">
                      RÉSERVER PAR WHATSAPP
                    </span>
                  </div>
                </div>
              </a>

              <a
                href={FINCA_MAPS_URL}
                target="_blank"
                rel="noreferrer"
                className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent rounded-2xl"
                aria-label="Voir la localisation de la finca"
              >
                <div className="flex w-full min-h-[52px] items-center justify-center gap-3 rounded-2xl border border-white/10 bg-black/50 px-4 py-3 shadow-[0_4px_20px_rgba(0,0,0,0.3)] backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-black/60 hover:border-white/15 active:scale-[0.98]">
                  <Icon name="map" className="h-5 w-5 shrink-0 text-white" />
                  <span className="text-sm font-medium text-white sm:text-base">
                    Voir l&apos;adresse sur la carte
                  </span>
                </div>
              </a>
            </div>
          </div>
        </div>
      </PhoneFrame>
    </BackgroundShell>
  );
}

