import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PhoneFrame } from "../../components/PhoneFrame";
import { site } from "../../config/site";
import { ImageGallery } from "../../components/ImageGallery";

export const metadata: Metadata = {
  icons: {
    icon: "/media/accueil/favicon-faux-plafond.jpg",
  },
};

const fauxPlafondsImages = [
  { src: "faux-plafond-1.jpg", alt: "Faux plafond 1" },
  { src: "faux-plafond-2.jpg", alt: "Faux plafond 2" },
  { src: "faux-plafond-3.jpg", alt: "Faux plafond 3" },
  { src: "faux-plafond-4.jpg", alt: "Faux plafond 4" },
  { src: "faux-plafonnd-5.jpg", alt: "Faux plafond 5" }, // Note: nom exact du fichier (faute de frappe dans le fichier)
  { src: "faux-plafond-6.jpg", alt: "Faux plafond 6" },
];

export default function FauxPlafondsPage() {
  return (
    <div
      className="relative min-h-[100dvh] w-full overflow-x-hidden text-white"
      style={{
        background: `linear-gradient(to bottom, var(--logo-blue-light), var(--logo-blue))`,
      }}
    >
      {/* Subtle grain texture */}
      <div
        className="pointer-events-none fixed inset-0 z-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160' viewBox='0 0 160 160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='noStitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />

      {/* Light overlay to brighten the blue background */}
      <div className="pointer-events-none fixed inset-0 z-[1] bg-white/8" />

      {/* Content */}
      <div className="relative z-10 flex w-full items-start justify-center px-4 pt-[calc(env(safe-area-inset-top)+1.5rem)] pb-[calc(env(safe-area-inset-bottom)+6rem)]">
        <PhoneFrame compact>
          <div className="w-full space-y-6">
            {/* Bouton retour */}
            <div className="flex items-center justify-start">
              <Link
                href="/"
                className="inline-flex items-center gap-1 text-xs font-medium text-white/80 underline-offset-4 hover:text-white hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
                aria-label="Retour à la page principale"
              >
                <span aria-hidden>←</span>
                <span>Retour</span>
              </Link>
            </div>

            {/* Logo en haut */}
            <div className="flex justify-center mt-2">
              <div className="relative h-20 w-20">
                <Image
                  src="/media/services/logo.png"
                  alt={site.brandName}
                  fill
                  sizes="80px"
                  className="object-contain"
                />
              </div>
            </div>

            {/* Titre "Faux plafonds" */}
            <div className="flex justify-center -mt-1">
              <h1 className="text-lg font-semibold text-white text-center">
                Faux plafonds
              </h1>
            </div>

            {/* Texte descriptif */}
            <div className="mx-auto max-w-[420px] text-center">
              <p className="text-[14px] leading-relaxed text-white/90">
                Création de faux plafonds en plaque de plâtre, sous charpente ou avec
                intégration d&apos;ouvertures, avec un travail précis et des finitions
                propres.
              </p>
            </div>

            {/* Galerie d'images */}
            <ImageGallery
              images={fauxPlafondsImages}
              basePath="/media/services"
            />

            {/* Bouton Contacter nous */}
            <div className="mx-auto max-w-[420px] pt-2">
              <a
                href={site.telLink}
                className="flex h-[54px] w-full items-center justify-center gap-2.5 rounded-2xl border-t border-white/10 bg-white/15 px-4 backdrop-blur-xl text-sm font-medium text-white shadow-[0_10px_25px_rgba(0,0,0,0.18)] transition-all duration-200 hover:bg-white/20 hover:-translate-y-[1px] active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:ring-offset-0"
                aria-label="Contactez-nous"
              >
                Contactez-nous
              </a>
            </div>
          </div>
        </PhoneFrame>
      </div>
    </div>
  );
}
