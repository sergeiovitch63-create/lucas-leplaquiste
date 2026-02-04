import Image from "next/image";
import Link from "next/link";
import { PhoneFrame } from "../../components/PhoneFrame";
import { site } from "../../config/site";
import { MadeByPublox } from "../../components/MadeByPublox";

export default function AProposPage() {
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

      {/* Content */}
      <div className="relative z-10 flex min-h-[100dvh] w-full items-start justify-center px-4 pt-[calc(env(safe-area-inset-top)+3rem)] pb-[calc(env(safe-area-inset-bottom)+6rem)]">
        <PhoneFrame>
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
            <div className="flex justify-center mt-4">
              <div className="relative h-48 w-48 mb-1">
                <Image
                  src="/media/a-propos/logo.png?v=2"
                  alt={site.brandName}
                  fill
                  sizes="192px"
                  className="object-contain"
                  unoptimized
                />
              </div>
            </div>

            {/* Titre "À propos" */}
            <div className="flex justify-center -mt-2">
              <h1 className="text-lg font-semibold text-white text-center">
                À propos
              </h1>
            </div>

            {/* Contenu texte centré */}
            <div className="mx-auto max-w-[420px] space-y-4 text-center">
              <p className="text-[14px] leading-relaxed text-white/90">
                Plaquiste formé chez les Compagnons du Devoir, avec une approche
                du métier basée sur la rigueur, la précision et le respect des
                règles de l&apos;art.
              </p>

              <p className="text-[14px] leading-relaxed text-white/90">
                Chaque prestation est réalisée avec un souci constant du détail,
                des supports bien préparés, des alignements précis et des finitions
                propres, aussi bien en rénovation qu&apos;en construction neuve.
              </p>

              <p className="text-[14px] leading-relaxed text-white/90">
                Travail sérieux, chantier propre en fin d&apos;intervention, devis
                gratuit et intervention locale.
              </p>
            </div>

            {/* Section images */}
            <div className="mx-auto grid max-w-[420px] grid-cols-2 gap-3">
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/10">
                <Image
                  src="/media/a-propos/a-propos-1.jpg"
                  alt="Travaux de plâtrerie - Véranda avec toit vitré"
                  fill
                  sizes="(max-width: 420px) 50vw, 200px"
                  className="object-cover"
                />
              </div>
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/10">
                <Image
                  src="/media/a-propos/a-propos-2.jpg"
                  alt="Travaux de plâtrerie - Chantier en cours"
                  fill
                  sizes="(max-width: 420px) 50vw, 200px"
                  className="object-cover"
                />
              </div>
            </div>

            <MadeByPublox />
          </div>
        </PhoneFrame>
      </div>
    </div>
  );
}


