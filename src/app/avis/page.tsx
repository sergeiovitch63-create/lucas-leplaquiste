import type { Metadata } from "next";
import Link from "next/link";
import { BackgroundShell } from "../../components/BackgroundShell";
import { PhoneFrame } from "../../components/PhoneFrame";
import { GlassCard } from "../../components/GlassCard";
import { GoogleReviewsWidget } from "../../components/GoogleReviewsWidget";

export const metadata: Metadata = {
  icons: {
    icon: "/media/accueil/favicon-avis.png",
  },
};

export default function AvisPage() {
  return (
    <BackgroundShell>
      <PhoneFrame>
        <GlassCard>
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
            </div>

            <div className="space-y-3">
              <h1 className="text-xl font-semibold tracking-tight text-white">
                Avis clients
              </h1>
            </div>

            <div className="py-6">
              <div className="max-w-[420px] w-full mx-auto px-0">
                <GoogleReviewsWidget />
              </div>
            </div>
          </div>
        </GlassCard>
      </PhoneFrame>
    </BackgroundShell>
  );
}



